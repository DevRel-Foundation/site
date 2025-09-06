#!/usr/bin/env node

// npm run sync-authors
// npm run sync-authors -- --force-update j12y,devrel-foundation
// npm run sync-authors -- --help

import { readdir, readFile, writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const AUTHORS_DIR = join(ROOT_DIR, 'src', 'authors');
const BLOG_DIR = join(ROOT_DIR, 'src', 'blog');

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API = 'https://api.github.com';

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    forceUpdate: [],
    showHelp: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      options.showHelp = true;
    } else if (arg === '--force-update' || arg === '-f') {
      const nextArg = args[i + 1];
      if (nextArg && !nextArg.startsWith('-')) {
        options.forceUpdate = nextArg.split(',').map(u => u.trim());
        i++; // Skip next argument since we consumed it
      }
    }
  }
  
  return options;
}

function showHelp() {
  console.log(`
DevRel Foundation Author Sync Tool

Usage:
  npm run sync-authors                                    # Normal sync (preserve local data)
  npm run sync-authors -- --force-update username        # Force update specific user
  npm run sync-authors -- --force-update user1,user2     # Force update multiple users
  npm run sync-authors -- --help                         # Show this help

Options:
  --force-update, -f <usernames>    Force update specified users with fresh GitHub data
  --help, -h                        Show this help message

Examples:
  npm run sync-authors                                    # Sync all, preserve local edits
  npm run sync-authors -- --force-update j12y            # Force refresh j12y from GitHub
  npm run sync-authors -- -f j12y,devrel-foundation      # Force refresh multiple users

Environment Variables:
  GITHUB_TOKEN                      GitHub personal access token (recommended)
`);
}

async function fetchGitHubUser(username) {
  try {
    const headers = {
      'User-Agent': 'DevRel-Foundation-Site'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    const response = await fetch(`${GITHUB_API}/users/${username}`, { headers });
    
    if (!response.ok) {
      if (response.status === 403) {
        console.warn(`Rate limited for user ${username}. Consider adding GITHUB_TOKEN.`);
      } else if (response.status === 404) {
        console.warn(`GitHub user ${username} not found.`);
      }
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch GitHub user ${username}:`, error.message);
    return null;
  }
}

async function findAllAuthorsInBlogPosts() {
  const authors = new Set();
  
  try {
    const blogFiles = await readdir(BLOG_DIR, { recursive: true });
    const mdFiles = blogFiles.filter(file => file.endsWith('.md'));
    
    for (const file of mdFiles) {
      try {
        const filePath = join(BLOG_DIR, file);
        const content = await readFile(filePath, 'utf-8');
        const { data } = matter(content);
        
        if (data.author) {
          // Split multiple authors and extract GitHub usernames
          const authorList = data.author.split(',').map(a => a.trim());
          for (const author of authorList) {
            if (author.startsWith('@')) {
              authors.add(author.slice(1)); // Remove @ prefix
            }
          }
        }
      } catch (error) {
        console.warn(`Error reading blog post ${file}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error scanning blog directory:', error.message);
  }
  
  return Array.from(authors);
}

async function getExistingAuthors() {
  try {
    const authorFiles = await readdir(AUTHORS_DIR);
    return authorFiles
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error reading authors directory:', error.message);
    return [];
  }
}

async function createAuthorFile(username, githubData = null) {
  const authorPath = join(AUTHORS_DIR, `${username}.md`);
  
  const frontmatter = {
    name: githubData?.name || githubData?.login || username,
    username: username,
    avatar: githubData?.avatar_url || '',
    bio: githubData?.bio || '',
    company: githubData?.company || '',
    url: `https://github.com/${username}`,
    updated: new Date().toISOString().split('T')[0]
  };
  
  const content = `---
name: "${frontmatter.name}"
username: "${frontmatter.username}"
avatar: "${frontmatter.avatar}"
bio: "${frontmatter.bio}"
url: "${frontmatter.url}"
company: "${frontmatter.company}"
updated: "${frontmatter.updated}"
---

# ${frontmatter.name}

${frontmatter.bio}

`;

  await writeFile(authorPath, content);
  console.log(`✅ Created author file for ${username}`);
}

async function updateAuthorFile(username, githubData, forceUpdate = false) {
  const authorPath = join(AUTHORS_DIR, `${username}.md`);
  
  try {
    const content = await readFile(authorPath, 'utf-8');
    const { data: frontmatter, content: markdownContent } = matter(content);

    // Prepare updated frontmatter (without changing updated yet)
    const updated = {
      ...frontmatter,
      avatar: githubData?.avatar_url || frontmatter.avatar
    };

    if (forceUpdate) {
      // Force update mode - overwrite with GitHub data
      console.log(`🔄 Force updating ${username} with fresh GitHub data...`);
      updated.name = githubData?.name || githubData?.login || frontmatter.name || username;
      updated.bio = githubData?.bio || '';
      updated.url = `https://github.com/${username}`;
      updated.company = githubData?.company || '';
    } else {
      // Normal mode - preserve local edits, only fill in missing data
      if (!frontmatter.name || frontmatter.name === username) {
        updated.name = githubData?.name || githubData?.login || username;
      }
      if (frontmatter.bio === 'Developer and contributor to the DevRel Foundation' && githubData?.bio) {
        updated.bio = githubData.bio;
      }
      if (!frontmatter.website && githubData?.blog) {
        updated.website = githubData.blog;
      }
      if (!frontmatter.company && githubData?.company) {
        updated.company = githubData.company;
      }
    }

    // Only update the 'updated' field if any other field has changed
    let changed = false;
    for (const key of Object.keys(updated)) {
      if (key !== 'updated' && updated[key] !== frontmatter[key]) {
        changed = true;
        break;
      }
    }
    if (changed) {
      updated.updated = new Date().toISOString().split('T')[0];
    } else {
      updated.updated = frontmatter.updated;
    }

    const newContent = matter.stringify(markdownContent, updated);
    await writeFile(authorPath, newContent);
    console.log(`🔄 Updated author file for ${username}${forceUpdate ? ' (forced)' : ''}`);
  } catch (error) {
    console.error(`Error updating author file for ${username}:`, error.message);
  }
}

async function generateAuthorsJson() {
  const authorsJsonPath = join(AUTHORS_DIR, 'authors.json');
  const authorsData = {};
  
  try {
    const authorFiles = await readdir(AUTHORS_DIR);
    const mdFiles = authorFiles.filter(file => file.endsWith('.md') && file !== 'README.md');
    
    for (const file of mdFiles) {
      try {
        const filePath = join(AUTHORS_DIR, file);
        const content = await readFile(filePath, 'utf-8');
        const { data } = matter(content);
        
        const username = file.replace('.md', '');
        const authorKey = `@${username}`;
        
        authorsData[authorKey] = {
          username: data.username || username,
          name: data.name || username,
          bio: data.bio || '',
          avatar: data.avatar || '',
          url: data.url || `https://github.com/${username}`,
          updated: data.updated || new Date().toISOString().split('T')[0]
        };
      } catch (error) {
        console.warn(`Error processing author file ${file}:`, error.message);
      }
    }
    
    // Check if the content has changed before writing
    let shouldUpdate = true;
    try {
      const existingContent = await readFile(authorsJsonPath, 'utf-8');
      const existingData = JSON.parse(existingContent);
      
      // Compare the data (excluding timestamps for comparison)
      const existingDataForComparison = {};
      const newDataForComparison = {};
      
      for (const key in existingData) {
        const { updated, ...rest } = existingData[key];
        existingDataForComparison[key] = rest;
      }
      
      for (const key in authorsData) {
        const { updated, ...rest } = authorsData[key];
        newDataForComparison[key] = rest;
      }
      
      // Only update if the data has actually changed
      shouldUpdate = JSON.stringify(existingDataForComparison) !== JSON.stringify(newDataForComparison);
      
      if (!shouldUpdate) {
        // If no changes, preserve existing data including timestamps
        for (const key in existingData) {
          if (authorsData[key]) {
            authorsData[key].updated = existingData[key].updated;
          }
        }
      } else {
        // If changes detected, update the global timestamp
        for (const key in authorsData) {
          authorsData[key].updated = new Date().toISOString();
        }
      }
    } catch (error) {
      // If file doesn't exist or can't be read, proceed with update
      shouldUpdate = true;
      for (const key in authorsData) {
        authorsData[key].updated = new Date().toISOString();
      }
    }
    
    await writeFile(authorsJsonPath, JSON.stringify(authorsData, null, 2));
    
    if (shouldUpdate) {
      console.log(`📝 Updated authors.json with ${Object.keys(authorsData).length} authors (changes detected)`);
    } else {
      console.log(`📝 Generated authors.json with ${Object.keys(authorsData).length} authors (no changes)`);
    }
    
  } catch (error) {
    console.error('Error generating authors.json:', error.message);
  }
}

async function main() {
  const options = parseArgs();
  
  if (options.showHelp) {
    showHelp();
    return;
  }
  
  console.log('🔍 Scanning blog posts for authors...');
  const blogAuthors = await findAllAuthorsInBlogPosts();
  
  console.log('📋 Found authors in blog posts:', blogAuthors);
  
  console.log('📁 Checking existing author files...');
  const existingAuthors = await getExistingAuthors();
  
  const missingAuthors = blogAuthors.filter(author => !existingAuthors.includes(author));
  
  if (missingAuthors.length > 0) {
    console.log(`🆕 Creating files for new authors: ${missingAuthors.join(', ')}`);
    
    for (const username of missingAuthors) {
      console.log(`🔄 Fetching GitHub data for ${username}...`);
      const githubData = await fetchGitHubUser(username);
      await createAuthorFile(username, githubData);
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  if (options.forceUpdate.length > 0) {
    console.log(`🔄 Force updating specified authors: ${options.forceUpdate.join(', ')}`);
    
    for (const username of options.forceUpdate) {
      if (existingAuthors.includes(username)) {
        console.log(`🔄 Fetching GitHub data for ${username}...`);
        const githubData = await fetchGitHubUser(username);
        if (githubData) {
          await updateAuthorFile(username, githubData, true); // Force update
        }
      } else {
        console.warn(`⚠️  Author ${username} not found in existing authors. Creating new file...`);
        const githubData = await fetchGitHubUser(username);
        await createAuthorFile(username, githubData);
      }
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } else {
    console.log('🔄 Updating existing author files with latest GitHub data (preserving local edits)...');
    for (const username of existingAuthors) {
      if (blogAuthors.includes(username)) {
        console.log(`🔄 Fetching GitHub data for ${username}...`);
        const githubData = await fetchGitHubUser(username);
        if (githubData) {
          await updateAuthorFile(username, githubData, false); // Normal update
        }
        
        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  console.log('✅ Author sync complete!');
  
  console.log('📝 Generating authors.json summary...');
  await generateAuthorsJson();
  
  if (!GITHUB_TOKEN) {
    console.log('\n💡 Tip: Set GITHUB_TOKEN environment variable to avoid rate limiting');
  }
}

main().catch(console.error);

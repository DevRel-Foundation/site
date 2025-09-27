import { dev } from '$app/environment';
import matter from 'gray-matter';

const blogPostsGlob = import.meta.glob('/src/blog/*.md', { eager: true });
const authorsGlob = import.meta.glob('/src/authors/*.md', { query: '?raw', import: 'default' });
  

export async function getBlogPosts() {
  const posts = [];
  
  for (const path in blogPostsGlob) {
    const post = blogPostsGlob[path];
    const slug = path.split('/').pop().replace('.md', '');
    
    if (post.metadata) {
      // Only include metadata, not the component content
      posts.push({
        ...post.metadata,
        slug
        // Remove: content: post.default
      });
    }
  }
  
  return posts;
}

export function getCategories() {
  return {
    categories: ['announce', 'early-ic', 'pro-lead', 'exec'],
    descriptions: {
      all: "Elevating the professional practice of Developer Relations",
      announce: "Announcements and updates from the DevRel Foundation",
      'early-ic': "Resources and insights for early-career Developer Relations professionals",
      'pro-lead': "Advanced strategies and leadership perspectives for experienced practitioners",
      exec: "Executive-level insights on the business value of Developer Relations strategy"
    }
  };
}

export async function getBlogPost(slug) {
  const path = `/src/blog/${slug}.md`;
  const post = blogPostsGlob[path];
  
  if (!post || !post.metadata) {
    return null;
  }
  
  // Return only metadata for server-side loading (no content)
  return {
    ...post.metadata,
    slug
    // Don't include content here to avoid serialization issues
  };
}

// Add a new function to get content client-side
export function getBlogPostContent(slug) {
  const path = `/src/blog/${slug}.md`;
  const post = blogPostsGlob[path];
  return post?.default || null;
}

export async function getBlogPostsByCategory(category) {
  const posts = await getBlogPosts();
  
  if (category === 'all') {
    return posts;
  }
  
  const filtered = posts.filter(post => {
    return post.category === category;
  });
  
  return filtered;
}

export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

// Author-related functions
export async function getAuthors() {
  const authors = [];
  
  for (const path in authorsGlob) {
    const authorContent = authorsGlob[path];
    const username = path.split('/').pop()?.replace('.md', '');
    
    if (username && username !== 'README') {
      const { data } = matter(authorContent);
      authors.push({
        ...data,
        username
      });
    }
  }
  
  return authors;
}

export async function getAuthor(username) {
  const path = `/src/authors/${username}.md`;
  const authorContent = authorsGlob[path];
  
  if (!authorContent) {
    return null;
  }
  
  const { data, content } = matter(authorContent);
  return {
    ...data,
    username,
    content
  };
}

export async function getBlogPostsByTag(tag) {
  const posts = await getBlogPosts();
  
  const filtered = posts.filter(post => {
    if (!post.tags) return false;
    
    // Check if the tag exists in the post's tags array
    return post.tags.includes(tag);
  });
  
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getBlogPostsByAuthor(username) {
  const posts = await getBlogPosts();
  
  const filtered = posts.filter(post => {
    if (!post.author) return false;
    
    // Split multiple authors and check if the username matches any of them
    const authors = post.author.split(',').map(a => a.trim());
    return authors.some(author => 
      author === `@${username}` || author === username
    );
  });
  
  return filtered;
}

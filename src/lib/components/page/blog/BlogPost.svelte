<script lang="ts">
  import { page } from '$app/stores';
  import ShareIcon from 'iconoir/icons/share-android.svg';
  import TwitterIcon from 'iconoir/icons/x.svg';
  import LinkedInIcon from 'iconoir/icons/linkedin.svg';
  import LinkIcon from 'iconoir/icons/link.svg';
  
  const { 
    title, 
    excerpt, 
    author, 
    date, 
    category = 'all',
    tags = [],
    readingTime = '',
    slug
  } = $props();
  
  let showShareMenu = $state(false);
  let githubUsers = $state([]);
  
  function toggleShareMenu() {
    showShareMenu = !showShareMenu;
  }
  
  function copyLink() {
    navigator.clipboard.writeText($page.url.href);
    showShareMenu = false;
  }
  
  function shareTwitter() {
    const url = encodeURIComponent($page.url.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }
  
  function shareLinkedIn() {
    const url = encodeURIComponent($page.url.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  // Parse authors and fetch GitHub data
  $effect(async () => {
    if (author) {
      const authors = author.split(',').map(a => a.trim());
      const userPromises = authors.map(async (authorName) => {
        if (authorName.startsWith('@')) {
          const username = authorName.slice(1);
          try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
              const userData = await response.json();
              return {
                type: 'github',
                username,
                name: userData.name || userData.login || username,
                avatar: userData.avatar_url,
                url: userData.html_url
              };
            }
          } catch (error) {
            console.error('Failed to fetch GitHub user:', error);
          }
          return { type: 'github', username, name: username, avatar: null, url: `https://github.com/${username}` };
        }
        return { type: 'text', name: authorName };
      });
      
      githubUsers = await Promise.all(userPromises);
    }
  });
</script>

<article class="blog-post">
  <header class="post-header">
    <div class="post-meta">
      <a href="/blog/category/{category}" class="category-tag">{category}</a>
      <time datetime={date}>{new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
      })}</time>
      {#if readingTime}
        <span class="reading-time">{readingTime}</span>
      {/if}
    </div>
    
    <h1>{title}</h1>
    
    {#if excerpt}
      <p class="excerpt">{excerpt}</p>
    {/if}
    
    <div class="post-actions">
      <div class="author-info">
        {#if githubUsers.length > 0}
          <div class="authors">
            <span class="by-text">By</span>
            {#each githubUsers as user, index}
              {#if user.type === 'github'}
                <a href={user.url} target="_blank" rel="noopener noreferrer" class="github-author">
                  {#if user.avatar}
                    <img src={user.avatar} alt={user.name} class="author-avatar" />
                  {/if}
                  {user.name}
                </a>
              {:else}
                <span class="text-author">{user.name}</span>
              {/if}
              {#if index < githubUsers.length - 1}
                <span class="author-separator">, </span>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
      
      <div class="share-container">
        <button class="share-button" onclick={toggleShareMenu} aria-label="Share post">
          <img src={ShareIcon} alt="Share" class="share-icon" />
        </button>
        
        {#if showShareMenu}
          <div class="share-menu">
            <button onclick={shareTwitter} class="share-option">
              <img src={TwitterIcon} alt="Twitter" class="social-icon" />
              Twitter
            </button>
            <button onclick={shareLinkedIn} class="share-option">
              <img src={LinkedInIcon} alt="LinkedIn" class="social-icon" />
              LinkedIn
            </button>
            <button onclick={copyLink} class="share-option">
              <img src={LinkIcon} alt="Copy link" class="social-icon" />
              Copy Link
            </button>
          </div>
        {/if}
      </div>
    </div>
  </header>
  
  <div class="post-content">
    <slot />
  </div>
  
  {#if tags.length > 0}
    <footer class="post-footer">
      <div class="tags">
        {#each tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </footer>
  {/if}
</article>

<style>
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-l);
  }
  
  .post-header {
    margin-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-background-secondary-2);
    padding-bottom: var(--space-l);
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-m);
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .category-tag {
    background-color: var(--color-mint);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--2);
  }
  
  .post-header h1 {
    margin: 0 0 var(--space-m) 0;
    font-size: var(--step-3);
    line-height: 1.2;
  }
  
  .excerpt {
    font-size: var(--step-0);
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-m);
  }
  
  .post-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .authors {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    flex-wrap: wrap;
  }
  
  .by-text {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .github-author {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    text-decoration: none;
    color: var(--color-link);
    font-size: var(--step--1);
    transition: opacity 0.2s ease;
  }
  
  .github-author:hover {
    opacity: 0.8;
  }
  
  .author-avatar {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 1px solid var(--color-background-secondary-2);
  }
  
  .text-author {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .author-separator {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .share-container {
    position: relative;
  }
  
  .share-button {
    background: none;
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    padding: var(--space-2xs);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .share-button:hover {
    background-color: var(--color-background-secondary-1);
  }
  
  .share-icon {
    width: 1rem;
    height: 1rem;
    filter: var(--icon-filter);
  }
  
  .share-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--color-background);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: var(--space-2xs);
    min-width: 120px;
    z-index: 10;
  }
  
  .share-option {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    width: 100%;
    padding: var(--space-2xs) var(--space-xs);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    border-radius: var(--radius-s);
    transition: background-color 0.2s ease;
  }
  
  .share-option:hover {
    background-color: var(--color-background-secondary-1);
  }
  
  .social-icon {
    width: 0.875rem;
    height: 0.875rem;
    filter: var(--icon-filter);
  }
  
  .post-content {
    line-height: 1.7;
    margin-bottom: var(--space-xl);
  }
  
  .post-content :global(h1),
  .post-content :global(h2),
  .post-content :global(h3) {
    margin-top: var(--space-xl);
    margin-bottom: var(--space-m);
    line-height: 1.3;
  }
  
  .post-content :global(h1) {
    font-size: var(--step-2);
  }
  
  .post-content :global(h2) {
    font-size: var(--step-1);
  }
  
  .post-content :global(h3) {
    font-size: var(--step-0);
    font-weight: 600;
  }
  
  .post-content :global(p) {
    margin-bottom: var(--space-m);
    font-size: var(--step-0);
  }
  
  .post-content :global(code) {
    background-color: var(--color-background-secondary-1);
    color: var(--color-link);
    padding: 0.125em 0.25em;
    border-radius: var(--radius-s);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875em;
  }
  
  .post-content :global(pre) {
    background-color: var(--color-background-secondary-1);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    padding: var(--space-m);
    overflow-x: auto;
    margin: var(--space-m) 0;
  }
  
  .post-content :global(pre code) {
    background: none;
    padding: 0;
    color: var(--color-text);
  }
  
  .post-content :global(blockquote) {
    border-left: 4px solid var(--color-mint);
    background-color: var(--color-background-secondary-1);
    padding: var(--space-m);
    margin: var(--space-m) 0;
    font-style: italic;
  }
  
  .post-content :global(blockquote p) {
    margin-bottom: 0;
  }
  
  .post-footer {
    border-top: 1px solid var(--color-background-secondary-2);
    padding-top: var(--space-m);
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs);
  }
  
  .tag {
    background-color: var(--color-background-secondary-1);
    color: var(--color-text-secondary);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    font-size: var(--step--2);
  }
  
  @media (max-width: 768px) {
    .blog-post {
      padding: var(--space-m);
    }
    
    .post-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2xs);
    }
    
    .post-actions {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-s);
    }
  }
</style>
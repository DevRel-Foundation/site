<script lang="ts">
  import { page } from '$app/stores';
  import ShareIcon from 'iconoir/icons/share-android.svg';
  import TwitterIcon from 'iconoir/icons/x.svg';
  import LinkedInIcon from 'iconoir/icons/linkedin.svg';
  import LinkIcon from 'iconoir/icons/link.svg';
  import FacebookIcon from 'iconoir/icons/facebook.svg';
  
  const { 
    title, 
    excerpt, 
    author, 
    date, 
    category = 'all',
    tags = [],
    readingTime = '',
    slug,
    image
  } = $props();
  
  let showShareMenu = $state(false);
  let githubUsers = $state([]);
  
  function toggleShareMenu() {
    showShareMenu = !showShareMenu;
  }
  
  function copyLink() {
    navigator.clipboard.writeText($page.url.href);
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
  
  function shareFacebook() {
    const url = encodeURIComponent($page.url.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }
  
  function shareBluesky() {
    const url = encodeURIComponent($page.url.href);
    const text = encodeURIComponent(title);
    window.open(`https://bsky.app/intent/compose?text=${text} ${url}`, '_blank');
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
                url: userData.html_url,
                bio: userData.bio
              };
            }
          } catch (error) {
            console.error('Failed to fetch GitHub user:', error);
          }
          return { type: 'github', username, name: username, avatar: null, url: `https://github.com/${username}`, bio: null };
        }
        return { type: 'text', name: authorName };
      });
      
      githubUsers = await Promise.all(userPromises);
    }
  });
</script>

<div class="blog-header-wrapper">
  <header class="blog-header">
    <div class="post-meta">
      <a href="/blog" class="blog-title">BLOG</a> | 
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
    
    <h1 class="main-title">{title}</h1>

    <div class="header-content">
      <div class="image-section">
        <div class="post-image">
          <img src={image || '/images/blog/devrel-foundation-blog.png'} alt={title} />
        </div>
        
        <div class="share-icons">
          <button onclick={shareLinkedIn} class="share-icon-button" aria-label="Share on LinkedIn">
            <img src={LinkedInIcon} alt="Share on LinkedIn" class="social-icon" />
          </button>
          <button onclick={shareFacebook} class="share-icon-button" aria-label="Share on Facebook">
            <img src={FacebookIcon} alt="Share on Facebook" class="social-icon" />
          </button>
          <button onclick={shareBluesky} class="share-icon-button" aria-label="Share on Bluesky">

              <svg class="social-icon" viewBox="0 0 512 452" fill="none" stroke="currentColor" stroke-width="40" aria-label="Bluesky">
                <path d="M111 30.4c58.7 44.2 121.8 133.9 145 182 23.2-48.1 86.3-137.7 145-182 42.4-31.9 111-56.6 111 22 0 15.7-9 131.8-14.2 150.6-18.3 65.5-84.9 82.2-144.1 72.1 103.5 17.7 129.9 76.2 73 134.8-108 111.2-155.3-27.9-167.4-63.6-3.5-10.3-3-10.5-6.6 0-12.1 35.6-59.3 174.8-167.4 63.6-56.9-58.6-30.6-117.1 73-134.8-59.2 10.1-125.8-6.6-144.1-72.1C9 184.2 0 68.1 0 52.4c0-78.5 68.6-53.9 111-22z"/>
              </svg>

          </button>
          <button onclick={shareTwitter} class="share-icon-button" aria-label="Share on X/Twitter">
            <img src={TwitterIcon} alt="Share on X" class="social-icon" />
          </button>
          <button onclick={copyLink} class="share-icon-button" aria-label="Copy link">
            <img src={LinkIcon} alt="Copy link" class="social-icon" />
          </button>
        </div>
      </div>
      
      <div class="title-section">
        
        {#if excerpt}
          <p class="excerpt">{excerpt}</p>
        {/if}
        
        <div class="post-actions">
          <div class="author-info">
            {#if githubUsers.length > 0}
              <div class="authors">
                <div class="author-line">

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
                
                {#each githubUsers as user}
                  {#if user.type === 'github' && user.bio}
                    <div class="author-bio">
                      {#each user.bio.split('\n') as bioLine}
                        <p class="author-bio">{bioLine}</p>
                      {/each}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </header>
</div>


<article class="blog-post">
  <div class="post-content">
    <slot />

    {#if tags.length > 0}
      <div class="meta-tags">
        {#each tags as tag}
          <a href="/blog/tag/{tag}"><span class="meta-tag">#{tag}</span></a>&nbsp; &nbsp; 
        {/each}
      </div>
    {/if}

  </div>
</article>

<style>
  .blog-header-wrapper {
    background-color: var(--color-background-secondary-1);
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    padding: var(--space-l) 0;
  }
  
  .blog-header {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-l);
  }
  
  .header-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: var(--space-m);
    align-items: start;
    margin-top: var(--space-s);
  }
  
  .post-image {
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: var(--radius-m);
  }
  
  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-l);
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-m);
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .blog-title {
    font-family: var(--font-family-heading);
    font-size: var(--step-0);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
  }
  
  .blog-title:hover {
    color: var(--color-mint-dark);
  }
  
  .category-tag {
    background-color: var(--color-mint-dark);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--2);
  }
  
  .main-title {
    margin: 0 0 var(--space-2xs) 0;
    font-size: var(--step-3);
    line-height: 1.2;
    word-break: break-word;
    hyphens: auto;
  }
  
  .excerpt {
    font-size: var(--step-0);
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-m);
    margin-top: 0;
  }
  
  .post-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .authors {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }
  
  .author-line {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    flex-wrap: wrap;
  }
  
  .author-bio {
    color: var(--color-text-secondary);
    opacity: 0.8;
    line-height: 1.4;
    max-width: 50ch;
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .author-bio p {
    margin: 0;
    margin-bottom: var(--space-3xs);
  }
  
  .author-bio p:last-child {
    margin-bottom: 0;
  }
  
  .image-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }
  
  .share-icons {
    display: flex;
    gap: var(--space-2xs);
    justify-content: center;
  }
  
  .share-icon-button {
    background: none;
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    padding: var(--space-2xs);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .share-icon-button:hover {
    background-color: var(--color-background-secondary-2);
    border-color: var(--color-mint-dark);
  }
  
  .social-icon {
    width: 1rem;
    height: 1rem;
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
  
  .meta-tags {
    display: flex;
    gap: var(--space-s);
    flex-wrap: wrap;
    margin-top: var(--space-l);
  }
  
  .meta-tags a {
    text-decoration: none;
  }
  
  .meta-tag {
    font-weight: 700;
    color: var(--color-text);
    font-size: var(--step--1);
    transition: color 0.2s ease;
  }
  
  .meta-tags a:hover .meta-tag {
    color: var(--color-mint-dark);
  }
  
  @media (max-width: 768px) {
    .blog-header {
      padding: 0 var(--space-m);
    }
    
    .header-content {
      grid-template-columns: 1fr;
      gap: var(--space-m);
    }
    
    .post-image {
      aspect-ratio: 16/9;
    }
    
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
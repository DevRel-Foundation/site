<script>
  let githubUsersCache = $state({});
  
  const { posts } = $props();
  
  // Function to fetch GitHub user data
  async function fetchGithubUsers(author) {
    if (!author || githubUsersCache[author]) return githubUsersCache[author] || [];
    
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
    
    const users = await Promise.all(userPromises);
    githubUsersCache[author] = users;
    return users;
  }
</script>

<div class="posts-list">
  {#each posts as post}
  <article class="post-item">
    <div class="post-image">
      <a href="/blog/{post.slug}">
        <img src={post.image || '/images/blog/devrel-foundation-blog.png'} alt={post.title} />
      </a>
    </div>
    
    <div class="post-content">
      <div class="post-main">
        <div class="post-meta">
          {#if post.category}
          <a href="/blog/category/{post.category}" class="category-tag">{post.category}</a>
          {/if}
          <time datetime={post.date}>
            {new Date(post.date + 'T12:00:00').toLocaleDateString('en-CA', { 
              timeZone: 'UTC'
            })}
          </time>|
          {#if post.author}
            {#await fetchGithubUsers(post.author)}
              <span class="author">{post.author}</span>
            {:then githubUsers}
              {#if githubUsers.length > 0}
                <div class="authors">
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
            {:catch}
              <span class="author">{post.author}</span>
            {/await}
          {/if}
        </div>
        
        <h2><a href="/blog/{post.slug}">{post.title}</a></h2>
        
        {#if post.excerpt}
          <p class="excerpt">{post.excerpt}</p>
        {/if}
      </div>
      
      <div class="post-footer">
        {#if post.readingTime}
          <span class="reading-time">{post.readingTime}</span>
        {/if}
      </div>
    </div>
  </article>
  {/each}
</div>

<style>
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-2xs);
  }
  
  .post-item {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-m);
    padding-bottom: var(--space-2xs);
    border-bottom: 1px solid var(--color-background-secondary-2);
    align-items: start;
  }
  
  .post-item:last-child {
    border-bottom: none;
  }
  
  .post-image {
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: var(--radius-s);
    align-self: start;
  }
  
  .post-image img {
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }
  
  .post-image:hover img {
    transform: scale(1.05);
  }
  
  .post-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }
  
  .post-main {
    display: flex;
    flex-direction: column;
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-s);
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .post-meta time {
    color: var(--color-text-secondary);
    opacity: 0.7;
  }
  
  .category-tag {
    background-color: var(--color-mint-dark);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--2);
    text-transform: uppercase;
  }
  
  .post-content h2 {
    margin: 0 0 var(--space-2xs) 0;
    font-size: var(--step-1);
    line-height: 1.3;
  }
  
  .post-content h2 a {
    color: var(--color-text);
    text-decoration: none;
  }
  
  .post-content h2 a:hover {
    color: var(--color-link);
  }
  
  .excerpt {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-2xs);
    flex-grow: 1;
  }
  
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .authors {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    flex-wrap: wrap;
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
    width: 1rem;
    height: 1rem;
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
  
  @media (max-width: 768px) {
    .post-item {
      grid-template-columns: 200px 1fr;
      gap: var(--space-s);
    }
    
    .post-image {
      height: 112px;
    }
  }
  
  @media (max-width: 480px) {
    .posts-list {
      gap: var(--space-s);
    }
    
    .post-item {
      grid-template-columns: 1fr;
      gap: var(--space-2xs);
    }
    
    .post-image {
      height: auto;
      aspect-ratio: 16/9;
    }
  }
</style>

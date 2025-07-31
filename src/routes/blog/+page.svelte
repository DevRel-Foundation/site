<script>
  import { page } from '$app/stores';
  
  const { data } = $props();
  const { posts, categories } = data;
</script>

<svelte:head>
  <title>Developer Relations Blog | DevRel Foundation</title>
  <meta name="description" content="Insights, tutorials, and thoughts on Developer Relations from the DevRel Foundation community." />
</svelte:head>

<div class="container container-content">
  <header class="blog-header">
    <h1>Developer Blog</h1>
    <p>Insights, tutorials, and thoughts on Developer Relations from our community.</p>
    
    <nav class="category-nav">
      <a href="/blog" class="category-link {!$page.url.pathname.includes('/category/') ? 'active' : ''}">
        all 
      </a>
      {#each categories as category}
        <a href="/blog/category/{category}" class="category-link">
          {category}
        </a>
      {/each}
    </nav>
  </header>
  
  <div class="posts-grid">
    {#each posts as post}
      <article class="post-card">
        <div class="post-meta">
          {#if post.category}
          <a href="/blog/category/{post.category}" class="category-tag">{post.category}</a>
          {/if}
          <time datetime={post.date}>
            {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              timeZone: 'UTC'
            })}
          </time>
        </div>
        
        <h2><a href="/blog/{post.slug}">{post.title}</a></h2>
        
        {#if post.excerpt}
          <p class="excerpt">{post.excerpt}</p>
        {/if}
        
        <div class="post-footer">
          {#if post.author}
            <span class="author">By {post.author}</span>
          {/if}
          {#if post.readingTime}
            <span class="reading-time">{post.readingTime}</span>
          {/if}
        </div>
        
        <a href="/blog/{post.slug}" class="read-more">Read More →</a>
      </article>
    {/each}
  </div>
</div>

<style>
  .blog-header {
    text-align: center;
    margin-bottom: var(--space-2xl);
  }
  
  .blog-header h1 {
    margin-bottom: var(--space-s);
  }
  
  .blog-header p {
    color: var(--color-text-secondary);
    font-size: var(--step-0);
    margin-bottom: var(--space-l);
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
  }
  
  .category-nav {
    display: flex;
    justify-content: center;
    gap: var(--space-s);
    flex-wrap: wrap;
  }
  
  .category-link {
    padding: var(--space-2xs) var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    text-decoration: none;
    color: var(--color-text);
    transition: all 0.2s ease;
    text-transform: uppercase;
  }
  
  .category-link:hover,
  .category-link.active {
    background-color: var(--color-mint);
    color: var(--color-background);
    border-color: var(--color-mint);
  }
  
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-l);
  }
  
  .post-card {
    background-color: var(--color-background-secondary-1);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    padding: var(--space-m);
    transition: all 0.2s ease;
  }
  
  .post-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-s);
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
    text-transform: uppercase;
  }
  
  .post-card h2 {
    margin: 0 0 var(--space-s) 0;
    font-size: var(--step-1);
    line-height: 1.3;
  }
  
  .post-card h2 a {
    color: var(--color-text);
    text-decoration: none;
  }
  
  .post-card h2 a:hover {
    color: var(--color-link);
  }
  
  .excerpt {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-m);
  }
  
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-s);
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .read-more {
    color: var(--color-link);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--1);
  }
  
  .read-more:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .posts-grid {
      grid-template-columns: 1fr;
    }
    
    .category-nav {
      justify-content: flex-start;
      overflow-x: auto;
      padding-bottom: var(--space-2xs);
    }
  }
</style>

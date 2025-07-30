<script>
  const { data } = $props();
  const { posts, category } = data;
</script>

<svelte:head>
  <title>{category} | DevRel Foundation Blog</title>
  <meta name="description" content="Blog posts about {category} from the DevRel Foundation." />
</svelte:head>

<div class="container container-content">
  <header class="category-header">
    <h1>{category}</h1>
    <p><a href="/community/blog">← Back to all posts</a></p>
  </header>
  
  {#if posts.length > 0}
    <div class="posts-grid">
      {#each posts as post}
        <article class="post-card">
          <div class="post-meta">
            <time datetime={post.date}>
              {new Date(post.date + 'T00:00:00Z').toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                timeZone: 'UTC'
              })}
            </time>
          </div>
          
          <h2><a href="/community/blog/{post.slug}">{post.title}</a></h2>
          
          {#if post.excerpt}
            <p class="excerpt">{post.excerpt}</p>
          {/if}
          
          <div class="post-footer">
            {#if post.author}
              <span class="author">By {post.author}</span>
            {/if}
          </div>
          
          <a href="/community/blog/{post.slug}" class="read-more">Read More →</a>
        </article>
      {/each}
    </div>
  {:else}
    <div class="empty-state">
      <h2>No posts in this category yet</h2>
      <p>There are currently no blog posts in the "{category}" category.</p>
      <a href="/community/blog" class="back-link">View all posts</a>
    </div>
  {/if}
</div>

<style>
  .category-header {
    margin-bottom: var(--space-xl);
  }
  
  .category-header h1 {
    margin-bottom: var(--space-s);
  }
  
  .category-header a {
    color: var(--color-link);
    text-decoration: none;
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
    margin-bottom: var(--space-s);
    font-size: var(--step--1);
    color: var(--color-text-secondary);
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
  
  .empty-state {
    text-align: center;
    padding: var(--space-2xl);
    color: var(--color-text-secondary);
  }
  
  .empty-state h2 {
    margin-bottom: var(--space-m);
    color: var(--color-text);
  }
  
  .empty-state p {
    margin-bottom: var(--space-l);
    font-size: var(--step-0);
  }
  
  .back-link {
    color: var(--color-link);
    text-decoration: none;
    font-weight: 600;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .posts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

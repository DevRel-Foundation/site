<script>
  const { post, href } = $props();
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<a {href} class="blog-card">
  {#if post.image}
    <div class="blog-card-image">
      <img src={post.image} alt={post.title} loading="lazy" />
    </div>
  {/if}
  <div class="blog-card-content">
    <time class="blog-card-date" datetime={post.date}>
      {formatDate(post.date)}
    </time>
    <h3 class="blog-card-title">{post.title}</h3>
    <p class="blog-card-excerpt">{post.excerpt}</p>
  </div>
</a>

<style>
  .blog-card {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;
  }

  .blog-card:hover {
    transform: translateY(-2px);
  }

  .blog-card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border: 1px solid var(--color-mint);
    border-radius: 8px;
    margin-bottom: var(--space-s);
    box-shadow: 0 0 0 0 var(--color-mint), 2px 2px 2px 0 var(--color-mint);
    transition: box-shadow 0.2s;
  }

  .blog-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .blog-card-content {
    padding: 0;
  }

  .blog-card-date {
    display: block;
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xs);
  }

  .blog-card-title {
    font-size: var(--step-0);
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 var(--space-xs) 0;
    line-height: 1.3;
  }

  .blog-card-excerpt {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.4;
  }
</style>

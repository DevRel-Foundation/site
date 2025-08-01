<script>
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  
  const { data } = $props();
  const { posts, category, categoryDescriptions } = data;
</script>

<svelte:head>
  <title>{category.toUpperCase()} | Blog | DevRel Foundation</title>
  <meta name="description" content="Blog posts about {category} from the DevRel Foundation." />
</svelte:head>

<div class="container container-content">
  <header class="category-header">
    <h1>{category}</h1>
    <p>{categoryDescriptions[category] || categoryDescriptions.all}</p>
    <p><a href="/blog">← Back to all posts</a></p>
  </header>
  
  {#if posts.length > 0}
    <BlogListings {posts} />
  {:else}
    <div class="empty-state">
      <h2>No posts in this category yet</h2>
      <p>There are currently no blog posts in the "{category}" category.</p>
      <a href="/blog" class="back-link">View all posts</a>
    </div>
  {/if}
</div>

<style>
  .category-header {
    text-align: center;
    margin-bottom: var(--space-l);
  }
  
  .category-header h1 {
    margin-bottom: var(--space-2xs);
    text-transform: uppercase;
  }
  
  .category-header p {
    color: var(--color-text-secondary);
    font-size: var(--step-0);
    margin-bottom: var(--space-s);
  }
  
  .category-header a {
    color: var(--color-link);
    text-decoration: none;
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
</style>

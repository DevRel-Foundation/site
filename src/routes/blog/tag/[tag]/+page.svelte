<script>
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  
  const { data } = $props();
  const { posts, tag, categoryDescriptions } = data;
</script>

<svelte:head>
  <title>#{tag} | Blog | DevRel Foundation</title>
  <meta name="description" content="Blog posts tagged with {tag} from the DevRel Foundation." />
</svelte:head>

<div class="container container-content">
  <header class="tag-header">
    <h1>#{tag}</h1>
    <p>All blog posts tagged with #{tag}</p>
    <p><a href="/blog">← Back to all posts</a></p>
  </header>
  
  {#if posts.length > 0}
    <BlogListings {posts} />
  {:else}
    <div class="empty-state">
      <h2>No posts with this tag yet</h2>
      <p>There are currently no blog posts tagged with "#{tag}".</p>
      <a href="/blog" class="back-link">View all posts</a>
    </div>
  {/if}
</div>

<style>
  .tag-header {
    text-align: center;
    margin-bottom: var(--space-l);
  }
  
  .tag-header h1 {
    margin-bottom: var(--space-2xs);
    font-weight: 700;
  }
  
  .tag-header p {
    color: var(--color-text-secondary);
    font-size: var(--step-0);
    margin-bottom: var(--space-s);
  }
  
  .tag-header a {
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

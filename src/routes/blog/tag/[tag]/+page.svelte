<script>
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  import ContributorCallout from '$lib/components/page/blog/ContributorCallout.svelte';
  
  const { data } = $props();
  const { posts, tag, categoryDescriptions } = data;
</script>

<svelte:head>
  <title>#{tag} | Blog | DevRel Foundation</title>
  <meta name="description" content="Blog posts tagged with {tag} from the DevRel Foundation." />
  
  <!-- RSS Feed -->
  <link rel="alternate" type="application/rss+xml" title="DevRel Foundation Blog - Posts tagged '{tag}'" href="/blog/tag/{tag}/feed.xml" />
</svelte:head>

<div class="container container-content">
  <header class="tag-header">
    <h1>#{tag}</h1>
    <p>All blog posts tagged with #{tag}</p>
    
    <div class="tag-actions">
      <a href="/blog">← Back to all posts</a>
      <a href="/blog/tag/{tag}/feed.xml" class="rss-link" title="Subscribe to #{tag} RSS feed" aria-label="Subscribe to #{tag} RSS feed">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
        </svg>
      </a>
    </div>
  </header>
  
  {#if posts.length > 0}
    <BlogListings {posts} />
    
    <ContributorCallout />
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
  
  .tag-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-s);
  }
  
  .rss-link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--color-mint-dark);
    transition: all 0.2s ease;
    padding: var(--space-2xs);
  }
  
  .rss-link:hover {
    color: var(--color-mint-dark);
    opacity: 0.7;
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

<script lang="ts">
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  import ContributorCallout from '$lib/components/page/blog/ContributorCallout.svelte';
  import TopicNav from '$lib/components/page/blog/TopicNav.svelte';

  const { data } = $props();
  const posts = $derived(data.posts);
  const topic = $derived(data.topic);
</script>

<svelte:head>
  <title>{topic.label} | Blog | DevRel Foundation</title>
  <meta name="description" content={topic.description} />

  <link rel="alternate" type="application/rss+xml" title="DevRel Foundation Blog - {topic.label}" href="/blog/tag/{topic.slug}/feed.xml" />
</svelte:head>

<div class="container">
  <header class="tag-header">
    <h1>{topic.label}</h1>
    <p>{topic.description}</p>

    <TopicNav
      active={topic.slug}
      feedHref="/blog/tag/{topic.slug}/feed.xml"
      feedLabel="Subscribe to the {topic.label} RSS feed"
    />
  </header>

  {#if posts.length > 0}
    <BlogListings {posts} />

    <ContributorCallout />
  {:else}
    <div class="empty-state">
      <h2>No posts here yet</h2>
      <p>Nothing has been published under {topic.label} so far. Subscribe to the RSS feed to get the first one.</p>
      <a href="/blog" class="back-link">View all posts</a>
    </div>
  {/if}
</div>

<style>
  .tag-header {
    margin-bottom: var(--space-l);
  }
  
  .tag-header h1 {
    margin-bottom: var(--space-2xs);
    font-weight: 700;
  }
  
  .tag-header p {
    color: var(--color-text-secondary);
    font-size: var(--step-0);
    margin-bottom: var(--space-m);
    max-width: 60ch;
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

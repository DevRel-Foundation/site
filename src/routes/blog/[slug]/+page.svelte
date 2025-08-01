<script>
  import BlogPost from '$lib/components/page/blog/BlogPost.svelte';
  import { onMount } from 'svelte';
  
  const { data } = $props();
  const { post } = data;
  
  let ContentComponent = $state(null);
  let loading = $state(true);
  let error = $state(false);
  
  onMount(async () => {
    try {
      // Dynamically import the markdown content
      const module = await import(`../../../blog/${post.slug}.md`);
      ContentComponent = module.default;
    } catch (err) {
      console.error('Failed to load blog content:', err);
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{post.title} | DevRel Foundation Blog</title>
  <meta name="description" content={post.excerpt || post.title} />
  <meta name="author" content={post.author || 'DevRel Foundation'} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt || post.title} />
  <meta property="article:published_time" content={post.date} />
  <meta property="article:author" content={post.author || 'DevRel Foundation'} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.excerpt || post.title} />
</svelte:head>

{#if loading}
  <div class="loading">Loading...</div>
{:else if error}
  <div class="error">Failed to load blog content</div>
{:else if ContentComponent}
  <BlogPost {...post}>
    {#if ContentComponent}
      <ContentComponent />
    {/if}
  </BlogPost>
{:else}
  <div class="error">Content not found</div>
{/if}

<style>
  .loading, .error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: var(--step-0);
    color: var(--color-text-secondary);
  }
  
  .error {
    color: var(--color-error, #dc2626);
  }
</style>

<script>
  import BlogPost from '$lib/BlogPost.svelte';
  import { onMount } from 'svelte';
  
  const { data } = $props();
  const { post } = data;
  
  let ContentComponent = $state(null);
  let loading = $state(true);
  let error = $state(false);
  
  onMount(async () => {
    try {
      // Dynamically import the markdown content
      const module = await import(`../../../../blog/${post.slug}.md`);
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

<div class="blog-navigation">
  <a href="/community/blog/category/{post.category || 'all'}" class="back-to-category">
    ← {post.category || 'all'}
  </a>
</div>

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
  .blog-navigation {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-m) var(--space-l) 0;
  }
  
  .back-to-category {
    display: inline-block;
    background-color: var(--color-background-secondary-1);
    color: var(--color-text-secondary);
    padding: var(--space-2xs) var(--space-s);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-size: var(--step--1);
    transition: all 0.2s ease;
    border: 1px solid var(--color-background-secondary-2);
  }
  
  .back-to-category:hover {
    background-color: var(--color-mint);
    color: var(--color-background);
    border-color: var(--color-mint);
  }
  
  .loading, .error {
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-text-secondary);
    max-width: 800px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    .blog-navigation {
      padding: var(--space-m) var(--space-m) 0;
    }
  }
</style>

<script>
  import { page } from '$app/stores';
  import BlogPost from '$lib/components/page/blog/BlogPost.svelte';
  import { onMount } from 'svelte';
  
  const { data } = $props();
  const { post, PostContent } = data;
  
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
  <title>{post?.title || 'Blog Post'} | DevRel Foundation</title>
  <meta name="description" content={post?.excerpt || 'DevRel Foundation blog post'} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={post?.title || 'Blog Post'} />
  <meta property="og:description" content={post?.excerpt || 'DevRel Foundation blog post'} />
  <meta property="og:image" content={post?.image ? `${$page.url.origin}${post.image}` : `${$page.url.origin}/images/blog/devrel-foundation-blog.png`} />
  <meta property="og:site_name" content="DevRel Foundation" />
  <meta property="article:author" content={post?.author || 'DevRel Foundation'} />
  <meta property="article:published_time" content={post?.date ? `${post.date}T00:00:00Z` : ''} />
  <meta property="article:section" content={post?.category || 'DevRel'} />
  {#if post?.tags}
    {#each post.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={$page.url.href} />
  <meta name="twitter:title" content={post?.title || 'Blog Post'} />
  <meta name="twitter:description" content={post?.excerpt || 'DevRel Foundation blog post'} />
  <meta name="twitter:image" content={post?.image ? `${$page.url.origin}${post.image}` : `${$page.url.origin}/images/blog/devrel-foundation-blog.png`} />
  <meta name="twitter:site" content="@devrel_foundation" />
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

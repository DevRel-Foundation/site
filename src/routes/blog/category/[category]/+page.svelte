<script>
  import { page } from '$app/state';
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  
  const { data } = $props();
  const { posts, category, categoryDescriptions, categories } = data;
  
  let hoveredCategory = $state(null);
  
  function handleCategoryHover(cat) {
    hoveredCategory = cat;
  }
  
  function handleCategoryLeave() {
    hoveredCategory = null;
  }
  
  // Get current description based on hovered category or current category
  const currentDescription = $derived(
    hoveredCategory 
      ? (categoryDescriptions[hoveredCategory] || categoryDescriptions.all)
      : (categoryDescriptions[category] || categoryDescriptions.all)
  );
</script>

<svelte:head>
  <title>{category.toUpperCase()} | Blog | DevRel Foundation</title>
  <meta name="description" content="{categoryDescriptions[category] || categoryDescriptions.all}" />
  
  <!-- SEO Optimizations -->
  <meta name="keywords" content="DevRel, Developer Relations, {category}, {posts.map(p => p.tags).flat().join(', ')}" />
  <meta name="author" content="DevRel Foundation" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={page.url.href} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content="{category.toUpperCase()} Posts | DevRel Foundation Blog" />
  <meta property="og:description" content="{categoryDescriptions[category] || categoryDescriptions.all}" />
  <meta property="og:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DevRel Foundation" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content="{category.toUpperCase()} Posts | DevRel Foundation Blog" />
  <meta name="twitter:description" content="{categoryDescriptions[category] || categoryDescriptions.all}" />
  <meta name="twitter:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${category.toUpperCase()} Posts | DevRel Foundation`,
      "description": categoryDescriptions[category] || categoryDescriptions.all,
      "url": page.url.href,
      "isPartOf": {
        "@type": "Blog",
        "name": "DevRel Foundation Blog"
      }
    })}
  </script>
</svelte:head>

{#key category}
  <div class="container container-content">
    <header class="category-header">
      <h1>{category}</h1>
      <p>{currentDescription}</p>
      
      <nav class="category-nav">
        <a href="/blog" 
           class="category-link"
           data-sveltekit-reload
           onmouseenter={() => handleCategoryHover('all')}
           onmouseleave={handleCategoryLeave}>
          all 
        </a>
        {#each categories as cat}
          <a href="/blog/category/{cat}" 
             class="category-link {cat === category ? 'active' : ''}"
             data-sveltekit-reload
             onmouseenter={() => handleCategoryHover(cat)}
             onmouseleave={handleCategoryLeave}>
            {cat}
          </a>
        {/each}
      </nav>
    </header>
    
    {#if posts.length > 0}
      <BlogListings {posts} />
    {:else}
      <div class="empty-state">
        <h2>Tell your story</h2>
        <p>There are currently no blog posts in the "{category}" category.</p>
        <a href="/blog" class="back-link">View all posts</a>
      </div>
    {/if}
  </div>
{/key}

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
  
  .category-nav {
    display: flex;
    justify-content: center;
    gap: var(--space-s);
    flex-wrap: wrap;
  }
  
  .category-link {
    padding: var(--space-2xs) var(--space-s);
    border: 1px solid var(--color-mint-dark);
    border-radius: var(--radius-s);
    text-decoration: none;
    color: var(--color-mint-dark);
    transition: all 0.2s ease;
    text-transform: uppercase;
  }
  
  .category-link:hover,
  .category-link.active {
    background-color: var(--color-mint-dark);
    color: var(--color-background);
    border-color: var(--color-mint-dark);
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

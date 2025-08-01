<script>
  import { page } from '$app/stores';
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  
  const { data } = $props();
  const { posts, categories, categoryDescriptions } = data;
  
  let hoveredCategory = $state(null);
  
  function handleCategoryHover(category) {
    hoveredCategory = category;
  }
  
  function handleCategoryLeave() {
    hoveredCategory = null;
  }
  
  // Get current description based on hovered category or default to 'all'
  const currentDescription = $derived(
    hoveredCategory 
      ? (categoryDescriptions[hoveredCategory] || categoryDescriptions.all)
      : categoryDescriptions.all
  );
</script>

<svelte:head>
  <title>Blog | DevRel Foundation</title>
  <meta name="description" content="Insights, tutorials, and thoughts on Developer Relations from the DevRel Foundation community." />
</svelte:head>

<div class="container container-content">
  <header class="blog-header">
    <h1>DevRel Foundation News</h1>
    <p>{currentDescription}</p>
    
    <nav class="category-nav">
      <a href="/blog" 
         class="category-link {!$page.url.pathname.includes('/category/') ? 'active' : ''}"
         onmouseenter={() => handleCategoryHover('all')}
         onmouseleave={handleCategoryLeave}>
        all 
      </a>
      {#each categories as category}
        <a href="/blog/category/{category}" 
           class="category-link"
           onmouseenter={() => handleCategoryHover(category)}
           onmouseleave={handleCategoryLeave}>
          {category}
        </a>
      {/each}
    </nav>
  </header>
  
  <BlogListings {posts} />
</div>

<style>
  .blog-header {
    text-align: center;
    margin-bottom: var(--space-l);
  }
  
  .blog-header h1 {
    margin-bottom: var(--space-2xs);
  }
  
  .blog-header p {
    color: var(--color-text-secondary);
    font-size: var(--step-0);
    margin-bottom: var(--space-m);
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
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
</style>

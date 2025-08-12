<script>
  import { page } from '$app/state';
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  import ContributorCallout from '$lib/components/page/blog/ContributorCallout.svelte';
  
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
  <meta name="description" content="Elevating the professional practice of Developer Relations through insights, resources, and community collaboration." />
  
  <!-- RSS Feed -->
  <link rel="alternate" type="application/rss+xml" title="DevRel Foundation Blog" href="/blog/feed.xml" />
  
  <!-- SEO Optimizations -->
  <meta name="keywords" content="DevRel, Developer Relations, Developer Advocacy, Community, Technical Writing, Developer Marketing" />
  <meta name="author" content="DevRel Foundation" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={page.url.href} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content="DevRel Foundation Blog" />
  <meta property="og:description" content="Elevating the professional practice of Developer Relations through insights, resources, and community collaboration." />
  <meta property="og:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DevRel Foundation" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content="DevRel Foundation Blog" />
  <meta name="twitter:description" content="Elevating the professional practice of Developer Relations through insights, resources, and community collaboration." />
  <meta name="twitter:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta name="twitter:site" content="@devrel_foundation" />
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "DevRel Foundation Blog",
      "description": "Elevating the professional practice of Developer Relations through insights, resources, and community collaboration.",
      "url": page.url.href,
      "publisher": {
        "@type": "Organization",
        "name": "DevRel Foundation",
        "logo": {
          "@type": "ImageObject",
          "url": `${page.url.origin}/images/devrel-foundation-logo.png`
        },
        "sameAs": [
          "https://github.com/devrel-foundation",
          "https://discord.gg/G7CSTKZcuT"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "general inquiry",
          "email": "info@dev-rel.org"
        }
      }
    })}
  </script>
</svelte:head>

<div class="container container-content">
  <header class="blog-header">
    <h1>DevRel Foundation News</h1>
    <p>{currentDescription}</p>
    
    <nav class="category-nav">
      <a href="/blog" 
         class="category-link {!page.url.pathname.includes('/category/') ? 'active' : ''}"
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
      <a href="/blog/feed.xml" class="rss-link" title="Subscribe to RSS feed" aria-label="Subscribe to RSS feed" data-sveltekit-reload>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
        </svg>
      </a>
    </nav>
  </header>
  
  <BlogListings {posts} />
  
  <ContributorCallout />
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
    align-items: center;
  }
  
  .category-link {
    padding: var(--space-2xs) var(--space-s);
    border: 1px solid var(--color-background-secondary-2-dark);
    border-radius: var(--radius-s);
    text-decoration: none;
    color: var(--color-background-secondary-2-dark);
    transition: all 0.2s ease;
    text-transform: uppercase;
  }
  
  .category-link:hover,
  .category-link.active {
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-background);
    border-color: var(--color-background-secondary-2-dark);
  }
  
  .rss-link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--color-background-secondary-2-dark);
    transition: all 0.2s ease;
    padding: var(--space-2xs);
  }
  
  .rss-link:hover {
    color: var(--color-background-secondary-2-dark);
    opacity: 0.7;
  }
</style>

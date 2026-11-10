<script lang="ts">
  import { page } from '$app/state';
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  import ContributorCallout from '$lib/components/page/blog/ContributorCallout.svelte';
  import TopicNav from '$lib/components/page/blog/TopicNav.svelte';
  import { ALL_TOPICS_DESCRIPTION } from '$lib/blog-topics';

  const { data } = $props();
  const { posts, topics } = data;

  let preview = $state<string | null>(null);
  const currentDescription = $derived(preview ?? ALL_TOPICS_DESCRIPTION);
</script>

<svelte:head>
  <title>Blog | DevRel Foundation</title>
  <meta name="description" content="Elevating the professional practice of Developer Relations through insights, resources, and community collaboration." />
  
  <link rel="alternate" type="application/rss+xml" title="DevRel Foundation Blog" href="/blog/feed.xml" />
  
  <meta name="keywords" content="DevRel, Developer Relations, Developer Advocacy, Community, Technical Writing, Developer Marketing" />
  <meta name="author" content="DevRel Foundation" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={page.url.href} />
  
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content="DevRel Foundation Blog" />
  <meta property="og:description" content="Elevating the professional practice of Developer Relations through insights, resources, and community collaboration." />
  <meta property="og:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DevRel Foundation" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content="DevRel Foundation Blog" />
  <meta name="twitter:description" content="Elevating the professional practice of Developer Relations through insights, resources, and community collaboration." />
  <meta name="twitter:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta name="twitter:site" content="@devrel_foundation" />
  
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

<div class="container">
  <header class="blog-header">
    <h1>DevRel Foundation news</h1>
    <p>{currentDescription}</p>
    
    <TopicNav
      {topics}
      feedHref="/blog/feed.xml"
      feedLabel="Subscribe to RSS feed"
      onPreview={(description) => (preview = description)}
    />
  </header>
  
  <BlogListings {posts} />
  
  <ContributorCallout />
</div>

<style>
  .blog-header {
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
  }

</style>

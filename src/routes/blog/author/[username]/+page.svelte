<script>
  import { page } from '$app/stores';
  import BlogListings from '$lib/components/page/blog/BlogListings.svelte';
  
  const { data } = $props();
  const { posts, author, username } = data;
</script>

<svelte:head>
  <title>{author.name || author.username} | Authors | DevRel Foundation</title>
  <meta name="description" content="{author.bio || `Posts by ${author.name || author.username}`}" />
  
  <!-- RSS Feed -->
  <link rel="alternate" type="application/rss+xml" title="DevRel Foundation Blog - {author.name || author.username}" href="/blog/author/{username}/feed.xml" />
  
  <!-- SEO Optimizations -->
  <meta name="keywords" content="DevRel, Developer Relations, {author.name}, {posts.map(p => p.tags).flat().join(', ')}" />
  <meta name="author" content="DevRel Foundation" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={$page.url.href} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content="{author.name || author.username} | DevRel Foundation Blog" />
  <meta property="og:description" content="{author.bio || `Posts by ${author.name || author.username}`}" />
  <meta property="og:image" content="{author.avatar || $page.url.origin + '/images/devrel-foundation-logo.png'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DevRel Foundation" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{author.name || author.username} | DevRel Foundation Blog" />
  <meta name="twitter:description" content="{author.bio || `Posts by ${author.name || author.username}`}" />
  <meta name="twitter:image" content="{author.avatar || $page.url.origin + '/images/devrel-foundation-logo.png'}" />
</svelte:head>

<div class="author-page">
  <div class="author-header">
    <div class="author-info">
      {#if author.avatar}
        <img src={author.avatar} alt={author.name || author.username} class="author-avatar" />
      {/if}
      
      <div class="author-details">
        <h1 class="author-name">{author.name || author.username}</h1>
        
        {#if author.bio}
          <div class="author-bio">
            {#each author.bio.split('\n') as bioLine}
              <p><b>{bioLine}</b></p>
            {/each}
          </div>
          <p>{author.content}</p>
        {/if}
        
        <div class="author-links">
          {#if author.url}
            <a href={author.url} target="_blank" rel="noopener noreferrer" class="github-link">
              <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub Profile
            </a>
          {/if}
          {#if author.linkedin}
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer" class="linkedin-link">
              <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.371-1.852 3.605 0 4.274 2.373 4.274 5.456v6.287zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.07 0-1.144.926-2.07 2.07-2.07 1.143 0 2.07.926 2.07 2.07 0 1.142-.927 2.07-2.07 2.07zM6.997 20.452H3.676V9h3.321v11.452z"/>
              </svg>
              <span class="linkedin-text">LinkedIn Profile</span>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="content-section">
    <div class="posts-header">
    </div>

    {#if posts.length > 0}
      <BlogListings {posts} />
    {:else}
      <div class="no-posts">
        <p>No posts found for this author.</p>
      </div>
    {/if}
  </div>

</div>

<style>
  .author-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-l);
  }

  .author-header {
    background-color: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    text-align: center;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-m);
  }

  .author-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid var(--color-mint);
    object-fit: cover;
  }

  .author-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-s);
  }

  .author-name {
    margin: 0;
    font-size: var(--step-2);
    font-weight: 700;
    color: var(--color-text);
  }

  .author-bio {
    text-align: center;
    color: var(--color-text-secondary);
    line-height: 1.6;
    max-width: 60ch;
  }

  .author-bio p {
    margin: 0 0 var(--space-2xs) 0;
  }

  .author-bio p:last-child {
    margin-bottom: 0;
  }

  .author-links {
    display: flex;
    align-items: center;
    gap: var(--space-m);
    flex-wrap: wrap;
    justify-content: center;
  }

  .github-link {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    color: var(--color-link);
    text-decoration: none;
    font-weight: 600;
    padding: var(--space-2xs) var(--space-s);
    border: 1px solid var(--color-link);
    border-radius: var(--radius-s);
    transition: all 0.2s ease;
  }

  .github-link:hover {
    background-color: var(--color-link);
    color: var(--color-background);
  }

  .github-icon {
    width: 1rem;
    height: 1rem;
  }

  .linkedin-link {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    color: var(--color-link);
    text-decoration: none;
    font-weight: 600;
    padding: var(--space-2xs) var(--space-s);
    border: 1px solid var(--color-link);
    border-radius: var(--radius-s);
    transition: all 0.2s ease;
  }

  .linkedin-link:hover {
    background-color: var(--color-link);
    color: var(--color-background);
  }

  .linkedin-icon {
    width: 1rem;
    height: 1rem;
  }

  .linkedin-text {
    white-space: nowrap;
  }

  .content-section {
    margin-bottom: var(--space-xl);
  }

  .posts-header {
    margin-bottom: var(--space-l);
    text-align: center;
  }

  .no-posts {
    text-align: center;
    padding: var(--space-xl);
    background-color: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
  }

  .no-posts p {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--step-0);
  }

  @media (max-width: 768px) {
    .author-page {
      padding: var(--space-m);
    }

    .author-header {
      padding: var(--space-l);
    }

    .author-avatar {
      width: 100px;
      height: 100px;
    }

    .author-name {
      font-size: var(--step-1);
    }

    .author-links {
      flex-direction: column;
      gap: var(--space-s);
    }
  }
</style>

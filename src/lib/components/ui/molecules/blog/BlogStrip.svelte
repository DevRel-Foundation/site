<script>
  import BlogCard from './BlogCard.svelte';

  const { posts, title = 'Related blog posts', maxPosts = 3 } = $props();
  const visiblePosts = $derived(posts.slice(0, maxPosts));
</script>

<section class="blog-carousel">
  {#if title}<h2 class="blog-carousel-title">{title}</h2>{/if}
  <div class="u-grid u-grid-3 blog-carousel-grid">
    {#each visiblePosts as post (post.slug)}
      <BlogCard {post} href="/blog/{post.slug}" />
    {/each}
  </div>
</section>

<style>
  .blog-carousel {
    margin-top: var(--space-l);
    margin-bottom: var(--space-l);
  }

  .blog-carousel-title {
    font-size: var(--step-1);
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 var(--space-m) 0;
  }

  .blog-carousel-grid {
    gap: var(--space-l);
  }

</style>

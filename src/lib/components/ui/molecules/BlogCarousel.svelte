<script>
  import BlogCard from '../atoms/BlogCard.svelte';
  const { posts, title = 'Related Blog Posts', maxPosts = 3 } = $props();
</script>

  <section class="blog-carousel">
    <h2 class="blog-carousel-title">{title}</h2>
    <div class="blog-carousel-grid">
      {#each posts as post}
        <BlogCard {post} href="/blog/{post.slug}" />
      {/each}
    </div>
  </section>

<style>
  .blog-carousel {
    margin: var(--space-xl) 0;
  }

  .blog-carousel-title {
    font-size: var(--step-1);
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 var(--space-m) 0;
  }

  .blog-carousel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-l);
  }

  @media (min-width: 768px) {
    .blog-carousel-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Handle single post */
  .blog-carousel-grid:has(:only-child) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  /* Handle two posts */
  .blog-carousel-grid:has(:nth-child(2):last-child) {
    grid-template-columns: repeat(2, 1fr);
  }
</style>

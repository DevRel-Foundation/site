<script>
  import BlogCard from './BlogCard.svelte';
  import SectionDivider from '../../atoms/SectionDivider.svelte';

  const { posts, title = 'Related Blog Posts', maxPosts = 3 } = $props();
</script>


  <section class="blog-carousel">
    <SectionDivider />
    {#if title}<h2 class="blog-carousel-title">{title}</h2>{/if}
    <div class="u-grid u-grid-3 blog-carousel-grid">
      {#each posts as post}
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

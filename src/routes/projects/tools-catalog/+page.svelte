
<script lang="ts">
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import BlogCarousel from '$lib/components/ui/molecules/BlogCarousel.svelte';
  
  const { data } = $props();
  const relatedPosts = $derived(() => data?.relatedPosts || []);
</script>

<InfoPage 
  title="Tools Catalog" 
  description="Collection of physical and digital tools useful to evaluate in DevRel programs. Assets are categorized by use case and jobs to be done." >

    <p><a href="https://github.com/DevRel-Foundation/tools-catalog" target="_blank" rel="noopener noreferrer">View the Tools Catalog on GitHub</a></p>

    <BlogCarousel posts={relatedPosts()} />

</InfoPage>

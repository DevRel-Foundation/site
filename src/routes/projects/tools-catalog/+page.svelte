
<script lang="ts">
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import BlogCarousel from '$lib/components/ui/molecules/BlogStrip.svelte';
  import ToolsCatalogDescription from '$lib/components/ui/atoms/ToolsCatalogDescription.svelte';

  import ResourcesWorkingGroupContact from '$lib/components/ui/molecules/ResourcesWorkingGroupContact.svelte';
  import SourceCodeIcon from '$lib/components/ui/molecules/icons/SourceCodeIcon.svelte';
  import ChatBubbleIcon from '$lib/components/ui/molecules/icons/ChatBubbleIcon.svelte';
  import Check from '$lib/components/ui/molecules/icons/Check.svelte';
  import OpenInBrowser from '$lib/components/ui/molecules/icons/OpenInBrowser.svelte';
  
  const { data } = $props();
  const relatedPosts = $derived(() => data?.relatedPosts || []);
</script>

<InfoPage 
  title="Tools Catalog" 
  description="Collection of physical and digital tools useful to evaluate in DevRel programs. Assets are categorized by use case and jobs to be done."
  breadcrumbs={[{label:"Projects", link: "/projects"}]}
   >

  <div class="content-grid">
    <div class="left-column">

        <ToolsCatalogDescription />

        <div>&nbsp;</div>

        <OpenInBrowser enclosed="True" label="Explore the Tools Catalog" href="/projects/tools-catalog/explore" alt="Open Tools Catalog" />

        <br/>

        <ChatBubbleIcon enclosed="True" label="Discuss the Project" href="https://github.com/DevRel-Foundation/wg-resource-aggregation/discussions/categories/tools-catalog" alt="Discuss the Tools Catalog" />

        <br/>

        <Check enclosed="True" label="Open Issues" href="https://github.com/DevRel-Foundation/wg-resource-aggregation/issues?q=is%3Aissue%20state%3Aopen%20label%3Aresource%3Atools" alt="See Open Issues" />

        <br/>

        <SourceCodeIcon enclosed="True" label="View Source" href="https://github.com/devrel-foundation/tools-catalog" alt="View Project Source" />



    </div>
    <div class="right-column">
      <ResourcesWorkingGroupContact />
    </div>
  </div>


  <BlogCarousel posts={relatedPosts()} title="More About the Tools Catalog" />

</InfoPage>

<style>
  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-xl);
    align-items: start;
  }

  .left-column {
    order: 1;
  }

  .right-column {
    order: 2;
  }

  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-m);
    }
  }
</style>
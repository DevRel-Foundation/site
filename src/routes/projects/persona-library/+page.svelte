
<script lang="ts">
  import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import BlogCarousel from '$lib/components/ui/molecules/blog/BlogStrip.svelte';

  import ResourcesWorkingGroupContact from '$lib/components/ui/molecules/ResourcesWorkingGroupContact.svelte';
  import SourceCodeIcon from '$lib/components/ui/molecules/icons/SourceCodeIcon.svelte';
  import ChatBubbleIcon from '$lib/components/ui/molecules/icons/ChatBubbleIcon.svelte';
  import Check from '$lib/components/ui/molecules/icons/Check.svelte';
  import OpenInBrowser from '$lib/components/ui/molecules/icons/OpenInBrowser.svelte';
  
  const { data } = $props();
  const relatedPosts = $derived(() => data?.relatedPosts || []);
</script>

<InfoPage 
  title="Persona Library" 
  description="Collection of developer personas to help DevRel practitioners better understand and advocate for their developer audiences."
  breadcrumbs={[{label:"Projects", link: "/projects"}]}
   >

  <div class="content-grid">
    <div class="left-column">


        <p>The <b>DevRel Foundation Persona Library </b> is more than just a powerpoint presentation. It is an open data repository and schema for collecting traits and tactics for different developer personas that offers pragmatic advice in day-to-day go-to-market strategies and tactics.</p>

        <div>&nbsp;</div>

        <br/>

        <OpenInBrowser enclosed="True" label="Persona Library (Coming Soon)" href="/projects/persona-library" alt="Open Persona Library" />

        <br/>

        <ChatBubbleIcon enclosed="True" label="Discuss the Project" href="https://github.com/DevRel-Foundation/wg-resource-aggregation/discussions/categories/persona-library" alt="Discuss the Persona Library" />

        <br/>

        <Check enclosed="True" label="Open Issues" href="https://github.com/DevRel-Foundation/wg-resource-aggregation/issues?q=is%3Aissue%20state%3Aopen%20label%3Aresource%3Apersonas" alt="See Open Issues" />

        <br/>

        <SourceCodeIcon enclosed="True" label="View Source" href="https://github.com/devrel-foundation/persona-library" alt="View Project Source" />



    </div>
    <div class="right-column">
      <ResourcesWorkingGroupContact />
    </div>
  </div>


  <BlogCarousel posts={relatedPosts()} title="More About the Persona Library" />

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
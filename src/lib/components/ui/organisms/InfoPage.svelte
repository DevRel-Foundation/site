<script>
  import Badge from '$lib/components/ui/molecules/Badge.svelte';

  export let title = '';
  export let description = '';
  export let breadcrumbs = []; // array of strings or dictionaries with links
  export let wide = false;
</script>

<svelte:head>
  <title>{title} | DevRel Foundation</title>
  <meta name="description" content={description}>
</svelte:head>

<div class="container {wide ? 'container-content-wide' : 'container-content'}">
  {#if typeof breadcrumbs === 'string'}
    {#each breadcrumbs.split(',') as badge}
      <Badge label={badge.trim()} />
    {/each}
  {:else if Array.isArray(breadcrumbs)}
    {#each breadcrumbs as badge}
      <Badge label={badge.label ?? badge} link={badge.link} />
    {/each}
  {/if}
  <section>
    <h1 class="info-title">{title}</h1>
    
    <slot/>

  </section>
</div>

<style>
.info-title {
  margin-top: var(--space-s); /* or 0, or your preferred small value */
  margin-bottom: var(--space-l); /* or 0, or your preferred small value */
}
</style>
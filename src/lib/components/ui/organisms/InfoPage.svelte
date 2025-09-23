<script>
  import Badge from '$lib/components/ui/molecules/Badge.svelte';

  export let title = '';
  export let description = '';
  export let badges = ''; // comma-separated string of badge labels
</script>

<svelte:head>
  <title>{title} | DevRel Foundation</title>
  <meta name="description" content={description}>
</svelte:head>

<div class="container container-content">
  <section>
    <h1>{title}
    {#if badges}
        {#each badges.split(',') as badge}
          <Badge label={badge.trim()} />
        {/each}
    {/if}
    </h1>
    
    <slot/>

  </section>
</div>
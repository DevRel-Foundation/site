<script>
  export let title = '';
  export let description = '';
</script>

<svelte:head>
  <title>{title} | DevRel Foundation</title>
  <meta name="description" content={description}>
</svelte:head>

<div class="container container-content">
  <section>
    <h1>{title}</h1>
    
    <slot/>

  </section>
</div>
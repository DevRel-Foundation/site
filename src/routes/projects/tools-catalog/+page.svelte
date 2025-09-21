<script lang="ts">
  import ToolsFilter from '$lib/components/ui/organisms/tools-catalog/ToolsFilter.svelte';
  
  export let data;
  
  $: categories = data?.categories || [];
  $: labels = data?.labels || [];

  let filters = { category: null, label: null };

  function handleFilterChange(newFilters) {
    filters = newFilters;
    // trigger filtering logic here
  }
</script>

<ToolsFilter
  {categories}
  {labels}
  onFilterChange={handleFilterChange}
/>


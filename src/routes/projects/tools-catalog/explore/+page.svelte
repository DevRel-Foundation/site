<script lang="ts">
  import { page } from '$app/stores';
  $:selectedLabel = $page.url.searchParams.get('label');
  $:selectedCategory = $page.url.searchParams.get('category');
  $:selectedOutcome = $page.url.searchParams.get('outcome');

  import ToolsFilter from '$lib/components/ui/organisms/projects/ToolsFilter.svelte';
  import ToolsCatalogDescription from '$lib/components/ui/atoms/ToolsCatalogDescription.svelte';
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import SectionDivider from '$lib/components/ui/atoms/SectionDivider.svelte';
  
  export let data;
  
  $: count = data?.count || 0;
  $: labels = data?.labels || [];
  $: categories = data?.categories || [];
  $: outcomes = data?.outcomes || [];
  $: motivations = data?.motivations || [];
  $: situations = data?.situations || [];

  let filters = { category: null, label: null, outcome: null };

  function handleFilterChange(newFilters) {
    filters = newFilters;

    if (typeof filters.label === 'string' && filters.label.trim() !== '') {
      selectedLabel = filters.label;
    }

    if (typeof filters.category === 'string' && filters.category.trim() !== '') {
      selectedCategory = filters.category;
    }

    if (filters.outcome) {
      selectedOutcome = filters.outcome;
    }

  }
</script>

<InfoPage title="Tools Catalog Explorer" 
  description="Browse and filter tools in the DevRel Foundation Tools Catalog by job category and label. Find the right tools for your Developer Relations needs."
  breadcrumbs={[{label:"About | Tools Catalog", link: "/projects/tools-catalog"}]}
  >
    <ToolsCatalogDescription />
    <SectionDivider />

    <ToolsFilter
      {categories}
      {labels}
      {outcomes}
      {motivations}
      {situations}
      {selectedLabel}
      {selectedCategory}
      {selectedOutcome}
      onFilterChange={handleFilterChange}
    />

    <p> { count } matching tools.</p>
















</InfoPage>



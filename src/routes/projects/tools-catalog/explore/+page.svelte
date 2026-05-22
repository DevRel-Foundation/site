<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import ToolsFilter from '$lib/components/ui/organisms/projects/ToolsFilter.svelte';
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import SectionDivider from '$lib/components/ui/atoms/SectionDivider.svelte';
  import ToolsExplorer from '$lib/components/ui/organisms/projects/ToolsExplorer.svelte';

  let filters: { category: string | null; label: string | null; outcome: string | null; search: string } = { category: null, label: null, outcome: null, search: '' };

  export let data: any;
  $: allTools = data?.tools || {};
  $: labels = data?.labels || [];
  $: categories = data?.categories || [];
  $: outcomes = data?.outcomes || [];
  $: motivations = data?.motivations || [];
  $: situations = data?.situations || [];

  $: selectedLabel = page.url.searchParams.get('label');
  $: selectedCategory = page.url.searchParams.get('category');
  $: selectedOutcome = page.url.searchParams.get('outcome');
  $: selectedTool = page.url.searchParams.get('tool');
  $: searchText = page.url.searchParams.get('search') || '';
  $: selectedToolData = selectedTool ? allTools[selectedTool] : null;

  $: filteredTools = allTools;
  $: categoryDescription = '';
  $: outcomeDescription = '';

  $: if (selectedTool) {
      handleToolSelect(selectedTool);
  } else if (!selectedTool) {
    selectedTool = Object.keys(filteredTools)[0];
    handleToolSelect(selectedTool);
  }

  $: {
    const toolKeys = Object.keys(filteredTools);
    if (toolKeys.length > 0 && (!selectedTool || !filteredTools[selectedTool])) {
      selectedTool = toolKeys[0];
      handleToolSelect(selectedTool);
    }
  }

  async function fetchCategory(category: string): Promise<any> {
    if (!browser) return {}; // should only be a user triggered action, not ssr
    try {
      const res = await fetch(`/api/tools-catalog/categories/${encodeURIComponent(category)}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (err) {
      console.error('Error fetching category description:', err);
    }
    return {};
  } 

  async function fetchLabel(label: string): Promise<any> {
    if (!browser) return {}; // should only be a user triggered action, not ssr
    try {
      const res = await fetch(`/api/tools-catalog/labels/${encodeURIComponent(label)}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (err) {
      console.error('Error fetching label description:', err);
    }
    return {};
  }


  async function fetchOutcome(outcome: string): Promise<any> {
    if (!browser) return {}; // should only be a user triggered action, not ssr
    try {
      const res = await fetch(`/api/tools-catalog/outcomes/${encodeURIComponent(outcome)}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (err) {
      console.error('Error fetching outcome description:', err);
    }
    return '';
  }

  function filterToolsBySearch(tools: any, searchText: string): any {
    if (!searchText || searchText.trim() === '') {
      return tools;
    }

    const searchLower = searchText.toLowerCase().trim();
    const filteredEntries = Object.entries(tools).filter(([id, tool]: [string, any]) => {
      const name = (tool.name || '').toLowerCase();
      const description = (tool.description || '').toLowerCase();
      return name.includes(searchLower) || description.includes(searchLower);
    });

    return Object.fromEntries(filteredEntries);
  }



  async function handleFilterChange(newFilters: any) {
    filters = newFilters;

    const params = new URLSearchParams();

    let nextTools = allTools;

    if (typeof filters.category === 'string' && filters.category.trim() !== '') {
      selectedCategory = filters.category;
      params.set('category', filters.category);

      let category = await fetchCategory(filters.category);
      categoryDescription = category.categories?.description || '';

      if (Array.isArray(category.categories?.tools)) {
        nextTools = Object.fromEntries(
          category.categories.tools
            .filter((id: any) => nextTools.hasOwnProperty(id))
            .map((id: any) => [id, nextTools[id]])
        );
      }
    } else {
      categoryDescription = '';
      selectedCategory = null;
    }

    if (typeof filters.label === 'string' && filters.label.trim() !== '') {
      selectedLabel = filters.label;
      params.set('label', filters.label);

      let label = await fetchLabel(filters.label);
      if (Array.isArray(label.result?.tools)) {
        nextTools = Object.fromEntries(
          label.result.tools
            .filter((id: any) => nextTools.hasOwnProperty(id))
            .map((id: any) => [id, nextTools[id]])
        );
      }
    } else {
      selectedLabel = null;
    }

    if (typeof filters.outcome === 'string' && filters.outcome.trim() !== '') {
      selectedOutcome = filters.outcome;
      params.set('outcome', filters.outcome);

      let outcome = await fetchOutcome(filters.outcome);
      outcomeDescription = outcome.outcomes?.description || '';

      if (Array.isArray(outcome.outcomes?.tools)) {
        nextTools = Object.fromEntries(
          outcome.outcomes.tools
            .filter((id: any) => nextTools.hasOwnProperty(id))
            .map((id: any) => [id, nextTools[id]])
        );
      }
    } else {
      outcomeDescription = '';
      selectedOutcome = null;
    }

    if (typeof filters.search === 'string' && filters.search.trim() !== '') {
      params.set('search', filters.search);
      nextTools = filterToolsBySearch(nextTools, filters.search);
    }

    filteredTools = nextTools;

    if (browser) {
      goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
    }
  }


  async function handleFilterChangeOLD(newFilters: any) {
    const isCategoryReset = filters.category && !newFilters.category;
    const isLabelReset = filters.label && !newFilters.label;
    const isOutcomeReset = filters.outcome && !newFilters.outcome;
    const isSearchReset = filters.search && !newFilters.search;

    if (isCategoryReset || isLabelReset || isOutcomeReset || isSearchReset) { 
      filteredTools = allTools;
    }

    filters = newFilters;

    const params = new URLSearchParams();
    
    if (typeof filters.category === 'string' && filters.category.trim() !== '') {
      selectedCategory = filters.category;
      params.set('category', filters.category);

      let category = await fetchCategory(filters.category);
      categoryDescription = category.categories.description || '';

      filteredTools = Object.fromEntries(
        category.categories.tools
          .filter((id: any) => filteredTools.hasOwnProperty(id))
          .map((id: any) => [id, filteredTools[id]])
      );
    } else {
      categoryDescription = '';
      selectedCategory = null;
    }

    if (typeof filters.label === 'string' && filters.label.trim() !== '') {
      selectedLabel = filters.label;
      params.set('label', filters.label);

      let label = {result: []};
      label = await fetchLabel(filters.label);
      filteredTools = Object.fromEntries(
        label.result?.tools
          .filter((id: any) => filteredTools.hasOwnProperty(id))
          .map((id: any) => [id, filteredTools[id]])
      );
    } else {
      selectedLabel = null;
    }

    if (typeof filters.outcome === 'string' && filters.outcome.trim() !== '') {
      selectedOutcome = filters.outcome;
      params.set('outcome', filters.outcome);

      let outcome = await fetchOutcome(filters.outcome);
      outcomeDescription = outcome.outcomes.description || '';

      filteredTools = Object.fromEntries(
        outcome.outcomes.tools
          .filter((id: any) => filteredTools.hasOwnProperty(id))
          .map((id: any) => [id, filteredTools[id]])
      );
    } else {
      outcomeDescription = '';
      selectedOutcome = null;
    }

    if (typeof filters.search === 'string' && filters.search.trim() !== '') {
      params.set('search', filters.search);
      filteredTools = filterToolsBySearch(filteredTools, filters.search);
    }

    if (browser) {
      goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
    }
  }

  async function handleToolSelect(tool: string) {
    selectedTool = tool
    try {
      if (!browser) return {}; // should only be a user triggered action, not ssr
      const response = await fetch(`/api/tools-catalog/tools/${tool}`);
      if (response.ok) {
        const data = await response.json();
        data.result.id = tool;
        selectedToolData = data.result;
        
        const params = new URLSearchParams(page.url.searchParams);
        params.set('tool', tool);
        goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
      }
    } catch (err) {
      console.error('Error loading tool details:', err);
    }
  }
</script>

<InfoPage title="Tools Catalog Explorer" 
  description="Browse and filter tools in the DevRel Foundation Tools Catalog by job category and label. Find the right tools for your Developer Relations needs."
  breadcrumbs={[{label:"About | Tools Catalog", link: "/projects/tools-catalog"}]}
  wide={true}
  >

    <SectionDivider />

    <ToolsFilter
      {categories}
      {labels}
      {outcomes}
      {selectedLabel}
      {selectedCategory}
      {selectedOutcome}
      {searchText}
      onFilterChange={handleFilterChange}
    />

    <p class="description"><b>{categoryDescription ? `Job Category: ` : ''}</b>{categoryDescription}</p>
    <p class="description"><b>{outcomeDescription ? `Outcome: ` : ''}</b>{outcomeDescription}</p>

    <p>Matched {Object.keys(filteredTools).length} out of {data.count} devrel tools.</p>

    <SectionDivider />

    <ToolsExplorer 
      tools={filteredTools}
      {selectedTool}
      {selectedToolData}
      onToolSelect={handleToolSelect}
    />

</InfoPage>


<style>
  .description {
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-top: var(--space-xs);
    margin-bottom: var(--space-s);
  }
</style>

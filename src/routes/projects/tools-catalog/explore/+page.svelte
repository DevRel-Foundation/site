<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import ToolsFilter from '$lib/components/ui/organisms/projects/ToolsFilter.svelte';
  import ToolsCatalogDescription from '$lib/components/ui/atoms/ToolsCatalogDescription.svelte';
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import SectionDivider from '$lib/components/ui/atoms/SectionDivider.svelte';
  import ToolsExplorer from '$lib/components/ui/organisms/ToolsExplorer.svelte';

  // Uses /api/tools-catalog to initialize page data
  export let data: any;
  $: allTools = data?.tools || {};
  $: labels = data?.labels || [];
  $: categories = data?.categories || [];
  $: outcomes = data?.outcomes || [];
  $: motivations = data?.motivations || [];
  $: situations = data?.situations || [];

  // Tool filtering parameters may be passed in query string
  $: selectedLabel = page.url.searchParams.get('label');
  $: selectedCategory = page.url.searchParams.get('category');
  $: selectedOutcome = page.url.searchParams.get('outcome');
  $: selectedToolId = page.url.searchParams.get('tool');

  // Get filter descriptions for selected items
  $: filteredTools = allTools;
  $: categoryDescription = '';
  $: outcomeDescription = '';


  // Track current filters
  let filters: { category: string | null; label: string | null; outcome: string | null } = { category: null, label: null, outcome: null };

  let selectedTool: any = null;

  // Filter tools based on selected filters
  /*.filter(tool => {
    if (selectedLabel && (!tool.labels || !tool.labels.includes(selectedLabel))) {
      return false;
    }
    if (selectedCategory && (!tool.categories || !tool.categories.includes(selectedCategory))) {
      return false;
    }
    if (selectedOutcome && (!tool.outcomes || !tool.outcomes.includes(selectedOutcome))) {
      return false;
    }
    return true;
  });
  */


  // Load selected tool from URL parameter
  $: if (selectedToolId && Object.keys(allTools).length > 0) {
    const tool = allTools.find((t: any) => t.id === selectedToolId);
    if (tool && (!selectedTool || selectedTool.id !== tool.id)) {
      // If we found a basic tool but need details, fetch them
      handleToolSelect(tool.id);
    }
  } else if (!selectedToolId) {
    selectedTool = null;
  }

  /**
   * Get description and tool list for a category
   * @param category
   */
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

  /**
   * Get tool list for a label
   * @param outcome
   */
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


  /**
   * Get description and tool list for an outcome
   * @param outcome
   */
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


  /**
   * Handles changes to the filter selections.
   * @param newFilters
   */
  async function handleFilterChange(newFilters: any) {
    const isCategoryReset = filters.category && !newFilters.category;
    const isLabelReset = filters.label && !newFilters.label;
    const isOutcomeReset = filters.outcome && !newFilters.outcome;

    // If any filter was reset, start from all tools
    if (isCategoryReset || isLabelReset || isOutcomeReset) { 
      filteredTools = allTools;
    }

    filters = newFilters;

    // Add any selections to query params
    const params = new URLSearchParams();
    
    // Check for a category filter
    if (typeof filters.category === 'string' && filters.category.trim() !== '') {
      // Update state for selected category and description
      selectedCategory = filters.category;
      params.set('category', filters.category);

      // Filter tools for the category
      let category = await fetchCategory(filters.category);
      categoryDescription = category.categories.description || '';

      filteredTools = Object.fromEntries(
        category.categories.tools
          .filter(id => filteredTools.hasOwnProperty(id))
          .map(id => [id, filteredTools[id]])
      );
    } else {
      // Reset category state to clear selection
      categoryDescription = '';
      selectedCategory = null;
    }

    // Check for a label filter
    if (typeof filters.label === 'string' && filters.label.trim() !== '') {
      // Update state for selected label (don't have descriptions)
      selectedLabel = filters.label;
      params.set('label', filters.label);

      // Filter tools for the label
      let label = await fetchLabel(filters.label);
      filteredTools = Object.fromEntries(
        label.result.tools
          .filter(id => filteredTools.hasOwnProperty(id))
          .map(id => [id, filteredTools[id]])
      );
    } else {
      // Reset label state to clear selection
      selectedLabel = null;
    }

    // Check for an outcome filter
    if (typeof filters.outcome === 'string' && filters.outcome.trim() !== '') {
      // Update state for selected outcome and description
      selectedOutcome = filters.outcome;
      params.set('outcome', filters.outcome);

      // Filter tools for the outcome
      let outcome = await fetchOutcome(filters.outcome);
      outcomeDescription = outcome.outcomes.description || '';

      filteredTools = Object.fromEntries(
        outcome.outcomes.tools
          .filter(id => filteredTools.hasOwnProperty(id))
          .map(id => [id, filteredTools[id]])
      );
    } else {
      // Reset category state to clear selection
      outcomeDescription = '';
      selectedOutcome = null;
    }

    // Update the URL for filters
    if (browser) {
      goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
    }
  }

  async function handleToolSelect(toolId: string) {
    try {
      // Fetch detailed tool data
      const response = await fetch(`/api/tools-catalog/tools/${toolId}`);
      if (response.ok) {
        const data = await response.json();
        selectedTool = data.result;
        
        // Update URL to include selected tool
        const params = new URLSearchParams($page.url.searchParams);
        params.set('tool', toolId);
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
      {motivations}
      {situations}
      {selectedLabel}
      {selectedCategory}
      {selectedOutcome}
      onFilterChange={handleFilterChange}
    />

    <p class="description"><b>{categoryDescription ? `Job Category: ` : ''}</b>{categoryDescription}</p>
    <p class="description"><b>{outcomeDescription ? `Outcome: ` : ''}</b>{outcomeDescription}</p>

    <SectionDivider />


    <ToolsExplorer 
      tools={filteredTools}
      {selectedTool}
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

<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import ToolsFilter from '$lib/components/ui/organisms/projects/ToolsFilter.svelte';
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import SectionDivider from '$lib/components/ui/atoms/SectionDivider.svelte';
  import ToolsExplorer from '$lib/components/ui/organisms/projects/ToolsExplorer.svelte';

  let filters: { category: string | null; label: string | null; outcome: string | null; search: string } = { category: null, label: null, outcome: null, search: '' };

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
  $: selectedTool = page.url.searchParams.get('tool');
  $: searchText = page.url.searchParams.get('search') || '';
  $: selectedToolData = selectedTool ? allTools[selectedTool] : null;

  // Get filter descriptions for selected items
  $: filteredTools = allTools;
  $: categoryDescription = '';
  $: outcomeDescription = '';

  // Load selected tool from URL parameter
  $: if (selectedTool) {
      handleToolSelect(selectedTool);
  } else if (!selectedTool) {
    // Select first item from the filtered list by default
    selectedTool = Object.keys(filteredTools)[0];
    handleToolSelect(selectedTool);
  }

  // Update selected tool after a filter change
  $: {
    const toolKeys = Object.keys(filteredTools);
    if (toolKeys.length > 0 && (!selectedTool || !filteredTools[selectedTool])) {
      selectedTool = toolKeys[0];
      handleToolSelect(selectedTool);
    }
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
   * Filter tools by search text (name or description)
   * @param tools - Object of tools to filter
   * @param searchText - Text to search for
   * @returns Filtered tools object
   */
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


  /**
   * Handles changes to the filter selections.
   * @param newFilters
   */
  async function handleFilterChange(newFilters: any) {
    const isCategoryReset = filters.category && !newFilters.category;
    const isLabelReset = filters.label && !newFilters.label;
    const isOutcomeReset = filters.outcome && !newFilters.outcome;
    const isSearchReset = filters.search && !newFilters.search;

    // If any filter was reset, start from all tools
    if (isCategoryReset || isLabelReset || isOutcomeReset || isSearchReset) { 
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
          .filter((id: any) => filteredTools.hasOwnProperty(id))
          .map((id: any) => [id, filteredTools[id]])
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
          .filter((id: any) => filteredTools.hasOwnProperty(id))
          .map((id: any) => [id, filteredTools[id]])
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
          .filter((id: any) => filteredTools.hasOwnProperty(id))
          .map((id: any) => [id, filteredTools[id]])
      );
    } else {
      // Reset category state to clear selection
      outcomeDescription = '';
      selectedOutcome = null;
    }

    // Apply search filter to the already filtered tools
    if (typeof filters.search === 'string' && filters.search.trim() !== '') {
      params.set('search', filters.search);
      filteredTools = filterToolsBySearch(filteredTools, filters.search);
    }

    // Update the URL for filters
    if (browser) {
      goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
    }
  }

  /**
   * Handle when a specific tool is selected, fetch and display its details.
   * @param tool
   */
  async function handleToolSelect(tool: string) {
    selectedTool = tool
    try {
      // Fetch detailed tool data
      if (!browser) return {}; // should only be a user triggered action, not ssr
      const response = await fetch(`/api/tools-catalog/tools/${tool}`);
      if (response.ok) {
        const data = await response.json();
        data.result.id = tool;
        selectedToolData = data.result;
        
        // Update URL to include selected tool
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

    <p>Matched {Object.keys(filteredTools).length} out of {data.count} tools.</p>

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

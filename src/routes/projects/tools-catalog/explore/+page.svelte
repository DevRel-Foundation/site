<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import ToolsFilter from '$lib/components/ui/organisms/projects/ToolsFilter.svelte';
  import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import ToolsExplorer from '$lib/components/ui/organisms/projects/ToolsExplorer.svelte';

  type FacetOption = { label: string; value: string };

  type CatalogTool = {
    id?: string;
    name: string;
    description?: string;
    [key: string]: unknown;
  };

  type PageData = {
    labels: FacetOption[];
    categories: FacetOption[];
    outcomes: FacetOption[];
    count: number;
    tools: Record<string, CatalogTool>;
  };

  type ToolFilters = {
    category: string | null;
    label: string | null;
    outcome: string | null;
    search: string;
  };

  type CategoryResponse = {
    categories?: {
      description?: string;
      tools?: string[];
    };
  };

  type LabelResponse = {
    result?: {
      tools?: string[];
    };
  };

  type OutcomeResponse = {
    outcomes?: {
      description?: string;
      tools?: string[];
    };
  };

  let { data }: { data: PageData } = $props();

  const allTools = $derived(data?.tools ?? {});
  const labels = $derived(data?.labels ?? []);
  const categories = $derived(data?.categories ?? []);
  const outcomes = $derived(data?.outcomes ?? []);

  let filters = $state<ToolFilters>({
    category: null,
    label: null,
    outcome: null,
    search: ''
  });
  let appliedFilterResult = $state<Record<string, CatalogTool> | null>(null);
  let categoryDescription = $state('');
  let outcomeDescription = $state('');
  let selectedCategory = $state<string | null>(null);
  let selectedLabel = $state<string | null>(null);
  let selectedOutcome = $state<string | null>(null);
  let selectedTool = $state<string | null>(null);
  let selectedToolData = $state<CatalogTool | null>(null);
  let searchText = $state('');

  const filteredTools = $derived(appliedFilterResult ?? allTools);

  $effect(() => {
    if (allTools) {
      appliedFilterResult = null;
    }
  });

  $effect(() => {
    selectedLabel = page.url.searchParams.get('label');
    selectedCategory = page.url.searchParams.get('category');
    selectedOutcome = page.url.searchParams.get('outcome');
    selectedTool = page.url.searchParams.get('tool');
    searchText = page.url.searchParams.get('search') || '';
  });

  $effect(() => {
    const tools = filteredTools;
    const toolParam = page.url.searchParams.get('tool');
    const toolKeys = Object.keys(tools);

    if (toolKeys.length === 0) {
      selectedToolData = null;
      return;
    }

    const targetTool = toolParam && tools[toolParam] ? toolParam : toolKeys[0];

    if (selectedTool !== targetTool || selectedToolData?.id !== targetTool) {
      void loadToolDetails(targetTool);
    }
  });

  async function fetchCategory(category: string): Promise<CategoryResponse> {
    if (!browser) return {};
    try {
      const res = await fetch(`/api/tools-catalog/categories/${encodeURIComponent(category)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Error fetching category description:', err);
    }
    return {};
  }

  async function fetchLabel(label: string): Promise<LabelResponse> {
    if (!browser) return {};
    try {
      const res = await fetch(`/api/tools-catalog/labels/${encodeURIComponent(label)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Error fetching label description:', err);
    }
    return {};
  }

  async function fetchOutcome(outcome: string): Promise<OutcomeResponse> {
    if (!browser) return {};
    try {
      const res = await fetch(`/api/tools-catalog/outcomes/${encodeURIComponent(outcome)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Error fetching outcome description:', err);
    }
    return {};
  }

  function filterToolsBySearch(
    tools: Record<string, CatalogTool>,
    query: string
  ): Record<string, CatalogTool> {
    if (!query || query.trim() === '') {
      return tools;
    }

    const searchLower = query.toLowerCase().trim();
    const filteredEntries = Object.entries(tools).filter(([, tool]) => {
      const name = (tool.name || '').toLowerCase();
      const description = (tool.description || '').toLowerCase();
      return name.includes(searchLower) || description.includes(searchLower);
    });

    return Object.fromEntries(filteredEntries);
  }

  function filterToolsByIds(
    tools: Record<string, CatalogTool>,
    ids: string[]
  ): Record<string, CatalogTool> {
    return Object.fromEntries(
      ids.filter((id) => Object.hasOwn(tools, id)).map((id) => [id, tools[id]])
    );
  }

  async function handleFilterChange(newFilters: ToolFilters) {
    filters = newFilters;

    const params = new URLSearchParams();
    let nextTools = allTools;

    if (typeof filters.category === 'string' && filters.category.trim() !== '') {
      selectedCategory = filters.category;
      params.set('category', filters.category);

      const category = await fetchCategory(filters.category);
      categoryDescription = category.categories?.description || '';

      if (Array.isArray(category.categories?.tools)) {
        nextTools = filterToolsByIds(nextTools, category.categories.tools);
      }
    } else {
      categoryDescription = '';
      selectedCategory = null;
    }

    if (typeof filters.label === 'string' && filters.label.trim() !== '') {
      selectedLabel = filters.label;
      params.set('label', filters.label);

      const label = await fetchLabel(filters.label);
      if (Array.isArray(label.result?.tools)) {
        nextTools = filterToolsByIds(nextTools, label.result.tools);
      }
    } else {
      selectedLabel = null;
    }

    if (typeof filters.outcome === 'string' && filters.outcome.trim() !== '') {
      selectedOutcome = filters.outcome;
      params.set('outcome', filters.outcome);

      const outcome = await fetchOutcome(filters.outcome);
      outcomeDescription = outcome.outcomes?.description || '';

      if (Array.isArray(outcome.outcomes?.tools)) {
        nextTools = filterToolsByIds(nextTools, outcome.outcomes.tools);
      }
    } else {
      outcomeDescription = '';
      selectedOutcome = null;
    }

    if (typeof filters.search === 'string' && filters.search.trim() !== '') {
      params.set('search', filters.search);
      nextTools = filterToolsBySearch(nextTools, filters.search);
    }

    appliedFilterResult = nextTools;

    if (browser) {
      goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
    }
  }

  async function loadToolDetails(tool: string) {
    selectedTool = tool;

    if (!browser) return;

    try {
      const response = await fetch(`/api/tools-catalog/tools/${tool}`);
      if (response.ok) {
        const json = await response.json();
        selectedToolData = { ...json.result, id: tool };

        const params = new URLSearchParams(page.url.searchParams);
        if (params.get('tool') !== tool) {
          params.set('tool', tool);
          goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true });
        }
      }
    } catch (err) {
      console.error('Error loading tool details:', err);
    }
  }

  function handleToolSelect(tool: string) {
    void loadToolDetails(tool);
  }
</script>

<InfoPage
  title="Tools Catalog explorer"
  description="Browse and filter tools in the DevRel Foundation Tools Catalog by job category and label. Find the right tools for your Developer Relations needs."
  breadcrumbs={[{ label: 'About | Tools Catalog', link: '/projects/tools-catalog' }]}
  wide={true}
>
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

  <p class="description">
    <b>{categoryDescription ? `Job category: ` : ''}</b>{categoryDescription}
  </p>
  <p class="description"><b>{outcomeDescription ? `Outcome: ` : ''}</b>{outcomeDescription}</p>

  <p>Matched {Object.keys(filteredTools).length} out of {data.count} devrel tools.</p>

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

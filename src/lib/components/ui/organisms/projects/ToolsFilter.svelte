<script lang="ts">
  import FacetDropdown from '$lib/components/ui/molecules/projects/tools-catalog/ToolFacetDropdown.svelte';
  import SearchInput from '$lib/components/ui/atoms/ToolSearch.svelte';

  export let categories: { label: string; value: string }[] = [];
  export let labels: { label: string; value: string }[] = [];
  export let outcomes: { label: string; value: string }[] = [];

  export let selectedLabel: string | null = null;
  export let selectedCategory: string | null = null;
  export let selectedOutcome: string | null = null;
  export let searchText: string = '';

  export let onFilterChange: (filters: { category: string | null; outcome: string | null; label: string | null; search: string }) => void = () => {};

  function handleSearchInput(value: string) {
    searchText = value;
  }

  function handleSearchClear() {
    searchText = '';
  }

  // Update parent when filters change
  $: onFilterChange({ category: selectedCategory, label: selectedLabel, outcome: selectedOutcome, search: searchText });
</script>

<div class="tools-filter">
  <div class="filter-row">
    <FacetDropdown
      label="Job Category"
      options={categories}
      selected={selectedCategory}
      onSelect={val => selectedCategory = val}
      help="Match tools by job category."
    />
    <FacetDropdown
      label="Desired Outcome"
      options={outcomes}
      selected={selectedOutcome}
      onSelect={val => selectedOutcome = val}
      help="Match tools by desired outcome."
    />
    <FacetDropdown
      label="Find by Label"
      options={labels}
      selected={selectedLabel}
      onSelect={val => selectedLabel = val}
      help="Match tools with a given label."
    />
    <div class="search-filter">
      <label class="search-label" for="search-tools">Search</label>
      <SearchInput
        id="search-tools"
        value={searchText}
        placeholder=""
        onInput={handleSearchInput}
        onClear={handleSearchClear}
      />
    </div>
  </div>
</div>

<style>
.tools-filter {
  margin-bottom: var(--space-xs);
}

.filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: var(--space-l);
  align-items: end;
}

.search-filter {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.search-label {
  font-size: var(--step-0);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.1em;
}

@media (max-width: 1024px) {
  .filter-row {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-m);
  }
}

@media (max-width: 768px) {
  .filter-row {
    grid-template-columns: 1fr;
    gap: var(--space-s);
  }
}
</style>
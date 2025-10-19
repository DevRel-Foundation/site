<script lang="ts">
  import FacetDropdown from '$lib/components/ui/molecules/projects/tools-catalog/ToolFacetDropdown.svelte';

  export let categories: { label: string; value: string }[] = [];
  export let labels: { label: string; value: string }[] = [];
  export let outcomes: { label: string; value: string }[] = [];

  export let selectedLabel: string | null = null;
  export let selectedCategory: string | null = null;
  export let selectedOutcome: string | null = null;

  export let onFilterChange: (filters: { category: string | null; outcome: string | null; label: string | null }) => void = () => {};

  // Update parent when filters change
  $: onFilterChange({ category: selectedCategory, label: selectedLabel, outcome: selectedOutcome });
</script>

<div class="tools-filter">
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
</div>

<style>
.tools-filter {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  gap: var(--space-l);
  margin-bottom: var(--space-xs);
}
</style>
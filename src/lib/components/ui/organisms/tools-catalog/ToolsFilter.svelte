<script lang="ts">
  import FacetDropdown from '$lib/components/ui/molecules/ToolFacetDropdown.svelte';

  export let categories: { label: string; value: string }[] = [];
  export let labels: { label: string; value: string }[] = [];
  export let selectedCategory: string | null = null;
  export let selectedLabel: string | null = null;
  export let onFilterChange: (filters: { category: string | null; label: string | null }) => void = () => {};

  // Update parent when filters change
  $: onFilterChange({ category: selectedCategory, label: selectedLabel });
</script>

<div class="tools-filter">
  <FacetDropdown
    label="Job Category"
    options={categories}
    selected={selectedCategory}
    onSelect={val => selectedCategory = val}
    help="Filter tools by the type of job or role."
  />
  <FacetDropdown
    label="Label"
    options={labels}
    selected={selectedLabel}
    onSelect={val => selectedLabel = val}
    help="Filter tools by label or tag."
  />
</div>

<style>
.tools-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
  margin-bottom: var(--space-xl);
}
</style>
<script lang="ts">
  import DropdownMenu from '$lib/components/ui/atoms/DropdownMenu.svelte';

  export let label: string;
  export let options: { label: string; value: string; description?: string }[] = [];
  export let selected: string | null = null;
  export let placeholder = "Select…";
  export let help: string | null = null;
  export let onSelect: (value: string) => void = () => {};
</script>

<div class="facet-dropdown">
  <label class="facet-label">{label}</label>
  <DropdownMenu
    {options}
    {selected}
    {placeholder}
    {onSelect}
  />
  {#if help}
    <div class="facet-help">{help}</div>
  {/if}
</div>

<style>
.facet-dropdown {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-m);
}
.facet-label {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.1em;
}
.facet-help {
  font-size: var(--step--2);
  color: var(--color-text-secondary);
  margin-top: 0.1em;
}
</style>
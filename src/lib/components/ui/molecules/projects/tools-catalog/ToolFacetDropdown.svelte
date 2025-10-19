<script lang="ts">
  import DropdownMenu from '$lib/components/ui/atoms/DropdownMenu.svelte';
  import InfoTooltip from '$lib/components/ui/molecules/icons/InfoTooltip.svelte';

  export let label: string;
  export let options: { label: string; value: string; description?: string }[] = [];
  export let selected: string | null = null;
  export let placeholder = "Select…";
  export let help: string | null = null;
  export let onSelect: (value: string) => void = () => {};
</script>

<div class="facet-dropdown">
  <label class="facet-label">
    {label}
    {#if help}
      <InfoTooltip label="" href="" alt={help} />
    {/if}
  </label>
  <DropdownMenu
    {options}
    {selected}
    {placeholder}
    {onSelect}
    on:change={event => onSelect(event.detail)}
  />
</div>

<style>
.facet-dropdown {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-m);
  scrollbar-width: thin;        /* Firefox: thin scrollbar */

}
.facet-label {
  font-size: var(--step-0);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.1em;
}

</style>
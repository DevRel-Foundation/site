<script lang="ts">
  import PropertyItem from '../atoms/PropertyItem.svelte';
	import SectionDivider from '../atoms/SectionDivider.svelte';

  export let tool: any = null;
  export let filterDescription: string = '';

  // TODO: customize display of properties a bit more
  // Convert tool object to property list
  $: properties = tool ? Object.entries(tool)
    .filter(([key, value]) => key !== 'id') // Don't show ID as it's redundant
    .map(([key, value]) => ({
      key,
      label: formatLabel(key),
      value
    })) : [];

  function formatLabel(key: string): string {
    // Convert camelCase/snake_case to Title Case
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  function copyToolUrl() {
    if (tool?.id) {
      const url = `${window.location.origin}/projects/tools-catalog/explore?tool=${tool.id}`;
      navigator.clipboard.writeText(url);
      // Could add a toast notification here
    }
  }
</script>

<div class="tool-details">
  {#if !tool}
    <div class="empty-state">
      <h2>Select a Tool</h2>
      <p>Choose a tool from the list to view its details.</p>
      {#if filterDescription}
        <div class="filter-description">
          <h3>Filter Information</h3>
          <p>{filterDescription}</p>
        </div>
      {/if}
    </div>
  {:else}
    <div class="tool-details-header">
    <h2 class="tool-title">{tool.name}</h2>
    </div>

    {#if tool.description}
        <p>{tool.description}</p>
    {/if}

    <SectionDivider />

    <div class="tool-properties">
      <dl class="properties-list">
        {#each properties as property (property.key)}
          <PropertyItem {property} />
        {/each}
      </dl>
    </div>

    {#if filterDescription}
      <div class="filter-description">
        <h3>Filter Information</h3>
        <p>{filterDescription}</p>
      </div>
    {/if}
  {/if}
    <button 
    class="share-btn"
    on:click={copyToolUrl}
    title="Copy link to this tool"
    >
    Share 🔗
    </button>
</div>

<style>
  .tool-details {
    height: 100%;
    padding: var(--space-m);
    background: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
    overflow-y: auto;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: var(--color-text-muted);
  }

  .empty-state h2 {
    margin: 0 0 var(--space-s) 0;
    color: var(--color-text);
  }

  .tool-details-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-m);
    gap: var(--space-s);
  }

  .tool-title {
    margin: 0;
    font-size: var(--step-2);
    font-weight: 700;
    color: var(--color-text);
    flex: 1;
  }

  .share-btn {
    padding: var(--space-xs) var(--space-s);
    background: var(--color-mint);
    border: none;
    border-radius: var(--radius-s);
    color: var(--color-text-dark);
    font-size: var(--step--1);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .share-btn:hover {
    background: var(--color-mint-dark);
    transform: translateY(-1px);
  }

  .tool-description {
    margin-bottom: var(--space-l);
    padding: var(--space-m);
    background: var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    border-left: 4px solid var(--color-mint);
  }

  .tool-description p {
    margin: 0;
    line-height: 1.6;
    color: var(--color-text);
  }

  .properties-title {
    margin: 0 0 var(--space-m) 0;
    font-size: var(--step-0);
    font-weight: 600;
    color: var(--color-text);
    padding-bottom: var(--space-xs);
  }

  .properties-list {
    margin: 0;
  }

  .filter-description {
    margin-top: var(--space-l);
    padding: var(--space-m);
    background: var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    border-left: 4px solid var(--color-logo-text);
  }

  .filter-description h3 {
    margin: 0 0 var(--space-s) 0;
    font-size: var(--step-0);
    color: var(--color-text);
  }

  .filter-description p {
    margin: 0;
    color: var(--color-text);
    line-height: 1.6;
  }
</style>
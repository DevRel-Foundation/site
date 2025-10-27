<script lang="ts">
  export let tool: any;
  export let key: string;
  export let isSelected: boolean = false;
  export let onSelect: (key: string) => void = () => {};
</script>


<div 
  class="tool-card" 
  class:selected={isSelected}
  role="button"
  tabindex="0"
  on:click={() => onSelect(key)}
  on:keydown={(e) => e.key === 'Enter' && onSelect(key)}
>
  <h3 class="tool-name">{tool.name || key}</h3>
  <p class="tool-description">{tool.description || ''}</p>
  {#if tool.labels && tool.labels.length > 0}
    <div class="tool-labels">
      {#each tool.labels.slice(0, 3) as label}
        <span class="tool-label">{label}</span>
      {/each}
      {#if tool.labels.length > 3}
        <span class="tool-label-more">+{tool.labels.length - 3} more</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .tool-card {
    padding: var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    background: var(--color-background-secondary-1);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: var(--space-xs);
  }

  .tool-card:hover {
    border-color: var(--color-button-background);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .tool-card.selected {
    border-color: var(--color-button-background);
    background: var(--color-background-secondary-2);
    box-shadow: 0 0 0 1px var(--color-mint);
  }

  .tool-name {
    margin: 0 0 var(--space-xs) 0;
    font-size: var(--step-1);
    font-weight: 600;
    color: var(--color-text);
  }

  .tool-description {
    margin: 0 0 var(--space-xs) 0;
    font-size: var(--step--1);
    color: var(--color-text-muted);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tool-labels {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs);
  }

  .tool-label {
    background: var(--color-background-secondary-2);
    color: var(--color-text);
    padding: 2px 6px;
    border-radius: var(--radius-s);
    font-size: var(--step--2);
    font-weight: 500;
  }

  .tool-label-more {
    background: var(--color-mint-dark);
    color: var(--color-offwhite);
    padding: 2px 6px;
    border-radius: var(--radius-s);
    font-size: var(--step--2);
    font-weight: 500;
  }
</style>
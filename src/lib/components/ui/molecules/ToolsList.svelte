<script lang="ts">
  import ToolCard from '../atoms/ToolCard.svelte';
  import Pagination from '../atoms/Pagination.svelte';

  export let tools: any[] = [];
  export let selectedToolId: string | null = null;

  export let onToolSelect: (toolId: string) => void = () => {};
  export let onPageChange: (page: number) => void = () => {};
  export let currentPage: number = 0;
  export let itemsPerPage: number = 10;

  $: tools = tools || [];
  $: totalPages = Math.ceil(Object.keys(tools).length / itemsPerPage);
  $: paginatedTools = Object.keys(tools)
  .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  .map(key => tools[key]);
  

  function handlePageChange(page: number) {
    onPageChange(page);
  }
</script>

<div class="tool-list">
  <div class="tool-list-header">
    <h2 class="tool-list-title">Tools ({Object.keys(tools).length})</h2>
    <Pagination 
        {currentPage}
        {totalPages}
        onPageChange={handlePageChange}
    />
  </div>
  
  {#if Object.keys(tools).length === 0}
    <div class="empty-state">
      <p>No tools found matching your criteria.</p>
    </div>
  {:else}

    <div class="tool-cards">
      {#each Object.entries(paginatedTools) as [key, tool] (tool)}
        <ToolCard 
          {tool}
          isSelected={selectedToolId === key}
          onSelect={onToolSelect}
        />
      {/each}
    </div>
    
    <Pagination 
      {currentPage}
      {totalPages}
      onPageChange={handlePageChange}
    />
  {/if}
</div>

<style>
  .tool-list {
    display: flex;
    flex-direction: column;
  }

  .tool-list-header {
    padding: var(--space-s) 0;
    border-bottom: 1px solid var(--color-background-secondary-2);
    margin-bottom: var(--space-m);
  }

  .tool-list-title {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 600;
    color: var(--color-text);
  }

  .tool-cards {
    flex: 1;
    overflow-y: auto;
    margin-bottom: var(--space-m);
  }

  .empty-state {
    padding: var(--space-xl);
    text-align: center;
    color: var(--color-text-muted);
    font-style: italic;
  }
</style>
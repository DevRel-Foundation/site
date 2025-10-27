<script lang="ts">
  export let currentPage: number = 0;
  export let totalPages: number = 0;
  export let onPageChange: (page: number) => void = () => {};

  $: canGoPrevious = currentPage > 0;
  $: canGoNext = currentPage < totalPages - 1;
</script>

{#if totalPages > 1}
  <div class="pagination">
    <button 
      class="pagination-btn"
      disabled={!canGoPrevious}
      on:click={() => onPageChange(currentPage - 1)}
      aria-label="Previous page"
    >
      ‹ Previous
    </button>
    
    <span class="pagination-info">
      Page {currentPage + 1} of {totalPages}
    </span>
    
    <button 
      class="pagination-btn"
      disabled={!canGoNext}
      on:click={() => onPageChange(currentPage + 1)}
      aria-label="Next page"
    >
      Next ›
    </button>
  </div>
{/if}

<style>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xs) 0;
    gap: var(--space-s);
  }

  .pagination-btn {
    padding: var(--space-xs) var(--space-s);
    background: var(--color-background-secondary-1);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    color: var(--color-text);
    cursor: pointer;
    font-size: var(--step--1);
    transition: all 0.2s ease;
  }

  .pagination-btn:hover:not(:disabled) {
    background: var(--color-button-background-dark);
    border-color: var(--color-button-background);
    color: var(--color-text);
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-info {
    font-size: var(--step--1);
    color: var(--color-text-muted);
    min-width: 100px;
    text-align: center;
  }

  @media (max-width: 480px) {
    .pagination {
      flex-direction: column;
      gap: var(--space-xs);
    }
    
    .pagination-info {
      order: -1;
    }
  }
</style>
<script lang="ts">
  import ToolsList from '../molecules/ToolsList.svelte';
  import ToolDetails from '../molecules/ToolDetails.svelte';

  export let tools: any = {};
  export let selectedTool: any = null;
  export let onToolSelect: (toolId: string) => void = () => {};

  let currentPage = 1;
  const itemsPerPage = 10;

  $: selectedToolId = selectedTool?.id || null;
  $: tools = tools || {};

  function handleToolSelect(toolId: string) {
    onToolSelect(toolId);
  }

  function handlePageChange(page: number) {
    currentPage = page;
  }
</script>


<div class="tools-explorer">
  <div class="tools-list-column">
    <ToolsList 
      {tools}
      {selectedToolId}
      currentPage={currentPage}
      {itemsPerPage}
      onToolSelect={handleToolSelect}
      onPageChange={handlePageChange}
    />
  </div>
  
  <div class="tool-details-column">
    Details later...
    <!--
    <ToolDetails 
      tool={selectedTool}
    />
     -->
  </div>
</div>





<style>
  .tools-explorer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-l);
  }

  .tools-list-column {
    position: relative;
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    padding: var(--space-m);
  }

  .tool-details-column {
    position: relative;
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .tools-explorer {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      height: auto;
      min-height: 800px;
    }
    
    .tools-list-column {
      height: 400px;
    }
    
    .tool-details-column {
      min-height: 400px;
    }
  }

  @media (max-width: 768px) {
    .tools-explorer {
      gap: var(--space-m);
      min-height: 700px;
    }
    
    .tools-list-column,
    .tool-details-column {
      padding: var(--space-s);
    }
  }
</style>
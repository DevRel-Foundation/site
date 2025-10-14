<script lang="ts">
  import ToolsList from '$lib/components/ui/molecules/ToolsList.svelte';
  import ToolDetails from '$lib/components/ui/molecules/ToolDetails.svelte';

  export let tools: any = {};
  export let selectedTool: any = null;
  export let selectedToolData: any = null;
  export let onToolSelect: (tool: string) => void = () => {};

  let currentPage = 0;
  const itemsPerPage = 5;

  $: tools = tools || {};
  $: selectedTool = selectedTool || Object.keys(tools)[0];
  $: {
    const toolKeys = Object.keys(tools);
    if (!toolKeys.includes(selectedTool)) {
        selectedTool = toolKeys[0];
    }
  }

  function handleToolSelect(tool: string) {
    onToolSelect(tool);
  }

  function handlePageChange(page: number) {
    currentPage = page;
  }
</script>

<div class="tools-explorer">
  <div class="tools-list-column">
    <ToolsList 
      {tools}
      {selectedTool}
      currentPage={currentPage}
      {itemsPerPage}
      onToolSelect={handleToolSelect}
      onPageChange={handlePageChange}
    />
  </div>
  
  <div class="tool-details-column">
    <ToolDetails 
      tool={selectedToolData}
    />
  </div>
</div>





<style>
  .tools-explorer {
    width: 90vw;
    max-width: none;
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
    margin-bottom: var(--space-l);
    margin-top: var(--space-m);
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
<script lang="ts">
  import PropertyItem from '../../../atoms/ToolPropertyItem.svelte';
  import SectionDivider from '../../../atoms/SectionDivider.svelte';

  export let tool: any = null;
  $: tool = tool || null;

  let activeTab = 'properties';
  let showCopyToast = false;
  let toastX = 0, toastY = 0;

  function copyToolUrl(event: MouseEvent) {
    if (tool?.id) {
      const url = `${window.location.origin}/projects/tools-catalog/explore?tool=${tool.id}`;
      navigator.clipboard.writeText(url);
      toastX = event.clientX;
      toastY = event.clientY;
      showCopyToast = true;
      setTimeout(() => showCopyToast = false, 1500); // Hide after 1.5s
    }
  }

  function getEditUrl(tool: any): string {
    if (tool?.id) {
      return `https://github.com/DevRel-Foundation/tools-catalog/blob/main/data/${tool.id}.json`;
    }
    return '';
  }
</script>

<div class="tool-details">
  {#if !tool}
    <div class="empty-state">
      <h2>Select a Tool</h2>
      <p>Choose a tool from the list to view additional details.</p>
    </div>
  {:else}
    <div class="tool-details-content">
      <div class="tool-details-header">
        <h2 class="tool-title">{tool.name}</h2>
            {#if showCopyToast}
                <div class="toast"
                    style="position:fixed; left:{toastX}px; top:{toastY}px;"
                >Link copied!</div>
            {/if}

            <button 
            class="share-btn"
            on:click={(e) => copyToolUrl(e)}
            title="Copy link to this tool"
            >
            Share 🔗
            </button>
      </div>

      {#if tool.description}
        <p class="tool-description">{tool.description}</p>
      {/if}

      <SectionDivider />

      <!-- Tab Content -->
      <div class="tab-content">
        {#if activeTab === 'properties'}
          <div class="tool-properties">
            <dl class="properties-list">
              <PropertyItem label="URL" format="url" value={tool.url} />
              <PropertyItem label="Job Categories" value={tool.jobs ? tool.jobs.categories : []} />
              <PropertyItem label="Outcomes" value={tool.jobs ? tool.jobs.outcomes : []} />
              <PropertyItem label="Motivations" value={tool.jobs ? tool.jobs.motivations : []} />
              <PropertyItem label="Scenarios" value={tool.jobs ? tool.jobs.scenarios : []} />
              <PropertyItem label="Labels" value={tool.labels} />
            </dl>
          </div>
        {:else if activeTab === 'evaluation'}
          <div class="tab-placeholder">
            <h3>Evaluation</h3>
            <p>Tool evaluation criteria and metrics will be displayed here.</p>
          </div>
        {:else if activeTab === 'learn'}
          <div class="tab-placeholder">
            <h3>Learn</h3>
            <p>Learning resources and documentation will be displayed here.</p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Bottom Tabs -->
    <div class="tabs">
      <button 
        class="tab {activeTab === 'properties' ? 'active' : ''}"
        on:click={() => activeTab = 'properties'}
      >
        Properties
      </button>
      <button 
        class="tab {activeTab === 'evaluation' ? 'active' : ''}"
        on:click={() => activeTab = 'evaluation'}
      >
        Evaluation
      </button>
      <button 
        class="tab {activeTab === 'learn' ? 'active' : ''}"
        on:click={() => activeTab = 'learn'}
      >
        Learn
      </button>
      {#if tool?.id}
      <a 
        class="tab"
        href={getEditUrl(tool)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Edit ↗

      </a>
      {:else}
      <a 
        class="tab"
        href="https://github.com/devrel-foundation/tools-catalog"
        target="_blank"
        rel="noopener noreferrer"
      >
        Edit ↗
      </a>

      {/if}
    </div>
  {/if}

</div>

<style>
  .tool-details {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
    overflow: hidden;
  }

  .tool-details-content {
    flex: 1;
    padding: var(--space-m);
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
    padding: var(--space-m);
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

  .tool-description {
    margin-bottom: var(--space-l);
    line-height: 1.6;
    color: var(--color-text);
  }

  .tab-content {
    flex: 1;
    min-height: 0;
  }

  .tab-placeholder {
    padding: var(--space-l);
    text-align: center;
    color: var(--color-text-muted);
  }

  .tab-placeholder h3 {
    margin: 0 0 var(--space-s) 0;
    color: var(--color-text);
    font-size: var(--step-1);
  }

  .tab-placeholder p {
    margin: 0;
    line-height: 1.6;
  }

  .tabs {
    display: flex;
    border-top: 1px solid var(--color-background-secondary-2);
    background: var(--color-background-secondary-2);
  }

  .tab {
    flex: 1;
    padding: var(--space-s) var(--space-m);
    background: none;
    border: none;
    border-right: 1px solid var(--color-background-secondary-2);
    color: var(--color-text-muted);
    font-size: var(--step--1);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab:last-child {
    border-right: none;
  }

  .tab:hover {
    background: var(--color-button-background-dark);
    color: var(--color-text);
    opacity: 0.72;
  }

  .tab.active {
    background: var(--color-button-background);
    color: var(--color-text-dark);
    border-top: 2px solid var(--color-mint-dark);
  }

  .tab.active:hover {
    background: var(--color-background-secondary-1);
    color: var(--color-text);
    border-top: 0px solid var(--color-background-secondary-1);
    opacity: 1.0;
    cursor: default;
  }

  .share-btn {
    padding: var(--space-xs) var(--space-s);
    background: var(--color-button-background);
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
    background: var(--color-button-background-dark);
    color: var(--color-text);
    transform: translateY(-1px);
  }

  .properties-list {
    margin: 0;
  }

  .toast {
    position: relative;
    transform: translateX(-50%);
    background: black;
    color: var(--color-offwhite);
    padding: 0.75em 1.5em;
    border-radius: var(--radius-s);
    box-shadow: 0 2px 8px rgba(95,255,199,0.15);
    font-weight: 600;
    z-index: 1000;
    opacity: 0.95;
    transition: opacity 0.2s;
  }
</style>
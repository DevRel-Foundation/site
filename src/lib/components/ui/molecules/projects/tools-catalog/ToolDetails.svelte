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
          <div class="evaluation-content">
            {#if tool.evaluation && tool.evaluation.length > 0}
              <div class="evaluation-list">
                {#each tool.evaluation as evaluation, index}
                  <div class="evaluation-item">
                    <div class="evaluation-header">
                      <h4 class="evaluation-source">
                        {evaluation.team.toUpperCase() === 'N/A' ? 'Anonymous DevRel Team' : evaluation.team}
                      </h4>
                      {#if evaluation.decision}
                        <span class="decision-badge {evaluation.decision}">{evaluation.decision}</span>
                      {/if}
                    </div>
                    
                    <div class="evaluation-meta">
                      {#if evaluation.pricing}
                        <div class="meta-item">
                          <strong>Pricing:</strong> {evaluation.pricing}
                        </div>
                      {/if}
                      {#if evaluation.compatibility}
                        <div class="meta-item">
                          <strong>Compatibility:</strong> {evaluation.compatibility}
                        </div>
                      {/if}
                      {#if evaluation.customizability}
                        <div class="meta-item">
                          <strong>Customizability:</strong> {evaluation.customizability.join(', ')}
                        </div>
                      {/if}
                    </div>

                    {#if evaluation.notes && evaluation.notes.length > 0}
                      <div class="evaluation-notes">
                        {#each evaluation.notes as note}
                          <p>{note}</p>
                        {/each}
                      </div>
                    {/if}
                  </div>
                  {#if index < tool.evaluation.length - 1}
                    <hr class="evaluation-divider">
                  {/if}
                {/each}
              </div>
            {:else}
              <div class="tab-placeholder">
                <h3>Evaluation</h3>
                <p>No evaluation data available for this tool.</p>
              </div>
            {/if}
          </div>
        {:else if activeTab === 'learn'}
          <div class="learning-content">
            {#if tool.learning}
              <div class="learning-sections">
                <!-- Setup Section -->
                {#if tool.learning.setup && tool.learning.setup.length > 0}
                  <div class="learning-section">
                    <h3>Setup</h3>
                    <ul class="learning-list">
                      {#each tool.learning.setup as item}
                        {#if item.type === 'article'}
                          <li class="learning-item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" class="learning-link">
                              {item.title}
                            </a>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  </div>
                {/if}

                <!-- Getting Started Section -->
                {#if tool.learning['getting-started'] && tool.learning['getting-started'].length > 0}
                  <div class="learning-section">
                    <h3>Getting Started</h3>
                    <ul class="learning-list">
                      {#each tool.learning['getting-started'] as item}
                        {#if item.type === 'article'}
                          <li class="learning-item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" class="learning-link">
                              {item.title}
                            </a>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  </div>
                {/if}

                <!-- Advanced Section -->
                {#if tool.learning.advanced && tool.learning.advanced.length > 0}
                  <div class="learning-section">
                    <h3>Advanced</h3>
                    <ul class="learning-list">
                      {#each tool.learning.advanced as item}
                        {#if item.type === 'article'}
                          <li class="learning-item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" class="learning-link">
                              {item.title}
                            </a>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  </div>
                {/if}

                {#if (!tool.learning.setup || tool.learning.setup.length === 0) && 
                     (!tool.learning['getting-started'] || tool.learning['getting-started'].length === 0) && 
                     (!tool.learning.advanced || tool.learning.advanced.length === 0)}
                  <div class="tab-placeholder">
                    <h3>Learn</h3>
                    <p>No learning resources available for this tool.</p>
                  </div>
                {/if}
              </div>
            {:else}
              <div class="tab-placeholder">
                <h3>Learn</h3>
                <p>No learning resources available for this tool.</p>
              </div>
            {/if}
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

  /* Evaluation Tab Styles */
  .evaluation-content {
    padding: var(--space-m);
  }

  .evaluation-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  .evaluation-item {
    border-radius: var(--radius-s);
    border: 1px solid var(--color-button-background);
    padding: var(--space-m);
  }

  .evaluation-header {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-s);
  }

  .evaluation-source {
    margin: 0;
    font-size: var(--step-0);
    font-weight: 600;
    color: var(--color-text);
    flex: 1;
  }

  .decision-badge {
    padding: var(--space-2xs) var(--space-xs);
    border-radius: var(--radius-s);
    font-size: var(--step--1);
    font-weight: 500;
    text-transform: lowercase;
  }

  .decision-badge.considering {
    background: var(--color-mint);
    color: var(--color-mint-dark)
  }

  .decision-badge.approved {
    background: #D1FAE5;
    color: #065F46;
  }

  .decision-badge.rejected {
    background: #FEE2E2;
    color: #991B1B;
  }

  .decision-badge.using {
    background: var(--color-mint);
    color: var(--color-text-dark);
  }

  .evaluation-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-m);
    margin-bottom: var(--space-s);
    font-size: var(--step--1);
  }

  .meta-item {
    color: var(--color-text);
  }

  .meta-item strong {
    color: var(--color-text);
  }

  .evaluation-notes {
    border-top: 1px solid var(--color-background-secondary-1);
    padding-top: var(--space-s);
    margin-top: var(--space-s);
  }

  .evaluation-notes p {
    margin: 0 0 var(--space-xs) 0;
    line-height: 1.6;
    color: var(--color-text);
  }

  .evaluation-notes p:last-child {
    margin-bottom: 0;
  }

  .evaluation-divider {
    border: none;
    border-top: 1px solid var(--color-background-secondary-2);
    margin: var(--space-l) 0;
  }

  /* Learning Tab Styles */
  .learning-content {
    padding: var(--space-m);
  }

  .learning-sections {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
  }

  .learning-section {
    border-radius: var(--radius-s);
    padding: var(--space-m);
  }

  .learning-section h3 {
    margin: 0 0 var(--space-m) 0;
    font-size: var(--step-1);
    font-weight: 600;
    color: var(--color-text);
    padding-bottom: var(--space-xs);
  }

  .learning-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }

  .learning-item {
    position: relative;
    padding-left: var(--space-m);
  }

  .learning-item::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--color-button-background);
    font-weight: bold;
  }

  .learning-link {
    color: var(--color-link);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
    font-weight: 500;
  }

  .learning-link:hover {
    color: var(--color-link);
    border-bottom-color: var(--color-link);
  }

  .learning-link:visited {
    opacity: 0.8;
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
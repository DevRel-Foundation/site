<script lang="ts">
  export let property: { key: string; label: string; value: any };
</script>

<div class="property-item">
  <dt class="property-label">{property.label}</dt>
  <dd class="property-value">
    {#if Array.isArray(property.value)}
      {#if property.value.length > 0}
        <ul class="property-list">
          {#each property.value as item}
            <li>{item}</li>
          {/each}
        </ul>
      {:else}
        <span class="property-empty">None</span>
      {/if}
    {:else if typeof property.value === 'object' && property.value !== null}
      <pre class="property-object">{JSON.stringify(property.value, null, 2)}</pre>
    {:else if property.value}
      {#if property.key === 'url' || property.key === 'homepage' || property.key === 'repository'}
        <a href={property.value} target="_blank" rel="noopener noreferrer" class="property-link">
          {property.value}
        </a>
      {:else}
        <span class="property-text">{property.value}</span>
      {/if}
    {:else}
      <span class="property-empty">Not specified</span>
    {/if}
  </dd>
</div>

<style>
  .property-item {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-s);
    padding: var(--space-s) 0;
    border-bottom: 1px solid var(--color-background-secondary-2);
  }

  .property-item:last-child {
    border-bottom: none;
  }

  .property-label {
    font-weight: 600;
    color: var(--color-text);
    font-size: var(--step--1);
    margin: 0;
    align-self: start;
  }

  .property-value {
    margin: 0;
    font-size: var(--step--1);
    color: var(--color-text);
    word-break: break-word;
  }

  .property-list {
    margin: 0;
    padding-left: var(--space-m);
    list-style-type: disc;
  }

  .property-list li {
    margin-bottom: var(--space-2xs);
  }

  .property-object {
    background: var(--color-background-secondary-2);
    padding: var(--space-s);
    border-radius: var(--radius-s);
    font-size: var(--step--2);
    overflow-x: auto;
    margin: 0;
  }

  .property-link {
    color: var(--color-link);
    text-decoration: underline;
  }

  .property-link:hover {
    color: var(--color-mint);
  }

  .property-text {
    color: var(--color-text);
  }

  .property-empty {
    color: var(--color-text-muted);
    font-style: italic;
  }

  @media (max-width: 768px) {
    .property-item {
      grid-template-columns: 1fr;
      gap: var(--space-2xs);
    }
  }
</style>
<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import { fly } from 'svelte/transition';
  import { flyPreset } from '$lib/motion';
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    triggerLabel?: string;
    trigger: Snippet;
    children: Snippet;
    class?: string;
  }

  let {
    open = $bindable(false),
    triggerLabel,
    trigger,
    children,
    class: className = ''
  }: Props = $props();

  const flyTransition = flyPreset('xs', 'xs');
</script>

<Collapsible.Root bind:open class="collapsible-panel {className}">
  <Collapsible.Trigger class="collapsible-panel__trigger" aria-label={triggerLabel}>
    {@render trigger()}
  </Collapsible.Trigger>
  <Collapsible.Content forceMount class="collapsible-panel__content-root">
    {#snippet child({ props, open: isOpen })}
      {#if isOpen}
        <div {...props} class="collapsible-panel__content" transition:fly={flyTransition}>
          {@render children()}
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>

<style>
  :global(.collapsible-panel) {
    width: 100%;
  }

  :global(.collapsible-panel__trigger) {
    width: 100%;
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    text-align: left;
    list-style: none;
  }

  :global(.collapsible-panel__trigger:focus-visible) {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
    border-radius: var(--radius-m);
  }

  :global(.collapsible-panel__content-root) {
    display: block;
  }

  :global(.collapsible-panel__content) {
    display: block;
  }
</style>

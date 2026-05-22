<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    content: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    trigger: Snippet;
  }

  let { content, side = 'top', sideOffset = 8, trigger }: Props = $props();
</script>

<Tooltip.Root delayDuration={200}>
  <Tooltip.Trigger class="app-tooltip-trigger">
    {@render trigger()}
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content {side} {sideOffset} class="app-tooltip-content">
      {content}
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>

<style>
  :global(.app-tooltip-trigger) {
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
    padding: 0;
    cursor: help;
    font: inherit;
    color: inherit;
  }

  :global(.app-tooltip-trigger:focus-visible) {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
    border-radius: var(--radius-xs);
  }

  :global(.app-tooltip-content) {
    z-index: var(--z-tooltip);
    max-width: 18rem;
    padding: var(--space-xs) var(--space-s);
    background: var(--color-background-secondary-2);
    color: var(--color-text);
    border: var(--border-thickness) solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    font-size: var(--step--1);
    line-height: 1.4;
    box-shadow: var(--shadow-s);
  }
</style>

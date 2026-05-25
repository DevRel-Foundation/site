<script lang="ts">
  import { Button } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
  }

  let {
    href,
    type = 'button',
    disabled = false,
    class: className = '',
    onclick,
    children
  }: Props = $props();
</script>

{#if href}
  <Button.Root {href} {disabled} class="cta-button {className}" {onclick}>
    {@render children()}
  </Button.Root>
{:else}
  <Button.Root {type} {disabled} class="cta-button {className}" {onclick}>
    {@render children()}
  </Button.Root>
{/if}

<style>
  :global(.cta-button) {
    margin: 0;
    padding: var(--space-xs) var(--space-l);
    background: var(--color-button-background);
    border: none;
    cursor: pointer;
    border-radius: var(--radius-pill);
    font-weight: 500;
    font-family: inherit;
    font-size: inherit;
    line-height: 1;
    white-space: nowrap;
    transition: all 0.2s ease;
    color: var(--color-button-text);
    display: block;
    text-decoration: none;
    text-align: center;
    box-sizing: border-box;
  }

  :global(.cta-button:hover) {
    background-color: var(--color-button-background);
    transform: translateY(-1px);
    color: var(--color-button-text);
    text-decoration: underline;
  }

  :global(.cta-button:focus-visible) {
    outline: 2px solid var(--color-button-background);
    outline-offset: 2px;
  }

  :global(.cta-button:active) {
    transform: translateY(0);
    background-color: var(--color-button-background);
  }

  :global(.cta-button:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
</style>

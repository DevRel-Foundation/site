<script lang="ts">
  import './CtaButton.css';
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

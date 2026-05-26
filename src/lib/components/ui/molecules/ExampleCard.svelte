<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    headingLevel?: 'h3' | 'h4';
    icon?: string;
    iconAlt?: string;
    class?: string;
    header?: Snippet;
    children: Snippet;
  }

  let {
    title,
    headingLevel = 'h3',
    icon,
    iconAlt = '',
    class: className = '',
    header,
    children
  }: Props = $props();
</script>

<article class="example-component {className}">
  <div class="example-header">
    {#if header}
      {@render header()}
    {:else}
      {#if icon}
        <img src={icon} alt={iconAlt} class="example-header__icon" />
      {/if}
      {#if title}
        <svelte:element this={headingLevel} class="example-header__title">{title}</svelte:element>
      {/if}
    {/if}
  </div>
  <div class="example-body">
    {@render children()}
  </div>
</article>

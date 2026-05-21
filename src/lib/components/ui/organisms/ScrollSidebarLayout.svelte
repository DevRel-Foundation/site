<script lang="ts">
  import ScrollSidebarNav from '$lib/components/ui/molecules/ScrollSidebarNav.svelte';
  import type { ScrollSidebarItem } from '$lib/scroll-sidebar';
  import type { Snippet } from 'svelte';

  interface Props {
    items?: ScrollSidebarItem[];
    navLabel?: string;
    sidebarTitle?: string;
    class?: string;
    /** Full-width content above the sidebar column (e.g. page title) */
    header?: Snippet;
    children?: Snippet;
  }

  let {
    items = [],
    navLabel = 'Page sections',
    sidebarTitle = 'On this page',
    class: className = '',
    header,
    children
  }: Props = $props();
</script>

<div class="scroll-sidebar-layout {className}" class:scroll-sidebar-layout--has-header={!!header}>
  {#if header}
    <div class="scroll-sidebar-layout__header">
      {@render header()}
    </div>
  {/if}
  {#if items.length > 0}
    <div class="scroll-sidebar-layout__aside">
      <ScrollSidebarNav {items} {navLabel} title={sidebarTitle} />
    </div>
  {/if}
  <div class="scroll-sidebar-layout__main">
    {@render children?.()}
  </div>
</div>

<style>
  .scroll-sidebar-layout {
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--space-m);
  }

  .scroll-sidebar-layout__header {
    margin-bottom: var(--space-m);
  }

  .scroll-sidebar-layout__main {
    min-width: 0;
  }

  .scroll-sidebar-layout__main :global(h2[id]),
  .scroll-sidebar-layout__main :global(h3[id]),
  .scroll-sidebar-layout__main :global(section[id]) {
    scroll-margin-top: calc(3.5rem + var(--space-m));
  }

  @media (min-width: 48.0625rem) {
    .scroll-sidebar-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(11rem, 13.5rem);
      gap: var(--space-l);
      align-items: start;
      max-width: calc(var(--grid-max-width) + 13.5rem + var(--space-l));
      padding-inline: var(--grid-gutter);
    }

    .scroll-sidebar-layout--has-header .scroll-sidebar-layout__header {
      grid-column: 1 / -1;
      grid-row: 1;
      margin-bottom: 0;
    }

    .scroll-sidebar-layout__main {
      grid-column: 1;
    }

    .scroll-sidebar-layout--has-header .scroll-sidebar-layout__main {
      grid-row: 2;
    }

    .scroll-sidebar-layout:not(.scroll-sidebar-layout--has-header) .scroll-sidebar-layout__main {
      grid-row: 1;
    }

    .scroll-sidebar-layout__aside {
      grid-column: 2;
      align-self: stretch;
      min-height: 0;
    }

    /* Sticky within the tall grid row so the nav follows page scroll */
    .scroll-sidebar-layout__aside :global(.scroll-sidebar-nav-root) {
      position: sticky;
      top: calc(4rem + var(--space-s));
      max-height: calc(100vh - 4rem - var(--space-s) - var(--space-m));
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      z-index: var(--z-raised);
    }

    .scroll-sidebar-layout--has-header .scroll-sidebar-layout__aside {
      grid-row: 2;
    }

    .scroll-sidebar-layout:not(.scroll-sidebar-layout--has-header) .scroll-sidebar-layout__aside {
      grid-row: 1;
    }
  }
</style>

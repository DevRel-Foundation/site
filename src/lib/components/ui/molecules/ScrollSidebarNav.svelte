<script lang="ts">
  import { tick } from 'svelte';
  import {
    createScrollSpy,
    hrefToId,
    scrollSidebarLinkIntoView,
    scrollToSection,
    type ScrollSidebarItem
  } from '$lib/scroll-sidebar';

  interface Props {
    items?: ScrollSidebarItem[];
    /** Accessible label for the navigation landmark */
    navLabel?: string;
    /** Heading shown above the link list (desktop) / collapsible trigger (mobile) */
    title?: string;
    class?: string;
  }

  let {
    items = [],
    navLabel = 'Page sections',
    title = 'On this page',
    class: className = ''
  }: Props = $props();

  let activeId = $state('');
  let mobileOpen = $state(false);
  let navRootEl: HTMLElement | undefined = $state();
  let desktopNavEl: HTMLElement | undefined = $state();
  let mobileNavEl: HTMLElement | undefined = $state();

  const sectionIds = $derived(items.map((item) => hrefToId(item.href)));

  $effect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = hrefToId(window.location.hash);
      if (sectionIds.includes(hashId)) activeId = hashId;
    }

    return createScrollSpy(sectionIds, (id) => {
      activeId = id;
    });
  });

  function isActive(href: string): boolean {
    return activeId === hrefToId(href);
  }

  async function handleNavClick(event: MouseEvent, href: string) {
    event.preventDefault();
    const id = hrefToId(href);
    activeId = id;
    scrollToSection(id);
    await tick();
    scrollSidebarLinkIntoView(id, [navRootEl, mobileNavEl]);
    mobileOpen = false;
  }
</script>

<div class="scroll-sidebar-nav-root {className}" bind:this={navRootEl}>
<!-- Mobile: collapsible jump menu -->
<div class="scroll-sidebar-nav scroll-sidebar-nav--mobile">
  <details class="scroll-sidebar-nav__mobile-details" bind:open={mobileOpen}>
    <summary class="scroll-sidebar-nav__mobile-trigger">
      <span class="scroll-sidebar-nav__title">{title}</span>
      <span class="scroll-sidebar-nav__chevron" aria-hidden="true">▾</span>
    </summary>
    <nav
      class="scroll-sidebar-nav__list scroll-sidebar-nav__mobile-panel"
      aria-label={navLabel}
      bind:this={mobileNavEl}
    >
      <ul>
        {#each items as item (item.href)}
          <li>
            <a
              href={item.href}
              class="scroll-sidebar-nav__link"
              class:is-active={isActive(item.href)}
              aria-current={isActive(item.href) ? 'location' : undefined}
              onclick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </details>
</div>

<!-- Desktop: sidebar on the right (sticky positioning on layout wrapper) -->
<aside class="scroll-sidebar-nav scroll-sidebar-nav--desktop" aria-label={navLabel}>
  <div class="scroll-sidebar-nav__inner" bind:this={desktopNavEl}>
    <p class="scroll-sidebar-nav__title">{title}</p>
    <nav class="scroll-sidebar-nav__list">
      <ul>
        {#each items as item (item.href)}
          <li>
            <a
              href={item.href}
              class="scroll-sidebar-nav__link"
              class:is-active={isActive(item.href)}
              aria-current={isActive(item.href) ? 'location' : undefined}
              onclick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</aside>
</div>

<style>
  .scroll-sidebar-nav-root {
    width: 100%;
  }

  .scroll-sidebar-nav--mobile {
    display: block;
  }

  .scroll-sidebar-nav--desktop {
    display: none;
  }

  .scroll-sidebar-nav__mobile-details {
    background: var(--color-background-secondary-1);
    border: var(--border-thickness) solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
  }

  .scroll-sidebar-nav__mobile-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-s);
    padding: var(--space-s) var(--space-m);
    cursor: pointer;
    font-family: inherit;
    font-size: var(--step-0);
    font-weight: 600;
    color: var(--color-text);
    list-style: none;
  }

  .scroll-sidebar-nav__mobile-trigger::-webkit-details-marker {
    display: none;
  }

  .scroll-sidebar-nav__mobile-details[open] .scroll-sidebar-nav__chevron {
    transform: rotate(180deg);
  }

  .scroll-sidebar-nav__mobile-trigger:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
    border-radius: var(--radius-m);
  }

  .scroll-sidebar-nav__chevron {
    display: inline-block;
    transition: transform var(--transition-fast);
    color: var(--color-link);
  }

  .scroll-sidebar-nav__mobile-panel {
    padding: 0 var(--space-m) var(--space-s);
    border-top: var(--border-thickness) solid var(--color-background-secondary-2);
  }

  .scroll-sidebar-nav__title {
    margin: 0 0 var(--space-s);
    font-size: var(--step--1);
    font-weight: 600;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .scroll-sidebar-nav--mobile .scroll-sidebar-nav__title {
    margin: 0;
    text-transform: none;
    letter-spacing: normal;
  }

  .scroll-sidebar-nav__inner {
    padding: var(--space-s);
    background: var(--color-background-secondary-1);
    border: var(--border-thickness) solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
  }

  .scroll-sidebar-nav__list ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .scroll-sidebar-nav__link {
    display: block;
    padding: var(--space-2xs) var(--space-xs);
    border-radius: var(--radius-xs);
    color: var(--color-link);
    text-decoration: none;
    font-size: var(--step--1);
    line-height: 1.4;
    border-left: 3px solid transparent;
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast),
      color var(--transition-fast);
  }

  .scroll-sidebar-nav__link:hover {
    background: var(--color-background-secondary-2);
    text-decoration: none;
  }

  .scroll-sidebar-nav__link.is-active {
    background: var(--color-background-secondary-2);
    border-left-color: var(--color-mint-dark);
    color: var(--color-text);
    font-weight: 600;
  }

  :global(body.dark-mode) .scroll-sidebar-nav__link.is-active {
    border-left-color: var(--color-mint);
  }

  @media (min-width: 48.0625rem) {
    .scroll-sidebar-nav--mobile {
      display: none;
    }

    .scroll-sidebar-nav--desktop {
      display: block;
    }
  }
</style>

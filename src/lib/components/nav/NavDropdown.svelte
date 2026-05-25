<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    href: string;
    isMobile: boolean;
    menuOpen?: boolean;
    desktopActive?: boolean;
    onDesktopEnter?: () => void;
    onDesktopLeave?: () => void;
    children: Snippet;
  }

  let {
    label,
    href,
    isMobile,
    menuOpen = false,
    desktopActive = false,
    onDesktopEnter = () => {},
    onDesktopLeave = () => {},
    children
  }: Props = $props();

  let mobileOpen = $state(false);

  $effect(() => {
    if (!menuOpen) {
      mobileOpen = false;
    }
  });
</script>

<li
  class="nav-item dropdown-container"
  onmouseenter={() => !isMobile && onDesktopEnter()}
  onmouseleave={() => !isMobile && onDesktopLeave()}
>
  <a
    {href}
    class="nav-link"
    class:active={!isMobile && desktopActive}
    onclick={isMobile
      ? (e) => {
          e.preventDefault();
          mobileOpen = !mobileOpen;
        }
      : undefined}
  >
    {label}
  </a>
  <div
    class="dropdown"
    class:active={!isMobile && desktopActive}
    class:accordion-open={isMobile && mobileOpen}
    onmouseenter={() => !isMobile && onDesktopEnter()}
    onmouseleave={() => !isMobile && onDesktopLeave()}
  >
    <div class="layout-section dropdown-content">
      {@render children()}
    </div>
  </div>
</li>

<style>
  .dropdown-container {
    position: relative;
  }

  .nav-link {
    position: relative;
    transition: all 0.2s ease;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--color-mint);
    border-radius: 2px;
  }

  .dropdown {
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background: var(--color-background);
    border-top: 3px solid var(--color-mint-dark);
    border-bottom: 1px solid var(--color-mint-dark);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 999;
    pointer-events: none;
  }

  .dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Invisible bridge so the cursor can cross from the nav link to the fixed panel */
  .dropdown.active::before {
    content: '';
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    height: var(--space-s);
    transform: translateY(-100%);
    pointer-events: auto;
    z-index: 999;
  }

  .dropdown-content {
    padding: var(--space-l);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  @media (max-width: 768px) {
    .nav-link.active::after {
      display: none;
    }

    .dropdown {
      position: static;
      opacity: 0;
      visibility: hidden;
      height: 0;
      overflow: hidden;
      transform: none;
      box-shadow: none;
      border: none;
      border-top: none;
      background: var(--color-background-secondary-1);
      margin-top: 0;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .dropdown.accordion-open {
      opacity: 1;
      visibility: visible;
      height: auto;
      margin-top: var(--space-xs);
      pointer-events: auto;
    }

    .dropdown-content {
      padding: var(--space-s);
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
</style>

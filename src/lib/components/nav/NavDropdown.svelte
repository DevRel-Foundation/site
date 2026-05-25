<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id: string;
    label: string;
    href: string;
    isMobile: boolean;
    mobileActive?: boolean;
    onMobileToggle?: () => void;
    desktopActive?: boolean;
    onDesktopEnter?: () => void;
    onDesktopLeave?: () => void;
    children: Snippet;
  }

  let {
    id,
    label,
    href,
    isMobile,
    mobileActive = false,
    onMobileToggle = () => {},
    desktopActive = false,
    onDesktopEnter = () => {},
    onDesktopLeave = () => {},
    children
  }: Props = $props();
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
    aria-expanded={isMobile ? mobileActive : desktopActive}
    aria-controls={isMobile ? `${id}-submenu` : undefined}
    onclick={isMobile
      ? (e) => {
          e.preventDefault();
          onMobileToggle();
        }
      : undefined}
  >
    {label}
  </a>
  <div
    id={isMobile ? `${id}-submenu` : undefined}
    class="dropdown"
    role="group"
    aria-label={label}
    class:active={!isMobile && desktopActive}
    class:accordion-open={isMobile && mobileActive}
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

  .dropdown {
    position: static;
    opacity: 0;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    transform: none;
    box-shadow: none;
    border: none;
    border-radius: var(--radius-s);
    background: var(--color-background-secondary-1);
    margin-top: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .dropdown.accordion-open {
    opacity: 1;
    visibility: visible;
    height: auto;
    margin-top: var(--space-2xs);
    pointer-events: auto;
  }

  .dropdown-content {
    padding: var(--space-2xs) var(--space-s) var(--space-m) var(--space-s);
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }

  @media (min-width: 769px) {
    .nav-link.active::after {
      display: block;
      content: '';
      position: absolute;
      bottom: calc(-1 * var(--space-3xs));
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--color-accent-green);
      border-radius: 2px;
    }

    .dropdown {
      position: fixed;
      top: var(--nav-bar-height, 4rem);
      left: 0;
      right: 0;
      height: auto;
      overflow: visible;
      border-radius: 0;
      background: var(--color-background);
      border-top: 3px solid var(--color-forest);
      border-bottom: var(--border-thickness) solid var(--color-forest);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      z-index: 999;
      margin-top: 0;
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
      top: var(--nav-bar-height, 4rem);
      left: 0;
      right: 0;
      height: var(--space-s);
      transform: translateY(-100%);
      pointer-events: auto;
      z-index: 999;
    }

    .dropdown.accordion-open {
      margin-top: 0;
    }

    .dropdown-content {
      padding: var(--space-l);
      grid-template-columns: 1fr 1fr;
      gap: var(--space-xl);
    }
  }
</style>

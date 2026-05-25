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
  {#if isMobile}
    <a
      {href}
      class="nav-link"
      onclick={(e) => {
        e.preventDefault();
        mobileOpen = !mobileOpen;
      }}
    >
      {label}
    </a>
    <div class="dropdown" class:accordion-open={mobileOpen}>
      <div class="layout-section dropdown-content">
        {@render children()}
      </div>
    </div>
  {:else}
    <a {href} class="nav-link" class:active={desktopActive}>{label}</a>
    <div class="dropdown" class:active={desktopActive}>
      <div class="layout-section dropdown-content">
        {@render children()}
      </div>
    </div>
  {/if}
</li>

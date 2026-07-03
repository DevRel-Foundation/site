<script lang="ts">
  import MenuIcon from 'iconoir/icons/menu.svg';
  import SunLightIcon from 'iconoir/icons/sun-light.svg';
  import HalfMoonIcon from 'iconoir/icons/half-moon.svg';
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import CallToActionButton from '$lib/components/ui/molecules/NavJoinButton.svelte';
  import NavDropdown from '$lib/components/nav/NavDropdown.svelte';

  const menuIcons = {
    discord: DiscordIcon,
    github: GitHubIcon
  } as const;

  type NavMenuIcon = keyof typeof menuIcons;

  type NavMenuItem = {
    title: string;
    href: string;
    target?: string;
    rel?: string;
    variant?: 'brief';
    icon?: NavMenuIcon;
    iconAlt?: string;
  };

  type NavMenuSection = {
    title: string;
    description: string;
    items: NavMenuItem[];
  };

  type NavMenu = {
    id: string;
    label: string;
    href: string;
    sections: NavMenuSection[];
  };

  const NAV_MENUS: NavMenu[] = [
    {
      id: 'about',
      label: 'About',
      href: '/about/mission',
      sections: [
        {
          title: 'About the DevRel Foundation',
          description: 'Our mission and working groups.',
          items: [
            { title: 'Mission', href: '/about/mission' },
            { title: 'Steering Committee', href: '/about/steering-committee' },
            { title: 'Working groups', href: '/about/working-groups' },
            {
              title: 'Community calendar',
              href: '/calendar',
              rel: 'noopener noreferrer'
            },
            { title: 'Contact', href: '/contact' }
          ]
        },
        {
          title: 'Foundation resources',
          description: 'Governance documents.',
          items: [
            {
              title: 'Charter ↗',
              href: 'https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter.adoc',
              target: '_blank',
              rel: 'noopener noreferrer',
              variant: 'brief'
            },
            {
              title: 'Code of conduct ↗',
              href: 'https://github.com/DevRel-Foundation/governance/blob/main/code_of_conduct.md',
              target: '_blank',
              rel: 'noopener noreferrer',
              variant: 'brief'
            }
          ]
        }
      ]
    },
    {
      id: 'learn',
      label: 'Learn',
      href: '/learn/what-is-devrel',
      sections: [
        {
          title: 'Learn about DevRel',
          description: 'Blog posts, guides, and introductions to developer relations.',
          items: [
            { title: 'DevRel Foundation blog', href: '/blog' },
            { title: 'What is developer relations?', href: '/learn/what-is-devrel' }
          ]
        },
        {
          title: 'Community resources',
          description: 'Join the conversation with fellow DevRel professionals.',
          items: [
            {
              title: 'Discord ↗',
              href: 'https://discord.gg/G7CSTKZcuT',
              target: '_blank',
              rel: 'noopener noreferrer',
              variant: 'brief',
              icon: 'discord',
              iconAlt: 'Join us on Discord'
            }
          ]
        }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '/projects',
      sections: [
        {
          title: 'Get involved',
          description: 'Explore open projects and contribute to the foundation.',
          items: [
            { title: 'Explore projects', href: '/projects' },
            {
              title: 'Contribute',
              href: '/join-us',
              rel: 'noopener noreferrer'
            }
          ]
        },
        {
          title: 'Project resources',
          description: 'Open-source code, data, and frameworks on GitHub.',
          items: [
            {
              title: 'GitHub ↗',
              href: 'https://github.com/devrel-foundation/',
              target: '_blank',
              rel: 'noopener noreferrer',
              variant: 'brief',
              icon: 'github',
              iconAlt: 'Explore our GitHub'
            }
          ]
        }
      ]
    }
  ];

  let isMenuOpen = $state(false);
  let isDarkMode = $state(false);
  let activeDropdown = $state<string | null>(null);
  let hideDropdownTimeout: ReturnType<typeof setTimeout> | undefined;
  let mediaQuery;
  let isMobile = $state(false);

  const DROPDOWN_CLOSE_DELAY_MS = 200;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (!isMenuOpen) {
      activeDropdown = null;
    }
  }

  function toggleMobileDropdown(menuId: string) {
    activeDropdown = activeDropdown === menuId ? null : menuId;
  }

  function setDarkModeClass(enabled: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark-mode', enabled);
      document.body?.classList.toggle('dark-mode', enabled);
    }
  }

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    setDarkModeClass(isDarkMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.toString());
    }
  }

  function showDropdown(menuItem: string) {
    if (hideDropdownTimeout) {
      clearTimeout(hideDropdownTimeout);
      hideDropdownTimeout = undefined;
    }
    activeDropdown = menuItem;
  }

  function hideDropdown() {
    if (hideDropdownTimeout) {
      clearTimeout(hideDropdownTimeout);
    }
    hideDropdownTimeout = setTimeout(() => {
      activeDropdown = null;
      hideDropdownTimeout = undefined;
    }, DROPDOWN_CLOSE_DELAY_MS);
  }

  function closeAll() {
    if (hideDropdownTimeout) {
      clearTimeout(hideDropdownTimeout);
      hideDropdownTimeout = undefined;
    }
    isMenuOpen = false;
    activeDropdown = null;
  }

  $effect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');

      if (savedMode !== null) {
        isDarkMode = savedMode === 'true';
      } else {
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        isDarkMode = mediaQuery.matches;

        mediaQuery.addEventListener('change', (e) => {
          if (localStorage.getItem('darkMode') === null) {
            isDarkMode = e.matches;
            setDarkModeClass(isDarkMode);
          }
        });
      }

      setDarkModeClass(isDarkMode);
    }
  });

  $effect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const nextIsMobile = window.innerWidth <= 768;
        if (nextIsMobile !== isMobile) {
          activeDropdown = null;
          if (!nextIsMobile) {
            isMenuOpen = false;
          }
        }
        isMobile = nextIsMobile;
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  });
</script>

<nav class="nav">
  {#if isMenuOpen && isMobile}
    <button
      type="button"
      class="nav-backdrop"
      onclick={closeAll}
      aria-label="Close menu"
    ></button>
  {/if}
  <div class="layout-section nav-container">
    <div class="nav-brand">
      <a href="/">
        <img src="/drf_logo_symbol.svg" alt="DevRel Foundation" class="logo-symbol" />
        <div class="brand-text">
          <span class="devrel-text">DevRel</span>
          <span class="foundation-text">Foundation</span>
        </div>
      </a>
    </div>

    <div class="nav-menu-container">
      <ul class="nav-menu" class:open={isMenuOpen}>
        {#each NAV_MENUS as menu (menu.id)}
          <NavDropdown
            id={menu.id}
            label={menu.label}
            href={menu.href}
            {isMobile}
            mobileActive={activeDropdown === menu.id}
            onMobileToggle={() => toggleMobileDropdown(menu.id)}
            desktopActive={activeDropdown === menu.id}
            onDesktopEnter={() => showDropdown(menu.id)}
            onDesktopLeave={hideDropdown}
          >
            {#each menu.sections as section (section.title)}
              <div class="dropdown-section">
                <h3 class="menu-header">{section.title}</h3>
                <p class="menu-header-description">{section.description}</p>
                <div class="dropdown-items">
                  {#each section.items as item (item.href)}
                    <a
                      href={item.href}
                      onclick={closeAll}
                      target={item.target}
                      rel={item.rel}
                    >
                      <div class={item.variant === 'brief' ? 'dropdown-item-brief' : 'dropdown-item'}>
                        <span class="item-title">
                          {#if item.icon}
                            <img
                              src={menuIcons[item.icon]}
                              alt={item.iconAlt ?? ''}
                              class="social-icon"
                            />
                          {/if}
                          {item.title}
                        </span>
                      </div>
                    </a>
                  {/each}
                </div>
              </div>
            {/each}
          </NavDropdown>
        {/each}
      </ul>

      <div class="cta">
        <CallToActionButton />
      </div>

      <button class="theme-toggle" onclick={toggleDarkMode} aria-label="Toggle dark mode">
        {#if isDarkMode}
          <img src={SunLightIcon} alt="Light mode" />
        {:else}
          <img src={HalfMoonIcon} alt="Dark mode" />
        {/if}
      </button>

      <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
        <img src={MenuIcon} alt="Menu" />
      </button>
    </div>
  </div>
</nav>

<style>
  .nav {
    --nav-bar-height: 4rem;
    background-color: var(--color-background);
    border-bottom: var(--border-thickness) solid var(--color-background-secondary-2);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .nav :global(a) {
    text-decoration: none;
  }

  .nav-backdrop {
    position: fixed;
    top: var(--nav-bar-height);
    left: 0;
    right: 0;
    bottom: 0;
    border: none;
    padding: 0;
    margin: 0;
    cursor: default;
    background: color-mix(in srgb, var(--color-text) 12%, transparent);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 0;
  }

  .nav-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: var(--nav-bar-height);
  }

  .nav-brand {
    flex-shrink: 0;
  }

  .nav-brand a {
    color: var(--color-text);
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .nav-brand a:hover {
    opacity: 0.8;
  }

  .logo-symbol {
    height: 3rem;
    width: auto;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    margin-left: var(--space-xs);
    line-height: 1;
  }

  .devrel-text {
    font-family: var(--font-headings);
    font-weight: 800;
    font-size: 16pt;
    color: var(--color-logo-text);
    text-transform: uppercase;
  }

  .foundation-text {
    font-family: var(--font-headings);
    font-weight: 300;
    font-size: 16pt;
    color: var(--color-logo-text);
    text-transform: uppercase;
  }

  @media (max-width: 480px) {
    .brand-text {
      margin-left: var(--space-2xs);
    }

    .devrel-text {
      font-size: 0.75rem;
    }

    .foundation-text {
      font-size: 0.625rem;
    }
  }

  .nav-menu-container {
    display: flex;
    align-items: center;
  }

  .cta {
    margin-left: var(--space-s);
  }

  /* Mobile: collapsible full-width menu */
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    border-bottom: var(--border-thickness) solid var(--color-background-secondary-2);
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: var(--space-m);
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 768px) {
    .nav-menu.open {
      max-height: calc(100dvh - var(--nav-bar-height));
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  .nav-menu :global(li) {
    width: 100%;
  }

  .nav-menu :global(li) > :global(.nav-link) {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
    display: block;
    padding: var(--space-xs) 0;
    border-bottom: none;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .nav-menu :global(li) > :global(.nav-link) {
      border-bottom: var(--border-thickness) solid var(--color-background-secondary-1);
    }

    .nav-menu :global(li:last-child) > :global(.nav-link) {
      border-bottom: none;
    }
  }

  .nav-menu :global(li) > :global(.nav-link:hover) {
    color: var(--color-link);
    background-color: var(--color-background-secondary-1);
  }

  .nav-menu .dropdown-items a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
    padding-block: var(--space-3xs);
    padding-inline: 0;
    border-bottom: none;
    line-height: 1.2;
    white-space: nowrap;
  }

  .nav-menu .dropdown-items a:hover {
    color: var(--color-link);
    background-color: transparent;
  }

  .menu-toggle {
    display: flex;
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
  }

  .theme-toggle,
  .menu-toggle {
    background: none;
    border: none;
    padding: var(--space-xs);
    cursor: pointer;
    border-radius: var(--radius-pill);
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover,
  .menu-toggle:hover {
    background-color: var(--color-background-secondary-1);
  }

  .theme-toggle img,
  .menu-toggle img {
    width: var(--step-1);
    height: var(--step-1);
    filter: var(--icon-filter);
  }

  /* Mobile: compact accordion dropdown content */
  .dropdown-section {
    margin: 0;
  }

  .menu-header {
    display: block;
    margin: var(--space-m) 0 var(--space-3xs) 0;
    padding: 0;
    border-bottom: none;
    font-size: var(--step--2);
    font-weight: 600;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .dropdown-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .dropdown-item,
  .dropdown-item-brief {
    font-size: var(--step-0);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .dropdown-items a:has(.dropdown-item-brief):hover {
    background-color: transparent;
  }

  .menu-header-description {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    line-height: 1.3;
    margin: 0 0 var(--space-2xs) 0;
  }

  .item-title {
    font-weight: 800;
    color: var(--color-text);
    font-size: var(--step-0);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    padding-block: 0;
    line-height: 1.2;
    white-space: nowrap;
  }

  .social-icon {
    width: var(--step-0);
    height: var(--step-0);
    filter: var(--icon-filter);
    flex-shrink: 0;
  }

  @media (min-width: 769px) {
    .cta {
      margin-left: var(--space-l);
    }

    .nav-menu,
    .nav-menu.open {
      position: static;
      flex-direction: row;
      align-items: center;
      background: none;
      border: none;
      gap: var(--space-m);
      padding: 0;
      transform: none;
      opacity: 1;
      visibility: visible;
      max-height: none;
      overflow: visible;
    }

    .nav-menu :global(li) {
      width: auto;
    }

    .nav-menu :global(li) > :global(.nav-link) {
      display: inline;
      padding: var(--space-xs) var(--space-xs);
      border-radius: var(--radius-s);
    }

    .menu-toggle {
      display: none;
    }

    .dropdown-section + .dropdown-section {
      margin-top: 0;
    }

    .menu-header {
      margin-top: 0;
      margin-bottom: var(--space-3xs);
      font-size: var(--step--1);
      font-weight: 600;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .dropdown-items {
      gap: var(--space-2xs);
    }

    .dropdown-item {
      font-size: var(--step-1);
      padding: var(--space-3xs);
      gap: var(--space-3xs);
    }

    .dropdown-item-brief {
      padding: var(--space-3xs);
      gap: var(--space-2xs);
    }

    .menu-header-description {
      line-height: 1.4;
      margin-bottom: var(--space-s);
    }

    .item-title {
      padding-block: 0;
      line-height: inherit;
    }
  }
</style>

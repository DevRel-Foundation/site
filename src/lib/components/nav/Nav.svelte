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
  };

  const NAV_MENUS = [
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
        isMobile = window.innerWidth <= 768;
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
            label={menu.label}
            href={menu.href}
            {isMobile}
            menuOpen={isMenuOpen}
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
  .cta {
    margin-left: var(--space-l);
  }

  .nav {
    background-color: var(--color-background);
    border-bottom: var(--border-thickness) solid var(--color-background-secondary-2);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .nav :global(a) {
    text-decoration: none;
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 4rem;
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

  .nav-menu :global(li) {
    width: 100%;
  }

  .nav-menu a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
    display: block;
    padding: var(--space-s) 0;
    border-bottom: 1px solid var(--color-background-secondary-1);
    white-space: nowrap;
  }

  .nav-menu a:last-child {
    border-bottom: none;
  }

  .nav-menu a:hover {
    color: var(--color-link);
    background-color: var(--color-background-secondary-1);
  }

  .theme-toggle,
  .menu-toggle {
    background: none;
    border: none;
    padding: var(--space-xs);
    cursor: pointer;
    border-radius: var(--radius-s);
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
    width: 1.5rem;
    height: 1.5rem;
    filter: var(--icon-filter);
  }

  .menu-toggle {
    display: flex;
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
  }

  @media (min-width: 769px) {
    .nav-menu {
      position: static;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: none;
      border: none;
      gap: var(--space-m);
      padding: 0;
      transform: none;
      opacity: 1;
      visibility: visible;
    }

    .nav-menu :global(li) {
      width: auto;
    }

    .nav-menu a {
      display: inline;
      padding: var(--space-xs) var(--space-xs);
      border-bottom: none;
      border-radius: var(--radius-s);
    }

    .menu-toggle {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .nav-menu.open {
      max-height: calc(100dvh - 4rem);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  .dropdown-section h3 {
    margin: 0 0 var(--space-m) 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: none;
    padding-bottom: 0;
  }

  .dropdown-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .dropdown-item {
    font-size: 1.5rem;
    padding: var(--space-3xs);
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
  }

  .dropdown-item-brief {
    padding: calc(var(--space-4xs) / 32);
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .dropdown-items a:has(.dropdown-item-brief):hover {
    background-color: transparent;
  }

  .menu-header {
    font-size: 0.7rem;
    font-weight: 200;
    color: var(--color-background-secondary-2);
    margin-bottom: var(--space-3xs);
  }

  .menu-header-description {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    line-height: 1.4;
    margin: 0 0 var(--space-s) 0;
  }

  .item-title {
    font-weight: 800;
    color: var(--color-text);
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    white-space: nowrap;
  }

  .social-icon {
    width: 1rem;
    height: 1rem;
    filter: var(--icon-filter);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .dropdown-section:not(:first-child) {
      display: block;
    }

    .menu-header {
      display: block;
    }
  }
</style>

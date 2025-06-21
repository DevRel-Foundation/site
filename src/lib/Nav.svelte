<script>
  import MenuIcon from 'iconoir/icons/menu.svg';
  import SunLightIcon from 'iconoir/icons/sun-light.svg';
  import HalfMoonIcon from 'iconoir/icons/half-moon.svg';
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import LogoSymbol from './drf_logo_symbol.svg';
  
  let isMenuOpen = $state(false);
  let isDarkMode = $state(false);
  let mediaQuery;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.toggle('dark-mode', isDarkMode);
    }
    // Save user preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.toString());
    }
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
            if (document.body) {
              document.body.classList.toggle('dark-mode', isDarkMode);
            }
          }
        });
      }
      
      if (document.body) {
        document.body.classList.toggle('dark-mode', isDarkMode);
      }
    }
  });
</script>

<nav class="nav">
  <div class="nav-container">
    <div class="nav-brand">
      <a href="/">
        <img src={LogoSymbol} alt="DevRel Foundation" class="logo-symbol" />
      </a>
    </div>
    
    <div class="nav-menu-container">
      <ul class="nav-menu" class:open={isMenuOpen}>
        <li><a href="/about" onclick={() => isMenuOpen = false}>About</a></li>
        <li><a href="/events" onclick={() => isMenuOpen = false}>Events</a></li>
        <li><a href="/join-us" onclick={() => isMenuOpen = false}>Join us</a></li>
        <li><a href="/working-groups" onclick={() => isMenuOpen = false}>Working groups</a></li>
        <li><a href="/contact" onclick={() => isMenuOpen = false}>Contact</a></li>
      </ul>
      <button class="theme-toggle" onclick={toggleDarkMode} aria-label="Toggle dark mode">
        {#if isDarkMode}
          <img src={SunLightIcon} alt="Light mode" />
        {:else}
          <img src={HalfMoonIcon} alt="Dark mode" />
        {/if}
      </button>
      
      <a href="https://discord.gg/devrel" target="_blank" rel="noopener noreferrer" class="discord-link" aria-label="Join our Discord">
        <img src={DiscordIcon} alt="Discord" />
      </a>
      
      <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
        <img src={MenuIcon} alt="Menu" />
      </button>
    </div>
    
  </div>
</nav>

<style>
  .nav {
    background-color: var(--color-background);
    border-bottom: var(--border-thickness) solid var(--color-background-secondary-2);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .nav-container {
    max-width: var(--grid-max-width);
    margin: 0 auto;
    padding: 0 var(--space-m);
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
  
  .nav-menu li {
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
  
  .discord-link img {
    filter: var(--icon-filter);
  }
  
  .menu-toggle {
    display: flex;
  }
  
  @media (min-width: 769px) {
    .nav-menu {
      position: static;
      background: none;
      border: none;
      flex-direction: row;
      gap: var(--space-m);
      padding: 0;
      transform: none;
      opacity: 1;
      visibility: visible;
    }
    
    .nav-menu li {
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
</style> 
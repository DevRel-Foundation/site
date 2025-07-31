<script>
  import MenuIcon from 'iconoir/icons/menu.svg';
  import SunLightIcon from 'iconoir/icons/sun-light.svg';
  import HalfMoonIcon from 'iconoir/icons/half-moon.svg';
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import MailIcon from 'iconoir/icons/mail.svg';
  
  let isMenuOpen = $state(false);
  let isDarkMode = $state(false);
  let activeDropdown = $state(null);
  let activeAccordion = $state(null);
  let mediaQuery;
  let isMobile = $state(false);
  
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
  
  function showDropdown(menuItem) {
    activeDropdown = menuItem;
  }
  
  function hideDropdown() {
    activeDropdown = null;
  }
  
  function toggleAccordion(section) {
    if (activeAccordion === section) {
      activeAccordion = null;
    } else {
      activeAccordion = section;
    }
  }
  
  function closeAll() {
    isMenuOpen = false;
    activeDropdown = null;
    activeAccordion = null;
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
  <div class="nav-container">
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



        <li class="nav-item dropdown-container" 
            onmouseenter={() => !isMobile && showDropdown('about')} 
            onmouseleave={() => !isMobile && hideDropdown()}>
          <a href="/about/mission" class="nav-link" class:active={activeDropdown === 'about'} onclick={(e) => {
            if (isMobile) {
              e.preventDefault();
              toggleAccordion('about');
            }
          }}>About</a>
          <div class="dropdown" class:active={activeDropdown === 'about'} class:accordion-open={activeAccordion === 'about'}>
            <div class="dropdown-content">
              <div class="dropdown-section">
                <h3 class="menu-header">About the DevRel Foundation</h3>
                <div class="dropdown-items">
                  <a href="/about/mission" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">Mission</span>
                      <span class="item-description">Our vision and goals for the community.</span>
                    </div>
                  </a>
                  <a href="/about/steering-committee" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">Steering Committee</span>
                      <span class="item-description">Meet the leaders guiding the foundation.</span>
                    </div>
                  </a>
                  <a href="/about/working-groups" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">Working Groups</span>
                      <span class="item-description">Working groups drive sourcing and innovation.</span>
                    </div>
                  </a>
                </div>
              </div>  

              <div class="dropdown-section">
                <h3 class="menu-header">&nbsp;</h3>
                <div class="dropdown-items">



                  <a href="https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter.adoc" onclick={closeAll} target="_blank" rel="noopener noreferrer">
                    <div class="dropdown-item">
                      <span class="item-title">Charter ↗</span>
                      <span class="item-description">The scope, principles and operating guidelines.</span>
                    </div>
                  </a>
                  <a href="https://github.com/DevRel-Foundation/governance/blob/main/code_of_conduct.md" onclick={closeAll} target="_blank" rel="noopener noreferrer">
                    <div class="dropdown-item">
                      <span class="item-title">Code of Conduct ↗</span>
                      <span class="item-description">Our community standards.</span>
                    </div>
                  </a>
                  <a href="/contact" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">Contact</span>
                      <span class="item-description">Get in touch with us.</span>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown-container" 
            onmouseenter={() => !isMobile && showDropdown('learn')} 
            onmouseleave={() => !isMobile && hideDropdown()}>
          <a href="/learn/what-is-devrel" class="nav-link" class:active={activeDropdown === 'learn'} onclick={(e) => {
            if (isMobile) {
              e.preventDefault();
              toggleAccordion('learn');
            }
          }}>Learn</a>
          <div class="dropdown" class:active={activeDropdown === 'learn'} class:accordion-open={activeAccordion === 'learn'}>
            <div class="dropdown-content">
              <div class="dropdown-section">
                <h3 class="menu-header">Learn About DevRel</h3>
                <div class="dropdown-items">
                  <a href="/learn/what-is-devrel" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">What is Developer Relations?</span>
                      <span class="item-description">Defining this critical role in technology adoption.</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="dropdown-section">
                <h3 class="menu-header">&nbsp;</h3>
                <div class="dropdown-items">
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown-container" 
            onmouseenter={() => !isMobile && showDropdown('community')} 
            onmouseleave={() => !isMobile && hideDropdown()}>
          <a href="/blog" class="nav-link" class:active={activeDropdown === 'community'} onclick={(e) => {
            if (isMobile) {
              e.preventDefault();
              toggleAccordion('community');
            }
          }}>Community</a>
          <div class="dropdown" class:active={activeDropdown === 'community'} class:accordion-open={activeAccordion === 'community'}>
            <div class="dropdown-content">
              <div class="dropdown-section">
                <h3 class="menu-header">The DevRel Community</h3>
                <div class="dropdown-items">
                  <a href="/blog" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">Blog</span>
                      <span class="item-description">News and updates.</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="dropdown-section">
                <h3 class="menu-header">Community Resources</h3>
                <div class="dropdown-items">
                  <a href="https://discord.gg/kfJkJ3Xd" onclick={closeAll} target="_blank" rel="noopener noreferrer">
                    <div class="dropdown-item-brief">
                      <span class="item-title">
                        <img src={DiscordIcon} alt="Join us on Discord" class="social-icon" />
                        Discord ↗
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>

	


        <li class="nav-item dropdown-container" 
            onmouseenter={() => !isMobile && showDropdown('projects')} 
            onmouseleave={() => !isMobile && hideDropdown()}>
          <a href="/projects" class="nav-link" class:active={activeDropdown === 'projects'} onclick={(e) => {
            if (isMobile) {
              e.preventDefault();
              toggleAccordion('projects');
            }
          }}>Projects</a>
          <div class="dropdown" class:active={activeDropdown === 'projects'} class:accordion-open={activeAccordion === 'projects'}>
            <div class="dropdown-content">
              <div class="dropdown-section">
                <h3 class="menu-header">Get Involved</h3>
                <div class="dropdown-items">
                  <a href="/projects" onclick={closeAll}>
                    <div class="dropdown-item">
                      <span class="item-title">Explore Projects</span>
                      <span class="item-description">Find open-data, frameworks, and guides to support your program.</span>
                    </div>
                  </a>
                  <a href="/join-us" onclick={closeAll} target="_blank" rel="noopener noreferrer">
                    <div class="dropdown-item">
                      <span class="item-title">Contribute</span>
                      <span class="item-description">Join the 400+ professionals who want to see DevRel thrive.
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="dropdown-section">
                <h3 class="menu-header">Project Resources</h3>
                <div class="dropdown-items">
                  <a href="https://github.com/devrel-foundation/" onclick={closeAll} target="_blank" rel="noopener noreferrer">
                    <div class="dropdown-item-brief">
                      <span class="item-title">
                        <img src={GitHubIcon} alt="Explore our GitHub" class="social-icon" />
                        GitHub ↗
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>






        <!-- <li><a href="/projects" onclick={closeAll}>Community</a></li> --> 
        <!-- <li><a href="/working-groups" onclick={closeAll}>Working groups</a></li> --> 
        <!-- <li><a href="/contact" onclick={closeAll}>Contact</a></li> --> 
      </ul>



      <button class="cta" onclick={closeAll}>
        <a href="/join-us">Join</a>
      </button>

      
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
    background-color: var(--color-mint);
    color: var(--color-text-inverse);
    padding: var(--space-xs) var(--space-s);
    text-decoration: none;
    border-radius: var(--radius-s);
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: var(--space-l);
    }

    .cta a {
      text-decoration: none;
      color: inherit;
    }

    .cta:hover {
    background-color: color-mix(in srgb, var(--color-mint), black 10%);
  }


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

  .dropdown-container {
    position: relative;
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
  }
  
  .dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .dropdown-content {
    max-width: var(--grid-max-width);
    margin: 0 auto;
    padding: var(--space-l);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
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
    margin-bottom: var(--space-s);
  }
  
  .item-title {
    font-weight: 800;
    font-size: 1.5rem;
    color: var(--color-text);
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    white-space: nowrap;
  }
  
  .item-description {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    line-height: 1.4;
  }

  .social-icon {
    width: 1rem;
    height: 1rem;
    filter: var(--icon-filter);
    flex-shrink: 0;
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
  
  img {
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
    }

    .dropdown.accordion-open {
      opacity: 1;
      visibility: visible;
      height: auto;
      margin-top: var(--space-xs);
    }
    
    .dropdown-content {
      padding: var(--space-s);
      grid-template-columns: 1fr;
      gap: 0;
    }
    
    .dropdown-section:not(:first-child) {
      display: none;
    }

    .item-description {
      display: none;
    }

    .dropdown-item {
      padding: var(--space-2xs);
    }

    .menu-header {
      display: none;
    }
  }
</style>
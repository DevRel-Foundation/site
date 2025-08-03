<script>
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import HomeIcon from 'iconoir/icons/home.svg';
  import MailIcon from 'iconoir/icons/mail.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import EditThisPage from '$lib/components/feedback/EditThisPage.svelte';
  
  const { status, error } = $props();
  
  // Browser debugging info (only available on client side)
  let debugInfo = $state({
    userAgent: '',
    language: '',
    cookiesEnabled: false,
    screenSize: '',
    viewport: '',
    referrer: '',
    timestamp: ''
  });
  
  // Populate debug info on client side
  $effect(() => {
    if (browser) {
      debugInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        screenSize: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'Direct navigation',
        timestamp: new Date().toISOString()
      };
    }
  });
  
  // Different messages for different error types
  const getErrorMessage = (status) => {
    switch (status) {
      case 404:
        return {
          title: "This Page Needs to Grow!",
          subtitle: "404 - Page Not Found",
          message: "Looks like this branch of our site hasn't sprouted yet.",
          suggestion: "Ready to contribute? Maybe you can help us plant something new."
        };
      case 500:
        return {
          title: "Our Servers Need Some Nurturing",
          subtitle: "500 - Internal Server Error",
          message: "Something went wrong on our end.",
          suggestion: "We're working to fix this. Please try again in a moment."
        };
      default:
        return {
          title: "Oops! That didn't work.",
          subtitle: `${status} - Error`,
          message: "Looks like we've grown too fast and gotten a bit tangled up here.",
          suggestion: "Ready to contribute? Maybe you can help us plant this page."
        };
    }
  };
  
  const errorInfo = $derived(getErrorMessage(status));
</script>

<svelte:head>
  <title>{errorInfo.subtitle} | DevRel Foundation</title>
  <meta name="description" content="Page not found - DevRel Foundation" />
</svelte:head>

<div class="error-page">
  <div class="error-banner">
    <div class="custom-404">
      <div class="digit digit-4">4</div>
      <div class="digit digit-0">
        <img 
          src="/drf_logo_symbol.svg"
          alt="DevRel Foundation logo as the zero in 404"
          class="logo-zero"
        />
      </div>
      <div class="digit digit-4">4</div>
    </div>
    
    <div class="error-content">
      <h1 class="error-title">{errorInfo.title}</h1>
      <p class="error-subtitle">{errorInfo.subtitle}</p>
      <p class="error-message">{errorInfo.message}</p>
      <p class="error-suggestion">{errorInfo.suggestion}</p>
    </div>
  </div>

  <EditThisPage currentPath={$page.url.pathname} />

  <div class="action-buttons">


    <a href="/" class="cta-button primary">
      <img src={HomeIcon} alt="Home" class="button-icon" />
      Visit Homepage
    </a>
    
    <a href="/contact" class="cta-button secondary">
      <img src={MailIcon} alt="Contact" class="button-icon" />
      Contact Us
    </a>



    
    {#if status === 404}
      <a 
        href="https://github.com/DevRel-Foundation/site/issues/new?title=Missing%20Page%3A%20{encodeURIComponent($page.url.pathname)}&body=I%20was%20looking%20for%20this%20page%3A%20{encodeURIComponent($page.url.href)}%0A%0AExpected%20to%20find%3A%0A%0APlease%20add%20this%20page%20or%20redirect%20to%20the%20correct%20location." 
        class="cta-button secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={GitHubIcon} alt="GitHub" class="button-icon" />
        Request This Page
      </a>
    {/if}
  </div>

  <div class="error-details">
    <details>
      <summary>Debugging Details</summary>
      <div class="debug-grid">
        <div class="debug-section">
          <h4>Error Information</h4>
          <p><strong>Status Code:</strong> {status}</p>
          <p><strong>Path:</strong> {$page.url.pathname}</p>
          <p><strong>Full URL:</strong> {$page.url.href}</p>
          {#if error?.message}
            <p><strong>Error Message:</strong> {error.message}</p>
          {/if}
          <p><strong>Timestamp:</strong> {debugInfo.timestamp}</p>
        </div>
        
        {#if browser}
          <div class="debug-section">
            <h4>Browser Information</h4>
            <p><strong>User Agent:</strong> <span class="user-agent">{debugInfo.userAgent}</span></p>
            <p><strong>Language:</strong> {debugInfo.language}</p>
            <p><strong>Cookies Enabled:</strong> {debugInfo.cookiesEnabled ? 'Yes' : 'No'}</p>
            <p><strong>Referrer:</strong> {debugInfo.referrer}</p>
          </div>
          
          <div class="debug-section">
            <h4>Display Information</h4>
            <p><strong>Screen Size:</strong> {debugInfo.screenSize}</p>
            <p><strong>Viewport Size:</strong> {debugInfo.viewport}</p>
            <p><strong>Device Pixel Ratio:</strong> {window.devicePixelRatio || 'Unknown'}</p>
            <p><strong>Color Scheme:</strong> {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'}</p>
          </div>
          
          <div class="debug-section">
            <h4>Network & Performance</h4>
            <p><strong>Connection:</strong> {navigator.connection?.effectiveType || 'Unknown'}</p>
            <p><strong>Online Status:</strong> {navigator.onLine ? 'Online' : 'Offline'}</p>
            <p><strong>Page Load Time:</strong> {performance.now().toFixed(2)}ms</p>
            <p><strong>Memory Usage:</strong> {navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown'}</p>
          </div>
        {/if}
      </div>
    </details>
  </div>
</div>

<style>
  .error-page {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl) var(--space-l);
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  .error-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-l);
    margin-bottom: var(--space-2xl);
  }

  .custom-404 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-s);
    margin-bottom: var(--space-l);
  }

  .digit {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family-heading);
    font-weight: 900;
    line-height: 1;
  }

  .digit-4 {
    font-size: 10rem;
    color: var(--color-mint-dark);
    text-shadow: 0 4px 8px rgba(var(--color-mint-dark-rgb), 0.3);
    animation: pulse-4 3s ease-in-out infinite;
  }

  .digit-0 {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(121, 191, 68, 0.1), rgba(0, 36, 46, 0.1));
    border: 4px solid var(--color-mint-dark);
    box-shadow: 
      0 0 0 2px rgba(121, 191, 68, 0.3),
      0 8px 24px rgba(0, 36, 46, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    animation: glow-0 4s ease-in-out infinite;
  }

  .logo-zero {
    width: 70%;
    height: 70%;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 36, 46, 0.3));
    animation: float-logo 6s ease-in-out infinite;
  }

  @keyframes pulse-4 {
    0%, 100% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
  }

  @keyframes glow-0 {
    0%, 100% {
      box-shadow: 
        0 0 0 2px rgba(121, 191, 68, 0.3),
        0 8px 24px rgba(0, 36, 46, 0.2),
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow: 
        0 0 0 4px rgba(121, 191, 68, 0.5),
        0 0 20px rgba(121, 191, 68, 0.3),
        0 12px 32px rgba(0, 36, 46, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.2);
    }
  }

  @keyframes float-logo {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-2px) rotate(1deg);
    }
    66% {
      transform: translateY(2px) rotate(-1deg);
    }
  }

  .error-content {
    max-width: 600px;
  }

  .error-title {
    font-size: var(--step-3);
    color: var(--color-text);
    margin-bottom: var(--space-s);
    font-weight: 700;
  }

  .error-subtitle {
    font-size: var(--step-1);
    color: var(--color-mint-dark);
    margin-bottom: var(--space-m);
    font-weight: 600;
  }

  .error-message {
    font-size: var(--step-0);
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-s);
  }

  .error-suggestion {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    margin-bottom: 0;
    opacity: 0.8;
  }

  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-m);
    justify-content: center;
    margin-bottom: var(--space-xl);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    padding: var(--space-s) var(--space-m);
    border-radius: var(--radius-m);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step-0);
    transition: all 0.2s ease;
    border: 2px solid transparent;
    min-width: 140px;
    justify-content: center;
  }

  .cta-button.primary {
    background-color: var(--color-mint-dark);
    color: var(--color-background);
    border-color: var(--color-mint-dark);
  }

  .cta-button.primary:hover {
    background-color: color-mix(in srgb, var(--color-mint-dark) 80%, white 20%);
    border-color: color-mix(in srgb, var(--color-mint-dark) 80%, white 20%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--color-mint-dark-rgb), 0.3);
  }

  .cta-button.secondary {
    background-color: transparent;
    color: var(--color-mint-dark);
    border-color: var(--color-mint-dark);
  }

  .cta-button.secondary:hover {
    background-color: var(--color-mint-dark);
    color: var(--color-background);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--color-mint-dark-rgb), 0.2);
  }

  .button-icon {
    width: 1.25rem;
    height: 1.25rem;
    filter: var(--icon-filter);
  }

  .cta-button.primary .button-icon {
    filter: brightness(0) invert(1);
  }

  .cta-button.secondary:hover .button-icon {
    filter: brightness(0) invert(1);
  }

  .error-details {
    width: 100%;
    max-width: 800px;
    margin-top: var(--space-l);
  }

  .error-details details {
    background-color: var(--color-background-secondary-1);
    border-radius: var(--radius-s);
    padding: var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
  }

  .error-details summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--color-text-secondary);
    font-size: var(--step--1);
    margin-bottom: var(--space-s);
  }

  .error-details summary:hover {
    color: var(--color-mint-dark);
  }

  .debug-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-m);
    margin-top: var(--space-s);
  }

  .debug-section {
    background-color: var(--color-background-secondary-2);
    border-radius: var(--radius-xs);
    padding: var(--space-s);
  }

  .debug-section h4 {
    margin: 0 0 var(--space-xs) 0;
    color: var(--color-mint-dark);
    font-size: var(--step--1);
    font-weight: 600;
    border-bottom: 1px solid var(--color-background-secondary-1);
    padding-bottom: var(--space-3xs);
  }

  .error-details p {
    margin: var(--space-3xs) 0;
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    line-height: 1.4;
  }

  .error-details strong {
    color: var(--color-text);
    font-family: var(--font-family-body);
  }

  .user-agent {
    word-break: break-all;
    font-size: var(--step--2);
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .error-page {
      padding: var(--space-l) var(--space-m);
    }
    
    .error-banner {
      gap: var(--space-m);
    }
    
    .custom-404 {
      gap: var(--space-2xs);
    }
    
    .digit-4 {
      font-size: 5rem;
    }
    
    .digit-0 {
      width: 80px;
      height: 80px;
      border-width: 3px;
    }
    
    .error-title {
      font-size: var(--step-2);
    }
    
    .action-buttons {
      flex-direction: column;
      align-items: center;
      gap: var(--space-s);
    }
    
    .cta-button {
      width: 100%;
      max-width: 280px;
    }
    
    .debug-grid {
      grid-template-columns: 1fr;
      gap: var(--space-s);
    }
  }

  @media (max-width: 480px) {
    .digit-4 {
      font-size: 3.5rem;
    }
    
    .digit-0 {
      width: 60px;
      height: 60px;
      border-width: 2px;
    }
    
    .custom-404 {
      gap: var(--space-3xs);
    }
    
    .error-title {
      font-size: var(--step-1);
    }
  }
</style>

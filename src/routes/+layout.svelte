<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Footer from '$lib/components/nav/Footer.svelte';
  import EditThisPage from '$lib/components/feedback/EditThisPage.svelte';

  let { children } = $props();
  let posthog: any = null;

  // Initialize PostHog on client side
  onMount(async () => {
    if (browser) {
      const { default: posthogLib } = await import('posthog-js');
      
      posthogLib.init(
        'phc_88kMI3C9TgIR8Oaeqmdb9gM2MFgcH5k9McpB5mq6uGa',
        {
          api_host: 'https://us.i.posthog.com',
          person_profiles: 'always',
          capture_pageview: false, // We'll manually capture after consent
          capture_pageleave: true,
          // GDPR compliance settings
          opt_out_capturing_by_default: true, // Don't track until consent is given
          opt_out_persistence_by_default: true,
          opt_out_useragent_filter: false,
          // Cookie consent configuration
          loaded: (posthog) => {
            // Check if user has already given consent
            const hasConsent = localStorage.getItem('posthog_consent');
            if (hasConsent === 'true') {
              posthog.opt_in_capturing();
              posthog.capture('$pageview');
            } else if (hasConsent === null) {
              // Show consent banner for new users
              showCookieConsent(posthog);
            }
          }
        }
      );
      
      posthog = posthogLib;
      console.log('PostHog initialized with GDPR compliance');
    }
  });

  // Show cookie consent banner
  function showCookieConsent(posthogInstance: any) {
    // Create and show consent banner
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 36, 46, 0.95);
        color: white;
        padding: 1rem;
        z-index: 10000;
        border-top: 2px solid var(--color-mint-dark, #79bf44);
        backdrop-filter: blur(10px);
      ">
        <div style="
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        ">
          <div style="flex: 1; min-width: 300px;">
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.4;">
              We use cookies and analytics to improve the user experience for how the site is used. 
              Your privacy is important to us.
              <a href="/privacy" style="color: var(--color-mint, #79bf44); text-decoration: underline;">
                Learn more
              </a>
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button id="cookie-accept" style="
              background: var(--color-mint-dark, #79bf44);
              color: white;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
              white-space: nowrap;
            ">Accept All</button>
            <button id="cookie-reject" style="
              background: transparent;
              color: white;
              border: 1px solid rgba(255,255,255,0.3);
              padding: 0.5rem 1rem;
              border-radius: 4px;
              cursor: pointer;
              white-space: nowrap;
            ">Reject</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    // Handle accept button
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('posthog_consent', 'true');
      posthogInstance.opt_in_capturing();
      posthogInstance.capture('$pageview');
      posthogInstance.capture('cookie_consent_given', { action: 'accept' });
      banner.remove();
    });
    
    // Handle reject button
    document.getElementById('cookie-reject')?.addEventListener('click', () => {
      localStorage.setItem('posthog_consent', 'false');
      posthogInstance.opt_out_capturing();
      posthogInstance.capture('cookie_consent_given', { action: 'reject' });
      banner.remove();
    });
  }

  // Track page changes (only if consent given)
  $effect(() => {
    if (browser && posthog && $page.url) {
      const hasConsent = localStorage.getItem('posthog_consent');
      if (hasConsent === 'true') {
        posthog.capture('$pageview', {
          $current_url: $page.url.href,
          $pathname: $page.url.pathname,
        });
      }
    }
  });
</script>

<Nav />

<main class="main">
  {@render children()}
</main>

<Footer />
<EditThisPage />
<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { PUBLIC_GA_ID } from '$env/static/public';

  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Footer from '$lib/components/nav/Footer.svelte';
  import EditThisPage from '$lib/components/feedback/EditThisPage.svelte';
  import CookieConsent from '$lib/ui/CookieConsent.svelte';
  import { writable } from 'svelte/store';

  let { children } = $props();
  let posthog: any = null;
  let gaLoaded = false;
  const showConsent = writable(false);

  // Helper: inject Google Analytics (gtag)
  function injectGA(gaId: string) {
    if (gaLoaded || !browser) return;
    try {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s);

      const inline = document.createElement('script');
      inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`;
      document.head.appendChild(inline);
      gaLoaded = true;
      console.log('GA initialized', gaId);
    } catch (e) {
      console.error('Failed to initialize GA', e);
    }
  }

  // Cookie consent UI is implemented as a Svelte component `CookieConsent`.
  // showConsent controls whether it's visible.
  function handleAccept() {
    localStorage.setItem('analytics_consent', 'true');
    if (posthog) {
      posthog.opt_in_capturing();
      posthog.capture('$pageview');
      posthog.capture('cookie_consent_given', { action: 'accept' });
    }
    const gaId = (typeof PUBLIC_GA_ID !== 'undefined' && PUBLIC_GA_ID) ? PUBLIC_GA_ID : 'G-Z5ZG34WJP1';
    injectGA(gaId);
    showConsent.set(false);
  }

  function handleReject() {
    localStorage.setItem('analytics_consent', 'false');
    if (posthog) {
      posthog.opt_out_capturing();
      posthog.capture('cookie_consent_given', { action: 'reject' });
    }
    showConsent.set(false);
  }

  // Track page changes (only if consent given)
  $effect(() => {
    if (browser && posthog && $page.url) {
      const hasConsent = localStorage.getItem('analytics_consent');
      if (hasConsent === 'true') {
        posthog.capture('$pageview', {
          $current_url: $page.url.href,
          $pathname: $page.url.pathname,
        });
        // If GA is loaded, also send a page view
        if (gaLoaded && (window as any).gtag) {
          try {
            (window as any).gtag('event', 'page_view', { page_path: $page.url.pathname });
          } catch (e) {
            // ignore
          }
        }
      }
    }
  });

  // Single onMount: initialize PostHog and decide whether to show consent banner / inject GA
  onMount(async () => {
    if (!browser) return;
    // Initialize PostHog library
    try {
      const { default: posthogLib } = await import('posthog-js');
      posthogLib.init(
        'phc_88kMI3C9TgIR8Oaeqmdb9gM2MFgcH5k9McpB5mq6uGa',
        {
          api_host: 'https://us.i.posthog.com',
          person_profiles: 'always',
          capture_pageview: false,
          capture_pageleave: true,
          opt_out_capturing_by_default: true,
          opt_out_persistence_by_default: true,
          opt_out_useragent_filter: false,
        }
      );
      posthog = posthogLib;
      // Check consent state
      const hasConsent = localStorage.getItem('analytics_consent');
      if (hasConsent === 'true') {
        posthog.opt_in_capturing();
        posthog.capture('$pageview');
        // initialize GA immediately as consent already given
        const gaId = (typeof PUBLIC_GA_ID !== 'undefined' && PUBLIC_GA_ID) ? PUBLIC_GA_ID : 'G-Z5ZG34WJP1';
        injectGA(gaId);
      } else if (hasConsent === null) {
        // Show consent banner for new users
          showConsent.set(true);
      } else {
        // explicitly rejected or other state: ensure opt-out
        posthog.opt_out_capturing && posthog.opt_out_capturing();
      }
      console.log('PostHog initialized with GDPR compliance');
    } catch (e) {
      console.error('Failed to initialize PostHog', e);
      // Even if posthog fails, still show the banner so user can give/deny GA consent
      const hasConsent = localStorage.getItem('analytics_consent');
        if (hasConsent === null) showConsent.set(true);
    }
  });
</script>

<Nav />

<main class="main">
  {@render children()}
</main>

{#if $showConsent}
  <CookieConsent onAccept={handleAccept} onReject={handleReject} />
{/if}

<Footer />
<EditThisPage />
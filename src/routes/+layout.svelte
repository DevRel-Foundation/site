<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import * as env from '$env/dynamic/public';

  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Footer from '$lib/components/nav/Footer.svelte';
  import CookieConsent from '$lib/ui/CookieConsent.svelte';
  import { Tooltip } from 'bits-ui';
  import { writable } from 'svelte/store';

  let { children } = $props();
  let posthog: any = null;
  let gaLoaded = false;
  const showConsent = writable(false);

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

  function handleAccept() {
    localStorage.setItem('analytics_consent', 'true');
    if (posthog) {
      posthog.opt_in_capturing();
      posthog.capture('$pageview');
      posthog.capture('cookie_consent_given', { action: 'accept' });
    }
  const gaId = (typeof env.PUBLIC_GA_ID !== 'undefined' && env.PUBLIC_GA_ID) ? env.PUBLIC_GA_ID : 'G-Z5ZG34WJP1';
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

  $effect(() => {
    if (browser && posthog && $page.url) {
      const hasConsent = localStorage.getItem('analytics_consent');
      if (hasConsent === 'true') {
        posthog.capture('$pageview', {
          $current_url: $page.url.href,
          $pathname: $page.url.pathname,
        });
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

  onMount(async () => {
    if (!browser) return;
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
      const hasConsent = localStorage.getItem('analytics_consent');
      if (hasConsent === 'true') {
        posthog.opt_in_capturing();
        posthog.capture('$pageview');
  const gaId = (typeof env.PUBLIC_GA_ID !== 'undefined' && env.PUBLIC_GA_ID) ? env.PUBLIC_GA_ID : 'G-Z5ZG34WJP1';
        injectGA(gaId);
      } else if (hasConsent === null) {
          showConsent.set(true);
      } else {
        posthog.opt_out_capturing && posthog.opt_out_capturing();
      }
      console.log('PostHog initialized with GDPR compliance');
    } catch (e) {
      console.error('Failed to initialize PostHog', e);
      const hasConsent = localStorage.getItem('analytics_consent');
        if (hasConsent === null) showConsent.set(true);
    }
  });
</script>

<Tooltip.Provider delayDuration={200} skipDelayDuration={300}>
  <Nav />

  <main class="main">
    {@render children()}
  </main>

{#if $showConsent}
  <CookieConsent onAccept={handleAccept} onReject={handleReject} />
{/if}

  <Footer />
</Tooltip.Provider>

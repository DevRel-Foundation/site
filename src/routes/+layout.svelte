<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';

  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Footer from '$lib/components/nav/Footer.svelte';
  import { MotifDotGrid, MotifOverlappingCircles } from '$lib/components/ui/atoms/motifs';
  import CookieConsent from '$lib/ui/CookieConsent.svelte';
  import { Tooltip } from 'bits-ui';
  import { writable } from 'svelte/store';
  import type { PostHog } from 'posthog-js';

  let { children } = $props();
  const isHomepage = $derived($page.url.pathname === '/');
  const showOverlappingCircles = $derived(
    !isHomepage && $page.url.pathname !== '/about/steering-committee'
  );
  let posthog: PostHog | null = null;
  let gaLoaded = false;
  const DEFAULT_GA_ID = 'G-Z5ZG34WJP1';
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
    const gaId = env.PUBLIC_GA_ID || DEFAULT_GA_ID;
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
        if (gaLoaded && window.gtag) {
          try {
            window.gtag('event', 'page_view', { page_path: $page.url.pathname });
          } catch {
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
        const gaId = env.PUBLIC_GA_ID || DEFAULT_GA_ID;
        injectGA(gaId);
      } else if (hasConsent === null) {
          showConsent.set(true);
      } else {
        posthog.opt_out_capturing();
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
  <div class="site-chrome">
    {#if !isHomepage}
      <MotifDotGrid variant="header" />
    {/if}

    <Nav />

    <main class="main">
      {#if showOverlappingCircles}
        <MotifOverlappingCircles />
      {/if}
      {@render children()}
    </main>

    {#if !isHomepage}
      <div class="footer-dot-grid-anchor">
        <MotifDotGrid variant="footer" />
      </div>
    {/if}

    <Footer />
  </div>

  {#if $showConsent}
    <CookieConsent onAccept={handleAccept} onReject={handleReject} />
  {/if}
</Tooltip.Provider>

<style>
  .footer-dot-grid-anchor {
    position: relative;
    height: 0;
  }
</style>

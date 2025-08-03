<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Footer from '$lib/components/nav/Footer.svelte';
  import EditThisPage from '$lib/components/feedback/EditThisPage.svelte';

  let posthog: any = null;

  // Initialize PostHog on client side
  onMount(async () => {
    if (browser) {
      const { default: posthogLib } = await import('posthog-js');
      
      posthogLib.init(
        'phc_88kMI3C9TgIR8Oaeqmdb9gM2MFgcH5k9McpB5mq6uGa',
        {
          api_host: 'https://us.i.posthog.com',
          person_profiles: 'identified_only',
          capture_pageview: true,
          capture_pageleave: true,
        }
      );
      
      posthog = posthogLib;
      console.log('PostHog initialized');
    }
  });

  // Track page changes
  $effect(() => {
    if (browser && posthog && $page.url) {
      posthog.capture('$pageview', {
        $current_url: $page.url.href,
        $pathname: $page.url.pathname,
      });
    }
  });
</script>

<Nav />

<main class="main">
  <slot />
</main>

<Footer />
<EditThisPage />
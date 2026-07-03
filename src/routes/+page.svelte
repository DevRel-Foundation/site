<script lang="ts">
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { identifyWithConsent, trackWithConsent } from '$lib/utils/consent';
  
	let email = $state('');
	let heroTextVisible = $state(false);

	onMount(() => {
		requestAnimationFrame(() => {
			heroTextVisible = true;
		});
	});

	async function handleNewsletterSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!email || !isValidEmail(email)) {
			alert('Please enter a valid email address');
			return;
		}
		
		await trackNewsletterSignup(email);
		handleSubscribe(email);
		email = '';
	}

	async function trackNewsletterSignup(emailAddress: string) {
		if (browser) {
			try {
				await identifyWithConsent(emailAddress, {
					email: emailAddress,
					newsletter_signup: true,
					signup_source: 'homepage',
					signup_timestamp: new Date().toISOString()
				});
				
				await trackWithConsent('newsletter_signup', {
					email: emailAddress,
					source: 'homepage',
					list: 'community'
				});
			} catch (error) {
				console.error('PostHog tracking failed:', error);
			}
		}
	}

	function isValidEmail(value: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	function handleSubscribe(address: string) {
		if (!address || !isValidEmail(address)) {
			return;
		}
		
		const encodedEmail = encodeURIComponent(address.trim());
		const subscribeUrl = `https://lists.dev-rel.org/g/community/join?email=${encodedEmail}`;
		window.open(subscribeUrl, '_blank', 'noopener,noreferrer');
	}

	function handleMissionClick() {
		window.location.href = '/about/mission';
	}

	function handleProjectClick() {
		window.location.href = '/projects';
	}

	function handleJoinClick() {
		window.location.href = '/join-us';
	}

  import NetworkIcon from 'iconoir/icons/regular/network-right.svg';
  import PlantIcon from 'iconoir/icons/regular/watering-soil.svg';
  import TreeIcon from 'iconoir/icons/regular/tree.svg';
  import HeroLogo from '$lib/components/ui/atoms/HeroLogo.svelte';
</script>

<svelte:head>
  <title>Developer Relations Foundation</title>
  <meta name="description" content="The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards." />
  
  <meta name="keywords" content="DevRel Foundation, Developer Relations, Developer Advocacy, Community Building, Open Source, Professional Development, DevRel Tools, DevRel Best Practices" />
  <meta name="author" content="DevRel Foundation" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={page.url.href} />
  
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content="Developer Relations Foundation" />
  <meta property="og:description" content="The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards." />
  <meta property="og:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DevRel Foundation" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content="The Developer Relations Foundation" />
  <meta name="twitter:description" content="The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards." />
  <meta name="twitter:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DevRel Foundation",
      "description": "The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards.",
      "url": page.url.href,
      "logo": `${page.url.origin}/images/devrel-foundation-logo.png`,
      "foundingDate": "2024",
      "sameAs": [
        "https://github.com/devrel-foundation",
        "https://discord.gg/G7CSTKZcuT"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "general inquiry",
        "email": "info@dev-rel.org"
      }
    })}
  </script>
</svelte:head>

<div class="homepage">
	<section class="layout-section hero">
		<div class="hero-title-area">
			<div class="hero-title" class:is-visible={heroTextVisible}>
				<h1>
					<span class="devrel">DEVREL</span>
					<span class="foundation">Foundation</span>
				</h1>
				<p class="subtitle">
					Fostering growth, community, and best practices in Developer Relations.
				</p>
			</div>
			<div class="hero-logo-wrap" aria-label="DevRel Foundation Logo" role="img">
				<HeroLogo />
			</div>
		</div>
	</section>

	<section class="layout-section u-grid u-grid-3 content-boxes">
		<div class="content-box">
			<img src={PlantIcon} alt="Plant" />
			<h3 class="content-box-heading">Our mission</h3>
			<p>
				To elevate the professional practice of developer relations and increase awareness of it as a driver of business value.
			</p>
			<button class="content-button" onclick={handleMissionClick}>Learn</button>
		</div>

		<div class="content-box">
			<img src={TreeIcon} alt="Tree" />
			<h3 class="content-box-heading">The projects</h3>
			<p>
				We source and innovate on the knowledge, systems, and best practices needed to achieve technology adoption.
			</p>
			<button class="content-button" onclick={handleProjectClick}>Explore</button>
		</div>

		<div class="content-box">
			<img src={NetworkIcon} alt="Network" />
			<h3 class="content-box-heading">Join us</h3>
			<p>
				Partner with us on <a href="https://discord.gg/G7CSTKZcuT">Discord</a> and <a href="https://github.com/DevRel-Foundation">GitHub</a> to share your voice and collaborate with peers.
			</p>
			<button class="content-button" onclick={handleJoinClick}>Get involved</button>
		</div>
	</section>

	<section class="layout-section newsletter-wrap">
		<div class="newsletter-section">
			<div class="newsletter-content">
				<h2>Subscribe to the mailing list</h2>
				<p>
					Stay in the loop with the latest announcements, events, best practices, and other community news.
				</p>

				<form class="newsletter-form" onsubmit={handleNewsletterSubmit}>
					<input type="email" bind:value={email} placeholder="Enter your email address" required />
					<button type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	</section>
</div>

<style>
	.homepage {
		position: relative;
		box-sizing: border-box;
	}

	.homepage::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
		height: 100%;
		background-image: radial-gradient(
			circle,
			var(--pattern-color) 0.8px,
			transparent 0.8px
		);
		background-size: var(--space-m) var(--space-m);
		z-index: -1;
	}

	.hero {
		padding-block: var(--space-m);
		margin-bottom: var(--space-xl);
	}
	
	.hero-title-area {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		background-color: var(--color-background);
		gap: var(--space-l);
	}

	.hero-title {
		align-self: flex-start;
		text-align: left;
		flex: 1;
		--hero-text-duration: 0.65s;
	}

	.hero-title h1,
	.hero-title .subtitle {
		opacity: 0;
		transform: translateY(0.4rem);
		transition:
			opacity var(--hero-text-duration) ease-out,
			transform var(--hero-text-duration) ease-out;
	}

	.hero-title.is-visible h1 {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.05s;
	}

	.hero-title.is-visible .subtitle {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.2s;
	}

	.hero h1 {
		font-size: var(--step-4);
		color: var(--color-text);
		margin: 0;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space-m);
	}

	.devrel {
		line-height: 1;
	}

	.foundation {
		font-weight: 200;
		line-height: 1;
	}

	.hero-logo-wrap {
		flex-shrink: 0;
		width: min(40vw, 200px);
	}

	.hero .subtitle {
		font-size: var(--step-1);
		font-weight: 200;
		color: var(--color-text);
	}

	.content-boxes {
		margin-bottom: var(--space-3xl);
	}

	.newsletter-wrap {
		margin-bottom: var(--space-2xl);
	}

	.content-box {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-m);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		min-height: 300px;
	}

	.content-box img {
		width: 3rem;
		height: 3rem;
		filter: var(--icon-filter);
		margin-bottom: var(--space-s);
	}

	.content-box-heading {
		font-size: var(--step-3);
		line-height: 1;
		color: var(--color-text);
		margin-bottom: var(--space-s);
		margin-top: 0;
	}

	.content-box p {
		color: var(--color-text);
		font-size: var(--step-0);
		flex-grow: 1;
		margin-bottom: var(--space-s);
	}

	.content-button {
		margin-top: auto;
		padding: var(--space-xs) var(--space-l);
		background-color: var(--color-button-background);
		color: var(--color-button-text);
		border: none;
		border-radius: var(--radius-pill);
		cursor: pointer;
		font-weight: 500;
		line-height: 1;
	}

	.content-button:hover {
		background-color: color-mix(in srgb, var(--color-button-background) 80%, white 20%);
		color: var(--color-button-text);
	}

	.newsletter-section {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-m);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-accent-green);
		position: relative;
		z-index: 1;
	}

	.newsletter-content {
		text-align: left;
	}

	.newsletter-content h2 {
		color: var(--color-text);
		margin-top: 0;
		margin-bottom: var(--space-xs);
		font-size: var(--step-3);
	}

	.newsletter-content p {
		color: var(--color-text);
		margin-bottom: var(--space-s);
		font-size: var(--step-0);
	}

	.newsletter-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.newsletter-form input {
		width: 100%;
		padding: var(--space-xs) var(--space-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
		border-radius: var(--radius-pill);
		background-color: var(--color-background);
		color: var(--color-text);
		box-sizing: border-box;
	}

	.newsletter-form input::placeholder {
		color: var(--color-text-secondary);
		opacity: 1;
	}

	.newsletter-form button {
		padding: var(--space-xs) var(--space-m);
		background-color: var(--color-link);
		color: var(--color-background-secondary-1);
		border: none;
		border-radius: var(--radius-pill);
		cursor: pointer;
	}

	@media (min-width: 769px) {
		.hero {
			padding-block: var(--space-l);
		}

		.hero-title-area {
			flex-direction: row;
			align-items: center;
			gap: var(--space-m);
		}

		.hero-title {
			padding-top: var(--space-2xl);
		}

		.hero-logo-wrap {
			width: calc(40% - var(--space-l));
		}

		.hero h1 {
			font-size: calc(var(--step-5) * 1.2);
		}

		.newsletter-form {
			flex-direction: row;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-title h1,
		.hero-title .subtitle {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>

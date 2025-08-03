<script lang="ts">
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { identifyWithConsent, trackWithConsent } from '$lib/utils/consent';
  
	let email = '';

	async function handleNewsletterSubmit(event: SubmitEvent) {
		event.preventDefault();
		// Validate email before proceeding
		if (!email || !isValidEmail(email)) {
			alert('Please enter a valid email address');
			return;
		}
		
		// Handle newsletter signup with PostHog tracking
		console.log('Newsletter signup:', email);
		
		// Track with PostHog before redirecting
		await trackNewsletterSignup(email);
		
		handleSubscribe(email);
		email = '';
	}

	async function trackNewsletterSignup(emailAddress: string) {
		if (browser) {
			try {
				// Use the consent utility for tracking
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
				
				console.log('PostHog tracking completed for:', emailAddress);
			} catch (error) {
				console.error('PostHog tracking failed:', error);
			}
		}
	}

	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function handleSubscribe(address: string) {
		// Additional validation
		if (!address || !isValidEmail(address)) {
			console.error('Invalid email address');
			return;
		}
		
		// Sanitize and encode the email
		const encodedEmail = encodeURIComponent(address.trim());
		const subscribeUrl = `https://lists.dev-rel.org/g/community/join?email=${encodedEmail}`;
		
		// Open in new tab for security
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
</script>

<svelte:head>
  <title>Developer Relations Foundation</title>
  <meta name="description" content="The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards." />
  
  <!-- SEO Optimizations -->
  <meta name="keywords" content="DevRel Foundation, Developer Relations, Developer Advocacy, Community Building, Open Source, Professional Development, DevRel Tools, DevRel Best Practices" />
  <meta name="author" content="DevRel Foundation" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={page.url.href} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content="Developer Relations Foundation" />
  <meta property="og:description" content="The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards." />
  <meta property="og:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DevRel Foundation" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content="The Developer Relations Foundation" />
  <meta name="twitter:description" content="The DevRel Foundation is dedicated to elevating the professional practice of Developer Relations through open-source resources, community collaboration, and industry standards." />
  <meta name="twitter:image" content="{page.url.origin}/images/devrel-foundation-logo.png" />
  
  <!-- JSON-LD Structured Data -->
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
        "https://discord.gg/kfJkJ3Xd"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "general inquiry",
        "email": "info@dev-rel.org"
      }
    })}
  </script>
</svelte:head>

<div class="container">
	<section class="hero">
		<div class="hero-title-area">
			<div class="hero-title">
				<h1>
					<span class="devrel">DEVREL</span>
					<span class="foundation">Foundation</span>
				</h1>
				<p class="subtitle">
					Fostering growth, community, and best practices in Developer Relations.
				</p>
			</div>
			<img src="/drf_logo_symbol.svg" alt="DevRel Foundation Logo" class="hero-logo" />
		</div>
	</section>

	<section class="content-boxes">
		<div class="content-box">
			<img src={PlantIcon} alt="Plant" />
			<h3 class="content-box-heading">Our Mission</h3>
			<p>
				To elevate the professional practice of developer relations and increase awareness of it as a driver of business value.
			</p>
			<button class="content-button" on:click={handleMissionClick}>Learn</button>
		</div>

		<div class="content-box">
			<img src={TreeIcon} alt="Tree" />
			<h3 class="content-box-heading">The Projects</h3>
			<p>
				We source and innovate on the knowledge, systems, and best practices needed to achieve technology adoption.
			</p>
			<button class="content-button" on:click={handleProjectClick}>Explore</button>
		</div>

		<div class="content-box">
			<img src={NetworkIcon} alt="Network" />
			<h3 class="content-box-heading">Join Us</h3>
			<p>
				Partner with us on <a href="https://discord.gg/kfJkJ3Xd">Discord</a> and <a href="https://github.com/DevRel-Foundation">GitHub</a> to share your voice and collaborate with peers.
			</p>
			<button class="content-button" on:click={handleJoinClick}>Get Involved</button>
		</div>
	</section>

	<section class="newsletter-section">
		<div class="newsletter-content">
			<h2>Subscribe to the Mailing List</h2>
			<p>
				Stay in the loop with the latest announcements, events, best practices, and other community news.
			</p>

			<form class="newsletter-form" on:submit={handleNewsletterSubmit}>
				<input type="email" bind:value={email} placeholder="Enter your email address" required />
				<button type="submit">Subscribe</button>
			</form>
		</div>
	</section>
</div>

<style>
	.container {
		position: relative;
		box-sizing: border-box;
	}

	.container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
		height: 100%;
		background-image: radial-gradient(var(--pattern-color) 1px, transparent 1px);
		background-size: var(--space-m) var(--space-m);
		z-index: -1;
	}

	.hero {
		padding: var(--space-m) var(--space-m);
	}
	
	.hero-title-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--color-background);
		gap: var(--space-l);
		max-width: var(--grid-max-width);
		margin: 0 auto;
	}
	
	.hero-title {
		text-align: center;
		flex: 1;
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

	.hero-logo {
		height: auto;
		max-width: min(40vw, 200px);
		width: auto;
		flex-shrink: 0;
	}

	.hero .subtitle {
		font-size: var(--step-1);
		font-weight: 200;
		color: var(--color-text);
	}

	.content-boxes {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-l);
		max-width: var(--grid-max-width);
		margin: 0 auto;
		margin-bottom: var(--space-2xl);
		padding: 0 var(--space-m);
	}

	.content-box {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-m);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
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
		color: var(--color-mint-dark);
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
		padding: var(--space-3xs) var(--space-l);
		background-color: var(--color-mint-dark);
		color: var(--color-mint);
		border: none;
		border-radius: var(--radius-s);
		cursor: pointer;
		font-weight: 500;
	}

	.content-button:hover {
		background-color: color-mix(in srgb, var(--color-mint-dark) 80%, white 20%);
		color: var(--color-mint);
	}

	.newsletter-section {
		background-color: var(--color-mint);
		padding: var(--space-m);
		border-radius: var(--radius-l);
		width: 80%;
		max-width: calc(var(--grid-max-width) * 0.8);
		margin: 0 auto var(--space-2xl) auto;
		box-sizing: border-box;
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
		margin: 0 auto;
	}

	.newsletter-form input {
		width: 100%;
		padding: var(--space-2xs);
		border: var(--border-thickness) solid var(--color-background-secondary-1);
		border-radius: var(--radius-s);
		background-color: var(--color-background);
		color: var(--color-text);
		box-sizing: border-box;
	}

	.newsletter-form button {
		padding: var(--space-xs) var(--space-m);
		background-color: var(--color-link);
		color: var(--color-background);
		border: none;
		border-radius: var(--radius-s);
		cursor: pointer;
	}

	@media (min-width: 769px) {
		.hero {
			padding: var(--space-l) var(--space-m);
		}

		.hero-title-area {
			flex-direction: row;
			gap: var(--space-m);
			text-align: left;
		}

		.hero-title {
			text-align: left;
		}

		.hero h1 {
			font-size: calc(var(--step-5) * 1.2);
		}

		.hero-logo {
			max-width: calc(40% - var(--space-l));
		}

		.newsletter-form {
			flex-direction: row;
		}

		.content-boxes {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}
</style>

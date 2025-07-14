<script lang="ts">
	let email = '';

	function handleNewsletterSubmit(event: SubmitEvent) {
		event.preventDefault();
		// Handle newsletter signup
		console.log('Newsletter signup:', email);
		email = '';
	}
</script>

<svelte:head>
	<title>Developer Relations Foundation</title>
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
					Fostering growth, community, and best practices in developer relations.
				</p>
			</div>
			<img src="/drf_logo_symbol.svg" alt="DevRel Foundation Logo" class="hero-logo" />
		</div>
	</section>

	<section class="content-boxes">
		<div class="content-box">
			<h3>What we do</h3>
			<p>Network with peers, collaborate on ideas, create resources, and encourage best practices.</p>
		</div>

		<div class="content-box">
			<h3>Projects</h3>
			<p>
				Learn from and contribute to one of our <a href="/projects">projects</a>.
				
				We source and innovate on best practices and knowledge needed for practicing developer relations.
			</p>
		</div>

		<div class="content-box">
			<h3>Join us</h3>
			<p>
				Join us on <a href="https://discord.gg/devrel">Discord</a> or <a href="https://github.com/DevRel-Foundation">GitHub</a> to get involved or engage with the community.
			</p>
		</div>
	</section>

	<section class="newsletter-section">
		<div class="newsletter-content">
			<h2>Join our newsletter</h2>
			<p>
				Stay updated with the latest in developer relations best practices, events, and community news.
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
		padding: var(--space-2xl) 0;
	}
	
	.hero-title-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: var(--color-background);
	}
	
	.hero-title {
		/* margin-bottom: var(--space-m); */
	}

	.hero h1 {
		font-size: calc(var(--step-5) * 1.2);
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
		height: 100%;
        max-width: calc(50% - var(--space-l));
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
	}

	.content-box {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-l);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
	}

	.content-box h3 {
        margin-top: 0;
		color: var(--color-text);
		font-size: var(--step-2);
	}

	.content-box p {
		color: var(--color-text);
		font-size: var(--step-0);
	}

	.newsletter-section {
		background-color: var(--color-mint);
		padding: var(--space-l) var(--space-m);
		margin-bottom: var(--space-2xl);
        border-radius: var(--radius-l);

	}

	.newsletter-content h2 {
		color: var(--color-text);
		margin-top: 0;
		margin-bottom: var(--space-s);
		font-size: var(--step-3);
	}

	.newsletter-content p {
		color: var(--color-text);
		margin-bottom: var(--space-l);
		font-size: var(--step-0);
	}

	.newsletter-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		margin: 0 auto;
	}

	.newsletter-form input {
		width: 100%;
		padding: var(--space-s);
		border: var(--border-thickness) solid var(--color-background-secondary-1);
		border-radius: var(--radius-s);
		background-color: var(--color-background);
		color: var(--color-text);
		box-sizing: border-box;
	}

	.newsletter-form button {
		padding: var(--space-s) var(--space-m);
		background-color: var(--color-link);
		color: var(--color-background);
		border: none;
		border-radius: var(--radius-s);
		cursor: pointer;
	}

	@media (min-width: 769px) {
		.newsletter-form {
			flex-direction: row;
		}

		.content-boxes {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}
</style>

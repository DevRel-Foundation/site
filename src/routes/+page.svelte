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
		<h1>Developer Relations Foundation</h1>
		<p class="subtitle">
			Fostering growth, community, and best practices in developer relations.
		</p>
	</section>

	<section class="content-boxes">
		<div class="content-box">
			<h3>Network</h3>
			<p>Creating inclusive spaces where developers can connect, collaborate, and grow together.</p>
		</div>

		<div class="content-box">
			<h3>Build together</h3>
			<p>
				Developing resources and programs that help technical audiences learn and adopt new technologies.
			</p>
		</div>

		<div class="content-box">
			<h3>Create resources</h3>
			<p>
				Representing developer needs within organizations and ensuring their voices are heard in product decisions.
			</p>
		</div>
	</section>

	<section class="newsletter-section">
		<div class="newsletter-content">
			<h2>Stay Connected</h2>
			<p>
				Join our newsletter to stay updated on DevRel Foundation news, events, and opportunities to
				get involved in our community.
			</p>

			<form class="newsletter-form" on:submit={handleNewsletterSubmit}>
				<input type="email" bind:value={email} placeholder="Enter your email address" required />
				<button type="submit">Subscribe</button>
			</form>
		</div>
	</section>
</div>

<style>
	.hero {
		padding: var(--space-2xl) var(--space-m);
		background-color: var(--color-background);
	}

	.hero h1 {
		font-size: var(--step-5);
		color: var(--color-text);
		margin-bottom: var(--space-m);
	}

	.hero .subtitle {
		font-size: var(--step-2);
		color: var(--color-text);
		margin-bottom: var(--space-xl);
	}

	.content-boxes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-l);
		padding: var(--space-xl) var(--space-m);
		max-width: var(--grid-max-width);
		margin: 0 auto;
	}

	.content-box {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-l);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
	}

	.content-box h3 {
		color: var(--color-text);
		margin-bottom: var(--space-s);
		font-size: var(--step-2);
	}

	.content-box p {
		color: var(--color-text);
		font-size: var(--step-0);
	}

	.newsletter-section {
		background-color: var(--color-background-secondary-2);
		padding: var(--space-xl) var(--space-m);
	}

	.newsletter-content h2 {
		color: var(--color-text);
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
		gap: var(--space-s);
		max-width: 400px;
		margin: 0 auto;
	}

	.newsletter-form input {
		flex: 1;
		padding: var(--space-s);
		border: var(--border-thickness) solid var(--color-background-secondary-1);
		border-radius: var(--radius-s);
		background-color: var(--color-background);
		color: var(--color-text);
	}

	.newsletter-form button {
		padding: var(--space-s) var(--space-m);
		background-color: var(--color-link);
		color: var(--color-background);
		border: none;
		border-radius: var(--radius-s);
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.newsletter-form {
			flex-direction: column;
		}

		.content-boxes {
			grid-template-columns: 1fr;
		}
	}
</style>

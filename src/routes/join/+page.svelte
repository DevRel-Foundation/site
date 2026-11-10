<script lang="ts">
	import ActionCard from '$lib/components/ui/molecules/ActionCard.svelte';
	import { DISCORD_URL } from '$lib/community';

	const BLOG_GUIDE_URL =
		'https://github.com/DevRel-Foundation/site/blob/main/CONTRIBUTING.md#blog-contribution-guidelines';

	const moreWays = [
		{
			title: 'Working groups',
			text: 'Collaborate on Foundation projects with other contributors.',
			href: '/about/working-groups'
		},
		{
			title: 'Projects on GitHub',
			text: 'Open issues or pull requests on the open-source projects.',
			href: '/projects'
		},
		{
			title: 'Mailing list',
			text: 'Get announcements and discussions by email.',
			href: 'https://lists.dev-rel.org/g/community/join',
			external: true
		}
	];
</script>

<svelte:head>
	<title>Join us | Developer Relations Foundation</title>
	<meta
		name="description"
		content="Join the DevRel Foundation community: come to a Community Touchpoint, join Discord, submit a session, or write for the blog."
	/>
</svelte:head>

<div class="container join">
	<section class="join__hero">
		<h1>Join us</h1>
		<p class="join__lead">
			The DevRel Foundation is open to anyone interested in Developer Relations. There are no fees
			or formal requirements. Pick a way to get started:
		</p>

		<div class="join__cards">
			<ActionCard
				title="Come to a Touchpoint"
				ctaLabel="See Touchpoints"
				ctaHref="/community/touchpoints"
			>
				<p>Open calls every other Wednesday to meet the community and share your work.</p>
			</ActionCard>

			<ActionCard title="Join Discord" ctaLabel="Join Discord ↗" ctaHref={DISCORD_URL}>
				<p>Chat with other DevRel practitioners, ask questions, and follow what's happening.</p>
			</ActionCard>

			<ActionCard
				title="Submit a session"
				ctaLabel="Submit a session"
				ctaHref="/community/touchpoints/submit"
			>
				<p>Show a workflow, tool, or experiment at an upcoming Touchpoint.</p>
			</ActionCard>

			<ActionCard title="Write for the blog" ctaLabel="Read the guide ↗" ctaHref={BLOG_GUIDE_URL}>
				<p>Share what you've learned with a post on the DevRel Foundation blog.</p>
			</ActionCard>
		</div>
	</section>

	<section class="join__more">
		<h2>More ways to get involved</h2>
		<ul>
			{#each moreWays as way (way.href)}
				<li>
					<a
						href={way.href}
						target={way.external ? '_blank' : undefined}
						rel={way.external ? 'noopener noreferrer' : undefined}
						>{way.title}{way.external ? ' ↗' : ''}</a
					>
					<span>{way.text}</span>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.join {
		margin-block: var(--space-m) var(--space-2xl);
	}

	.join__hero h1 {
		margin-bottom: var(--space-2xs);
	}

	.join__lead {
		max-width: 48rem;
		font-size: var(--step-1);
		line-height: 1.5;
	}

	.join__cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: var(--space-s);
		margin-top: var(--space-m);
	}

	.join__cards :global(.cta-button) {
		display: inline-block;
		width: fit-content;
		max-width: 100%;
	}

	.join__more {
		margin-top: var(--space-xl);
	}

	.join__more h2 {
		margin: 0 0 var(--space-s);
		font-size: var(--step-2);
		color: var(--color-text);
	}

	.join__more ul {
		display: grid;
		gap: var(--space-xs);
		max-width: 48rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.join__more li {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--space-xs);
		align-items: baseline;
	}

	.join__more a {
		font-weight: 600;
		color: var(--color-link);
	}

	.join__more span {
		font-size: var(--step--1);
	}
</style>

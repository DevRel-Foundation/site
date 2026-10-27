<script lang="ts">
	import NextTouchpoint from '$lib/components/page/touchpoints/NextTouchpoint.svelte';
	import GovernanceNotice from '$lib/components/ui/molecules/GovernanceNotice.svelte';
	import CtaButton from '$lib/components/ui/primitives/CtaButton.svelte';
	import {
		DISCORD_URL,
		LFX_SIGNUP_URL,
		SHOW_AND_TELL_DISCUSSION_URL,
		TOUCHPOINTS_AGENDAS_URL
	} from '$lib/community';

	const facts = [
		{
			title: 'Every other Wednesday',
			text: '13:00 UTC for 60 minutes. Check the calendar for your local time and for any changes.'
		},
		{
			title: 'Open to everyone',
			text: 'No membership or company affiliation needed. Newcomers and experienced DevRel practitioners are equally welcome.'
		},
		{
			title: 'A community agenda',
			text: 'Each agenda is posted in GitHub Discussions before the call. Anyone can add questions, announcements, or ideas.'
		},
		{
			title: 'Rotating facilitators',
			text: 'Community volunteers take turns facilitating, with support from Linux Foundation staff.'
		}
	];

	const ideas = [
		'Updating a demo when a new product version ships, and checking that it still works',
		'Turning a talk recording into drafts for a tutorial, blog post, or social content',
		'Preparing workshop exercises, testing the code, and putting the materials together',
		'Collecting content and event metrics for a recurring report',
		'Answering developer questions or turning recurring questions into documentation'
	];
</script>

<svelte:head>
	<title>Community Touchpoints | Developer Relations Foundation</title>
	<meta
		name="description"
		content="DRF Community Touchpoints are open, biweekly calls where the DevRel community shapes the next phase of the DevRel Foundation. Join a call or submit a show-and-tell session."
	/>
</svelte:head>

<div class="container touchpoints">
	<section class="touchpoints__hero">
		<div class="touchpoints__intro">
			<p class="touchpoints__eyebrow">Community</p>
			<h1>DRF Community Touchpoints</h1>
			<p class="touchpoints__lead">
				Community Touchpoints are open, biweekly calls where the DevRel community meets to
				reconnect, share challenges and work, and decide together where the DevRel Foundation can be
				most useful.
			</p>
			<div class="touchpoints__ctas">
				<CtaButton href="/calendar">See the calendar</CtaButton>
				<a class="touchpoints__secondary" href="/community/touchpoints/submit">Submit a session</a>
			</div>
		</div>
		<NextTouchpoint />
	</section>

	<GovernanceNotice compact />

	<section class="touchpoints__section">
		<h2>How Touchpoints work</h2>
		<ul class="touchpoints__facts">
			{#each facts as fact (fact.title)}
				<li>
					<h3>{fact.title}</h3>
					<p>{fact.text}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="touchpoints__section">
		<h2>How to join</h2>
		<ol class="touchpoints__steps">
			<li>
				<h3>Create a free LFX account</h3>
				<p>
					Meetings run on the Linux Foundation's LFX platform. If you don't have an account yet,
					<a href={LFX_SIGNUP_URL} target="_blank" rel="noopener noreferrer">create one ↗</a>. It's
					free.
				</p>
			</li>
			<li>
				<h3>Register for the next call</h3>
				<p>
					Open a Touchpoint in the <a href="/calendar">community calendar</a> and register on LFX. You
					can also subscribe to the calendar to get every session.
				</p>
			</li>
			<li>
				<h3>Bring your topics</h3>
				<p>
					Read the <a href={TOUCHPOINTS_AGENDAS_URL} target="_blank" rel="noopener noreferrer"
						>agenda in GitHub Discussions ↗</a
					> and add your questions or ideas, or bring them to the call.
				</p>
			</li>
		</ol>
	</section>

	<section class="touchpoints__section touchpoints__feature">
		<div>
			<p class="touchpoints__eyebrow">Call for sessions</p>
			<h2>Show and tell: agent-assisted workflows for DevRel</h2>
			<p>
				Upcoming Touchpoints will include short show-and-tell sessions about automated and
				agent-assisted workflows for DevRel work. Have you built or tried a workflow like one of
				these?
			</p>
			<ul class="touchpoints__ideas">
				{#each ideas as idea (idea)}
					<li>{idea}</li>
				{/each}
			</ul>
			<p>
				Show how the steps connect, which tools and reusable skills are involved, what runs
				automatically, and where human review is needed. Things that didn't work are useful too. Any
				platform is welcome, including experiments, work in progress, and talks you gave before.
			</p>
			<div class="touchpoints__ctas">
				<CtaButton href="/community/touchpoints/submit">Submit a session</CtaButton>
				<a
					class="touchpoints__secondary"
					href={SHOW_AND_TELL_DISCUSSION_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					Join the discussion ↗
				</a>
			</div>
		</div>
	</section>

	<section class="touchpoints__section">
		<h2>Help run the Touchpoints</h2>
		<p>
			Touchpoints depend on community volunteers. You can facilitate a call, take notes, or help
			host sessions at times that work better for other regions. Add your name to a shared agenda,
			say so during a call, or let us know on <a
				href={DISCORD_URL}
				target="_blank"
				rel="noopener noreferrer">Discord ↗</a
			>.
		</p>
	</section>
</div>

<style>
	.touchpoints {
		margin-block: var(--space-m) var(--space-2xl);
	}

	.touchpoints__hero {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
		gap: var(--space-l);
		align-items: center;
	}

	.touchpoints__hero h1 {
		margin: var(--space-3xs) 0 var(--space-s);
		font-size: var(--step-5);
		line-height: 1.1;
		color: var(--color-text);
	}

	.touchpoints__eyebrow {
		margin: 0;
		font-size: var(--step--1);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	.touchpoints__lead {
		font-size: var(--step-1);
		line-height: 1.5;
	}

	.touchpoints__ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-s);
		margin-top: var(--space-s);
	}

	.touchpoints__secondary {
		padding: var(--space-xs) var(--space-l);
		border: 1px solid var(--color-link);
		border-radius: var(--radius-pill);
		color: var(--color-link);
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
	}

	.touchpoints__secondary:hover {
		background: var(--color-background-secondary-1);
	}

	.touchpoints__section {
		margin-top: var(--space-xl);
	}

	.touchpoints__section h2 {
		margin: 0 0 var(--space-s);
		font-size: var(--step-3);
		color: var(--color-text);
	}

	.touchpoints__section > p {
		max-width: 48rem;
	}

	.touchpoints__facts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: var(--space-s);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.touchpoints__facts li {
		margin: 0;
		padding: var(--space-s);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-m);
		background: var(--color-background);
	}

	.touchpoints__facts h3,
	.touchpoints__steps h3 {
		margin: 0 0 var(--space-2xs);
		font-size: var(--step-0);
		color: var(--color-text);
	}

	.touchpoints__facts p,
	.touchpoints__steps p {
		margin: 0;
		font-size: var(--step--1);
		line-height: 1.6;
	}

	.touchpoints__steps {
		display: grid;
		gap: var(--space-s);
		max-width: 48rem;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: step;
	}

	.touchpoints__steps li {
		position: relative;
		padding-left: 3rem;
		counter-increment: step;
	}

	.touchpoints__steps li::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-circle);
		background: var(--color-button-background);
		color: var(--color-button-text);
		font-weight: 700;
	}

	.touchpoints__feature {
		padding: var(--space-l);
		border-radius: var(--radius-l);
		background: var(--color-background-secondary-1);
	}

	.touchpoints__feature p {
		max-width: 48rem;
	}

	.touchpoints__ideas {
		max-width: 48rem;
		margin: 0 0 var(--space-s) var(--space-m);
		list-style: disc;
	}

	.touchpoints__ideas li {
		margin-bottom: var(--space-3xs);
	}

	@media (max-width: 800px) {
		.touchpoints__hero {
			grid-template-columns: 1fr;
		}

		.touchpoints__feature {
			padding: var(--space-m);
		}
	}
</style>

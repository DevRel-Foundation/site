<script lang="ts">
	import { onMount } from 'svelte';
	import { eventSlug, type CalendarEvent } from '$lib/calendar';
	import {
		OPEN_SLOT_LABEL,
		TOUCHPOINT_SPEAKERS,
		type TouchpointSpeaker
	} from '$lib/touchpoint-speakers';

	const speakers = [...TOUCHPOINT_SPEAKERS].sort((a, b) => a.date.localeCompare(b.date));

	/** Copies of the card list in each half of the scrolling track; each half must be wider than the page container. */
	const SETS_PER_HALF = 2;

	/** Touchpoint event pages keyed by UTC date (YYYY-MM-DD). */
	let eventLinks = $state<Record<string, string>>({});

	onMount(async () => {
		try {
			const response = await fetch('/api/calendar');
			if (!response.ok) return;
			const data = await response.json();
			const links: Record<string, string> = {};
			for (const event of (data.events ?? []) as CalendarEvent[]) {
				if (event.isTouchpoint) {
					links[event.start.slice(0, 10)] = `/calendar/event/${eventSlug(event)}`;
				}
			}
			eventLinks = links;
		} catch (error) {
			console.error('Failed to load Touchpoint events for the spotlight', error);
		}
	});

	function topicHref(speaker: TouchpointSpeaker): string {
		return eventLinks[speaker.date] ?? '/calendar';
	}

	function formatDate(speaker: TouchpointSpeaker): string {
		return new Intl.DateTimeFormat('en', {
			timeZone: 'UTC',
			weekday: 'short',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(new Date(`${speaker.date}T13:00:00Z`));
	}

	function initials(name: string): string {
		return name
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase())
			.join('');
	}
</script>

{#snippet cards(clone: boolean)}
	{#each speakers as speaker (speaker.name + speaker.date)}
		<li class="spotlight__card">
			{#if speaker.image}
				<img
					class="spotlight__photo"
					src={speaker.image}
					alt=""
					width="96"
					height="96"
					loading="lazy"
					referrerpolicy="no-referrer"
				/>
			{:else}
				<span class="spotlight__photo spotlight__photo--initials" aria-hidden="true">
					{initials(speaker.name)}
				</span>
			{/if}
			<h3>{speaker.name}</h3>
			{#if speaker.role}
				<p class="spotlight__meta">{speaker.role}</p>
			{/if}
			{#if speaker.company}
				<p class="spotlight__meta">{speaker.company}</p>
			{/if}
			<p class="spotlight__topic">
				<a href={topicHref(speaker)} tabindex={clone ? -1 : undefined}>{speaker.topic}</a>
			</p>
			<p class="spotlight__date">
				<span class="spotlight__date-label">Touchpoint</span>
				<time datetime={speaker.date}>{formatDate(speaker)}</time>
			</p>
		</li>
	{/each}
	<li class="spotlight__card spotlight__card--open">
		<span class="spotlight__photo spotlight__photo--initials" aria-hidden="true">?</span>
		<h3>This could be you</h3>
		<p class="spotlight__meta">Share your DevRel workflow</p>
		<p class="spotlight__topic">
			<a
				class="spotlight__cta"
				href="/community/touchpoints/submit"
				tabindex={clone ? -1 : undefined}>Submit a session</a
			>
		</p>
		<p class="spotlight__date">
			<span class="spotlight__date-label">Touchpoint</span>
			<span>{OPEN_SLOT_LABEL}</span>
		</p>
	</li>
{/snippet}

<section id="community-spotlight" class="spotlight" aria-labelledby="spotlight-heading">
	<p class="spotlight__eyebrow">The people behind</p>
	<h2 id="spotlight-heading">Community spotlight</h2>
	<p class="spotlight__lead">
		Meet the community members sharing their work at upcoming Touchpoints.
	</p>

	<div class="spotlight__viewport">
		<!--
			The track is two identical halves of SETS_PER_HALF copies each, so moving it by -50%
			loops seamlessly and each half is wider than any screen. Only the first copy is read by
			screen readers and reached with Tab; the rest are clickable copies.
		-->
		<div class="spotlight__track" style="--spotlight-duration: {SETS_PER_HALF * 45}s">
			{#each Array.from({ length: SETS_PER_HALF * 2 }, (_, i) => i) as copy (copy)}
				<ul
					class="spotlight__row"
					class:spotlight__row--clone={copy > 0}
					aria-hidden={copy > 0 ? 'true' : undefined}
				>
					{@render cards(copy > 0)}
				</ul>
			{/each}
		</div>
	</div>
</section>

<style>
	.spotlight {
		margin-top: var(--space-xl);
		scroll-margin-top: 6rem;
	}

	.spotlight__eyebrow {
		margin: 0;
		font-size: var(--step--1);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	.spotlight h2 {
		margin: var(--space-3xs) 0 var(--space-2xs);
		font-size: var(--step-3);
		color: var(--color-text);
	}

	.spotlight__lead {
		max-width: 48rem;
		margin: 0 0 var(--space-m);
	}

	.spotlight__viewport {
		position: relative;
		overflow: hidden;
	}

	/* Edge fades drawn on top of the row (a mask on the moving row can leave parts unpainted). */
	.spotlight__viewport::before,
	.spotlight__viewport::after {
		content: '';
		position: absolute;
		inset-block: 0;
		z-index: 1;
		width: var(--space-l);
		pointer-events: none;
	}

	.spotlight__viewport::before {
		left: 0;
		background: linear-gradient(to right, var(--color-background), transparent);
	}

	.spotlight__viewport::after {
		right: 0;
		background: linear-gradient(to left, var(--color-background), transparent);
	}

	.spotlight__track {
		display: flex;
		width: max-content;
		will-change: transform;
		animation: spotlight-scroll var(--spotlight-duration, 135s) linear infinite;
	}

	.spotlight__viewport:hover .spotlight__track,
	.spotlight__viewport:focus-within .spotlight__track {
		animation-play-state: paused;
	}

	@keyframes spotlight-scroll {
		to {
			transform: translateX(-50%);
		}
	}

	.spotlight__row {
		display: flex;
		gap: var(--space-s);
		margin: 0;
		padding: 0 var(--space-s) 0 0;
		list-style: none;
	}

	.spotlight__card {
		display: flex;
		flex: 0 0 15rem;
		flex-direction: column;
		align-items: center;
		margin: 0;
		padding: var(--space-m) var(--space-s);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-m);
		background: var(--color-background);
		text-align: center;
	}

	.spotlight__card--open {
		border-style: dashed;
		border-color: var(--color-link);
		background: var(--color-background-secondary-1);
	}

	.spotlight__photo {
		width: 6rem;
		height: 6rem;
		margin-bottom: var(--space-s);
		border-radius: var(--radius-circle);
		object-fit: cover;
		background: var(--color-background-secondary-1);
	}

	.spotlight__photo--initials {
		display: grid;
		place-items: center;
		font-size: var(--step-2);
		font-weight: 700;
		color: var(--color-link);
	}

	.spotlight__card--open .spotlight__photo--initials {
		background: var(--color-background);
	}

	.spotlight h3 {
		margin: 0;
		font-size: var(--step-0);
		color: var(--color-text);
	}

	.spotlight__meta {
		margin: var(--space-3xs) 0 0;
		font-size: var(--step--1);
		line-height: 1.4;
	}

	.spotlight__topic {
		margin: var(--space-s) 0;
		font-weight: 600;
		line-height: 1.4;
	}

	.spotlight__cta {
		display: inline-block;
		padding: var(--space-2xs) var(--space-m);
		border-radius: var(--radius-pill);
		background: var(--color-button-background);
		color: var(--color-button-text);
		text-decoration: none;
	}

	.spotlight__date {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);
		margin: auto 0 0;
		font-size: var(--step--1);
	}

	.spotlight__date-label {
		font-size: var(--step--2);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	/* No motion: a single row people can scroll themselves. */
	@media (prefers-reduced-motion: reduce) {
		.spotlight__viewport {
			overflow-x: auto;
		}

		.spotlight__viewport::before,
		.spotlight__viewport::after {
			display: none;
		}

		.spotlight__track {
			animation: none;
		}

		.spotlight__row--clone {
			display: none;
		}
	}
</style>

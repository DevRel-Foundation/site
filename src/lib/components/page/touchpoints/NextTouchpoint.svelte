<script lang="ts">
	import { onMount } from 'svelte';
	import { LFX_CALENDAR_URL, eventSlug, nextTouchpoint, type CalendarEvent } from '$lib/calendar';

	interface Props {
		heading?: string;
	}

	let { heading = 'Next Community Touchpoint' }: Props = $props();

	let next = $state<CalendarEvent | null>(null);
	let loading = $state(true);
	let localZone = $state('');

	function format(value: string): string {
		return new Intl.DateTimeFormat('en', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
		}).format(new Date(value));
	}

	function formatUtcTime(value: string): string {
		return new Intl.DateTimeFormat('en', {
			timeZone: 'UTC',
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
		}).format(new Date(value));
	}

	onMount(async () => {
		localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		try {
			const response = await fetch('/api/calendar');
			if (response.ok) {
				const data = await response.json();
				next = nextTouchpoint(data.events ?? []);
			}
		} catch (error) {
			console.error('Failed to load the next Community Touchpoint', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="next-touchpoint" aria-live="polite">
	<p class="next-touchpoint__label">{heading}</p>
	{#if loading}
		<p class="next-touchpoint__date">Checking the calendar…</p>
	{:else if next}
		<p class="next-touchpoint__date">{format(next.start)}</p>
		<p class="next-touchpoint__meta">
			Your local time ({localZone}) · {formatUtcTime(next.start)} UTC
		</p>
		<div class="next-touchpoint__actions">
			<a class="next-touchpoint__primary" href={next.url} target="_blank" rel="noopener noreferrer">
				Register on LFX ↗
			</a>
			<a class="next-touchpoint__secondary" href={`/calendar/event/${eventSlug(next)}`}
				>See it in the calendar</a
			>
		</div>
	{:else}
		<p class="next-touchpoint__date">Every other Wednesday at 13:00 UTC</p>
		<div class="next-touchpoint__actions">
			<a
				class="next-touchpoint__primary"
				href={LFX_CALENDAR_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				Open the LFX calendar ↗
			</a>
		</div>
	{/if}
</div>

<style>
	.next-touchpoint {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		padding: var(--space-m);
		border: 1px solid var(--color-background-secondary-2);
		border-top: 4px solid var(--color-link);
		border-radius: var(--radius-m);
		background: var(--color-background);
		box-shadow: var(--shadow-s);
	}

	.next-touchpoint p {
		margin: 0;
		color: var(--color-text);
	}

	.next-touchpoint .next-touchpoint__label {
		font-size: var(--step--2);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	.next-touchpoint .next-touchpoint__date {
		font-size: var(--step-2);
		font-weight: 700;
		line-height: 1.2;
	}

	.next-touchpoint .next-touchpoint__meta {
		font-size: var(--step--1);
	}

	.next-touchpoint__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-xs);
	}

	.next-touchpoint__primary,
	.next-touchpoint__secondary {
		padding: var(--space-xs) var(--space-m);
		border-radius: var(--radius-pill);
		font-size: var(--step--1);
		font-weight: 600;
		text-decoration: none;
	}

	.next-touchpoint__primary {
		background: var(--color-button-background);
		color: var(--color-button-text);
	}

	.next-touchpoint__secondary {
		border: 1px solid var(--color-link);
		color: var(--color-link);
	}
</style>

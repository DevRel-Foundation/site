<script lang="ts">
	import { onMount } from 'svelte';
	import {
		LFX_CALENDAR_URL,
		LFX_SUBSCRIBE_URL,
		eventSlug,
		type CalendarEvent
	} from '$lib/calendar';
	import { TOUCHPOINTS_AGENDAS_URL } from '$lib/community';

	interface Props {
		eventId?: string;
	}

	let { eventId }: Props = $props();

	type View = 'month' | 'list';
	type Zone = 'local' | 'UTC';

	const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const MAX_CHIPS = 3;

	let events = $state<CalendarEvent[]>([]);
	let loading = $state(true);
	let failed = $state(false);
	let view = $state<View>('month');
	let zone = $state<Zone>('local');
	let localZone = $state('');
	let cursor = $state(firstOfMonth(new Date()));
	let selected = $state<CalendarEvent | null>(null);
	let dialog = $state<HTMLDialogElement>();

	const timeZone = $derived(zone === 'UTC' ? 'UTC' : localZone || undefined);
	const zoneLabel = $derived(zone === 'UTC' ? 'UTC' : localZone);

	const monthTitle = $derived(
		new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(cursor)
	);

	const eventsByDay = $derived.by(() => {
		const map = new Map<string, CalendarEvent[]>();
		for (const event of events) {
			const key = dayKey(event);
			map.set(key, [...(map.get(key) ?? []), event]);
		}
		return map;
	});

	const todayKey = $derived(keyFor(new Date(), timeZone));

	const weeks = $derived.by(() => {
		const year = cursor.getFullYear();
		const month = cursor.getMonth();
		const first = new Date(year, month, 1);
		const offset = (first.getDay() + 6) % 7;
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const cells = Math.ceil((offset + daysInMonth) / 7) * 7;
		const days = Array.from({ length: cells }, (_, index) => {
			const date = new Date(year, month, index - offset + 1);
			const key = plainKey(date);
			return {
				key,
				day: date.getDate(),
				inMonth: date.getMonth() === month,
				isToday: key === todayKey,
				events: eventsByDay.get(key) ?? []
			};
		});
		return Array.from({ length: cells / 7 }, (_, index) => days.slice(index * 7, index * 7 + 7));
	});

	const monthEvents = $derived.by(() => {
		const prefix = plainKey(cursor).slice(0, 7);
		return [...eventsByDay.entries()]
			.filter(([key]) => key.startsWith(prefix))
			.sort(([a], [b]) => a.localeCompare(b));
	});

	function firstOfMonth(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	}

	function plainKey(date: Date): string {
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${date.getFullYear()}-${month}-${day}`;
	}

	function keyFor(date: Date, tz: string | undefined): string {
		return new Intl.DateTimeFormat('en-CA', {
			timeZone: tz,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(date);
	}

	function dayKey(event: CalendarEvent): string {
		return event.allDay ? event.start.slice(0, 10) : keyFor(new Date(event.start), timeZone);
	}

	function formatTime(value: string): string {
		return new Intl.DateTimeFormat('en', {
			timeZone,
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
		}).format(new Date(value));
	}

	function formatDayHeading(key: string): string {
		const [year, month, day] = key.split('-').map(Number);
		return new Intl.DateTimeFormat('en', {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		}).format(new Date(year, month - 1, day));
	}

	function formatRange(event: CalendarEvent): string {
		if (event.allDay) {
			const [year, month, day] = event.start.split('-').map(Number);
			return new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(
				new Date(year, month - 1, day)
			);
		}
		const formatter = new Intl.DateTimeFormat('en', {
			timeZone,
			dateStyle: 'full',
			timeStyle: 'short',
			hourCycle: 'h23'
		});
		const start = new Date(event.start);
		const text = event.end
			? formatter.formatRange(start, new Date(event.end))
			: formatter.format(start);
		return `${text} (${zoneLabel})`;
	}

	function paragraphs(text: string): string[] {
		return text
			.split(/\n\s*\n/)
			.map((part) => part.trim())
			.filter(Boolean);
	}

	function shiftMonth(step: number) {
		cursor = new Date(cursor.getFullYear(), cursor.getMonth() + step, 1);
	}

	function goToToday() {
		cursor = firstOfMonth(new Date());
	}

	function openEvent(event: CalendarEvent) {
		selected = event;
		dialog?.showModal();
		history.replaceState(history.state, '', `/calendar/event/${eventSlug(event)}`);
	}

	function closeEvent() {
		dialog?.close();
	}

	function handleDialogClose() {
		selected = null;
		history.replaceState(history.state, '', '/calendar');
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === dialog) closeEvent();
	}

	onMount(async () => {
		localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (window.matchMedia('(max-width: 700px)').matches) view = 'list';

		try {
			const response = await fetch('/api/calendar');
			const data = await response.json();
			if (!response.ok || data.error) throw new Error(data.error ?? `HTTP ${response.status}`);
			events = data.events ?? [];
		} catch (error) {
			console.error('Failed to load calendar events', error);
			failed = true;
		} finally {
			loading = false;
		}

		if (eventId) {
			const target = events.find((event) => event.id === decodeURIComponent(eventId));
			if (target) {
				cursor = firstOfMonth(new Date(target.allDay ? `${target.start}T00:00:00` : target.start));
				openEvent(target);
			}
		}
	});
</script>

<section class="calendar" aria-label="DevRel Foundation meetings calendar">
	<div class="calendar__toolbar">
		<div class="calendar__nav">
			<button
				type="button"
				class="calendar__button"
				onclick={() => shiftMonth(-1)}
				aria-label="Previous month"
			>
				←
			</button>
			<button type="button" class="calendar__button" onclick={goToToday}>Today</button>
			<button
				type="button"
				class="calendar__button"
				onclick={() => shiftMonth(1)}
				aria-label="Next month"
			>
				→
			</button>
			<h2 class="calendar__title" aria-live="polite">{monthTitle}</h2>
		</div>

		<div class="calendar__options">
			<div class="calendar__views" role="group" aria-label="Calendar view">
				<button
					type="button"
					class="calendar__view"
					aria-pressed={view === 'month'}
					onclick={() => (view = 'month')}
				>
					Month
				</button>
				<button
					type="button"
					class="calendar__view"
					aria-pressed={view === 'list'}
					onclick={() => (view = 'list')}
				>
					List
				</button>
			</div>
			<label class="calendar__zone">
				<span>Time zone</span>
				<select bind:value={zone}>
					<option value="local">Your local time{localZone ? ` (${localZone})` : ''}</option>
					<option value="UTC">UTC</option>
				</select>
			</label>
		</div>
	</div>

	<ul class="calendar__legend" aria-label="Legend">
		<li>
			<span class="calendar__dot calendar__dot--touchpoint" aria-hidden="true"></span>Community
			Touchpoint
		</li>
		<li><span class="calendar__dot" aria-hidden="true"></span>Other meetings</li>
	</ul>

	{#if loading}
		<p class="calendar__status" role="status">Loading meetings…</p>
	{:else if failed}
		<p class="calendar__status calendar__status--error" role="alert">
			We couldn't load the calendar right now. You can still see every meeting on the
			<a href={LFX_CALENDAR_URL} target="_blank" rel="noopener noreferrer">LFX calendar ↗</a>.
		</p>
	{/if}

	{#if view === 'month'}
		<div class="calendar__grid" role="grid" aria-label={monthTitle}>
			<div class="calendar__row calendar__row--head" role="row">
				{#each WEEKDAYS as weekday (weekday)}
					<div class="calendar__weekday" role="columnheader">{weekday}</div>
				{/each}
			</div>
			{#each weeks as week (week[0].key)}
				<div class="calendar__row" role="row">
					{#each week as day (day.key)}
						<div
							class="calendar__day"
							class:calendar__day--muted={!day.inMonth}
							class:calendar__day--today={day.isToday}
							role="gridcell"
							aria-label={formatDayHeading(day.key)}
						>
							<span class="calendar__date">{day.day}</span>
							{#each day.events.slice(0, MAX_CHIPS) as event (event.id)}
								<button
									type="button"
									class="calendar__chip"
									class:calendar__chip--touchpoint={event.isTouchpoint}
									onclick={() => openEvent(event)}
									title={event.title}
								>
									{#if !event.allDay}<span class="calendar__chip-time"
											>{formatTime(event.start)}</span
										>{/if}
									<span class="calendar__chip-title">{event.title}</span>
								</button>
							{/each}
							{#if day.events.length > MAX_CHIPS}
								<button type="button" class="calendar__more" onclick={() => (view = 'list')}>
									+{day.events.length - MAX_CHIPS} more
								</button>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		<div class="calendar__list">
			{#each monthEvents as [key, dayEvents] (key)}
				<div class="calendar__list-day" class:calendar__list-day--today={key === todayKey}>
					<h3>{formatDayHeading(key)}</h3>
					<ul>
						{#each dayEvents as event (event.id)}
							<li>
								<button
									type="button"
									class="calendar__list-item"
									class:calendar__list-item--touchpoint={event.isTouchpoint}
									onclick={() => openEvent(event)}
								>
									<span class="calendar__list-time">
										{event.allDay
											? 'All day'
											: `${formatTime(event.start)}${event.end ? `–${formatTime(event.end)}` : ''}`}
									</span>
									<span class="calendar__list-title">{event.title}</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				{#if !loading}
					<p class="calendar__empty">
						No meetings this month. Try another month or check the LFX calendar.
					</p>
				{/if}
			{/each}
		</div>
	{/if}

	<div class="calendar__footer">
		<a href={LFX_SUBSCRIBE_URL}>Subscribe to the calendar</a>
		<a href={LFX_CALENDAR_URL} target="_blank" rel="noopener noreferrer">Open the LFX calendar ↗</a
		>
		<a href={TOUCHPOINTS_AGENDAS_URL} target="_blank" rel="noopener noreferrer"
			>Read meeting agendas ↗</a
		>
	</div>
</section>

<dialog
	bind:this={dialog}
	class="meeting"
	aria-labelledby="meeting-title"
	onclose={handleDialogClose}
	onclick={handleBackdropClick}
>
	{#if selected}
		<div class="meeting__body">
			<div class="meeting__header">
				<p class="meeting__kind">
					{selected.isTouchpoint ? 'Community Touchpoint' : 'DevRel Foundation meeting'}
				</p>
				<button
					type="button"
					class="meeting__close"
					onclick={closeEvent}
					aria-label="Close meeting details">×</button
				>
			</div>
			<h2 id="meeting-title">{selected.title}</h2>
			<p class="meeting__time">{formatRange(selected)}</p>
			{#if selected.isRecurring}
				<p class="meeting__recurring">Recurring meeting</p>
			{/if}
			{#each paragraphs(selected.description) as paragraph, index (index)}
				<p class="meeting__description">{paragraph}</p>
			{/each}
			<div class="meeting__actions">
				<a class="meeting__primary" href={selected.url} target="_blank" rel="noopener noreferrer">
					Join or register on LFX ↗
				</a>
				{#if selected.isTouchpoint}
					<a class="meeting__secondary" href="/community/touchpoints">About Community Touchpoints</a
					>
				{/if}
			</div>
		</div>
	{/if}
</dialog>

<style>
	.calendar {
		--touchpoint-color: var(--color-link);
		--meeting-color: var(--color-info-text);
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
	}

	.calendar__toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
	}

	.calendar__nav,
	.calendar__options {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-xs);
	}

	.calendar__title {
		margin: 0 0 0 var(--space-xs);
		font-size: var(--step-2);
		color: var(--color-text);
	}

	.calendar__button,
	.calendar__view {
		padding: var(--space-2xs) var(--space-s);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-pill);
		background: var(--color-background);
		color: var(--color-text);
		font: inherit;
		font-size: var(--step--1);
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color var(--transition-fast),
			border-color var(--transition-fast);
	}

	.calendar__button:hover,
	.calendar__view:hover {
		background: var(--color-background-secondary-1);
		border-color: var(--color-accent-green);
	}

	.calendar__views {
		display: inline-flex;
		gap: var(--space-3xs);
		padding: var(--space-3xs);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-pill);
	}

	.calendar__view {
		border-color: transparent;
	}

	.calendar__view[aria-pressed='true'] {
		background: var(--color-button-background);
		color: var(--color-button-text);
	}

	.calendar__zone {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		font-size: var(--step--1);
		color: var(--color-text);
	}

	.calendar__zone select {
		padding: var(--space-2xs) var(--space-xs);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-s);
		background: var(--color-background);
		color: var(--color-text);
		font: inherit;
	}

	.calendar__legend {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--step--1);
		color: var(--color-text);
	}

	.calendar__legend li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
	}

	.calendar__dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: var(--radius-circle);
		background: var(--meeting-color);
	}

	.calendar__dot--touchpoint {
		background: var(--touchpoint-color);
	}

	.calendar__status {
		margin: 0;
		font-size: var(--step--1);
		color: var(--color-text);
	}

	.calendar__status--error {
		padding: var(--space-xs) var(--space-s);
		border: 1px solid var(--color-warning-border);
		border-radius: var(--radius-s);
		background: var(--color-warning);
		color: var(--color-warning-text);
	}

	.calendar__grid {
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-m);
		overflow: hidden;
		background: var(--color-background);
	}

	.calendar__row {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.calendar__row + .calendar__row {
		border-top: 1px solid var(--color-background-secondary-2);
	}

	.calendar__weekday {
		padding: var(--space-2xs) var(--space-xs);
		font-size: var(--step--2);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text);
		background: var(--color-background-secondary-1);
	}

	.calendar__day {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);
		min-height: 7rem;
		padding: var(--space-2xs);
		border-left: 1px solid var(--color-background-secondary-2);
		min-width: 0;
	}

	.calendar__day:first-child {
		border-left: none;
	}

	.calendar__day--muted {
		background: var(--color-background-secondary-1);
	}

	.calendar__day--muted .calendar__date {
		opacity: 0.5;
	}

	.calendar__date {
		align-self: flex-end;
		min-width: 1.75rem;
		padding: var(--space-3xs);
		border-radius: var(--radius-pill);
		font-size: var(--step--2);
		font-weight: 600;
		text-align: center;
		color: var(--color-text);
	}

	.calendar__day--today .calendar__date {
		background: var(--color-button-background);
		color: var(--color-button-text);
	}

	.calendar__chip {
		display: flex;
		gap: var(--space-3xs);
		width: 100%;
		padding: var(--space-3xs) var(--space-2xs);
		border: none;
		border-left: 3px solid var(--meeting-color);
		border-radius: var(--radius-xs);
		background: var(--color-background-secondary-1);
		color: var(--color-text);
		font: inherit;
		font-size: var(--step--2);
		text-align: left;
		cursor: pointer;
		overflow: hidden;
	}

	.calendar__chip--touchpoint {
		border-left-color: var(--touchpoint-color);
	}

	.calendar__chip:hover,
	.calendar__chip:focus-visible {
		background: var(--color-background-secondary-2);
	}

	.calendar__chip-time {
		flex-shrink: 0;
		font-weight: 700;
	}

	.calendar__chip-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.calendar__more {
		padding: 0 var(--space-2xs);
		border: none;
		background: none;
		color: var(--color-link);
		font: inherit;
		font-size: var(--step--2);
		font-weight: 600;
		text-align: left;
		cursor: pointer;
	}

	.calendar__list {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
	}

	.calendar__list-day h3 {
		margin: 0 0 var(--space-2xs);
		padding-bottom: var(--space-3xs);
		border-bottom: 1px solid var(--color-background-secondary-2);
		font-size: var(--step-0);
		color: var(--color-text);
	}

	.calendar__list-day--today h3::after {
		content: 'Today';
		margin-left: var(--space-xs);
		padding: var(--space-3xs) var(--space-xs);
		border-radius: var(--radius-pill);
		background: var(--color-button-background);
		color: var(--color-button-text);
		font-size: var(--step--2);
		vertical-align: middle;
	}

	.calendar__list-day ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
	}

	.calendar__list-item {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: var(--space-s);
		width: 100%;
		padding: var(--space-xs) var(--space-s);
		border: 1px solid var(--color-background-secondary-2);
		border-left: 4px solid var(--meeting-color);
		border-radius: var(--radius-s);
		background: var(--color-background);
		color: var(--color-text);
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: background-color var(--transition-fast);
	}

	.calendar__list-item--touchpoint {
		border-left-color: var(--touchpoint-color);
	}

	.calendar__list-item:hover,
	.calendar__list-item:focus-visible {
		background: var(--color-background-secondary-1);
	}

	.calendar__list-time {
		font-size: var(--step--1);
		font-weight: 700;
	}

	.calendar__list-title {
		font-size: var(--step--1);
		font-weight: 600;
	}

	.calendar__empty {
		margin: 0;
		font-style: italic;
		color: var(--color-text);
	}

	.calendar__footer {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs) var(--space-l);
		font-size: var(--step--1);
		font-weight: 600;
	}

	.calendar__footer a {
		color: var(--color-link);
	}

	.meeting {
		margin: auto;
		width: min(36rem, calc(100vw - 2rem));
		max-height: calc(100vh - 4rem);
		padding: 0;
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-m);
		background: var(--color-background);
		color: var(--color-text);
		box-shadow: var(--shadow-l);
	}

	.meeting:focus,
	.meeting:focus-visible {
		outline: none;
	}

	.meeting::backdrop {
		background: rgba(0, 0, 0, 0.45);
	}

	.meeting__body {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-m);
	}

	.meeting__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
	}

	.meeting__kind {
		margin: 0;
		font-size: var(--step--2);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	.meeting__close {
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-circle);
		background: var(--color-background);
		color: var(--color-text);
		font-size: var(--step-1);
		line-height: 1;
		cursor: pointer;
	}

	.meeting h2 {
		margin: 0;
		font-size: var(--step-2);
	}

	.meeting__time {
		margin: 0;
		font-weight: 600;
	}

	.meeting__recurring {
		margin: 0;
		font-size: var(--step--1);
		opacity: 0.8;
	}

	.meeting__description {
		margin: 0;
		font-size: var(--step--1);
		line-height: 1.6;
		white-space: pre-line;
	}

	.meeting__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-xs);
	}

	.meeting__primary,
	.meeting__secondary {
		padding: var(--space-xs) var(--space-m);
		border-radius: var(--radius-pill);
		font-weight: 600;
		text-decoration: none;
	}

	.meeting__primary {
		background: var(--color-button-background);
		color: var(--color-button-text);
	}

	.meeting__secondary {
		border: 1px solid var(--color-link);
		color: var(--color-link);
	}

	@media (max-width: 700px) {
		.calendar__title {
			width: 100%;
			margin: var(--space-2xs) 0 0;
		}

		.calendar__day {
			min-height: 4.5rem;
		}

		.calendar__chip-title,
		.calendar__chip-time {
			display: none;
		}

		.calendar__chip {
			height: 0.5rem;
			padding: 0;
			border-left: none;
			background: var(--meeting-color);
		}

		.calendar__chip--touchpoint {
			background: var(--touchpoint-color);
		}

		.calendar__list-item {
			grid-template-columns: 1fr;
			gap: var(--space-3xs);
		}
	}
</style>

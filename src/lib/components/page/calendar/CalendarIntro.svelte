<script lang="ts">
	import { LFX_CALENDAR_URL } from '$lib/calendar';
</script>

<header class="calendar-intro">
	<p class="calendar-intro__eyebrow">DevRel Foundation meetings</p>
	<h1>Community calendar</h1>
	<p class="calendar-intro__lead">
		Find your next <a href="/community/touchpoints">Community Touchpoint</a> and other DevRel Foundation
		meetings. Open a meeting to see the details and how to join. Times are shown in your local time zone.
	</p>
	<details class="calendar-intro__help">
		<summary>How to join a meeting</summary>
		<p>
			Meetings are scheduled on the <a
				href={LFX_CALENDAR_URL}
				target="_blank"
				rel="noopener noreferrer">LFX calendar ↗</a
			>. To join, sign in with a free Linux Foundation (LFX) account and register for the meeting.
			With an account, you also see the meetings in your personal LFX dashboard and get access to
			recordings.
		</p>
		<p>
			Everyone is welcome. You don't need to be a member of any company or working group to join a
			Community Touchpoint.
		</p>
	</details>
</header>

<style>
	.calendar-intro {
		margin-bottom: var(--space-m);
	}

	.calendar-intro h1 {
		margin: var(--space-3xs) 0 var(--space-xs);
		font-size: var(--step-5);
		color: var(--color-text);
	}

	.calendar-intro__eyebrow {
		margin: 0;
		font-size: var(--step--1);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	.calendar-intro__lead {
		max-width: 48rem;
		font-size: var(--step-0);
	}

	.calendar-intro__help {
		max-width: 48rem;
		padding: var(--space-xs) var(--space-s);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-s);
		background: var(--color-background-secondary-1);
		font-size: var(--step--1);
	}

	.calendar-intro__help summary {
		font-weight: 600;
		cursor: pointer;
	}

	.calendar-intro__help p {
		margin: var(--space-xs) 0 0;
	}
</style>

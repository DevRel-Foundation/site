<script lang="ts">
	import { page } from '$app/state';
	import Calendar from '$lib/components/Calendar.svelte';
	import CalendarIntro from '$lib/components/page/calendar/CalendarIntro.svelte';
</script>

<svelte:head>
	<title>Community calendar | Developer Relations Foundation</title>
</svelte:head>

<div class="container calendar-page">
	<CalendarIntro />
	{#key page.params.eventId}
		<Calendar eventId={page.params.eventId} />
	{/key}
</div>

<style>
	.calendar-page {
		margin-block: var(--space-m) var(--space-2xl);
	}
</style>

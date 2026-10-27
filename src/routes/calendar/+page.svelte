<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import CalendarIntro from '$lib/components/page/calendar/CalendarIntro.svelte';
</script>

<svelte:head>
	<title>Community calendar | Developer Relations Foundation</title>
	<meta
		name="description"
		content="Find upcoming DevRel Foundation Community Touchpoints and community meetings. Times are shown in your local time zone."
	/>
</svelte:head>

<div class="container calendar-page">
	<CalendarIntro />
	<Calendar />
</div>

<style>
	.calendar-page {
		margin-block: var(--space-m) var(--space-2xl);
	}
</style>

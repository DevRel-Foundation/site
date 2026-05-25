<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<div class="calendar-page">
	<div class="layout-section">
		<h1>DevRel Foundation Calendar</h1>
		<Calendar />
	</div>
</div>

<style>
	.calendar-page {
		margin-block: var(--space-m);
	}

	.calendar-page h1 {
		margin: var(--space-s) 0;
		font-size: var(--step-5);
		color: var(--color-text);
		text-align: center;
	}
</style>

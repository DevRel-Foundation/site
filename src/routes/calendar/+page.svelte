<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<div class="calendar-page">
	<h1>DevRel Foundation Calendar</h1>
	<Calendar />
</div>

<style>
	.calendar-page {
		width: 100vw;
		height: 100vh;
		margin: var(--space-m) auto;
		padding: 0;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		display: flex;
		flex-direction: column;
	}
	
	.calendar-page h1 {
		margin: var(--space-s) 0;
		padding: 0 var(--space-m);
		font-size: var(--step-2);
		color: var(--color-text);
		text-align: centem;
	}
</style> 
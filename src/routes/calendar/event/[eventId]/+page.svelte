<script lang="ts">
  import Calendar from '$lib/components/Calendar.svelte';
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';

  let eventId = '';
  const unsubscribe = page.subscribe(($page) => {
    eventId = $page.params.eventId;
  });
  onDestroy(unsubscribe);
</script>

<div class="calendar-page">
  <h1>DevRel Foundation Calendar</h1>
  <Calendar eventId={eventId} />
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
    font-size: var(--step-5);
    color: var(--color-text);
    text-align: center;
  }
</style>

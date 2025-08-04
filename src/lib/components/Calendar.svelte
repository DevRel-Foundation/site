<script lang="ts">
  import { onMount } from 'svelte';
  
  interface CalendarEvent {
    title: string;
    start: string;
    end?: string;
    description?: string;
    location?: string;
    url?: string;
    allDay?: boolean;
  }
  
  let events = $state<CalendarEvent[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let currentDate = $state(new Date());
  
  // Load events from API
  onMount(async () => {
    try {
      const response = await fetch('/api/calendar');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message || 'Failed to load events');
      }
      
      events = data.events || [];
      loading = false;
    } catch (err) {
      console.error('Failed to load events:', err);
      error = err instanceof Error ? err.message : 'Unknown error occurred';
      loading = false;
    }
  });
  

  // Filter events based on current view and date
  const filteredEvents = $derived(() => {
    if (!events.length) return [];
    
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Show upcoming events (next 90 days)
    const next90Days = new Date(startOfToday);
    next90Days.setDate(next90Days.getDate() + 90);
    return events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= startOfToday && eventDate <= next90Days;
    });
  });
  
  
  function formatEventDate(event: CalendarEvent) {
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;
    
    if (event.allDay) {
      return start.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    const dateFormat: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    
    let result = start.toLocaleDateString('en-US', dateFormat) + ' at ' + start.toLocaleTimeString('en-US', timeFormat);
    
    if (end && !event.allDay) {
      const isSameDay = start.toDateString() === end.toDateString();
      if (isSameDay) {
        result += ' - ' + end.toLocaleTimeString('en-US', timeFormat);
      } else {
        result += ' - ' + end.toLocaleDateString('en-US', dateFormat) + ' at ' + end.toLocaleTimeString('en-US', timeFormat);
      }
    }
    
    return result;
  }
  
</script>


<div class="calendar-container">

    <div class="events-list">
        {#each filteredEvents() as event}
        <div class="event-item">
            <h3 class="event-title">{event.title}</h3>
            <div class="event-details">
                <div class="event-date">{formatEventDate(event)}</div>
                {#if event.location}
                    <div class="event-location">📍 {event.location}</div>
                {/if}
                {#if event.description}
                    <p class="event-description">{event.description}</p>
                {/if}
                {#if event.isRecurring}
                    <div class="event-recurring">� Recurring Event</div>
                {/if}
                {#if event.url}
                    <a href={event.url} target="_blank" rel="noopener noreferrer" class="event-link">
                    View Details →
                    </a>
                {/if}
                </div>
        </div>
        {/each}
    </div>

</div>




<style>
  .calendar-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .loading, .error {
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-text-secondary);
  }
  
  .error button {
    margin-top: var(--space-s);
    padding: var(--space-xs) var(--space-s);
    background: var(--color-mint);
    color: var(--color-background);
    border: none;
    border-radius: var(--radius-s);
    cursor: pointer;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-m);
    flex-wrap: wrap;
    gap: var(--space-s);
  }
  
  .view-controls {
    display: flex;
    gap: var(--space-2xs);
  }
  
  .view-btn {
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
    background: var(--color-background);
    color: var(--color-text);
    border-radius: var(--radius-s);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .view-btn:hover {
    background: var(--color-background-secondary-1);
  }
  
  .view-btn.active {
    background: var(--color-mint);
    color: var(--color-background);
    border-color: var(--color-mint);
  }
  
  .navigation {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  
  .nav-btn, .today-btn {
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
    background: var(--color-background);
    color: var(--color-text);
    border-radius: var(--radius-s);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-btn:hover, .today-btn:hover {
    background: var(--color-background-secondary-1);
  }
  
  .calendar-title h2 {
    margin: 0 0 var(--space-m) 0;
    font-size: var(--step-1);
    color: var(--color-text);
  }
  
  /* Agenda View */
  .agenda-view {
    min-height: 400px;
  }
  
  .no-events {
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-text-secondary);
  }
  
  .events-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
  }
  
  .event-item {
    padding: var(--space-l);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    background: var(--color-background);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .event-title {
    margin: 0 0 var(--space-s) 0;
    font-size: var(--step-1);
    color: var(--color-text);
    font-weight: 700;
    line-height: 1.3;
  }
  
  .event-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }
  
  .event-date {
    font-size: var(--step-0);
    color: var(--color-text-secondary);
    font-weight: 600;
    padding: var(--space-2xs) var(--space-xs);
    background: var(--color-background-secondary-1);
    border-radius: var(--radius-xs);
    width: fit-content;
  }
  
  .event-description {
    margin: 0;
    color: var(--color-text-secondary);
    line-height: 1.6;
    font-size: var(--step-0);
  }
  
  .event-location {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    font-weight: 500;
  }
  
  .event-recurring {
    font-size: var(--step--1);
    color: var(--color-mint);
    font-weight: 500;
  }
  
  .event-link {
    display: inline-block;
    color: var(--color-link);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--1);
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--color-link);
    border-radius: var(--radius-xs);
    width: fit-content;
    transition: all 0.2s ease;
  }
  
  .event-link:hover {
    background: var(--color-link);
    color: var(--color-background);
    text-decoration: none;
  }
  
  /* Week View */
  .week-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    overflow: hidden;
  }
  
  .week-day-header {
    padding: var(--space-s);
    background: var(--color-background-secondary-1);
    text-align: center;
    font-weight: 600;
    border-right: 1px solid var(--color-background-secondary-2);
  }
  
  .week-day-header:last-child {
    border-right: none;
  }
  
  .week-day {
    min-height: 120px;
    padding: var(--space-xs);
    border-right: 1px solid var(--color-background-secondary-2);
    border-top: 1px solid var(--color-background-secondary-2);
  }
  
  .week-day:last-child {
    border-right: none;
  }
  
  .week-day.today {
    background: color-mix(in srgb, var(--color-mint), transparent 90%);
  }
  
  /* Month View */
  .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    overflow: hidden;
  }
  
  .month-day-header {
    padding: var(--space-s);
    background: var(--color-background-secondary-1);
    text-align: center;
    font-weight: 600;
    border-right: 1px solid var(--color-background-secondary-2);
  }
  
  .month-day-header:last-child {
    border-right: none;
  }
  
  .month-day {
    min-height: 100px;
    padding: var(--space-2xs);
    border-right: 1px solid var(--color-background-secondary-2);
    border-top: 1px solid var(--color-background-secondary-2);
  }
  
  .month-day:last-child {
    border-right: none;
  }
  
  .month-day.other-month {
    opacity: 0.5;
  }
  
  .month-day.today {
    background: color-mix(in srgb, var(--color-mint), transparent 90%);
  }
  
  .day-number {
    font-weight: 600;
    margin-bottom: var(--space-3xs);
  }
  
  .day-events {
    display: flex;
    flex-direction: column;
    gap: var(--space-4xs);
  }
  
  .mini-event {
    font-size: var(--step--2);
    padding: var(--space-4xs);
    background: var(--color-mint);
    color: var(--color-background);
    border-radius: var(--radius-xs);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .more-events {
    font-size: var(--step--2);
    color: var(--color-text-secondary);
    text-align: center;
    padding: var(--space-4xs);
  }
  
  @media (max-width: 768px) {
    .calendar-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .view-controls {
      justify-content: center;
    }
    
    .navigation {
      justify-content: center;
    }
    
    .month-grid,
    .week-grid {
      font-size: var(--step--1);
    }
    
    .month-day,
    .week-day {
      min-height: 80px;
    }
    
    .mini-event {
      font-size: var(--step--3);
    }
  }
</style>

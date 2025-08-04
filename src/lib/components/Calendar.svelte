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
    isRecurring?: boolean;
  }
  
  let events = $state<CalendarEvent[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let currentDate = $state(new Date());
  let selectedEvent = $state<CalendarEvent | null>(null);
  let userLocale = $state<string>('');
  let userTimezone = $state<string>('');
  
  // Load events from API
  onMount(async () => {
    // Detect user's locale and timezone
    userLocale = navigator.language || 'en-US';
    userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
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
      
      // Auto-select the first event if available
      if (events.length > 0) {
        const filtered = filteredEvents();
        if (filtered.length > 0) {
          selectedEvent = filtered[0];
        }
      }
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
    
    // Use user's locale for formatting, fallback to 'en-US'
    const locale = userLocale || 'en-US';
    
    if (event.allDay) {
      return start.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: userTimezone || undefined
      });
    }
    
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimezone || undefined
    };
    
    const dateFormat: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: userTimezone || undefined
    };
    
    let result = start.toLocaleDateString(locale, dateFormat) + ' at ' + start.toLocaleTimeString(locale, timeFormat);
    
    if (end && !event.allDay) {
      const isSameDay = start.toDateString() === end.toDateString();
      if (isSameDay) {
        result += ' - ' + end.toLocaleTimeString(locale, timeFormat);
      } else {
        result += ' - ' + end.toLocaleDateString(locale, dateFormat) + ' at ' + end.toLocaleTimeString(locale, timeFormat);
      }
    }
    
    return result;
  }
  
</script>

<div class="calendar-container">
    <div class="calendar-layout">
        <!-- Left column: Events list -->
        <div class="events-sidebar">
            <div class="sidebar-header">
                <h2>Upcoming Events</h2>
            </div>
            <div class="events-list">
                {#each filteredEvents() as event}
                    <button 
                        class="event-list-item" 
                        class:selected={selectedEvent === event}
                        onclick={() => selectedEvent = event}
                    >
                        <div class="event-date-compact">{formatEventDate(event)}</div>
                        <h3 class="event-title-compact">{event.title}</h3>
                    </button>
                {/each}
            </div>

        </div>

        <!-- Right column: Event details -->
        <div class="event-details-panel">
            {#if selectedEvent}
                <div class="event-item">
                    <h3 class="event-title">{selectedEvent.title}</h3>
                    <div class="event-details">
                        {#if selectedEvent.location}
                            <div class="event-location">
                                {#if selectedEvent.location.startsWith('https')}
                                    ↗
                                    <a href={selectedEvent.location} target="_blank" rel="noopener noreferrer" class="location-link">
                                        {selectedEvent.location}
                                    </a>
                                {:else}
                                    {selectedEvent.location}
                                {/if}
                            </div>
                        {/if}
                        {#if selectedEvent.description}
                            <p class="event-description">{selectedEvent.description}</p>
                        {/if}
                        {#if selectedEvent.isRecurring}
                            <div class="event-recurring">🔄 Recurring Event</div>
                        {/if}
                        {#if selectedEvent.url}
                            <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer" class="event-link">
                                View Details →
                            </a>
                        {/if}
                    </div>
                </div>
            {:else}
                <div class="no-selection">
                    <p>Select an event from the list to view details</p>
                </div>
            {/if}

            {#if userLocale && userTimezone}
                <div class="locale-info">
                    <div class="locale-display">{userTimezone}</div>
                </div>
            {/if}

        </div>
    </div>
</div>








<style>
  .calendar-container {
    width: 100%;
    height: calc(100vh - 80px);
    margin: 0;
    padding: var(--space-s) var(--space-xl);
    box-sizing: border-box;
  }

  .calendar-layout {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: var(--space-m);
    height: 100%;
  }

  .events-sidebar {
    border-right: 1px solid var(--color-background-secondary-2);
    padding-right: var(--space-s);
    min-width: 0;
    overflow: hidden;
  }

  .events-sidebar h2 {
    margin: 0 0 var(--space-s) 0;
    font-size: var(--step-1);
    color: var(--color-text);
  }

  .sidebar-header {
    margin-bottom: var(--space-s);
  }

  .locale-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    margin-top: var(--space-xs);
  }

  .locale-display {
    font-size: var(--step--2);
    color: var(--color-text-secondary);
    font-weight: 500;
    background: var(--color-background-secondary-1);
    padding: var(--space-2xs) var(--space-xs);
    border-radius: var(--radius-xs);
    width: fit-content;
  }

  .event-list-item {
    width: 100%;
    text-align: left;
    padding: var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    background: var(--color-background);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: var(--space-xs);
  }

  .event-list-item:hover {
    background: var(--color-background-secondary-1);
    border-color: var(--color-mint);
  }

  .event-list-item.selected {
    background: var(--color-mint-dark);
    color: var(--color-background);
    border-color: var(--color-mint-dark);
  }

  .event-date-compact {
    font-size: var(--step--2);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-2xs);
    font-weight: 400;
  }

  .event-list-item.selected .event-date-compact {
    color: rgba(255, 255, 255, 0.8);
  }

  .event-title-compact {
    font-weight: 600;
    font-size: var(--step--1);
    margin: 0;
    line-height: 1.3;
  }

  .event-details-panel {
    padding-left: var(--space-s);
    min-width: 0;
    overflow: hidden;
  }

  .no-selection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-secondary);
    font-style: italic;
  }
  
  
  .events-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  
  .event-item {
    padding: var(--space-m);
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
    text-decoration: none;
    border-bottom: 2px solid transparent;
    background-image: linear-gradient(to right, var(--color-mint-dark), var(--color-mint), rgba(var(--color-mint-rgb, 0, 255, 127), 0.3), transparent);
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 100% 2px;
    padding-bottom: var(--space-2xs);
    display: block;
    width: 100%;
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
  
  .location-link {
    color: var(--color-link);
    text-decoration: none;
    font-weight: 500;
  }
  
  .location-link:hover {
    text-decoration: underline;
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
  
  
  @media (max-width: 768px) {
    .calendar-layout {
      grid-template-columns: 1fr;
      gap: var(--space-s);
    }
    
    .events-sidebar {
      border-right: none;
      border-bottom: 1px solid var(--color-background-secondary-2);
      padding-right: 0;
      padding-bottom: var(--space-s);
    }
    
    .event-details-panel {
      padding-left: 0;
    }
  }
</style>

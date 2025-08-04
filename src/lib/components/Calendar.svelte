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
  
  // Pagination state
  let currentPage = $state(0);
  const eventsPerPage = 10;
  
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
  

  // Show all events returned by the API (API already filters for 2 weeks past + future + recurring)
  const filteredEvents = $derived(() => {
    return events || [];
  });
  
  // Pagination calculations
  const totalPages = $derived(() => Math.ceil(filteredEvents().length / eventsPerPage));
  const paginatedEvents = $derived(() => {
    const start = currentPage * eventsPerPage;
    const end = start + eventsPerPage;
    return filteredEvents().slice(start, end);
  });
  
  function goToPage(page: number) {
    currentPage = Math.max(0, Math.min(page, totalPages() - 1));
    // Auto-select first event on new page
    const paginated = paginatedEvents();
    if (paginated.length > 0) {
      selectedEvent = paginated[0];
    }
  }
  
  function nextPage() {
    if (currentPage < totalPages() - 1) {
      goToPage(currentPage + 1);
    }
  }
  
  function prevPage() {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }
  
  
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
  
  function parseMarkdown(text: string): string {
    if (!text) return '';
    
    // Simple markdown parser for basic features
    let html = text
      // Convert markdown links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text} ↗</a>`;
        }
        return `<a href="${url}">${text}</a>`;
      })
      
      // Convert plain URLs that start with https://
      .replace(/(^|[^"'(>\]])https:\/\/[^\s<>)]+/g, (match, prefix) => {
        const url = match.replace(prefix, '');
        return `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer">${url} ↗</a>`;
      })
      
      // Process bold-wrapped headings BEFORE general bold/italic processing
      .replace(/^\*### (.*?)\*$/gm, '<h3>$1</h3>')
      .replace(/^\*## (.*?)\*$/gm, '<h2>$1</h2>')
      .replace(/^\*# (.*?)\*$/gm, '<h2>$1</h2>')
      
      // Convert list items (before bold/italic to avoid conflicts)
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      
      // Convert bold and italic (with word boundaries to be safer)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(\s|^|\(|\[)\*([^*\s][^*]*[^*\s]|[^*\s])\*(\s|$|\)|\.|\,|\])/g, '$1<em>$2</em>$3')
      
      // Convert regular headings
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h2>$1</h2>')
      
      // Convert line breaks to paragraphs
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => {
        // Check if this paragraph contains list items
        if (paragraph.includes('<li>')) {
          // Wrap consecutive list items in <ul> tags
          return `<ul>${paragraph.replace(/\n/g, '')}</ul>`;
        }
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
      
    return html;
  }
  
</script>

<div class="calendar-container">
    <div class="calendar-layout">
        <!-- Left column: Events list -->
        <div class="events-sidebar">
            <div class="sidebar-header">
                <h2>Recent & Upcoming Events</h2>
            </div>
            <div class="events-list">
                {#if paginatedEvents().length > 0}
                    {#each paginatedEvents() as event}
                        <button 
                            class="event-list-item" 
                            class:selected={selectedEvent === event}
                            onclick={() => selectedEvent = event}
                        >
                            <div class="event-date-compact">{formatEventDate(event)}</div>
                            <h3 class="event-title-compact">{event.title}</h3>
                        </button>
                    {/each}
                {:else}
                    <div class="no-events-message">
                        <p>No events available.</p>
                    </div>
                {/if}
            </div>

            <!-- Pagination controls -->
            {#if totalPages() > 1}
                <div class="pagination">
                    <button 
                        class="pagination-btn" 
                        onclick={prevPage}
                        disabled={currentPage === 0}
                        aria-label="Previous page"
                    >
                        ←
                    </button>
                    
                    <div class="pagination-info">
                        Page {currentPage + 1} of {totalPages()}
                        <span class="events-count">({filteredEvents().length} events)</span>
                    </div>
                    
                    <button 
                        class="pagination-btn" 
                        onclick={nextPage}
                        disabled={currentPage >= totalPages() - 1}
                        aria-label="Next page"
                    >
                        →
                    </button>
                </div>
            {/if}

            <div class="subscribe-button">
                <a href="https://lists.dev-rel.org/g/community/calendar" target="_blank" rel="noopener noreferrer" class="subscribe-link">
                    <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    View Full Calendar and Subscribe
                </a>
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
                            <div class="event-description">{@html parseMarkdown(selectedEvent.description)}</div>
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
  
  .no-events-message {
    padding: var(--space-m);
    text-align: center;
    color: var(--color-text-secondary);
    font-style: italic;
  }
  
  .no-events-message p {
    margin: 0;
    font-size: var(--step--1);
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
    font-size: var(--step--1);
  }
  
  .event-description :global(h2) {
    font-size: var(--step--1);
    color: var(--color-text);
    margin: var(--space-s) 0 var(--space-xs) 0;
    font-weight: 700;
  }
  
  .event-description :global(h3) {
    font-size: var(--step--2);
    color: var(--color-text);
    margin: var(--space-s) 0 var(--space-xs) 0;
    font-weight: 600;
  }
  
  .event-description :global(p) {
    margin: 0 0 var(--space-s) 0;
    line-height: 1.6;
    font-size: var(--step--2);
  }
  
  .event-description :global(a) {
    color: var(--color-link);
    text-decoration: none;
    font-weight: 500;
  }
  
  .event-description :global(a:hover) {
    text-decoration: underline;
  }
  
  .event-description :global(strong) {
    font-weight: 700;
    color: var(--color-text);
  }
  
  .event-description :global(em) {
    font-style: italic;
  }
  
  .event-description :global(ul) {
    margin: 0 0 var(--space-s) 0;
    padding-left: var(--space-m);
    list-style-type: disc;
  }
  
  .event-description :global(li) {
    margin: 0 0 var(--space-2xs) 0;
    line-height: 1.6;
    font-size: var(--step--2);
    color: var(--color-text-secondary);
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
  
  .subscribe-button {
    margin-top: var(--space-m);
  }
  
  .subscribe-link {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    width: 100%;
    text-align: left;
    padding: var(--space-s);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    background: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--1);
    margin-bottom: var(--space-xs);
  }
  
  .subscribe-link:hover {
    background: var(--color-background-secondary-1);
    border-color: var(--color-mint);
    text-decoration: none;
  }
  
  .calendar-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--space-s);
    padding: var(--space-s);
    border-top: 1px solid var(--color-background-secondary-2);
    gap: var(--space-xs);
  }
  
  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-xs);
    background: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
    font-size: var(--step--1);
  }
  
  .pagination-btn:hover:not(:disabled) {
    background: var(--color-background-secondary-1);
    border-color: var(--color-mint);
  }
  
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-info {
    flex: 1;
    text-align: center;
    font-size: var(--step--2);
    color: var(--color-text-secondary);
    font-weight: 500;
  }
  
  .events-count {
    font-size: var(--step--3);
    opacity: 0.7;
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

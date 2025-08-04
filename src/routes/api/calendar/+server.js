import { json } from '@sveltejs/kit';
import ICAL from 'ical.js';

// Cache configuration
let cachedEvents = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// We will use the community calendar as the master source for all devrel foundation events
const CALENDAR_URL = 'https://lists.dev-rel.org/g/community/ics/13789427/807196765/feed.ics';

/**
 * Parse ICS data and return formatted events
 * @param {string} icsData - Raw ICS calendar data
 * @returns {Array} Array of formatted event objects
 */
function parseICSData(icsData) {
  try {
    const jcalData = ICAL.parse(icsData);
    const comp = new ICAL.Component(jcalData);
    const currentTime = new Date();
    
    const events = comp.getAllSubcomponents('vevent')
      .map(vevent => {
        const event = new ICAL.Event(vevent);
        
        // Check for recurrence data
        const rrule = event.component.getFirstPropertyValue('rrule');
        const isRecurring = !!rrule;
        
        return {
          id: event.uid,
          title: event.summary,
          description: event.description || '',
          start: event.startDate.toJSDate(),
          end: event.endDate ? event.endDate.toJSDate() : null,
          location: event.location || '',
          url: event.component.getFirstPropertyValue('url') || '',
          allDay: event.startDate.isDate, // true if it's an all-day event
          timezone: event.startDate.zone ? event.startDate.zone.tzid : 'UTC',
          isRecurring: isRecurring,
          recurrenceRule: rrule ? rrule.toString() : null,
          recurrenceId: event.component.getFirstPropertyValue('recurrence-id') || null
        };
      })
      .filter(event => {
        // For all events (recurring and non-recurring), include those from 2 weeks ago onwards
        const twoWeeksAgo = new Date(currentTime);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        
        // If there's an end date, use it for comparison
        // If no end date, use start date (include single-moment/all-day events)
        const eventDate = event.end || event.start;
        return eventDate >= twoWeeksAgo;
      });

    // Sort events by start date
    return events.sort((a, b) => a.start.getTime() - b.start.getTime());
  } catch (error) {
    console.error('Error parsing ICS data:', error);
    throw new Error('Failed to parse calendar data');
  }
}

/**
 * Fetch fresh calendar data from the external source
 * @returns {Promise<Array>} Array of formatted events
 */
async function fetchFreshCalendarData() {
  try {
    console.log('Fetching fresh calendar data from:', CALENDAR_URL);
    
    const response = await fetch(CALENDAR_URL, {
      headers: {
        'User-Agent': 'DevRel Foundation Calendar Proxy'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const icsData = await response.text();
    
    if (!icsData || !icsData.includes('BEGIN:VCALENDAR')) {
      throw new Error('Invalid ICS data received');
    }
    
    return parseICSData(icsData);
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
}

/**
 * GET /api/calendar
 * Returns cached or fresh calendar events
 */
export async function GET() {
  const now = Date.now();
  
  // Check if we need to refresh the cache
  const needsRefresh = !cachedEvents || (now - cacheTimestamp) > CACHE_DURATION;
  
  if (needsRefresh) {
    try {
      console.log('Cache expired or empty, fetching fresh data...');
      cachedEvents = await fetchFreshCalendarData();
      cacheTimestamp = now;
      
      console.log(`Successfully cached ${cachedEvents.length} events`);
    } catch (error) {
      console.error('Failed to fetch fresh calendar data:', error);
      
      // If we have cached data, return it with a warning
      if (cachedEvents) {
        console.log('Returning stale cached data due to fetch error');
        return json({
          events: cachedEvents,
          cached: true,
          lastUpdated: new Date(cacheTimestamp).toISOString(),
          warning: 'Using cached data due to fetch error'
        });
      }
      
      // No cached data and fetch failed
      return json(
        { 
          error: 'Failed to fetch calendar data',
          message: error.message 
        }, 
        { status: 500 }
      );
    }
  }
  
  // Return cached data
  return json({
    events: cachedEvents,
    cached: needsRefresh ? false : true,
    lastUpdated: new Date(cacheTimestamp).toISOString(),
    nextUpdate: new Date(cacheTimestamp + CACHE_DURATION).toISOString()
  });
}

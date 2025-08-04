import { json } from '@sveltejs/kit';
import ICAL from 'ical.js';

// Cache configuration
let cachedEvents = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

// We will use the community calendar as the master source for all devrel foundation events
const CALENDAR_URL = 'https://lists.dev-rel.org/g/community/ics/13789427/807196765/feed.ics';

/**
 * Parse ICS data and return formatted events
 * @param {string} icsData - Raw ICS calendar data
 * @param {boolean} skipFiltering - If true, return all events without date filtering
 * @returns {Array} Array of formatted event objects
 */
function parseICSData(icsData, skipFiltering = false) {
  try {
    // Preprocess the ICS data to fix common malformed date issues
    const cleanedIcsData = icsData
      // Fix malformed date-time values like "DTSTART:20250901" -> "DTSTART:20250901T000000Z"
      .replace(/(DTSTART|DTEND):(\d{8})$/gm, '$1:$2T000000Z')
    
    const jcalData = ICAL.parse(cleanedIcsData);
    const comp = new ICAL.Component(jcalData);
    const currentTime = new Date();
    
    const events = comp.getAllSubcomponents('vevent')
      .map(vevent => {
        try {
          const event = new ICAL.Event(vevent);
          
          // Check for recurrence data
          const rrule = event.component.getFirstPropertyValue('rrule');
          const isRecurring = !!rrule;
          
          // Validate dates before processing
          let startDate, endDate;
          
          try {
            // Handle all-day events and regular events differently
            if (event.startDate) {
              if (event.startDate.isDate) {
                // All-day event - create date at midnight in local timezone
                startDate = new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day);
              } else {
                // Regular event with time
                startDate = event.startDate.toJSDate();
              }
            }
            
            if (event.endDate) {
              if (event.endDate.isDate) {
                // All-day event - create date at midnight in local timezone
                endDate = new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day);
              } else {
                // Regular event with time
                endDate = event.endDate.toJSDate();
              }
            }
          } catch (dateError) {
            const errorMessage = dateError instanceof Error ? dateError.message : 'Unknown date parsing error';
            console.warn('Error parsing dates for event:', {
              summary: event.summary,
              uid: event.uid,
              dateError: errorMessage,
              startDateRaw: event.startDate?.toString(),
              endDateRaw: event.endDate?.toString()
            });
            return null;
          }
          
          if (!startDate || isNaN(startDate.getTime())) {
            console.warn('Skipping event with invalid start date:', {
              summary: event.summary,
              uid: event.uid,
              startDateRaw: event.startDate?.toString(),
              endDateRaw: event.endDate?.toString()
            });
            return null;
          }
          
          return {
            id: event.uid,
            title: event.summary,
            description: event.description || '',
            start: startDate,
            end: endDate || null,
            location: event.location || '',
            url: event.component.getFirstPropertyValue('url') || '',
            allDay: event.startDate.isDate, // true if it's an all-day event
            timezone: event.startDate.zone ? event.startDate.zone.tzid : 'UTC',
            isRecurring: isRecurring,
            recurrenceRule: rrule ? rrule.toString() : null,
            recurrenceId: event.component.getFirstPropertyValue('recurrence-id') || null
          };
        } catch (eventError) {
          const errorMessage = eventError instanceof Error ? eventError.message : 'Unknown error';
          console.warn('Skipping malformed event:', {
            error: errorMessage,
            veventData: vevent?.toString?.() || 'Unable to serialize vevent'
          });
          return null;
        }
      })
      .filter(event => event !== null); // Remove null events (malformed ones)

    // Apply date filtering only if not skipping
    if (!skipFiltering) {
      const filteredEvents = events.filter(event => {
        // For all events (recurring and non-recurring), include those from 2 weeks ago onwards
        const twoWeeksAgo = new Date(currentTime);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        
        // If there's an end date, use it for comparison
        // If no end date, use start date (include single-moment/all-day events)
        const eventDate = event.end || event.start;
        return eventDate >= twoWeeksAgo;
      });
      
      // Sort filtered events by start date
      return filteredEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    }

    // Sort all events by start date (no filtering)
    return events.sort((a, b) => a.start.getTime() - b.start.getTime());
  } catch (error) {
    console.error('Error parsing ICS data:', error);
    throw new Error('Failed to parse calendar data');
  }
}

/**
 * Fetch fresh calendar data from the external source
 * @param {boolean} skipFiltering - If true, return all events without date filtering
 * @returns {Promise<Array>} Array of formatted events
 */
async function fetchFreshCalendarData(skipFiltering = false) {
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
    
    return parseICSData(icsData, skipFiltering);
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
}

/**
 * GET /api/calendar
 * Returns cached or fresh calendar events
 * Query parameters:
 * - all: if "true", returns all events without date filtering
 * - invalidate: if "true", bypasses cache and fetches fresh data
 */
export async function GET({ url }) {
  const now = Date.now();
  const skipFiltering = url.searchParams.get('all') === 'true';
  const forceInvalidate = url.searchParams.get('invalidate') === 'true';
  
  // Check if we need to refresh the cache
  const needsRefresh = forceInvalidate || !cachedEvents || (now - cacheTimestamp) > CACHE_DURATION;
  
  if (needsRefresh) {
    try {
      console.log('Cache expired or empty, fetching fresh data...');
      cachedEvents = await fetchFreshCalendarData(skipFiltering);
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return json(
        { 
          error: 'Failed to fetch calendar data',
          message: errorMessage 
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
    nextUpdate: new Date(cacheTimestamp + CACHE_DURATION).toISOString(),
    filtered: !skipFiltering
  });
}

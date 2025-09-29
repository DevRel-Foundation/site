import { json } from '@sveltejs/kit';
import ICAL from 'ical.js';

// Calendar cache stores parsed event data from the ICS calendar feed from groups.io in memory to reduce network requests. The cache is refreshed every 8 hours or when explicitly invalidated. 
/** @type {any} */
let cachedEvents = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

// We use the community calendar as the source for devrel foundation events
const CALENDAR_URL = 'https://lists.dev-rel.org/g/community/ics/13789427/807196765/feed.ics';

/**
 * Parse .ics cal data and return formatted events
 * @param {string} icsData - Raw ICS calendar data
 * @param {boolean} skipFiltering - If true, return all events without date filtering
 * @returns {any[]} Array of formatted event objects
 */
function parseICSData(icsData, skipFiltering = false) {
  try {

    // The event dates may not include a timestamp so to make it easier to 
    // parse datetime later we can append the time to be midnight. For example,
    // turn DSTART:20250901 into DSTART:20250901T000000Z
    const cleanedIcsData = icsData
      .replace(/(DTSTART|DTEND):(\d{8})$/gm, '$1:$2T000000Z')


    const jcalData = ICAL.parse(cleanedIcsData);
    const comp = new ICAL.Component(jcalData);
    const currentTime = new Date();
    
    // Calculate date range for recurring events (include 2 months into future)
    const futureLimit = new Date(currentTime);
    futureLimit.setMonth(futureLimit.getMonth() + 2);
    
    // Collect all events and their exceptions
    /** @type {any[]} */
    const allEvents = [];
    /** @type {Map<string, Set<string>>} */
    const exceptions = new Map(); // Map of parent UID -> Set of exception dates
    
    // First pass: collect all vevents and identify exceptions
    comp.getAllSubcomponents('vevent').forEach(vevent => {
      try {
        const event = new ICAL.Event(vevent);
        const recurrenceId = event.component.getFirstPropertyValue('recurrence-id');
        
        if (recurrenceId) {
          // This is an exception/modification to a recurring event
          const parentUid = event.uid;
          if (!exceptions.has(parentUid)) {
            exceptions.set(parentUid, new Set());
          }
          
          // Convert recurrence-id to a comparable date string
          let exceptionDate;
          try {
            if (typeof recurrenceId === 'object' && recurrenceId && 'isDate' in recurrenceId && recurrenceId.isDate) {
              exceptionDate = `${recurrenceId.year}-${String(recurrenceId.month).padStart(2, '0')}-${String(recurrenceId.day).padStart(2, '0')}`;
            } else if (typeof recurrenceId === 'object' && recurrenceId && 'toJSDate' in recurrenceId) {
              exceptionDate = recurrenceId.toJSDate().toISOString().split('T')[0];
            } else {
              // Fallback for string or other types
              exceptionDate = String(recurrenceId).split('T')[0];
            }
          } catch (err) {
            console.warn('Error parsing recurrence-id:', err);
            exceptionDate = String(recurrenceId).split('T')[0];
          }
          
          exceptions.get(parentUid)?.add(exceptionDate);
          
          // If this exception has STATUS:CANCELLED, don't add it as a new event
          const status = event.component.getFirstPropertyValue('status');
          if (status && typeof status === 'string' && status.toLowerCase() === 'cancelled') {
            return; // Skip cancelled exceptions
          }
        }
        
        allEvents.push({ vevent, event, isException: !!recurrenceId });
      } catch (error) {
        console.warn('Error processing vevent:', error);
      }
    });
    
    // Second pass: process events and expand recurring ones
    /** @type {any[]} */
    const processedEvents = [];
    
    allEvents.forEach(({ vevent, event, isException }) => {
      try {
        // Check for recurrence data
        const rrule = event.component.getFirstPropertyValue('rrule');
        const isRecurring = !!rrule && !isException;
        
        if (isRecurring) {
          // Expand recurring event
          const iterator = event.iterator();
          const eventExceptions = exceptions.get(event.uid) || new Set();
          
          let occurrence;
          let count = 0;
          const maxOccurrences = 50; // Safety limit
          
          while ((occurrence = iterator.next()) && count < maxOccurrences) {
            const occurrenceDate = occurrence.toJSDate();
            
            // Stop if we're too far in the future
            if (occurrenceDate > futureLimit) {
              break;
            }
            
            // Check if this occurrence is cancelled
            const occurrenceDateStr = occurrenceDate.toISOString().split('T')[0];
            if (eventExceptions.has(occurrenceDateStr)) {
              continue; // Skip cancelled instances
            }
            
            // Calculate end date for this occurrence
            let endDate = null;
            if (event.endDate) {
              const duration = event.endDate.toJSDate().getTime() - event.startDate.toJSDate().getTime();
              endDate = new Date(occurrenceDate.getTime() + duration);
            }
            
            processedEvents.push({
              id: `${event.uid}-${occurrenceDate.getTime()}`,
              title: event.summary,
              description: event.description || '',
              start: occurrenceDate,
              end: endDate,
              location: event.location || '',
              url: event.component.getFirstPropertyValue('url') || '',
              allDay: event.startDate.isDate,
              timezone: event.startDate.zone ? event.startDate.zone.tzid : 'UTC',
              isRecurring: true,
              recurrenceRule: rrule ? rrule.toString() : null,
              parentId: event.uid,
              recurrenceId: null
            });
            
            count++;
          }
        } else {
          // Non-recurring event or exception event
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
            return;
          }
          
          if (!startDate || isNaN(startDate.getTime())) {
            console.warn('Skipping event with invalid start date:', {
              summary: event.summary,
              uid: event.uid,
              startDateRaw: event.startDate?.toString(),
              endDateRaw: event.endDate?.toString()
            });
            return;
          }
          
          processedEvents.push({
            id: event.uid,
            title: event.summary,
            description: event.description || '',
            start: startDate,
            end: endDate || null,
            location: event.location || '',
            url: event.component.getFirstPropertyValue('url') || '',
            allDay: event.startDate.isDate,
            timezone: event.startDate.zone ? event.startDate.zone.tzid : 'UTC',
            isRecurring: false,
            recurrenceRule: null,
            parentId: null,
            recurrenceId: event.component.getFirstPropertyValue('recurrence-id') || null
          });
        }
      } catch (eventError) {
        const errorMessage = eventError instanceof Error ? eventError.message : 'Unknown error';
        console.warn('Skipping malformed event:', {
          error: errorMessage,
          veventData: vevent?.toString?.() || 'Unable to serialize vevent'
        });
      }
    });

    // Apply date filtering only if not skipping
    if (!skipFiltering) {
      const filteredEvents = processedEvents.filter(event => {
        // For all events, include those from 2 weeks ago onwards
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
    return processedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
  } catch (error) {
    console.error('Error parsing ICS data:', error);
    throw new Error('Failed to parse calendar data');
  }
}

/**
 * Fetch fresh calendar data from the external source
 * @param {boolean} skipFiltering - If true, return all events without date filtering
 * @returns {Promise<any[]>} Array of formatted events
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
 * 
 * Returns structured list of events for easier processing. The data originates
 * from lists.dev-rel.org community calendar and is refreshed on demand but will
 * cache the results.
 * 
 * Query parameters:
 * - all: if "true", returns all events without any filtering (past events, limited recurrences)
 * - invalidate: if "true", bypasses cache and fetches fresh data from groups.io
 * @param {any} param0
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

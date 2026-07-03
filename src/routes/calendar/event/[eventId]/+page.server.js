import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { eventId } = params;
  
  try {
    const response = await fetch('/api/calendar');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message || 'Failed to load events');
    }
    
    const events = data.events || [];
    
    const decodedEventId = decodeURIComponent(eventId);
    const event = events.find((e) => typeof e.id === 'string' && e.id.startsWith(decodedEventId));

    
    if (!event) {
      throw error(404, 'Event not found');
    }
    
    return {
      event,
      allEvents: events
    };
  } catch (err) {
    console.error('Failed to load event:', err);
    throw error(500, 'Failed to load event data');
  }
}

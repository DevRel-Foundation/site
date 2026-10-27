import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCalendarEvents } from '$lib/server/calendar';
import { LFX_CALENDAR_URL } from '$lib/calendar';

export const GET: RequestHandler = async ({ fetch, setHeaders }) => {
	try {
		const { events, fetchedAt, stale } = await getCalendarEvents(fetch);

		setHeaders({
			'Cache-Control': 'public, max-age=300',
			'Netlify-CDN-Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400'
		});

		return json({
			events,
			source: LFX_CALENDAR_URL,
			lastUpdated: new Date(fetchedAt).toISOString(),
			stale
		});
	} catch (error) {
		console.error('Failed to load the DevRel Foundation calendar', error);
		return json(
			{ events: [], source: LFX_CALENDAR_URL, error: 'The calendar is temporarily unavailable.' },
			{ status: 502, headers: { 'Cache-Control': 'no-store' } }
		);
	}
};

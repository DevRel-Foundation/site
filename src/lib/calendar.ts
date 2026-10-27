export const LFX_CALENDAR_URL =
	'https://zoom-lfx.platform.linuxfoundation.org/meetings/devrel-foundation';
export const LFX_FEED_URL = 'https://webcal.prod.itx.linuxfoundation.org/lfx/lfq2Doiyj27nE9OthB';
export const LFX_SUBSCRIBE_URL = LFX_FEED_URL.replace(/^https:/, 'webcal:');

export interface CalendarEvent {
	id: string;
	title: string;
	start: string;
	end: string | null;
	allDay: boolean;
	description: string;
	url: string;
	isRecurring: boolean;
	isTouchpoint: boolean;
}

export function isTouchpointTitle(title: string): boolean {
	return /touchpoint|community call/i.test(title);
}

export function nextTouchpoint(events: CalendarEvent[], now = new Date()): CalendarEvent | null {
	return (
		events
			.filter((event) => event.isTouchpoint && new Date(event.end ?? event.start) > now)
			.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0] ?? null
	);
}

export function eventSlug(event: CalendarEvent): string {
	return encodeURIComponent(event.id);
}

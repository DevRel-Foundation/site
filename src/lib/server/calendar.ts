import ICAL from 'ical.js';
import {
	LFX_CALENDAR_URL,
	LFX_FEED_URL,
	isTouchpointTitle,
	type CalendarEvent
} from '$lib/calendar';

type IcalTime = InstanceType<typeof ICAL.Time>;
type IcalEvent = InstanceType<typeof ICAL.Event>;
type IcalComponent = InstanceType<typeof ICAL.Component>;

const CACHE_TTL_MS = 30 * 60 * 1000;
const PAST_WINDOW_DAYS = 120;
const FUTURE_WINDOW_DAYS = 240;
const MAX_OCCURRENCES = 500;

let cache: { events: CalendarEvent[]; fetchedAt: number } | null = null;

function cleanDescription(raw: string): string {
	const withoutInvite = raw
		.replace(/\r/g, '')
		.replace(/^\s*You have been invited to (a|an) [^\n]*\n/i, '');
	const beforeJoinDetails = withoutInvite.split(/\n\s*Ways to join meeting:/i)[0];
	return beforeJoinDetails.replace(/\n{3,}/g, '\n\n').trim();
}

function safeHttpsUrl(value: unknown): string | null {
	if (typeof value !== 'string') return null;
	try {
		const url = new URL(value.trim());
		return url.protocol === 'https:' ? url.href : null;
	} catch {
		return null;
	}
}

function toIso(time: IcalTime): string {
	if (time.isDate) {
		const month = String(time.month).padStart(2, '0');
		const day = String(time.day).padStart(2, '0');
		return `${time.year}-${month}-${day}`;
	}
	return time.toJSDate().toISOString();
}

function isCancelled(component: IcalComponent): boolean {
	return String(component.getFirstPropertyValue('status') ?? '').toUpperCase() === 'CANCELLED';
}

function buildEvent(
	event: IcalEvent,
	start: IcalTime,
	end: IcalTime | null,
	key: string,
	recurring: boolean
): CalendarEvent {
	const component = event.component;
	const title = event.summary || 'DevRel Foundation meeting';
	const url =
		safeHttpsUrl(component.getFirstPropertyValue('url')) ??
		safeHttpsUrl(event.location) ??
		LFX_CALENDAR_URL;

	return {
		id: `${event.uid}-${key}`,
		title,
		start: toIso(start),
		end: end ? toIso(end) : null,
		allDay: start.isDate,
		description: cleanDescription(String(event.description ?? '')),
		url,
		isRecurring: recurring,
		isTouchpoint: isTouchpointTitle(title)
	};
}

export function parseCalendar(icsData: string, rangeStart: Date, rangeEnd: Date): CalendarEvent[] {
	const root = new ICAL.Component(ICAL.parse(icsData));

	const groups = new Map<string, IcalComponent[]>();
	for (const component of root.getAllSubcomponents('vevent')) {
		const uid = String(component.getFirstPropertyValue('uid') ?? '');
		if (!uid) continue;
		groups.set(uid, [...(groups.get(uid) ?? []), component]);
	}

	const inRange = (start: Date, end: Date) => start < rangeEnd && end >= rangeStart;
	const events: CalendarEvent[] = [];

	for (const components of groups.values()) {
		const master = components.find((component) => !component.hasProperty('recurrence-id'));
		const exceptions = components.filter((component) => component.hasProperty('recurrence-id'));

		if (!master) {
			for (const component of exceptions) {
				if (isCancelled(component)) continue;
				const event = new ICAL.Event(component);
				const start = event.startDate;
				const end = event.endDate ?? null;
				if (!inRange(start.toJSDate(), (end ?? start).toJSDate())) continue;
				events.push(buildEvent(event, start, end, String(start.toJSDate().getTime()), true));
			}
			continue;
		}

		if (isCancelled(master)) continue;

		const cancelledOccurrences = new Set(
			exceptions
				.filter(isCancelled)
				.map((component) => String(component.getFirstPropertyValue('recurrence-id')))
		);
		const event = new ICAL.Event(master, {
			exceptions: exceptions.filter((component) => !isCancelled(component))
		});

		if (!event.isRecurring()) {
			const start = event.startDate;
			const end = event.endDate ?? null;
			if (inRange(start.toJSDate(), (end ?? start).toJSDate())) {
				events.push(buildEvent(event, start, end, String(start.toJSDate().getTime()), false));
			}
			continue;
		}

		const iterator = event.iterator();
		let steps = 0;
		for (let occurrence = iterator.next(); occurrence; occurrence = iterator.next()) {
			if (++steps > MAX_OCCURRENCES) break;
			if (occurrence.toJSDate() >= rangeEnd) break;
			if (cancelledOccurrences.has(occurrence.toString())) continue;
			const details = event.getOccurrenceDetails(occurrence);
			if (!inRange(details.startDate.toJSDate(), details.endDate.toJSDate())) continue;
			events.push(
				buildEvent(
					details.item,
					details.startDate,
					details.endDate,
					String(details.startDate.toJSDate().getTime()),
					true
				)
			);
		}
	}

	return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export async function getCalendarEvents(
	fetcher: typeof fetch = fetch,
	forceRefresh = false
): Promise<{ events: CalendarEvent[]; fetchedAt: number; stale: boolean }> {
	if (!forceRefresh && cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
		return { ...cache, stale: false };
	}

	try {
		const response = await fetcher(LFX_FEED_URL, {
			headers: { 'User-Agent': 'DevRel Foundation Website' },
			signal: AbortSignal.timeout(15000)
		});
		if (!response.ok) throw new Error(`Calendar feed returned ${response.status}`);
		const icsData = await response.text();
		if (!icsData.includes('BEGIN:VCALENDAR'))
			throw new Error('Calendar feed is not a valid iCalendar file');

		const now = Date.now();
		const rangeStart = new Date(now - PAST_WINDOW_DAYS * 24 * 60 * 60 * 1000);
		const rangeEnd = new Date(now + FUTURE_WINDOW_DAYS * 24 * 60 * 60 * 1000);
		cache = { events: parseCalendar(icsData, rangeStart, rangeEnd), fetchedAt: now };
		return { ...cache, stale: false };
	} catch (error) {
		if (cache) return { ...cache, stale: true };
		throw error;
	}
}

/** Keep in sync with --duration-* in app.css. */
export const PHI = 1.618;

export const duration = {
	'3xs': 62,
	'2xs': 100,
	xs: 162,
	s: 262,
	m: 424,
	l: 686,
	xl: 1109
} as const;

export type DurationKey = keyof typeof duration;

export const flyDistance = {
	xs: 5,
	s: 8,
	m: 13
} as const;

export type FlyDistanceKey = keyof typeof flyDistance;

export function flyPreset(
	distanceKey: FlyDistanceKey = 's',
	durationKey: DurationKey = 'xs'
) {
	return {
		y: flyDistance[distanceKey],
		duration: duration[durationKey]
	};
}

export function fadePreset(durationKey: DurationKey = 'xs') {
	return { duration: duration[durationKey] };
}

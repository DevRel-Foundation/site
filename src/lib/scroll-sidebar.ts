export type ScrollSidebarItem = {
	href: string;
	label: string;
};

export function hrefToId(href: string): string {
	return href.startsWith('#') ? href.slice(1) : href;
}

export function createScrollSpy(
	sectionIds: string[],
	onActive: (id: string) => void
): () => void {
	if (typeof window === 'undefined') return () => {};

	const elements = sectionIds
		.map((id) => document.getElementById(id))
		.filter((el): el is HTMLElement => el != null);

	if (elements.length === 0) return () => {};

	let visible = new Map<string, IntersectionObserverEntry>();

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const id = entry.target.id;
				if (entry.isIntersecting) {
					visible.set(id, entry);
				} else {
					visible.delete(id);
				}
			}

			if (visible.size === 0) return;

			const sorted = [...visible.values()].sort(
				(a, b) => a.boundingClientRect.top - b.boundingClientRect.top
			);
			onActive(sorted[0].target.id);
		},
		{
			rootMargin: '-15% 0px -65% 0px',
			threshold: [0, 0.1, 0.5, 1]
		}
	);

	for (const el of elements) observer.observe(el);

	return () => {
		observer.disconnect();
		visible.clear();
	};
}

export function getSectionScrollOffset(): number {
	if (typeof window === 'undefined') return 0;
	const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
	// calc(3.5rem + var(--space-m)) — approximate when --space-m is fluid
	return 3.5 * rem + 1.7 * rem;
}

export function scrollToSection(id: string): void {
	const el = document.getElementById(id);
	if (!el) return;

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const top = el.getBoundingClientRect().top + window.scrollY - getSectionScrollOffset();

	window.scrollTo({
		top: Math.max(0, top),
		behavior: reducedMotion ? 'auto' : 'smooth'
	});
	history.replaceState(null, '', `#${id}`);
}

export function scrollSidebarLinkIntoView(
	id: string,
	containers: (HTMLElement | undefined)[]
): void {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id;
	const selector = `a.scroll-sidebar-nav__link[href="#${escaped}"]`;

	for (const container of containers) {
		if (!container) continue;
		const link = container.querySelector<HTMLAnchorElement>(selector);
		if (link) {
			link.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
			return;
		}
	}
}

export interface BlogTopic {
	slug: string;
	label: string;
	description: string;
}

/**
 * The blog's topics. Posts list them in frontmatter as `tags: ["announcements", ...]`;
 * the first one is the post's primary topic. Order here is the order of the filters.
 */
export const BLOG_TOPICS: BlogTopic[] = [
	{
		slug: 'announcements',
		label: 'Announcements',
		description: 'News, elections, and governance updates from the DevRel Foundation.'
	},
	{
		slug: 'newsletter',
		label: 'Newsletter',
		description: 'The monthly DevRel Foundation digest.'
	},
	{
		slug: 'community',
		label: 'Community',
		description: 'Community Touchpoints, events, show-and-tell sessions, and community spotlights.'
	},
	{
		slug: 'projects',
		label: 'Projects',
		description: 'Updates from Foundation projects such as the Tools Catalog and Persona Library.'
	}
];

export const ALL_TOPICS_DESCRIPTION = 'Elevating the professional practice of Developer Relations';

/** Old audience categories, mapped to the closest topic for redirects (others go to /blog). */
export const LEGACY_CATEGORY_TOPICS: Record<string, string> = {
	announce: 'announcements'
};

/** Old free-form tags, mapped to topics so existing links keep working. */
export const LEGACY_TAG_TOPICS: Record<string, string> = {
	foundation: 'announcements',
	'foundation-news': 'announcements',
	governance: 'announcements',
	elections: 'announcements',
	events: 'community',
	'community-touchpoints': 'community',
	agents: 'community',
	'tools-catalog': 'projects',
	'persona-library': 'projects',
	orgs: 'community'
};

const TOPICS_BY_SLUG = new Map(BLOG_TOPICS.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string | undefined): BlogTopic | undefined {
	return slug ? TOPICS_BY_SLUG.get(slug) : undefined;
}

export function topicLabel(slug: string): string {
	return getTopic(slug)?.label ?? slug;
}

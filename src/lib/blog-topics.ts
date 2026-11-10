export interface BlogTopic {
	slug: string;
	label: string;
	description: string;
}

/**
 * The blog's topics. Posts list them in frontmatter as `tags: ["governance", ...]`;
 * the first one is the post's primary topic. Order here is the order of the filters.
 */
export const BLOG_TOPICS: BlogTopic[] = [
	{
		slug: 'newsletter',
		label: 'Newsletter',
		description: 'The monthly DevRel Foundation digest.'
	},
	{
		slug: 'foundation-news',
		label: 'Foundation news',
		description: 'Launches, announcements, and milestones from the DevRel Foundation.'
	},
	{
		slug: 'governance',
		label: 'Governance',
		description: 'Elections, the Steering Committee, the charter, and how the Foundation is run.'
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
	},
	{
		slug: 'agent-experience',
		label: 'Agent Experience (AX)',
		description:
			'Agents, agent-assisted DevRel workflows, and making docs and products work for agents.'
	},
	{
		slug: 'developer-experience',
		label: 'Developer Experience (DX)',
		description: 'Onboarding, documentation, and research on the developer experience.'
	},
	{
		slug: 'evals-measurement',
		label: 'Evals & Measurement',
		description: 'Metrics, ROI, and how to evaluate DevRel programs and AI tools.'
	},
	{
		slug: 'devrel-practice',
		label: 'DevRel Practice',
		description: 'What developer relations is, careers in DevRel, and team strategy.'
	}
];

export const ALL_TOPICS_DESCRIPTION = 'Elevating the professional practice of Developer Relations';

/** Old audience categories, mapped to the closest topic for redirects. */
export const LEGACY_CATEGORY_TOPICS: Record<string, string> = {
	announce: 'foundation-news',
	'early-ic': 'devrel-practice',
	'pro-lead': 'devrel-practice',
	exec: 'devrel-practice'
};

/** Old free-form tags, mapped to topics so existing links keep working. */
export const LEGACY_TAG_TOPICS: Record<string, string> = {
	foundation: 'foundation-news',
	elections: 'governance',
	events: 'community',
	'community-touchpoints': 'community',
	agents: 'agent-experience',
	'tools-catalog': 'projects',
	'persona-library': 'projects',
	orgs: 'devrel-practice'
};

const TOPICS_BY_SLUG = new Map(BLOG_TOPICS.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string | undefined): BlogTopic | undefined {
	return slug ? TOPICS_BY_SLUG.get(slug) : undefined;
}

export function topicLabel(slug: string): string {
	return getTopic(slug)?.label ?? slug;
}

/** Topics that have at least one post, in BLOG_TOPICS order. */
export function topicsWithPosts(posts: Array<{ tags?: string[] }>): BlogTopic[] {
	const used = new Set(posts.flatMap((post) => post.tags ?? []));
	return BLOG_TOPICS.filter((topic) => used.has(topic.slug));
}

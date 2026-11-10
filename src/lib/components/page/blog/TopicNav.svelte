<script lang="ts">
	import { BLOG_TOPICS } from '$lib/blog-topics';

	interface Props {
		/** Slug of the topic being viewed; omit on the all-posts page. */
		active?: string;
		feedHref: string;
		feedLabel: string;
	}

	let { active, feedHref, feedLabel }: Props = $props();
</script>

<nav class="topic-nav" aria-label="Blog topics">
	<a
		href="/blog"
		class="category-link"
		class:active={!active}
		aria-current={!active ? 'page' : undefined}
	>
		All
	</a>
	{#each BLOG_TOPICS as topic (topic.slug)}
		<a
			href="/blog/tag/{topic.slug}"
			class="category-link"
			class:active={active === topic.slug}
			aria-current={active === topic.slug ? 'page' : undefined}
		>
			{topic.label}
		</a>
	{/each}
	<a
		href={feedHref}
		class="rss-link"
		title={feedLabel}
		aria-label={feedLabel}
		data-sveltekit-reload
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"
			/>
		</svg>
	</a>
</nav>

<style>
	.topic-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2xs);
	}

	/* Smaller than the site-wide pill so all topics fit on one or two lines. */
	.topic-nav .category-link {
		padding: var(--space-3xs) var(--space-xs);
		font-size: var(--step--1);
		letter-spacing: 0.02em;
	}

	.rss-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2xs);
		color: var(--color-background-secondary-2-dark);
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.rss-link:hover {
		opacity: 0.7;
	}
</style>

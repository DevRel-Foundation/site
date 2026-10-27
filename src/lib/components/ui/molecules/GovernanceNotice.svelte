<script lang="ts">
	import { TRANSITION_UPDATE_URL } from '$lib/community';

	interface Props {
		compact?: boolean;
	}

	let { compact = false }: Props = $props();
</script>

<aside
	class="governance-notice"
	class:governance-notice--compact={compact}
	aria-label="Governance transition"
>
	<p class="governance-notice__label">Governance transition</p>
	<p>
		The DevRel Foundation is in a governance transition. The previous Steering Committee has
		completed its service, and the Linux Foundation is facilitating an open community process to
		shape the Foundation's next priorities, contribution paths, and leadership.
	</p>
	{#if !compact}
		<p>
			Leadership will grow from community contributions. The best way to take part right now is to
			join a
			<a href="/community/touchpoints">Community Touchpoint</a>.
		</p>
	{/if}
	<a
		class="governance-notice__link"
		href={TRANSITION_UPDATE_URL}
		target="_blank"
		rel="noopener noreferrer"
	>
		Read the update on GitHub ↗
	</a>
</aside>

<style>
	.governance-notice {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		max-width: 48rem;
		margin-block: var(--space-m);
		padding: var(--space-s) var(--space-m);
		border: 1px solid var(--color-info-border);
		border-left: 4px solid var(--color-info-text);
		border-radius: var(--radius-s);
		background: var(--color-info);
		color: var(--color-info-text);
	}

	.governance-notice--compact {
		padding: var(--space-xs) var(--space-s);
	}

	.governance-notice p {
		margin: 0;
		font-size: var(--step--1);
		line-height: 1.6;
		color: inherit;
	}

	.governance-notice .governance-notice__label {
		font-size: var(--step--2);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.governance-notice a {
		color: inherit;
		font-weight: 600;
	}

	.governance-notice__link {
		width: fit-content;
		font-size: var(--step--1);
	}
</style>

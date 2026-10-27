<script lang="ts">
	import NextTouchpoint from '$lib/components/page/touchpoints/NextTouchpoint.svelte';
</script>

<section class="layout-section touchpoints-band" aria-labelledby="touchpoints-band-title">
	<div class="touchpoints-band__inner">
		<div class="touchpoints-band__text">
			<p class="touchpoints-band__eyebrow">DRF Community Touchpoints</p>
			<h2 id="touchpoints-band-title">Shape the next phase of the DevRel Foundation</h2>
			<p>
				The Foundation is in a governance transition, and its next priorities are being decided in
				the open. Join our biweekly Community Touchpoints to meet other practitioners, share your
				work, and help decide where the Foundation goes next.
			</p>
			<div class="touchpoints-band__actions">
				<a class="touchpoints-band__primary" href="/community/touchpoints">About Touchpoints</a>
				<a class="touchpoints-band__secondary" href="/community/touchpoints/submit"
					>Submit a session</a
				>
			</div>
		</div>
		<NextTouchpoint />
	</div>
</section>

<style>
	.touchpoints-band {
		margin-bottom: var(--space-2xl);
	}

	.touchpoints-band__inner {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
		gap: var(--space-l);
		align-items: center;
		padding: var(--space-l);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
		border-radius: var(--radius-l);
		background: var(--color-background-secondary-1);
	}

	.touchpoints-band__eyebrow {
		margin: 0;
		font-size: var(--step--1);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-link);
	}

	.touchpoints-band h2 {
		margin: var(--space-2xs) 0 var(--space-s);
		font-size: var(--step-3);
		color: var(--color-text);
	}

	.touchpoints-band__text > p:not(.touchpoints-band__eyebrow) {
		margin: 0;
		font-size: var(--step-0);
		line-height: 1.6;
		color: var(--color-text);
	}

	.touchpoints-band__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s);
		margin-top: var(--space-m);
	}

	.touchpoints-band__primary,
	.touchpoints-band__secondary {
		padding: var(--space-xs) var(--space-l);
		border-radius: var(--radius-pill);
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
	}

	.touchpoints-band__primary {
		background: var(--color-button-background);
		color: var(--color-button-text);
	}

	.touchpoints-band__secondary {
		border: 1px solid var(--color-link);
		color: var(--color-link);
	}

	@media (max-width: 800px) {
		.touchpoints-band__inner {
			grid-template-columns: 1fr;
			padding: var(--space-m);
		}
	}
</style>

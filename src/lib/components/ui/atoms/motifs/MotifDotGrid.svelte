<script lang="ts">
	type Variant = 'header' | 'footer' | 'full';

	interface Props {
		variant: Variant;
		class?: string;
	}

	let { variant, class: className = '' }: Props = $props();
</script>

<div
	data-pattern
	class="motif-dot-grid motif-dot-grid--{variant} {className}"
	aria-hidden="true"
></div>

<style>
	.motif-dot-grid {
		inset-inline: 0;
		width: auto;
		pointer-events: none;
		background-image: radial-gradient(
			circle,
			var(--pattern-color) 1px,
			transparent 1px
		);
		background-size: var(--space-m) var(--space-m);
	}

	.motif-dot-grid--full {
		position: absolute;
		top: 0;
		height: 100%;
	}

	.motif-dot-grid--header {
		position: absolute;
		inset-inline: 0;
		top: 0;
		height: 400px;
		mask-image: linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%);
	}

	.motif-dot-grid--footer {
		position: absolute;
		bottom: 0;
		height: 400px;
		mask-image: linear-gradient(to top, #000 0%, #000 50%, transparent 100%);
		-webkit-mask-image: linear-gradient(to top, #000 0%, #000 50%, transparent 100%);
	}

	:global(.footer-dot-grid-anchor) {
		position: relative;
		height: 0;
	}
</style>

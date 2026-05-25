<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div data-motif class="motif-overlapping-circles {className}" aria-hidden="true"></div>

<style>
	.motif-overlapping-circles {
		position: absolute;
		pointer-events: none;
		width: 0;
		height: 0;
		right: 0;
		top: -4%;
	}

	.motif-overlapping-circles::before {
		content: '';
		position: absolute;
		width: clamp(14rem, 42vw, 38rem);
		height: clamp(14rem, 42vw, 38rem);
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--color-accent-text) 18%, transparent);
		transform: translate(-54%, -36%);
	}

	.motif-overlapping-circles::after {
		content: '';
		position: absolute;
		width: clamp(7rem, 22vw, 18rem);
		height: clamp(7rem, 22vw, 18rem);
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--color-blue) 22%, transparent);
		transform: translate(-20%, 60%);
	}

	@media (max-width: 768px) {
		.motif-overlapping-circles {
			right: 6vw;
			top: -2%;
		}

		.motif-overlapping-circles::before {
			width: clamp(12rem, 72vw, 28rem);
			height: clamp(12rem, 72vw, 28rem);
		}

		.motif-overlapping-circles::after {
			width: clamp(6rem, 38vw, 14rem);
			height: clamp(6rem, 38vw, 14rem);
		}
	}
</style>

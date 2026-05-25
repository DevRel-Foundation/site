<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div data-motif class="motif-concentric-circles {className}" aria-hidden="true">
	<span class="ring ring--1"></span>
	<span class="ring ring--2"></span>
	<span class="ring ring--3"></span>
	<span class="ring ring--4"></span>
</div>

<style>
	.motif-concentric-circles {
		--ring-1: clamp(8rem, 20vw, 16rem);
		--ring-2: clamp(12rem, 28vw, 26rem);
		--ring-3: clamp(17rem, 38vw, 44rem);
		--ring-4: clamp(24rem, 55vw, 72rem);

		position: absolute;
		pointer-events: none;
		width: 0;
		height: 0;
		right: clamp(2vw, 6vw, 8vw);
		top: 50%;
		transform: translateY(-50%);
	}

	.ring {
		position: absolute;
		box-sizing: border-box;
		border-radius: 50%;
		border: clamp(2px, 0.25vw, 4px) solid color-mix(in srgb, var(--color-accent-text) 28%, transparent);
		background: transparent;
		transform: translate(-50%, -50%);
	}

	.ring--1 {
		width: var(--ring-1);
		height: var(--ring-1);
	}

	.ring--2 {
		width: var(--ring-2);
		height: var(--ring-2);
	}

	.ring--3 {
		width: var(--ring-3);
		height: var(--ring-3);
	}

	.ring--4 {
		width: var(--ring-4);
		height: var(--ring-4);
	}

	@media (max-width: 768px) {
		.motif-concentric-circles {
			--ring-1: clamp(6.5rem, 32vw, 12rem);
			--ring-2: clamp(9.5rem, 46vw, 18rem);
			--ring-3: clamp(14rem, 62vw, 28rem);
			--ring-4: clamp(19rem, 88vw, 44rem);

			right: clamp(1vw, 4vw, 6vw);
		}
	}
</style>

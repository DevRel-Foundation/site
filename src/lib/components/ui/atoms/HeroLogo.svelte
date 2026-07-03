<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let leafProgress = $state(0);

	const arcPath =
		'M583.253,963.663C666.567,917.821 723.076,829.182 723.076,727.449C723.076,578.754 602.354,458.032 453.659,458.032C304.963,458.032 184.242,578.754 184.242,727.449C184.242,876.144 304.963,996.866 453.659,996.866C455.459,996.866 457.255,996.848 459.047,996.813L459.047,1011.69C457.255,1011.73 455.459,1011.74 453.659,1011.74C296.753,1011.74 169.365,884.355 169.365,727.449C169.365,570.543 296.753,443.155 453.659,443.155C610.565,443.155 737.953,570.543 737.953,727.449C737.953,836.383 676.551,931.09 586.5,978.817C582.33,981.178 577.531,977.295 576.999,974.296C575.913,968.183 579.791,965.568 583.253,963.663Z';

	const arcRevealPath =
		'M453.659,996.866C304.963,996.866 184.242,876.144 184.242,727.449C184.242,578.754 304.963,458.032 453.659,458.032C602.354,458.032 723.076,578.754 723.076,727.449C723.076,829.182 666.567,917.821 583.253,963.663';

	const leafPath =
		'M9.38,99.663L9,75.946L9.786,26.881C9.832,23.985 11.327,21.304 13.766,19.743C16.206,18.181 19.266,17.946 21.915,19.117C54.134,33.761 140.568,78.554 140.568,137.892L140.613,137.892L140.613,209.386C138.036,207.643 135.233,205.895 132.228,204.121C100.893,185.626 45.43,163.233 9.38,99.663ZM140.613,230.089L140.613,248.75C140.613,251.665 139.143,254.384 136.703,255.98C134.264,257.575 131.184,257.833 128.513,256.665C96.931,242.434 14.127,199.427 10.037,137.892L9.992,137.892L9.868,130.152C40.517,171.734 78.858,193.13 107.735,208.962C119.209,215.253 129.092,220.573 136.078,226.08C137.79,227.43 139.33,228.745 140.613,230.089Z';

	const LEAF_MASK_OFFSET_HIDDEN = 4;
	const LEAF_MASK_OFFSET_VISIBLE = -0.5;

	const leftLeafMaskTransform = $derived(
		`rotate(35 0.5 0.5) translate(0 ${LEAF_MASK_OFFSET_HIDDEN + (LEAF_MASK_OFFSET_VISIBLE - LEAF_MASK_OFFSET_HIDDEN) * leafProgress})`
	);
	const rightLeafMaskTransform = $derived(
		`rotate(-35 0.5 0.5) translate(0 ${LEAF_MASK_OFFSET_HIDDEN + (LEAF_MASK_OFFSET_VISIBLE - LEAF_MASK_OFFSET_HIDDEN) * leafProgress})`
	);

	function readCssVar(el: HTMLElement, name: string): string {
		return getComputedStyle(el).getPropertyValue(name).trim();
	}

	function parseCssTime(value: string): number {
		const trimmed = value.trim();
		if (!trimmed) return 0;
		if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed);
		if (trimmed.endsWith('s')) return Number.parseFloat(trimmed) * 1000;
		return Number.parseFloat(trimmed) * 1000;
	}

	onMount(() => {
		let frame = 0;
		let timeout: ReturnType<typeof setTimeout> | undefined;

		const startLeafWipe = () => {
			if (!containerEl) return;

			const delay = parseCssTime(readCssVar(containerEl, '--leaf-delay'));
			const duration = parseCssTime(readCssVar(containerEl, '--leaf-duration')) || 10000;

			const run = () => {
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
					leafProgress = 1;
					return;
				}

				const start = performance.now();

				const step = (now: number) => {
					const t = Math.min(1, (now - start) / duration);
					leafProgress = t;
					if (t < 1) frame = requestAnimationFrame(step);
				};

				frame = requestAnimationFrame(step);
			};

			if (delay > 0) timeout = window.setTimeout(run, delay);
			else run();
		};

		requestAnimationFrame(() => {
			requestAnimationFrame(startLeafWipe);
		});

		return () => {
			cancelAnimationFrame(frame);
			if (timeout !== undefined) window.clearTimeout(timeout);
		};
	});
</script>

<div bind:this={containerEl} class="hero-logo-container {className}">
	<svg
		class="hero-logo"
		viewBox="0 0 847 847"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<defs>
			<mask
				id="hero-logo-arc-mask"
				maskUnits="userSpaceOnUse"
				x="-100"
				y="-100"
				width="1000"
				height="1200"
			>
				<rect x="-100" y="-100" width="1000" height="1200" fill="black" />
				<path
					class="hero-logo-arc-mask"
					pathLength="1"
					fill="none"
					stroke="white"
					stroke-width="72"
					d={arcRevealPath}
				/>
			</mask>
			<mask
				id="hero-logo-leaf-mask-left"
				maskUnits="objectBoundingBox"
				maskContentUnits="objectBoundingBox"
			>
				<rect x="0" y="0" width="1" height="1" fill="black" />
				<rect
					class="hero-logo-leaf-mask-plate"
					x="-1"
					y="-1"
					width="3"
					height="3"
					fill="white"
					transform={leftLeafMaskTransform}
				/>
			</mask>
			<mask
				id="hero-logo-leaf-mask-right"
				maskUnits="objectBoundingBox"
				maskContentUnits="objectBoundingBox"
			>
				<rect x="0" y="0" width="1" height="1" fill="black" />
				<rect
					class="hero-logo-leaf-mask-plate"
					x="-1"
					y="-1"
					width="3"
					height="3"
					fill="white"
					transform={rightLeafMaskTransform}
				/>
			</mask>
		</defs>
		<g transform="matrix(1,0,0,1,-0.812033,-1.34368)">
			<g transform="matrix(1,0,0,1,2561.71,210.241)">
				<g transform="matrix(1,0,0,1,-2630.12,-559.407)">
					<g transform="matrix(7.90479e-17,1.29095,-1.29095,7.90479e-17,1448.92,152.957)">
						<circle cx="480.875" cy="740.901" r="327.847" class="hero-logo-circle" />
					</g>
					<g transform="matrix(1,0,0,1,-3.43554,6.56446)">
						<g>
							<g transform="matrix(1.20992,0,0,1.20992,-53.0015,-112.979)">
								<path class="hero-logo-arc" mask="url(#hero-logo-arc-mask)" d={arcPath} />
							</g>
							<path class="hero-logo-stem" pathLength="1" d="M493.388,941.256L493.388,1099.03" />
							<g mask="url(#hero-logo-leaf-mask-left)">
								<g transform="matrix(1.11127,0,0,1.11127,326.694,614.739)">
									<path class="hero-logo-leaf" d={leafPath} />
								</g>
							</g>
							<g mask="url(#hero-logo-leaf-mask-right)">
								<g transform="matrix(-1.11127,0,0,1.11127,661.827,546.483)">
									<path class="hero-logo-leaf" d={leafPath} />
								</g>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</svg>
</div>

<style>
	.hero-logo-container {
		--stem-delay: 0.15s;
		--stem-duration: 0.8s;
		--reveal-delay: 1s;
		--reveal-duration: 1.45s;
		--leaf-delay: 0.15s;
		--leaf-duration: 4s;
	}

	.hero-logo {
		display: block;
		width: 100%;
		height: auto;
		fill-rule: evenodd;
		clip-rule: evenodd;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-miterlimit: 1.5;
	}

	.hero-logo-circle {
		fill: rgb(0, 36, 46);
		opacity: 0;
		animation: fade-in 0.35s ease-out 0s forwards;
	}

	.hero-logo-arc,
	.hero-logo-leaf {
		fill: rgb(121, 191, 68);
	}

	.hero-logo-arc-mask {
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: draw-arc var(--reveal-duration) ease-in-out var(--reveal-delay) forwards;
	}

	.hero-logo-stem {
		fill: none;
		stroke: rgb(121, 191, 68);
		stroke-width: 18px;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: draw-stem var(--stem-duration) ease-out var(--stem-delay) forwards;
	}

	@keyframes draw-stem {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes draw-arc {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}
</style>

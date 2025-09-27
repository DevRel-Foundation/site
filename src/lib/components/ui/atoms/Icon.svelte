<script>
	import IconEnclosed from "./IconEnclosed.svelte";

  export let alt = '';
  export let label = '';
  export let href = '';
  export let icon = '';
  export let enclosed = '';

</script>


{#if enclosed === "True"}
	<IconEnclosed {alt} {label} {href} {icon} />
{:else}

	{#if href}
	<a href={href} class="social-link">
		<img src={icon} alt={alt} class="social-icon" />{label}
	</a>
	{:else}
	<img src={icon} alt={alt} class="social-icon" />{label}
	{/if}

{/if}

<style>
	.social-icon {
		width: 1rem;
		height: 1rem;
		fill: currentColor; /* inherit */
		filter: var(--icon-filter);
		display: inline;
		vertical-align: middle;
		margin-right: var(--space-2xs);
	}

	.social-link {
		color: inherit; /* match parent */
		text-decoration: none;
	}

	.social-link:hover {
		text-decoration: underline;
	}
</style>
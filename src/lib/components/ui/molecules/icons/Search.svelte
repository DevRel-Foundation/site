<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import SearchIcon from 'iconoir/icons/regular/search.svg';

	export let alt = 'Search';
	export let label = '';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{SearchIcon}" enclosed={enclosed} />
<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import OpenInBrowser from 'iconoir/icons/regular/open-in-browser.svg';

	export let alt = '';
	export let label = '';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{OpenInBrowser}" enclosed={enclosed} />

<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import GitHubIcon from 'iconoir/icons/github.svg';

	export let alt = 'View on GitHub';
	export let label = 'https://github.com/devrel-foundation';
	export let href = 'https://github.com/devrel-foundation';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{GitHubIcon}" enclosed={enclosed} />
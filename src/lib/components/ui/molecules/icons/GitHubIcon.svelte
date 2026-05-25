<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import GitHubIcon from 'iconoir/icons/github.svg';

	export let alt = 'GitHub';
	export let label = 'GitHub';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{GitHubIcon}" enclosed={enclosed} />

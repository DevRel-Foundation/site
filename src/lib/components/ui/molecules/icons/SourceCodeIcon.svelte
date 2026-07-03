<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import SourceCodeIcon from 'iconoir/icons/regular/code-brackets.svg';

	export let alt = '';
	export let label = '';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{SourceCodeIcon}" enclosed={enclosed} />

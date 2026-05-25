<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import SubmitDoc from 'iconoir/icons/regular/submit-document.svg';

	export let alt = '';
	export let label = '';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{SubmitDoc}" enclosed={enclosed} />

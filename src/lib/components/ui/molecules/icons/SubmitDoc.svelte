<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import SubmitDoc from 'iconoir/icons/regular/submit-document.svg';

	export let alt = 'Join Distro List';
	export let label = 'Distribution List';
	export let href = 'mailto:info@dev-rel.org';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{SubmitDoc}" enclosed={enclosed} />
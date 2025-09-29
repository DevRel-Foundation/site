<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import CheckCircleIcon from 'iconoir/icons/regular/info-circle.svg';

	export let alt = 'Join Distro List';
	export let label = 'Distribution List';
	export let href = 'mailto:info@dev-rel.org';
	export let enclosed = false;
</script>

<span title={alt} aria-label={alt}>
	<Icon alt={alt} label={label} href={href} icon="{CheckCircleIcon}" enclosed={enclosed} />
</span>
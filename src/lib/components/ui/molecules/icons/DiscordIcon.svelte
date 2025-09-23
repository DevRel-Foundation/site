<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import DiscordIcon from 'iconoir/icons/regular/discord.svg';

	export let alt = 'Join Discord';
	export let label = 'Discord';
	export let href = 'https://discord.gg/G7CSTKZcuT';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{DiscordIcon}" enclosed={enclosed} />
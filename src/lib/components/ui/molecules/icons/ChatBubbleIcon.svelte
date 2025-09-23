<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import ChatBubbleIcon from 'iconoir/icons/regular/chat-bubble.svg';

	export let alt = 'Join Distro List';
	export let label = 'Distribution List';
	export let href = 'mailto:info@dev-rel.org';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{ChatBubbleIcon}" enclosed={enclosed} />
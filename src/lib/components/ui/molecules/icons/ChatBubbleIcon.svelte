<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import ChatBubbleIcon from 'iconoir/icons/regular/chat-bubble.svg';

	export let alt = '';
	export let label = '';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{ChatBubbleIcon}" enclosed={enclosed} />

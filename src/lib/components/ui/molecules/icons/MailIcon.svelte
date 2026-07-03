<script>
	import Icon from '$lib/components/ui/atoms/Icon.svelte';
	import MailIcon from 'iconoir/icons/regular/mail.svg';

	export let alt = 'Email';
	export let label = '';
	export let href = '';
	export let enclosed = false;
</script>

<Icon alt={alt} label={label} href={href} icon="{MailIcon}" enclosed={enclosed} />

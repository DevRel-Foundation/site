<script lang="ts">
  import Icon from '$lib/components/ui/atoms/Icon.svelte';
  import { AppTooltip } from '$lib/components/ui/primitives';
  import CheckCircleIcon from 'iconoir/icons/regular/info-circle.svg';

  interface Props {
    alt?: string;
    label?: string;
    href?: string;
    enclosed?: boolean;
  }

  let {
    alt = 'More information',
    label = '',
    href = '',
    enclosed = false
  }: Props = $props();
</script>

{#if alt}
  <AppTooltip content={alt}>
    {#snippet trigger()}
      <Icon {alt} {label} {href} icon={CheckCircleIcon} {enclosed} />
    {/snippet}
  </AppTooltip>
{:else}
  <Icon {alt} {label} {href} icon={CheckCircleIcon} {enclosed} />
{/if}

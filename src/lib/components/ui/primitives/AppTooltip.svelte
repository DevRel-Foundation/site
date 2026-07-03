<script lang="ts">
  import './AppTooltip.css';
  import { Tooltip } from 'bits-ui';
  import type { Snippet } from 'svelte';

  interface Props {
    content: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    trigger: Snippet;
  }

  let { content, side = 'top', sideOffset = 8, trigger }: Props = $props();
</script>

<Tooltip.Root delayDuration={200}>
  <Tooltip.Trigger class="app-tooltip-trigger">
    {@render trigger()}
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content {side} {sideOffset} class="app-tooltip-content">
      {content}
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>

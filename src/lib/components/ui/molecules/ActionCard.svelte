<script lang="ts">
  import CtaButton from '$lib/components/ui/primitives/CtaButton.svelte';
  import ExampleCard from '$lib/components/ui/molecules/ExampleCard.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    description?: string;
    ctaLabel: string;
    ctaHref?: string;
    icon?: string;
    iconAlt?: string;
    descriptionClamp?: boolean;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
  }

  let {
    title,
    description = '',
    ctaLabel,
    ctaHref,
    icon,
    iconAlt = '',
    descriptionClamp = false,
    class: className = '',
    onclick,
    children
  }: Props = $props();
</script>

<ExampleCard {title} {icon} {iconAlt} class="action-card {className}">
  {#if children}
    <div class="action-card__content">
      {@render children()}
    </div>
  {:else if description}
    <p class="action-card__description" class:action-card__description--clamp={descriptionClamp}>
      {description}
    </p>
  {/if}

  {#if ctaHref}
    <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
  {:else}
    <CtaButton {onclick}>{ctaLabel}</CtaButton>
  {/if}
</ExampleCard>

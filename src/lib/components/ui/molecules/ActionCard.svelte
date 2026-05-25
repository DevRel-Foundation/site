<script lang="ts">
  import CtaButton from '$lib/components/ui/primitives/CtaButton.svelte';
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

<article class="action-card {className}">
  {#if icon}
    <div class="action-card__header">
      <img src={icon} alt={iconAlt} class="action-card__icon" />
      <h3>{title}</h3>
    </div>
  {:else}
    <h3>{title}</h3>
  {/if}

  {#if children}
    <div class="action-card__body">
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
</article>

<style>
  .action-card {
    border: 1px solid var(--color-background-secondary-2);
    border-radius: 8px;
    padding: var(--space-m);
    background-color: var(--color-background-secondary-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .action-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .action-card__header {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin-bottom: var(--space-s);
  }

  .action-card > h3 {
    margin: 0 0 var(--space-s) 0;
    color: var(--color-text);
  }

  .action-card__header h3 {
    margin: 0;
    color: var(--color-text);
  }

  .action-card__icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    filter: var(--icon-filter);
  }

  .action-card__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    flex-grow: 1;
  }

  .action-card__body :global(p) {
    margin: 0;
    font-size: var(--step-0);
    color: var(--color-text);
    line-height: 1.5;
  }

  .action-card__body :global(p.action-card__question) {
    font-weight: 900;
  }

  .action-card__description {
    font-size: var(--step-0);
    color: var(--color-text);
    margin: 0;
    line-height: 1.5;
    flex-grow: 1;
  }

  .action-card__description--clamp {
    height: calc(4 * 1.5em);
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .action-card :global(.cta-button) {
    margin-top: var(--space-m);
  }
</style>

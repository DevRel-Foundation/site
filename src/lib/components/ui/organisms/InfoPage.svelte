<script lang="ts">
  import type { Snippet } from 'svelte';
  import Badge from '$lib/components/ui/molecules/Badge.svelte';

  type Breadcrumb = string | { label: string; link?: string };

  interface Props {
    title?: string;
    description?: string;
    breadcrumbs?: string | Breadcrumb[];
    wide?: boolean;
    children?: Snippet;
  }

  let {
    title = '',
    description = '',
    breadcrumbs = [],
    wide = false,
    children,
  }: Props = $props();

  type NormalizedBreadcrumb = { label: string; link?: string };

  const breadcrumbItems = $derived.by((): NormalizedBreadcrumb[] => {
    if (typeof breadcrumbs === 'string') {
      return breadcrumbs.split(',').map((label) => ({ label: label.trim() }));
    }

    return breadcrumbs.map((badge) =>
      typeof badge === 'string'
        ? { label: badge }
        : { label: badge.label, link: badge.link }
    );
  });
</script>

<svelte:head>
  <title>{title} | DevRel Foundation</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="container {wide ? 'container-content-wide' : ''}">
  {#each breadcrumbItems as badge (badge.label + (badge.link ?? ''))}
    <Badge label={badge.label} link={badge.link ?? ''} />
  {/each}
  <section>
    <h1 class="info-title">{title}</h1>

    {@render children?.()}
  </section>
</div>

<style>
  .info-title {
    margin-top: var(--space-s);
    margin-bottom: var(--space-l);
  }
</style>

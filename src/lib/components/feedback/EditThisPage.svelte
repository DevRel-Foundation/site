<script lang="ts">
  import { page } from '$app/stores';
  import EditIcon from 'iconoir/icons/edit-pencil.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';

  interface Props {
    variant?: 'footer' | 'standalone';
  }

  let { variant = 'standalone' }: Props = $props();

  const currentPath = $derived($page.route?.id || '');
  const GITHUB_EDIT_BASE = 'https://github.com/DevRel-Foundation/site/edit/main/src/routes';
  const GITHUB_ISSUES_BASE = 'https://github.com/DevRel-Foundation/site/issues/new';

  const filePath = $derived(currentPath === '/' ? '/+page.svelte' : `${currentPath}/+page.svelte`);
  const editUrl = $derived(`${GITHUB_EDIT_BASE}${filePath}`);

  const issueTitle = $derived(`Feedback: ${currentPath || '/'}`);
  const issueBody = $derived(`**Page:** ${$page.url.href}%0A%0A**Feedback:**%0A%0A**Suggested improvement:**%0A`);
  const issueUrl = $derived(`${GITHUB_ISSUES_BASE}?title=${encodeURIComponent(issueTitle)}&body=${issueBody}`);
</script>

<div class="edit-page" class:edit-page--footer={variant === 'footer'}>
  <a href={editUrl} target="_blank" rel="noopener noreferrer" class="edit-link">
    <img src={EditIcon} alt="" class="icon" />
    Edit this page
  </a>
  {#if variant === 'standalone'}
    <span class="separator" aria-hidden="true">|</span>
  {/if}
  <a href={issueUrl} target="_blank" rel="noopener noreferrer" class="edit-link">
    <img src={GitHubIcon} alt="" class="icon" />
    Report issue
  </a>
</div>

<style>
  .edit-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-s);
    border-top: 1px solid var(--color-background-secondary-2);
    margin-top: 0;
    padding-top: var(--space-s);
    padding-bottom: var(--space-s);
  }

  .edit-page--footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2xs);
    border-top: none;
    margin-top: var(--space-s);
    padding: 0;
  }

  .edit-link {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    color: var(--color-link);
    text-decoration: none;
    font-size: var(--step--1);
    transition: opacity 0.2s ease;
  }

  .edit-page:not(.edit-page--footer) .edit-link {
    color: var(--color-text-secondary);
  }

  .edit-link:hover {
    opacity: 0.8;
  }

  .edit-page:not(.edit-page--footer) .edit-link:hover {
    color: var(--color-link);
  }

  .icon {
    width: 1rem;
    height: 1rem;
    filter: var(--icon-filter);
    opacity: 0.7;
  }

  .separator {
    color: var(--color-text-secondary);
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .edit-page:not(.edit-page--footer) {
      flex-direction: column;
      gap: var(--space-xs);
    }

    .edit-page:not(.edit-page--footer) .separator {
      display: none;
    }
  }
</style>

<script lang="ts">
  import { page } from '$app/stores';
  import EditIcon from 'iconoir/icons/edit-pencil.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  
  const GITHUB_REPO = 'https://github.com/DevRel-Foundation/site';
  const GITHUB_EDIT_BASE = 'https://github.com/DevRel-Foundation/site/edit/main/src/routes';
  const GITHUB_ISSUES_BASE = 'https://github.com/DevRel-Foundation/site/issues/new';
  
  // Get the current route and construct the file path
  $: currentPath = $page.route?.id || '';
  $: filePath = currentPath === '/' ? '/+page.svelte' : `${currentPath}/+page.svelte`;
  $: editUrl = `${GITHUB_EDIT_BASE}${filePath}`;
  
  // Create issue URL with pre-filled template
  $: issueTitle = `Feedback: ${currentPath || '/'}`;
  $: issueBody = `**Page:** ${$page.url.href}%0A%0A**Feedback:**%0A%0A**Suggested improvement:**%0A`;
  $: issueUrl = `${GITHUB_ISSUES_BASE}?title=${encodeURIComponent(issueTitle)}&body=${issueBody}`;
</script>

<div class="edit-page-container">
  <div class="edit-page-content">
    <div class="edit-links">
      <a href={editUrl} target="_blank" rel="noopener noreferrer" class="edit-link">
        <img src={EditIcon} alt="Edit" class="icon" />
        Edit this page
      </a>
      <span class="separator">|</span>
      <a href={issueUrl} target="_blank" rel="noopener noreferrer" class="edit-link">
        <img src={GitHubIcon} alt="GitHub" class="icon" />
        Report issue
      </a>
    </div>
  </div>
</div>

<style>
  .edit-page-container {
    border-top: 1px solid var(--color-background-secondary-2);
    margin-top: var(--space-xl);
    padding-top: var(--space-s);
    padding-bottom: var(--space-s);
  }
  
  .edit-page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    text-align: center;
  }
  
  .edit-links {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }
  
  .edit-link {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--step--1);
    transition: color 0.2s ease;
  }
  
  .edit-link:hover {
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
  
  .edit-meta {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .edit-meta a {
    color: var(--color-link);
    text-decoration: none;
  }
  
  .edit-meta a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .edit-links {
      flex-direction: column;
      gap: var(--space-xs);
    }
    
    .separator {
      display: none;
    }
  }
</style>

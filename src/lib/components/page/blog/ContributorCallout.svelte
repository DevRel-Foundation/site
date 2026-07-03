<div class="contributor-callout">
    <a href="https://github.com/DevRel-Foundation/site/blob/main/CONTRIBUTING.md" target="_blank" class="contribute-button">Contribute to the blog</a>
</div>

<style>
  .contributor-callout {
    background-color: var(--color-background-secondary-1);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    padding: var(--space-l);
    margin: var(--space-m) auto var(--space-m) auto;
    max-width: 1400px;
    text-align: center;
  }

  :global(body.dark-mode) .contributor-callout,
  :global(html.dark-mode) .contributor-callout {
    background-color: var(--color-background-secondary-2);
    border-color: var(--color-background-secondary-2);
  }
  
  .contribute-button {
    display: inline-block;
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-light-cream);
    padding: var(--space-s) var(--space-l);
    border-radius: var(--radius-pill);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step-0);
    transition: background-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
    opacity: 1;
  }
  
  .contribute-button:hover {
    background-color: color-mix(in srgb, var(--color-background-secondary-2-dark) 85%, var(--color-logo-text-dark) 15%);
    transform: translateY(-1px);
    opacity: 1;
  }

  :global(body.dark-mode) .contribute-button,
  :global(html.dark-mode) .contribute-button {
    background-color: var(--color-mint);
    color: var(--color-forest);
  }

  :global(body.dark-mode) .contribute-button:hover,
  :global(html.dark-mode) .contribute-button:hover {
    background-color: color-mix(in srgb, var(--color-mint) 90%, white 10%);
    color: var(--color-forest);
    opacity: 1;
  }
</style>

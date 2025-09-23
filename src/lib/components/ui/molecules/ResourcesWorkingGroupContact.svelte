<script>
  import DiscordIcon from '$lib/components/ui/molecules/icons/DiscordIcon.svelte';
  import MailIcon from '$lib/components/ui/molecules/icons/MailIcon.svelte';
  import GitHubIcon from '$lib/components/ui/molecules/icons/GitHubIcon.svelte';
</script>

<div class="contact-box">
  <p><strong>Resources Working Group</strong></p>
  <p>
      <GitHubIcon label="wg-resource-aggregation" href="http://github.com/devrel-foundation/wg-resource-aggregation"/>
  </p>
  <p>
      <DiscordIcon label="#resources-wg"/>
  </p>
  <p>
      <MailIcon label="wg-resource-aggregation@lists.dev-rel.org" href="mailto:wg-resource-aggregation@lists.dev-rel.org"/>
  </p>
</div>

<style>
.contact-box {
  background: var(--color-background-secondary-2-dark);
  color: var(--color-text-dark, #FAFAF0);
  border-radius: var(--radius-l, 1rem);
  --icon-filter: invert(1);
  padding: var(--space-s, 1rem);
  display: inline-block;
  min-width: 220px;
  max-width: 320px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  font-size: var(--step--1, 0.95rem);
  transition: background 0.2s;
}

.contact-box,
.contact-box * {
  color: var(--color-text-dark, #FAFAF0) !important;
  text-decoration-color: var(--color-text-dark, #FAFAF0);
}

.contact-box p {
  margin: var(--space-xs, 0.25rem) 0;
  font-size: var(--step--2, 0.85rem);
  display: flex;
  align-items: center;
}

.contact-box :global(.social-icon) {
  margin-right: var(--space-xs, 0.25rem);
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
}
</style>
<script>
    export let label = 'badge';
    export let link = '';
    
</script>

<div class="badge">{#if link}<a href={link} class="badge-link">{label}</a>{:else}{label}{/if}</div>

<style>
.badge {
  display: inline-block;
  background: var(--color-background-secondary-2-dark, #111); /* dark circle */
  padding: 0.25rem 0.5rem; /* tight pill */
  color: var(--color-text-dark, #FAFAF0);
  font-size: var(--step--1);
  font-weight: 600;
  margin-bottom: var(--space-xs);
  margin-top: var(--space-l);
  line-height: 1;
  border-radius: 999px;
  text-transform: none;
  white-space: nowrap;
  vertical-align: middle;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  border: 1px solid var(--color-mint-dark);
  cursor: default;
}

.badge-link {
  color: var(--color-text-dark, #FAFAF0) !important;
  text-decoration: none;
  cursor: pointer;
}
</style>
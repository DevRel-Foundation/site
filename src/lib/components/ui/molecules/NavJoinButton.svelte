<script lang="ts">
  export let href = '/join';
  export let label = 'Join';
  export let type: 'button' | 'reset' | 'submit' = 'button';
</script>

{#if href}
  <a class="cta" href={href} rel="noopener noreferrer">
    <slot>{label}</slot>
  </a>
{:else}
  <button class="cta" type={type}>
    <slot>{label}</slot>
  </button>
{/if}

<style>
.cta {
  background-color: var(--color-mint);
  color: var(--color-forest);
  padding: var(--space-xs) var(--space-m);
  text-decoration: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  white-space: nowrap;
  transition: background-color var(--transition-fast);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cta:hover {
  background-color: color-mix(in srgb, var(--color-mint), black 10%);
}
</style>
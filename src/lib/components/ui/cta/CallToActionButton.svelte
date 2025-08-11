<script>
  // This component renders a call-to-action button and will not change even in dark mode
  export let href = '/join';
  export let label = 'Join';
  export let type = 'button';
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
  color: var(--color-mint-dark);
  padding: var(--space-xs) var(--space-s);
  text-decoration: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cta:hover {
  background-color: color-mix(in srgb, var(--color-mint), black 10%);
}
</style>
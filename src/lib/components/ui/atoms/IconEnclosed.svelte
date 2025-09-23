<script>
  export let alt = '';
  export let label = '';
  export let href = '';
  export let icon = '';
</script>

{#if href}
  <a href={href} class="social-link">
      <span class="icon-wrap big" aria-hidden="true">
        <img src={icon} alt={alt} class="social-icon-inner" />
      </span>
    {label}
  </a>
{:else}
    <span class="icon-wrap big" aria-hidden="true">
      <img src={icon} alt={alt} class="social-icon-inner" /> 
    </span>
    {label}
{/if}

<style>
  /* wrapper for large icon */
  .icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--color-background-secondary-2-dark, #111); /* dark circle */
    color: inherit; /* ensure icon inherits text color if using inline SVG */
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    cursor: pointer;
  }

  .icon-wrap a {
    text-decoration: none;
  }

  /* sizing for big variant (adjust via --icon-big-size) */
  .icon-wrap.big {
    width: var(--icon-big-size, 4rem);
    height: var(--icon-big-size, 4rem);
    margin-top: var(--space-xs);
    --icon-filter: invert(1);
  }

  /* inner image sizing and filter inheritance */
  .social-icon-inner {
    width: 60%;
    height: 60%;
    filter: var(--icon-filter);
    display: block;
    object-fit: contain;
  }

  /* hover/active effects: raise + glow */
  .icon-wrap.big:hover,
  .icon-wrap.big:focus {
    transform: translateY(-6px) scale(1.03);
    box-shadow:
      0 18px 40px rgba(0,0,0,0.28),
      0 0 18px rgba(96,255,200,0.14); /* subtle glow tint */
    outline: none;
  }

  /* ensure regular link styles */
  .social-link {
    color: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
  }

  .social-link:hover {
    text-decoration: underline;
  }
</style>
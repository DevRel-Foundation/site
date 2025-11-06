<script lang="ts">
  // Use callback props instead of createEventDispatcher
  export let onAccept: () => void = () => {};
  export let onReject: () => void = () => {};
</script>

<div id="cookie-consent-banner" class="cookie-banner" role="region" aria-label="Cookie consent">
  <div class="cookie-inner">
    <div class="cookie-message">
      <p>
        We use cookies and analytics to improve the user experience and set priorities based on usage. Your privacy is important to us.
        <a href="/privacy">Learn more</a>
      </p>
    </div>
    <div class="cookie-actions">
      <button on:click={onAccept} class="btn-accept">Accept All</button>
      <button on:click={onReject} class="btn-reject">Reject</button>
    </div>
  </div>
</div>

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,36,46,0.95);
    color: white;
    padding: 1rem;
    z-index: 10000;
    border-top: 2px solid var(--color-mint-dark, #79bf44);
    backdrop-filter: blur(10px);
  }

  .cookie-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cookie-message {
    flex: 1;
    min-width: 300px;
  }

  .cookie-message p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .cookie-message a {
    color: var(--color-mint, #79bf44);
    text-decoration: underline;
  }

  .cookie-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .btn-accept {
    background: var(--color-mint-dark, #79bf44);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
  }

  .btn-reject {
    background: transparent;
    color: white;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
  }
</style>

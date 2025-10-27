<script lang="ts">
  import SearchIcon from "../molecules/icons/Search.svelte";


  export let value: string = '';
  export let placeholder: string = 'Search...';
  export let onInput: (value: string) => void = () => {};
  export let onClear: () => void = () => {};
  export let id: string = 'search-input';

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    onInput(value);
  }

  function clearInput() {
    value = '';
    onInput('');
    onClear();
  }
</script>

<div class="search-input">
  <div class="search-wrapper">
    <input
      {id}
      type="text"
      {placeholder}
      {value}
      on:input={handleInput}
      class="search-field"
    />
    <SearchIcon />
    {#if value}
      <button
        type="button"
        class="clear-button"
        on:click={clearInput}
        aria-label="Clear search"
      >
        ✕
      </button>
    {/if}
  </div>
</div>

<style>
  .search-input {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin-bottom: var(--space-m);
  }

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--color-background-secondary-1);
    border: 1px solid var(--color-logo-text, #145C36);
    border-radius: var(--radius-m);
    padding: var(--space-xs) var(--space-m);
    transition: border-color 0.2s;
  }

  .search-wrapper:focus-within {
    outline: 2px solid var(--color-mint);
    border-color: var(--color-mint);
  }

  .search-field {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-size: var(--step-0);
    color: var(--color-text);
    font-family: var(--font-sans, inherit);
  }

  .search-field::placeholder {
    color: var(--color-text-muted);
  }

  .clear-button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-logo-text, #145C36);
    font-weight: bold;
    font-size: 1.1em;
    padding: 2px;
    border-radius: 3px;
    transition: background-color 0.15s, color 0.15s;
    margin-left: var(--space-xs);
  }

  .clear-button:hover {
    background-color: var(--color-background-secondary-2);
    color: var(--color-mint);
  }
</style>
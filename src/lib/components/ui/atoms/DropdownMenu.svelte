<script lang="ts">
  export let options: { label: string; value: string }[] = [];
  export let selected: string | null = null;
  export let placeholder = "Select…";
  export let onSelect: (value: string) => void = () => {};

  let open = false;

  function selectOption(option) {
    onSelect(option.value);
    open = false;
  }

  function clearSelection(event) {
    event.stopPropagation(); // Prevent dropdown from opening
    onSelect(''); // Clear the selection
  }
</script>

<div class="dropdown" tabIndex={0} on:blur={() => open = false}>
  <button
    class="dropdown-trigger"
    type="button"
    aria-haspopup="listbox"
    aria-expanded={open}
    on:click={() => open = !open
    }
  >
    {selected
      ? options.find(o => o.value === selected)?.label
      : placeholder}
    {#if selected}
      <span class="dropdown-clear" on:click={clearSelection} aria-label="Clear selection">✕</span>
    {:else}
      <span class="dropdown-arrow">▼</span>
    {/if}
  </button>
  {#if open}
    <ul class="dropdown-list" role="listbox">
      {#each options as option}
        <li
          class="dropdown-item"
          role="option"
          aria-selected={selected?.toLowerCase() === option.value.toLowerCase()}
          on:click={() => selectOption(option)}
        >
          {option.label}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
.dropdown {
  position: relative;
  display: inline-block;
  min-width: 200px;
  font-family: var(--font-sans, inherit);
}
.dropdown-trigger {
  width: 100%;
  background: var(--color-background-secondary-1);
  color: var(--color-text);
  border: 1px solid var(--color-logo-text, #145C36);
  border-radius: var(--radius-m);
  padding: var(--space-xs) var(--space-m);
  font-size: var(--step-0);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.2s;
}
.dropdown-trigger:focus {
  outline: 2px solid var(--color-mint);
  border-color: var(--color-mint);
}
.dropdown-arrow {
  margin-left: var(--space-xs);
  font-size: 0.9em;
}

.dropdown-clear {
  margin-left: var(--space-xs);
  font-size: 1.1em;
  cursor: pointer;
  color: var(--color-logo-text, #145C36);
  font-weight: bold;
  padding: 2px;
  border-radius: 3px;
  transition: background-color 0.15s, color 0.15s;
}

.dropdown-clear:hover {
  background-color: var(--color-background-secondary-2);
  color: var(--color-mint);
}
.dropdown-list {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  margin-top: var(--space-2xs);
  background: var(--color-background-secondary-1);
  border: 0.5px solid var(--color-background-secondary-2);
  border-radius: var(--radius-m);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  padding: 0;
  list-style: none;
  max-height: 420px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}
.dropdown-item {
  padding: var(--space-xs) var(--space-m);
  cursor: pointer;
  font-size: var(--step-0);
  color: var(--color-text);
  background: none;
  border-bottom: 0.5px solid var(--color-logo-text);
  padding-left: var(--space-m);
  padding-right: var(--space-m);
  text-align: left;
  transition: background 0.15s;
}

.dropdown-item[aria-selected=\"true\"],
.dropdown-item:hover {
  background: var(--color-background-secondary-2);
  color: var(--color-button-background);
}


</style>
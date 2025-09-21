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
</script>

<div class="dropdown" tabIndex={0} on:blur={() => open = false}>
  <button
    class="dropdown-trigger"
    type="button"
    aria-haspopup="listbox"
    aria-expanded={open}
    on:click={() => open = !open}
  >
    {selected
      ? options.find(o => o.value === selected)?.label
      : placeholder}
    <span class="dropdown-arrow">▼</span>
  </button>
  {#if open}
    <ul class="dropdown-list" role="listbox">
      {#each options as option}
        <li
          class="dropdown-item"
          role="option"
          aria-selected={selected === option.value}
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
  min-width: 180px;
  font-family: var(--font-sans, inherit);
}
.dropdown-trigger {
  width: 100%;
  background: var(--color-background-secondary-1);
  color: var(--color-text);
  border: 1.5px solid var(--color-background-secondary-2);
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
.dropdown-list {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  margin-top: var(--space-2xs);
  background: var(--color-background-secondary-1);
  border: 1.5px solid var(--color-background-secondary-2);
  border-radius: var(--radius-m);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  padding: 0;
  list-style: none;
  max-height: 240px;
  overflow-y: auto;
}
.dropdown-item {
  padding: var(--space-xs) var(--space-m);
  cursor: pointer;
  font-size: var(--step-0);
  color: var(--color-text);
  background: none;
  border: none;
  text-align: left;
  transition: background 0.15s;
}
.dropdown-item[aria-selected=\"true\"],
.dropdown-item:hover {
  background: var(--color-background-secondary-2);
  color: var(--color-mint-dark);
}
</style>
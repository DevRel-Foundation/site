<script lang="ts">
  import { Select } from 'bits-ui';
  import { fly } from 'svelte/transition';
  import { flyPreset } from '$lib/motion';

  interface Option {
    label: string;
    value: string;
  }

  interface Props {
    options?: Option[];
    selected?: string | null;
    placeholder?: string;
    onSelect?: (value: string) => void;
  }

  let {
    options = [],
    selected = null,
    placeholder = 'Select…',
    onSelect = () => {}
  }: Props = $props();

  const flyTransition = flyPreset('s', 'xs');

  let value = $state<string | undefined>(selected ?? undefined);

  $effect(() => {
    value = selected ?? undefined;
  });

  function handleValueChange(next: string | undefined) {
    value = next;
    onSelect(next ?? '');
  }

  function clearSelection(event: MouseEvent | KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    value = undefined;
    onSelect('');
  }
</script>

<Select.Root
  type="single"
  items={options}
  bind:value
  onValueChange={handleValueChange}
  allowDeselect
>
  <div class="dropdown">
    <Select.Trigger class="dropdown-trigger">
      <Select.Value {placeholder} />
      {#if selected}
        <span
          class="dropdown-clear"
          role="button"
          tabindex="0"
          aria-label="Clear selection"
          onclick={clearSelection}
          onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && clearSelection(e)}
        >✕</span>
      {:else}
        <span class="dropdown-arrow" aria-hidden="true">▼</span>
      {/if}
    </Select.Trigger>

    <Select.Portal>
      <Select.Content sideOffset={8} class="dropdown-content-root" forceMount>
        {#snippet child({ wrapperProps, props, open })}
          {#if open}
            <div {...wrapperProps}>
              <div {...props} class="dropdown-list" transition:fly={flyTransition}>
                <Select.Viewport>
                  {#each options as option (option.value)}
                    <Select.Item
                      value={option.value}
                      label={option.label}
                      class="dropdown-item"
                    >
                      {#snippet children({ selected: isSelected })}
                        <span class="dropdown-item-label">{option.label}</span>
                        {#if isSelected}
                          <span class="dropdown-item-check" aria-hidden="true">✓</span>
                        {/if}
                      {/snippet}
                    </Select.Item>
                  {/each}
                </Select.Viewport>
              </div>
            </div>
          {/if}
        {/snippet}
      </Select.Content>
    </Select.Portal>
  </div>
</Select.Root>

<style>
  .dropdown {
    position: relative;
    display: block;
    width: 100%;
    min-width: 0;
    font-family: var(--font-main);
  }

  :global(.dropdown-trigger) {
    width: 100%;
    background: var(--color-background-secondary-1);
    color: var(--color-text);
    border: var(--border-thickness) solid var(--color-logo-text);
    border-radius: var(--radius-m);
    padding: var(--space-xs) var(--space-m);
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    transition:
      border-color var(--transition-fast),
      background-color var(--transition-fast);
    font-family: inherit;
    font-size: inherit;
  }

  :global(.dropdown-trigger:focus-visible) {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
    border-color: var(--color-mint);
  }

  .dropdown-arrow {
    font-size: 0.9em;
    flex-shrink: 0;
  }

  .dropdown-clear {
    font-size: 1.1em;
    cursor: pointer;
    color: var(--color-logo-text);
    font-weight: bold;
    padding: 2px;
    border-radius: var(--radius-xs);
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast);
    flex-shrink: 0;
  }

  .dropdown-clear:hover {
    background-color: var(--color-background-secondary-2);
    color: var(--color-mint);
  }

  :global(.dropdown-content-root) {
    z-index: var(--z-dropdown);
    outline: none;
  }

  :global(.dropdown-list) {
    background: var(--color-background-secondary-1);
    border: var(--border-thickness) solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    box-shadow: var(--shadow-m);
    padding: 0;
    list-style: none;
    max-height: 26rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    width: var(--bits-select-anchor-width);
    min-width: var(--bits-select-anchor-width);
  }

  :global(.dropdown-item) {
    padding: var(--space-xs) var(--space-m);
    cursor: pointer;
    color: var(--color-text);
    border-bottom: var(--border-thickness) solid var(--color-logo-text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    text-align: left;
    transition: background-color var(--transition-fast);
    outline: none;
  }

  :global(.dropdown-item:last-child) {
    border-bottom: none;
  }

  :global(.dropdown-item[data-highlighted]) {
    background: var(--color-background-secondary-2);
    color: var(--color-button-background);
  }

  :global(.dropdown-item[data-state='checked']) {
    background: var(--color-background-secondary-2);
    color: var(--color-button-background);
  }

  .dropdown-item-check {
    color: var(--color-mint-dark);
    font-weight: 700;
  }
</style>

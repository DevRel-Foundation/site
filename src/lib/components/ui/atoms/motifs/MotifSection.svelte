<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className = '' }: Props = $props();
</script>

<!-- Stacking rules live in app.css (.motif-section) -->
<div class="motif-section {className}">
  {@render children()}
</div>

<script>
    export let label = 'badge';
    
</script>

<div class="badge">{label}</div>

<style>
/* Badge — add to global or component styles */
.badge {
  display: inline-block;
  background: var(--color-background-secondary-2-dark, #111); /* dark circle */
  padding: 0.25rem 0.5rem; /* tight pill */
  color: var(--color-text-dark);
  font-size: var(--step--2, 0.78rem);
  font-weight: 600;
  line-height: 1;
  border-radius: 999px;
  text-transform: none;
  white-space: nowrap;
  vertical-align: middle;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  border: 1px solid transparent;
  cursor: default;
}
</style>
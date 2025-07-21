<script lang="ts">
  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/Nav.svelte';
  import Footer from '$lib/Footer.svelte';
  import EditThisPage from '$lib/EditThisPage.svelte';
</script>

<Nav />

<main class="main">
  <slot />
  <EditThisPage />
</main>

<Footer />
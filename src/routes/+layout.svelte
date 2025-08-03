<script lang="ts">
  import '../reset.css';
  import '../app.css';
  import Nav from '$lib/components/nav/Nav.svelte';
  import Footer from '$lib/components/nav/Footer.svelte';
  import EditThisPage from '$lib/components/feedback/EditThisPage.svelte';
</script>

<Nav />

<main class="main">
  <slot />
</main>

<Footer />
<EditThisPage />
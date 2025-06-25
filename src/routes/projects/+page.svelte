<script>

</script>

<svelte:head>
	<title>Projects | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="project-section">
		<h1 id="about">Projects</h1>
		<p>
            <strong>Projects are the output of Developer Relations Foundation working group initiatives.</strong> 

            They are collaborative efforts that bring together professionals from various backgrounds and companies to create resources, tools, and standard frameworks to enhance the practices of developer relations. 
		</p>
	</section>
</div>

<style>
  .container {
    margin-bottom: var(--space-l);
  }

	.team-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-l);
	}

	@media (min-width: 769px) {
		.team-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1025px) {
		.team-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>

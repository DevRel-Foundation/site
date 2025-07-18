<script>
  const endorsers = [
    "Jayson DeLancey",
    "Wesley Faulkner",
    "Tessa Kriesel",
    "Stacey Kruczek",
    "Jonathan LeBlanc",
    "Phil Leggetter",
    "Caroline Lewko",
    "Katie Miller"
  ];

  // Sort names alphabetically by last name
  const sortedEndorsers = endorsers.sort((a, b) => {
    const lastNameA = a.split(' ').pop();
    const lastNameB = b.split(' ').pop();
    return lastNameA.localeCompare(lastNameB);
  });

  // Split into 3 columns
  const columns = [[], [], []];
  sortedEndorsers.forEach((name, index) => {
    columns[index % 3].push(name);
  });
</script>

<svelte:head>
	<title>What is Developer Relations | About | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="section">
		<h1>What is Developer Relations?</h1>

		<p>
			<strong>Developer Relations</strong> is the practice of building and nurturing relationships with external and internal teams through community engagement, technical support, education, and advocacy to enable the successful adoption of an organization’s products.
		</p>

		<div class="section-divider"></div>

		<h2 class="term">Advocacy</h2>

		<h2 class="term">Community Engagement</h2>

		<h2 class="term">Education</h2>

		<h2 class="term">Technical Support</h2>


		<div class="section-divider"></div>


		<p>
			This definition is a synthesis of the collective knowledge and experience of the Developer Relations community. 
			
			It is endorsed by a growing list of professionals in the field.
		</p>

		<div class="endorsements-grid">
			{#each columns as column}
				<div class="endorsement-column">
					{#each column as name}
						<div class="endorsement-item">{name}</div>
					{/each}
				</div>
			{/each}
		</div>



	</section>

</div>

<style>
  .container {
    margin-bottom: var(--space-l);
  }

  p {
	font-size: var(--step-0);
	margin-bottom: var(--space-s);
  }

  .term {
    text-align: center;
  }

  .endorsements-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-s);
    margin-top: var(--space-s);
  }

  .endorsement-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-4xs);
  }

  .endorsement-item {
    text-align: center;
    font-size: var(--step-0);
    color: var(--color-text);
    padding: var(--space-4xs) 0;
  }

	.section-divider {
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--color-mint), transparent);
		margin: var(--space-s) var(--space-xs);
		border-radius: var(--radius-s);
	}

  @media (max-width: 768px) {
    .endorsements-grid {
      grid-template-columns: 1fr;
    }
  }

</style>

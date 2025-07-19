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

    <div class="pillars-grid">
      <div class="pillar-circle">Advocacy</div>
      <div class="pillar-circle">Community Engagement</div>
      <div class="pillar-circle">Education</div>
      <div class="pillar-circle">Technical Support</div>
    </div>

    <div class="section-divider"></div>

		<p>
			This definition is a synthesis of the collective knowledge and experience of the Developer Relations community. This definition is intended to be a living document,
      and we welcome contributions to future versions of the definition as the practice of DevRel evolves.
		</p>

    <p>
      The DRF DevRel definition is endorsed by a growing list of professionals in the field. Please contact our <a href="mailto:steering-committee@dev-rel.org">Steering Committee</a> to become and endorser and added to this list.
    </p>

    <div class="section-divider"></div>

		<div class="endorsements-grid">
			{#each columns as column}
				<div class="endorsement-column">
					{#each column as name}
						<div class="endorsement-item">{name}</div>
					{/each}
				</div>
			{/each}
		</div>

    <div class="contribute-button-container">
      <a href="https://github.com/DevRel-Foundation/site" target="_blank" class="contribute-button">
        Contribute to the definition →
      </a>
    </div>
  </section>

</div>

<style>
  .container {
    margin-bottom: var(--space-l);
  }

  .contribute-button-container {
    margin-top: var(--space-m);
    text-align: center;
  }

  .contribute-button {
    display: inline-block;
    background-color: var(--color-background-secondary-1);
    color: var(--color-link);
    padding: var(--space-xs) var(--space-m);
    border-radius: var(--radius-s);
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;
    border: 1px solid var(--color-link);
  }

  .contribute-button:hover {
    background-color: var(--color-link);
    color: var(--color-background);
  }

  p {
	font-size: var(--step-0);
	margin-bottom: var(--space-s);
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--space-m);
    margin-top: var(--space-m);
    margin-bottom: var(--space-m);
    justify-items: center;
  }

  .pillar-circle {
    background-color: var(--color-background-secondary-1);
    border: 2px solid var(--color-mint);
    color: var(--color-text);
    border-radius: 50%;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    padding: var(--space-xs);
    font-size: var(--step--1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
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
		margin: var(--space-m) var(--space-s);
	}

  @media (max-width: 768px) {
    .endorsements-grid {
      grid-template-columns: 1fr;
    }
  }

</style>

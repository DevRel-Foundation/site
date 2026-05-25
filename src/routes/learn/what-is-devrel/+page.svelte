<svelte:head>
	<title>What is Developer Relations | About | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="section">
		<h1>What is Developer Relations?</h1>

		<p>
			<strong>Developer Relations</strong> is the practice of building and nurturing relationships with external and internal teams through community engagement, technical support, education, and advocacy to enable the successful adoption of an organization’s developer products and drive business value.
		</p>


    <div class="u-grid u-grid-auto-fit-sm pillars-grid">
      <div class="pillar-circle">Advocacy</div>
      <div class="pillar-circle">Community Engagement</div>
      <div class="pillar-circle">Education</div>
      <div class="pillar-circle">Technical Support</div>
    </div>




	<p>
		Definitions on this page are a synthesis of the collective knowledge and experiences of the Developer Relations community.
	</p>

    <div class="section-divider"></div>

    <div class="contribute-button-container">
      <a href="/join-us" class="contribute-button">
        Contribute to or endorse these definitions →
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
    margin-block: var(--space-m);
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
    transition: all 0.3s ease;
    cursor: default;
  }

  .pillar-circle:hover {
    box-shadow: 0 0 20px rgba(115, 207, 181, 0.6), 0 12px 30px rgba(0, 0, 0, 0.3);
    border-color: var(--color-mint-dark);
    transform: translateY(-6px);
  }


</style>

<script>
</script>

<svelte:head>
	<title>Mission | About | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="mission-section">
		<h1 id="about">Developer Relations Foundation</h1>

		<h2>Mission</h2>
		<p>
			To elevate the professional practice of developer relations and increase awareness of it as a driver of business value.
		</p>

	</section>
</div>

<section class="devrel-callout">
	<div class="callout-content">
		<h2>DevRel: Accelerating Technology Adoption</h2>
		<p>
			Developer Relations (DevRel) is the practice of building and nurturing relationships with external and internal teams through community engagement, technical support, education, and advocacy to enable the successful adoption of an organization’s developer products and drive business value.
		</p>
		<a href="/learn/what-is-devrel" class="callout-cta">Learn About Developer Relations →</a>
	</div>
</section>

<div class="container container-content">
	<section class="mission-section">
		<h2>Vision</h2>

		<p>
			Our vision is to establish the DevRel Foundation (DRF) as a credible, central force in advancing the practices of Developer Relations, elevating its value to businesses and organizations. We aim to elevate foundational standards and foster a vibrant, accessible community that actively shapes and grows the discipline.
		</p>

		<p>
			To bring this vision to life, the DRF will serve as a formally established entity that anchors the community's collective efforts. We will provide a centralized, open-access hub for high-quality materials, frameworks, and guidance, sourced from proven individual contributions and driven by focused innovation.
		</p>

		<p>
			To support the mission, we plan to collaboratively develop assets, including definitions, frameworks, and the creation and codification of other artifacts that aid the success of Developer Relations practitioners around the world. 
		</p>

		<p>This includes activities like:</p>

		<ul class="list">
			<li class="list-item">
				Recommending an organizational structure and roles for new Developer Relations programs.

			</li>
			<li class="list-item">
				Helping provide career support resources for job seekers, hiring team guidance, interview plans, and managing continued professional growth.
			</li>
			<li class="list-item">
				Defining practices and programs with common terminology, metrics, playbooks, and reporting systems for tracking results.
			</li>
			<li class="list-item">
				Resources and tools for community management when building engagement, including playbooks, templates, and guides.
			</li>
		</ul>

		<p>and much more.</p>

		<h2>Governance</h2>

		<p>
			The DevRel Foundation's Steering Committee oversees the Foundation's activities according to its Charter. The work is organized into <a href="/about/working-groups">Working Groups</a> that focus on sourcing and innovating on best practices in Developer Relations through peer-reviewed resources and materials.
		</p>

		<p>
		<strong>Learn more by reviewing:</strong> <a href="https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter.adoc" target="_blank" class="link">Our Charter</a>
		</p>



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

  .list {
	list-style-type: disc;
	margin-left: 1.5rem;
	margin-bottom: var(--space-xs);
	font-size: var(--step-0);
	line-height: 1.6;
	color: var(--color-text);
  }

 .list-item {
	margin-bottom: var(--space-xs);
 }

  .devrel-callout {
	background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
					  url('/images/headway-F2KRf_QfCqw-unsplash.jpg');
    background-size: cover;
    background-position: center 50%;
    margin: var(--space-m) 0;
    padding: var(--space-l) var(--space-s);
    color: white;
    text-align: center;
  }

  .callout-content {
    max-width: var(--grid-max-width);
    margin: 0 auto;
  }

  .callout-content h2 {
    font-size: var(--step-3);
    margin-top: 0;
    margin-bottom: var(--space-m);
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .callout-content p {
    font-size: var(--step-0);
    line-height: 1.6;
    max-width: 60ch;
    margin: 0 auto var(--space-l);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .callout-cta {
    display: inline-block;
    background-color: white;
    color: var(--color-text);
    padding: var(--space-s) var(--space-l);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .callout-cta:hover {
    background-color: var(--color-mint);
    color: var(--color-mint-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    .devrel-callout {
      padding: var(--space-l) var(--space-m);
    }

    .callout-content h2 {
      font-size: var(--step-2);
    }

    .callout-content p {
      font-size: var(--step--1);
    }
  }

</style>

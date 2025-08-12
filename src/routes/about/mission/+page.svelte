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

	</section>
</div>

<section class="governance-callout">
<div class="container container-content">
	<section class="mission-section">
		<h2>Governance</h2>
		<p>
			The DevRel Foundation's Steering Committee oversees the Foundation's activities according to its Charter. The work is organized into <a href="/about/working-groups" class="link">Working Groups</a> that focus on sourcing and innovating best practices in Developer Relations through peer-reviewed resources and materials.
		</p>
		<strong>Learn more by reviewing:</strong> <a href="https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter.adoc" target="_blank" class="link">Our Charter</a>
	</section>
</div>
</section>


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
    background-color: var(--color-button-background-dark);
    color: var(--color-button-text-dark);
    padding: var(--space-s) var(--space-l);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .callout-cta:hover {
    background-color: var(--color-button-background-dark);
    color: var(--color-button-text-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .governance-callout {
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(135deg, var(--color-button-background), var(--color-button-background));
    background-size: 60px 60px, 80px 80px, 40px 40px, 100% 100%;
    margin: var(--space-s) 0;
	padding: var(--space-3xs) var(--space-3xs);
    color: var(--color-text-dark);
    text-align: left;
  }

  .governance-callout .callout-content h2 {
    font-size: var(--step-2);
    margin-top: 0;
    margin-bottom: var(--space-s);
    color: white;
  }

  .governance-callout .callout-content p {
    font-size: var(--step-0);
    line-height: 1.6;
    margin-bottom: var(--space-s);
    color: white;
  }

  .governance-callout .link {
    color: var(--color-link-dark);
    text-decoration: underline;
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

    .governance-callout {
      padding: var(--space-l) var(--space-m);
    }

    .governance-callout .callout-content h2 {
      font-size: var(--step-2);
    }

    .governance-callout .callout-content p {
      font-size: var(--step--1);
    }

    .governance-links {
      flex-direction: column;
      align-items: center;
      gap: var(--space-s);
    }
  }

</style>

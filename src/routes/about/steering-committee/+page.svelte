<script>
	import BioSteeringCommittee from '$lib/components/page/bios/BioSteeringCommittee.svelte';
	import { MotifConcentricCircles } from '$lib/components/ui/atoms/motifs';
	const img_wes = '/images/steering-committee/wes_f.jpg';
	const img_ana = '/images/steering-committee/ana_j.jpg';
	const img_stacey = '/images/steering-committee/stacey_k.jpg';
	const img_jayson = '/images/steering-committee/jayson_d.jpg';
	const img_aditya = '/images/steering-committee/aditya_o.jpg';
	const img_arun = '/images/steering-committee/arun_g.png';
	const img_divya = '/images/steering-committee/divya_m.jpg';
	const img_tabs = '/images/steering-committee/tabs.jpg';
</script>

<svelte:head>
	<title>Steering Committee | About | Developer Relations Foundation</title>
</svelte:head>

<div class="motif-section steering-page">
	<MotifConcentricCircles />
	<div class="container">
	<section class="team-section">
		<h1 id="steering-committee">Steering Committee</h1>
		<p>
			The <strong>Steering Committee</strong> provides expectations, timelines, tools, and regular oversight and continuity for <a href="/about/working-groups" class="link">working groups</a> and the Developer Relations Foundation (DRF) and its initiatives.
		</p>

		<div class="u-grid u-grid-cards team-grid">
		</div>

		<h2 id="foundation-staff">Foundation staff</h2>
		<p>
			Linux Foundation Staff provide guidance and expertise to support our mission.
		</p>

		<div class="u-grid u-grid-cards team-grid">
			<BioSteeringCommittee
				name="Ana Jiménez"
				title="Project manager"
				accountabilities="
					Collaborates with Linux Foundation projects and teams while representing the DevRel Foundation. Manages
					resources, including GitHub, Netlify, PCC, etc.
					"
				bio="Ana Jiménez works as a Senior Project Manager at the Linux Foundation, supporting an open source community spread across four continents with over 3,000 practitioners. She serves as Project Manager for the TODO Group and DevRel Foundation and leads the strategy for the PyTorch Foundation Outreach Program, developing educational materials and initiatives to promote the adoption of the open source machine learning framework."
				linkedin="https://www.linkedin.com/in/ana-jimenez-santamaria/"
				github="https://github.com/anajsana"
				discord="@anajimenezsant"
				headshot={img_ana}
			/>
		</div>


	</section>
	</div>
</div>

<style>
  .steering-page {
    position: relative;
    overflow: visible;
  }

  .steering-page .container {
    margin-bottom: var(--space-m);
  }
</style>

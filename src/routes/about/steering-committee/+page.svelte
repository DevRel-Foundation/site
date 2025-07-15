<script>
	import BioSteeringCommittee from '$lib/BioSteeringCommittee.svelte';
	const img_wes = '/images/steering-committee/wes_f.jpg';
	const img_ana = '/images/steering-committee/ana_j.jpg';
	const img_jon = '/images/steering-committee/jon_l.jpg';
	const img_kat = '/images/steering-committee/katie_m.jpg';
	const img_phil = '/images/steering-committee/phil_l.jpg';
	const img_stacey = '/images/steering-committee/stacey_k.jpg';
</script>

<svelte:head>
	<title>About - Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="team-section">
		<div class="container">
			<h2 id="steering-committee">Steering Committee</h2>
			<p>
				The Steering Committee provides oversight for the entire Developer Relations Foundation
				(DRF). It is responsible for:
			</p>
			<ul>
				<li>Governance and associated documentation</li>
				<li>Management of working groups</li>
				<li>Communications and GTM operations</li>
				<li>Community building strategies and initiatives</li>
				<li>Management of all DRF resources</li>
			</ul>
		</div>

		<div class="team-grid">
			<BioSteeringCommittee
				name="Ana Jiménez"
				title="LF engagements, website, PM, advocacy"
				accountabilities="Collaborates with LF sister projects + LFX, LF teams. Assists in shaping the DRF; ensures adherence to the charter and governance guidelines. Manages GitHub repos. LF rep for DRF."
				bio="Ana Jiménez works as a Senior Project Manager at the Linux Foundation, supporting an open source community spread across four continents with over 3,000 practitioners. She serves as Project Manager for the TODO Group and DevRel Foundation and leads the strategy for the PyTorch Foundation Outreach Program, developing educational materials and initiatives to promote the adoption of the open source machine learning framework."
				linkedin="https://www.linkedin.com/in/ana-jimenez-santamaria/"
				twitter="#"
				bluesky="#"
				github="#"
				website="#"
				headshot={img_ana}
			/>

			<BioSteeringCommittee
				name="Jonathan LeBlanc"
				title="Engineering, governance, project management"
				accountabilities="Website content. Github and Tool maintenance. Updates / adjustments / creation of DRF governing docs (e.g. charter, CoC, etc). Development and maintenance of DRF project plans."
				bio="Jonathan LeBlanc is an Emmy award-winning software engineer for pioneering live streaming video services, author of O'Reilly books 'Identity and Data Security for Web Development' and 'Programming Social Applications', and former board member of the OAuth, OpenID, and OpenSocial specification groups. Currently the VP and GM of Platform at TraceLink, he spent his career architecting platform, product, and devrel organizations globally."
				linkedin="https://www.linkedin.com/in/jcleblanc/"
				twitter="#"
				bluesky="#"
				github="#"
				website="#"
				headshot={img_jon}
			/>

			<BioSteeringCommittee
				name="Katie Miller"
				title="Communications, recruitment, governance"
				accountabilities="Outbound, social media, and community comms. Managing volunteer recruitment and onboarding processes. Leverages non-profit board leadership experience to advise DRF."
				bio="Katie Miller is a Developer Marketing leader who has built and managed developer programs and marketing initiatives for Slack, Asana, and Google. While her career has taken some interesting twists and turns, at its core has been a commitment to creating a better world by empowering people through knowledge and connection. She serves in leadership roles on multiple non-profit boards and is passionate about community building and governance."
				linkedin="https://www.linkedin.com/in/kmillrunner/"
				twitter="#"
				bluesky="#"
				github="#"
				website="#"
				headshot={img_kat}
			/>

			<BioSteeringCommittee
				name="Phil Leggetter"
				title="Engineering, docs, comms, community, GTM"
				accountabilities="Represent the SC in EMEA activities. Community partnerships e.g. DevRelCon, API Days. Supports working groups and community engagement initiatives."
				bio="Phil Leggetter is an experienced Developer Experience, Developer Relations, and DevTools PLG leader with experience guiding startups through growth, acquisition, and accelerated growth at publicly traded enterprises. He has spent his career building software experiences to maximize developer productivity at companies such as Pusher (acquired by Message Bird), Nexmo (Acquired by Vonage), PostHog, Ably, and most recently, Hookdeck."
				linkedin="https://www.linkedin.com/in/leggetter/"
				twitter="#"
				bluesky="#"
				github="#"
				website="#"
				headshot={img_phil}
			/>

			<BioSteeringCommittee
				name="Stacey Kruczek"
				title="GTM, PR, website, brand, informal coffee chats (NA)"
				accountabilities="Outreach and integrated marketing plans. Serves as a spokesperson, oversee messaging, press, and visibility. Oversees website and brand identity."
				bio="Stacey Kruczek is a Developer Relations leader and founding Steering Committee member of the Developer Relations Foundation. With nearly a decade in DevRel, she has built and scaled developer communities, champion programs, and dev-first marketing strategies that drive real business impact. She bridges the gap between technical communities and business objectives, ensuring devs have the resources and support they need to succeed."
				linkedin="https://www.linkedin.com/in/staceykruczek/"
				twitter="#"
				bluesky="#"
				github="#"
				website="#"
				headshot={img_stacey}
			/>

			<BioSteeringCommittee
				name="Wesley Faulkner"
				title="Communications, community strategy, governance"
				accountabilities="External communities communication and outreach. Develops community engagement strategies. Advises on governance. Builds relationships with external DevRel communities."
				bio="Wesley Faulkner is a podcaster, public speaker, advocate for social change, and developer relations professional. He has worked for companies like AMD, Atlassian, Dell, IBM, and MongoDB. Wesley co-hosts two podcasts: Community Pulse, which explores the challenges and opportunities of community building in Developer Relations, and Radical Respect, which features conversations with Kim Scott on creating more inclusive and equitable workplaces."
				linkedin="https://www.linkedin.com/in/wesley83/"
				twitter="#"
				bluesky="#"
				github="#"
				website="#"
				headshot={img_wes}
			/>
		</div>
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

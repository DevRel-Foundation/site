<script>
	import BioSteeringCommittee from '$lib/BioSteeringCommittee.svelte';
	const img_wes = '/images/steering-committee/wes_f.jpg';
	const img_ana = '/images/steering-committee/ana_j.jpg';
	const img_jon = '/images/steering-committee/jon_l.jpg';
	const img_kat = '/images/steering-committee/katie_m.jpg';
	const img_stacey = '/images/steering-committee/stacey_k.jpg';
	const img_jayson = '/images/steering-committee/jayson_d.jpg';
	const img_aditya = '/images/steering-committee/aditya_o.jpg';
</script>

<svelte:head>
	<title>Steering Committee | About | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="team-section">
		<div class="container">
			<h2 id="steering-committee">Steering Committee</h2>
			<p>
				The Steering Committee provides oversight and continuity for the Developer Relations Foundation (DRF) and its initiatives.
			</p>
		</div>

		<div class="team-grid">

			<BioSteeringCommittee
				name="Jonathan LeBlanc"
				title="Governance and Formation"
				accountabilities="
					Oversees the creation and maintenance of governing documentation and project plans (e.g., charter, code of conduct, etc.).
					"
				bio="Jonathan LeBlanc is an Emmy award-winning software engineer for pioneering live streaming video services, author of O'Reilly books 'Identity and Data Security for Web Development' and 'Programming Social Applications', and former board member of the OAuth, OpenID, and OpenSocial specification groups. Currently the VP and GM of Platform at TraceLink, he spent his career architecting platform, product, and devrel organizations globally."
				linkedin="https://www.linkedin.com/in/jcleblanc/"
				github="https://github.com/jcleblanc"
				discord="@jcleblanc"
				headshot={img_jon}
			/>

			<BioSteeringCommittee
				name="Katie Miller"
				title="Communications"
				accountabilities="
					Coordinates outbound public relations, social media, and community communications. Manages volunteer recruitment
					and onboarding process.
					"
				bio="Katie Miller is a Developer Marketing leader who has built and managed developer programs and marketing initiatives for Slack, Asana, and Google. While her career has taken some interesting twists and turns, at its core, she has been committed to creating a better world by empowering people through knowledge and connection. She serves in leadership roles on multiple non-profit boards and is passionate about community building and governance."
				linkedin="https://www.linkedin.com/in/kmillrunner/"
				github="https://github.com/katiewaz1977"
				discord="@katiemillersheher_91737"
				headshot={img_kat}
			/>

			<BioSteeringCommittee
				name="Stacey Kruczek"
				title="Marketing and Brand"
				accountabilities="
					Formulates integrated marketing plans and acts as spokesperson, overseeing messaging, press, and brand identity.
					"
				bio="Stacey Kruczek is a Developer Relations leader and founding Steering Committee member of the Developer Relations Foundation. With nearly a decade in DevRel, she has built and scaled developer communities, champion programs, and dev-first marketing strategies that drive real business impact. She bridges the gap between technical communities and business objectives, ensuring devs have the resources and support they need to succeed."
				linkedin="https://www.linkedin.com/in/staceykruczek/"
				discord="@ssk_14"
				headshot={img_stacey}
			/>

			<BioSteeringCommittee
				name="Wesley Faulkner"
				title="Community Strategy"
				accountabilities="
					Develops community engagement strategy, coordinating outreach and relationships with other communities.
					"
				bio="Wesley Faulkner is a podcaster, public speaker, advocate for social change, and Developer Relations professional. He has worked for companies like AMD, Atlassian, Dell, IBM, and MongoDB. Wesley co-hosts two podcasts: Community Pulse, which explores the challenges and opportunities of community building in Developer Relations, and Radical Respect, which features conversations with Kim Scott on creating more inclusive and equitable workplaces."
				linkedin="https://www.linkedin.com/in/wesley83/"
				github="https://github.com/wesley83"
				discord="@wesleyf83"
				headshot={img_wes}
			/>

			<BioSteeringCommittee
				name="Jayson DeLancey"
				title="Technology Innovation"
				term="2027"
				accountabilities="
					Innovates on new engineering projects, tool development, and advises on technical strategy for working groups and new open-source development practices.
					"
				bio="Jayson serves as Head of Developer Relations for Semgrep. Since studying at Carnegie Mellon, he's undertaken a career-long pursuit to understand how people build, adopt, and use technology. He is passionate about improving the developer experience regardless of industry, role, or technical community, having worked for Dolby, HERE, General Electric, Rackspace, Dreamworks, and MathWorks."
				linkedin="https://www.linkedin.com/in/jaysondelancey/"
				twitter="https://x.com/jaysondelancey"
				bluesky="https://bsky.app/profile/delancey.dev"
				github="https://github.com/j12y"
				discord="@j12y"
				headshot={img_jayson}
			/>

			<BioSteeringCommittee
				name="Aditya Oberai"
				title="Resource Sourcing"
				term="2027"
				accountabilities="
					Curates existing community expertise and resources by sourcing and advocacy of individual contributor initiatives.
					"
				bio="Aditya is a Developer Advocate at Appwrite and an avid tech community and open-source enthusiast. He has spent the last 6 years empowering tech communities and is currently an active Microsoft MVP and DigitalOcean Wavemaker. Aditya has been awarded Best Developer Relations Professional of the Year at the CMX Community Industry Awards 2024 and was a core organizer of DevRelCon Bengaluru 2024."
				linkedin="https://www.linkedin.com/in/adityaoberai1/"
				twitter="https://x.com/adityaoberai1"
				bluesky="https://bsky.app/profile/oberai.dev"
				github="https://github.com/adityaoberai"
				discord="@adityaoberai1"
				headshot={img_aditya}
			/>
		</div>

		<div class="container">
			<h2 id="steering-committee">Foundation Staff</h2>
			<p>
				The Linux Foundation Staff provide guidance and expertise to support our mission.
			</p>
		</div>

		<div class="team-grid">

			<BioSteeringCommittee
				name="Ana Jiménez"
				title="Project Manager"
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

<style>
  .container {
    margin-bottom: var(--space-m);
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

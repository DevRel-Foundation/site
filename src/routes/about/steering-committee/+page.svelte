<script>
	import BioSteeringCommittee from '$lib/components/page/bios/BioSteeringCommittee.svelte';
	const img_wes = '/images/steering-committee/wes_f.jpg';
	const img_ana = '/images/steering-committee/ana_j.jpg';
	const img_jon = '/images/steering-committee/jon_l.jpg';
	const img_kat = '/images/steering-committee/katie_m.jpg';
	const img_stacey = '/images/steering-committee/stacey_k.jpg';
	const img_jayson = '/images/steering-committee/jayson_d.jpg';
	const img_aditya = '/images/steering-committee/aditya_o.jpg';
	const img_arun = '/images/steering-committee/arun_g.png';
</script>

<svelte:head>
	<title>Steering Committee | About | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section class="team-section">
		<div class="container">
			<h2 id="steering-committee">Steering Committee</h2>
			<p>
				The <strong>Steering Committee</strong> provides expectations, timelines, tools, and regular oversight and continuity for <a href="/about/working-groups" class="link">working groups</a> and the Developer Relations Foundation (DRF) and its initiatives.
			</p>
		</div>

		<div class="team-grid">

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
				title="Sourcing"
				term="2027"
				accountabilities="
					Curates community expertise and resources by sourcing and then advocating for individual contributor initiatives.
					"
				bio="Aditya is a Developer Advocate at Appwrite and an avid tech community and open-source enthusiast. He has spent the last 6 years empowering tech communities and is currently an active Microsoft MVP and DigitalOcean Wavemaker. Aditya has been awarded Best Developer Relations Professional of the Year at the CMX Community Industry Awards 2024 and was a core organizer of DevRelCon Bengaluru 2024."
				linkedin="https://www.linkedin.com/in/adityaoberai1/"
				twitter="https://x.com/adityaoberai1"
				bluesky="https://bsky.app/profile/oberai.dev"
				github="https://github.com/adityaoberai"
				discord="@adityaoberai1"
				headshot={img_aditya}
			/>

            <BioSteeringCommittee
				name="Arun Gupta"
				title="Committee"
				term="2027"
				accountabilities="
					Steering Committee Member.
					"
				bio="Arun Gupta is a globally recognized expert in Developer Relations, open source strategy, and go-to-market innovation. He is the VP of Developer Experience at JetBrains, leading the effort to connect with the global developer community and external partners. With over 25 years of experience at Intel, Apple, Amazon, and Red Hat, Arun advocates mindfulness, kindness, and developer empathy as the foundation of modern DevRel."
				linkedin="https://www.linkedin.com/in/arunpgupta/"
				twitter="https://x.com/arungupta"
				github="https://github.com/arun-gupta"
				discord="@arungupta"
				headshot={img_arun}
			/>
		</div>

		<div class="container">
			<h2 id="steering-committee">Foundation Staff</h2>
			<p>
				Linux Foundation Staff provide guidance and expertise to support our mission.
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

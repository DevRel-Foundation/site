<script lang="ts">

  import MagnetIcon from 'iconoir/icons/magnet.svg';
  import GiftIcon from 'iconoir/icons/gift.svg';
  import MegaphoneIcon from 'iconoir/icons/megaphone.svg';
  import ActionCard from '$lib/components/ui/molecules/ActionCard.svelte';


</script>

<svelte:head>
	<title>Join us | Developer Relations Foundation</title>
</svelte:head>

<div class="container">
	<section class="hero page-section">
		<h1>Join us</h1>
		<p>
			Working under the Linux Foundation, the DevRel Foundation serves as a focal point for best practices in technology adoption by software developers and communities. Our initiatives are collaborative and community-driven to drive innovation and impactful value into the global Developer Relations ecosystem.
		</p>
		<p>
			Whether you're a seasoned DevRel professional, just starting your journey, or simply interested in learning more about the field, this foundation has a place for you.
		</p>
		
		<div class="u-grid u-grid-3 join-cards">
			
			<ActionCard title="Getting started" ctaLabel="Join the community" ctaHref="#join">
				<p class="action-card__question">Need help navigating your DevRel role?</p>
				<p>
					Join our community to connect with peers, share experiences, and access project resources to help you build your DevRel skills and knowledge.
				</p>
			</ActionCard>

			<ActionCard title="Contributors" ctaLabel="Contribute to open source" ctaHref="#contribute">
				<p class="action-card__question">Looking to advance the field and make an impact?</p>
				<p>
					Our working groups are the heart of the DevRel Foundation and require regular participation. Whether you're a developer, content creator, developer marketer, or community manager -- your skills can help shape our success.
				</p>
			</ActionCard>

			<ActionCard title="Leaders" ctaLabel="Become a leader" ctaHref="#lead">
				<p class="action-card__question">Want to establish yourself as an industry leader?</p>
				<p>
					<a href="/contact">Contact</a> the steering committee to learn more about leadership opportunities. We can shape the ecosystem and drive cross-company collaboration with hundreds of participants together.
				</p>
			</ActionCard>

		</div>
	</section>

	<section class="page-section">
		<h2>Why join the DevRel Foundation?</h2>
		<p>
			There are personal and professional benefits to joining the DevRel Foundation. Whether you are a newcomer to the field or an experienced professional, there are opportunities for you to grow, learn, and contribute.
		</p>

		<div class="u-grid u-grid-icon-text">
			<div class="u-icon-column">
				<img src="{MagnetIcon}" alt="Magnet Icon" class="icon-left-r90" />
			</div>
			<div class="text-column">
				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Industry impact</strong></div>
						There is a growing need for a unified voice in Developer Relations in recognition of the persistent challenges in the roles. Formally defining DevRel practices, addressing common challenges with best-in-practice resources, and attracting both individuals and organizations’ decision-makers is essential. A foundation aims to be a trusted, credible, and expert resource, similar to professional bodies in other fields, providing training, certification, continuing education, and advocacy. 
					</li>
					<li class="benefit-item"><div><strong>Career growth</strong></div>
						Gain visibility in the DevRel community, build your professional network, and access opportunities that can accelerate your career progression. Working group contributions are excellent portfolio pieces. Connect with experienced DevRel professionals who can offer guidance, share insights, and help you navigate challenges. Find mentors and become one for others.
					</li>
					<li class="benefit-item"><div><strong>Practical resources</strong></div>
						 Access exclusive resources, workshops, and knowledge-sharing sessions. Learn from real-world case studies, pragmatic tools, and knowledge to help impress your team and organization through greater impact.
					</li>
				</ul>

			</div>
		</div>	
	</section>

	<section class="page-section">
		<h2 id="join" class="content-header">How to join the community</h2>
		<p>
			There are no membership fees or formal requirements to join the DevRel Foundation. We welcome anyone interested in Developer Relations to participate and contribute.
		</p>

		<div class="steps">
			<a href="https://discord.gg/G7CSTKZcuT" class="step-cta" target="_blank" rel="noopener noreferrer">Step 1. Join the Discord community</a>
			<p>
				The foundation's <a href="https://discord.gg/G7CSTKZcuT">Discord server</a> is the primary synchronous communication channel for community participants. Here, you can connect with other DevRel professionals, ask questions, share experiences, and stay updated on activities.
			</p>

			<a href="https://lists.dev-rel.org/g/community/join" class="step-cta" target="_blank">Step 2. Sign up for the mailing list</a>
			<p>
				The <a href="https://lists.dev-rel.org/g/community/join">mailing lists</a> are the primary asynchronous communication channel for the community. You can subscribe to the mailing lists to receive updates, announcements, and discussions about the foundation's activities.
			</p>
			<p>
				Working groups often have additional mailing lists to subscribe to for project updates and calendar invites for working group sessions.
			</p>

			<a href="https://github.com/orgs/DevRel-Foundation/repositories" class="step-cta" target="_blank">Step 3. Explore the GitHub repositories</a>
			<p>
				The <a href="https://github.com/orgs/DevRel-Foundation/repositories" target="_blank">DevRel-Foundation GitHub</a> is where you will find all the open-source projects and resources created by the community. Star any projects you find interesting and consider helpful.
			</p>
		</div>
	</section>

	<section class="page-section">
		<h2 id="contribute" class="content-header">Contribute to open source</h2>
		<p>
			Contributing to open-source projects is a great way to give back to the community, improve your skills, and gain recognition for your work.
		</p>
		<div class="steps">
			<a href="https://github.com/orgs/DevRel-Foundation/repositories" class="step-cta" target="_blank">Step 4. Make a contribution</a>
			<p>
				To contribute to a project, start by familiarizing yourself with the project's goals and guidelines. Engage with the community to understand their needs and how you can help. Then create issues or pull requests for the projects you are interested in. Join the <a href="/about/working-groups">working groups</a> to collaborate with other contributors.
			</p>
		</div>
		<div class="u-grid u-grid-icon-text">
			<div class="u-icon-column">
				<img src="{GiftIcon}" alt="Gift Icon" class="u-icon" />
			</div>
			<div class="text-column">
				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Develop skills</strong></div>
						Create tangible deliverables that showcase your expertise and can be featured in your professional portfolio or resume. Work on real projects that challenge and expand your capabilities in content creation, community building, or technical documentation.
					</li>
				</ul>
			</div>
		</div>	
		<div class="steps">
			<a href="/projects" class="step-cta" target="_blank">Step 5. Spread the word</a>
			<p>
				Stay connected with the community through foundation events such as community calls, office hours, and working group meetings. These events provide opportunities to share your work, learn from others, and build relationships within the wider DevRel community about our <a href="/projects">projects</a>.
			</p>
		</div>
		<div class="u-grid u-grid-icon-text">
			<div class="u-icon-column">
				<img src="{MegaphoneIcon}" alt="Megaphone Icon" class="u-icon" />
			</div>
			<div class="text-column">
				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Evangelize the foundation projects</strong></div>
						Share your experience with the projects with others who may need resources to help them in their own DevRel journey. This can include writing blog posts, giving talks, or creating tutorials.
					</li>
				</ul>
			</div>
		</div>	
	</section>
	
	<section class="page-section">
		<h2 id="lead" class="content-header">Become a leader</h2>
		<p>
			How far will you go? Lead a working group, organize events, or become a member of the steering committee in the next election. The foundation is always looking for passionate individuals to take on leadership roles and help shape the future of Developer Relations.
		</p>
		<div class="steps">
			<a href="/about/steering-committee" class="step-cta" target="_blank">Step 6. Contact the Steering Committee</a>
			<p>
				If you're interested in taking on a leadership role or have project ideas for the community, reach out to the <a href="/about/steering-committee">steering committee</a>. They can provide guidance, support, and help you get involved in shaping the future of the foundation.
			</p>
		</div>

	</section>

</div>

<style>
	.container {
		margin-bottom: var(--space-2xl);
	}

	.join-cards {
		margin-top: var(--space-m);
	}

	.join-cards :global(.cta-button) {
		display: inline-block;
		width: fit-content;
	}

	.step-cta {
		display: inline-block;
		padding: var(--space-xs) var(--space-l);
		background-color: var(--color-button-background);
		color: var(--color-button-text);
		border-radius: var(--radius-pill);
		text-decoration: none;
		font-weight: 600;
		line-height: 1;
		margin-right: var(--space-s);
		transition: all 0.2s ease;
		margin-top: var(--space-s);
	}

	.step-cta:hover {
		background-color: var(--color-button-background);
	}

	p {
		font-size: var(--step-0);
		margin-bottom: var(--space-s);
	}

	.page-section {
		margin-bottom: var(--space-l);
	}

	.content-header {
		font-size: var(--step-3);
		margin-top: var(--space-m);
		color: var(--color-text);
		scroll-margin-top: 5rem;
	}

	.icon-left-r90 {
		height: auto;
		max-width: min(50vw, 15.625rem);
		width: 50%;
		flex-shrink: 0;
		filter: var(--icon-filter);
		opacity: 0.8;
		transform: rotate(90deg);
	}

	@media (max-width: 768px) {
		.icon-left-r90 {
			max-width: min(40vw, 9.375rem);
		}
	}

	.benefit-list {
		list-style-type: disc;
		margin-left: 1.5rem;
		margin-bottom: var(--space-xs);
		font-size: var(--step--1);
		line-height: 1.6;
		color: var(--color-text);
	}

	.benefit-item {
		margin-bottom: var(--space-xs);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.steps .step-cta {
		width: fit-content;
		text-align: left;
		box-sizing: border-box;
		margin: var(--space-s) 0;
		display: inline-block;
		align-self: flex-start;
	}
</style>
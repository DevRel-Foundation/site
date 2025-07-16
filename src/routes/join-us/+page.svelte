<script lang="ts">

  import RocketIcon from 'iconoir/icons/rocket.svg';
  import MagnetIcon from 'iconoir/icons/magnet.svg';
  import GiftIcon from 'iconoir/icons/gift.svg';
  import MegaphoneIcon from 'iconoir/icons/megaphone.svg';


</script>

<svelte:head>
	<title>Join Us | Developer Relations Foundation</title>
</svelte:head>

<div class="container">
	<section class="hero container-content">
		<h1>Join Us</h1>
		<p>
			Working under the Linux Foundation, the DevRel Foundation serves as a focal point for best practices in technology adoption by software developers and communities. Our initiatives are collaborative and community-driven to drive innovation and impactful value into the global Developer Relations ecosystem.
		</p>
		<p>
			Whether you're a seasoned DevRel professional, just starting your journey, or simply interested in learning more about the field, there's a place for you in this foundation.
		</p>
		
		<div class="u-grid u-grid-3">
			
			<div class="content-box end-users">
				<h3 class="box-header">Getting Started</h3>
				<p class="box-question">Need help navigating your DevRel role?</p>
				<p class="box-description">
					Join our community to connect with peers, share experiences, and access project resources that can help you build your DevRel skills and knowledge.
				</p>
				<a href="#join" class="box-cta">JOIN THE COMMUNITY</a>
			</div>

			<div class="content-box contributors">
				<h3 class="box-header">Contributors</h3>
				<p class="box-question">Looking to advance the field and make an impact?</p>
				<p class="box-description">
					Our working groups are the heart of the DevRel Foundation and require regular participation. Whether you're a developer, content creator, developer marketer, or community manager -- your skills can help shape our success.
					
				</p>
				<a href="#contribute" class="box-cta">CONTRIBUTE TO OPEN-SOURCE</a>
			</div>

			<div class="content-box members">
				<h3 class="box-header">Leaders</h3>
				<p class="box-question">Want to establish yourself as an industry leader?</p>
				<p class="box-description">
					<a href="/contact">Contact</a> the steering committee to learn more about leadership opportunities. We can shape the ecosystem and drive cross-company collaboration with hundreds of participants together.
				</p>
				<a href="#lead" class="box-cta">BECOME A LEADER</a>
			</div>

		</div>
	</section>

	<div class="section-divider"></div>

	<section class="container-content">
		<h2>Why a DevRel Foundation?</h2>
		<p>
			The purpose of having a foundation is to create an impartial community-driven entity that can provide resources, support, and governance for the Developer Relations community.
		</p>

		<div class="two-column-layout">
			<div class="icon-column">
				<img src="{RocketIcon}" alt="Rocket Icon" class="icon-left" />
			</div>
			<div class="text-column">


				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Inclusive</strong></div>
						Historically, DevRel has been fragmented across companies and communities with no central authority or resource to unify efforts. The foundation welcomes all individuals regardless of job title, organization or role.
					</li>
					<li class="benefit-item"><div><strong>Neutral</strong></div>
						Projects are managed by the community for the community, with contributions reviewed and accepted based on merit. This ensures that the foundation remains impartial and focused on direction based on community value, not a particular vendor's interests.
					</li>
					<li class="benefit-item"><div><strong>Continuity</strong></div>
						Governance managed with a public charter, steering committee, and working groups ensures that the foundation can continue to operate and evolve over time, even as individual contributors come and go.
					</li>
				</ul>

			</div>
		</div>	
	</section>

	<div class="section-divider"></div>

	<section class="container-content">
		<h2>Why join the DevRel Foundation?</h2>
		<p>
			There are personal and professional benefis to joining the DevRel Foundation. Whether you are a newcomer to the field or an experienced professional, there are opportunities for you to grow, learn, and contribute.
		</p>

		<div class="two-column-layout">
			<div class="icon-column">
				<img src="{MagnetIcon}" alt="Magnet Icon" class="icon-left-r90" />
			</div>
			<div class="text-column">
				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Industry Impact</strong></div>
						There is a growing need for a unified voice in Developer Relations in recognition of the persistent challenges in the roles. Formally defining DevRel practices, addressing common challenges with best-in-practice resources, and attracting both individuals and organizations’ decision-makers is essential. A foundation aims to be a trusted, credible, and expert resource, similar to professional bodies in other fields, providing training, certification, continuing education, and advocacy. 
					</li>
					<li class="benefit-item"><div><strong>Career Growth</strong></div>
						Gain visibility in the DevRel community, build your professional network, and access opportunities that can accelerate your career progression. Working group contributions are excellent portfolio pieces. Connect with experienced DevRel professionals who can offer guidance, share insights, and help you navigate challenges. Find mentors and become one for others.
					</li>
					<li class="benefit-item"><div><strong>Practical Resources</strong></div>
						 Access exclusive resources, workshops, and knowledge sharing sessions. Learn from real-world case studies and pragmatic tools and knowledge to help you impress your team and organization through greater impact.
					</li>
				</ul>

			</div>
		</div>	
	</section>

	<div class="section-divider"></div>

	<div> <a name="join"></a> </div>
	<section class="container-content">
		<h2 class="content-header">How to join the Community</h2>
		<p>
			There are no membership fees or formal requirements to join the DevRel Foundation. We welcome anyone interested in Developer Relations to participate and contribute.
		</p>

		<div class="steps">
			<a href="https://discord.gg/kfJkJ3Xd" class="cta-button" target="_blank">Step 1. Join the Discord Community</a>
			<p>
				The foundation's <a href="https://discord.gg/kfJkJ3Xd">Discord server</a> is the primary synchronous communication channel for community participants. Here, you can connect with other DevRel professionals, ask questions, share experiences, and stay updated on activities.
			</p>

			<a href="https://lists.dev-rel.org/g/community/join" class="cta-button" target="_blank">Step 2. Sign-up for the Mailing List</a>
			<p>
				The <a href="https://lists.dev-rel.org/g/community/join">mailing lists</a> are the primary asynchronous communication channel for the community. You can subscribe to the mailing lists to receive updates, announcements, and discussions related to the foundation's activities.
			</p>
			<p>
				Working groups often have additional mailing lists to subscribe for project updates and calendar invites for working group sessions.
			</p>

			<a href="https://github.com/orgs/DevRel-Foundation/repositories" class="cta-button" target="_blank">Step 3. Explore the GitHub Repositories</a>
			<p>
				The <a href="https://github.com/orgs/DevRel-Foundation/repositories" target="_blank">DevRel-Foundation GitHub</a> is where you will find all the open-source projects and resources created by the community. Star any projects you find interesting and consider helpful.
		</div>
	</section>

	<div class="section-divider"></div>

	<div> <a name="contribute"></a> </div>
	<section class="container-content">
		<h2 class="content-header">Contribute to Open-Source</h2>
		<p>
			Contributing to open-source projects is a great way to give back to the community, improve your skills, and gain recognition for your work.
		</p>
		<div class="steps">
			<a href="https://github.com/orgs/DevRel-Foundation/repositories" class="cta-button" target="_blank">Step 4. Make a Contribution</a>
			<p>
				To contribute to a project, start by familiarizing yourself with the project's goals and guidelines. Engage with the community to understand their needs and how you can help. Then create issues or pull requests of the projects you are interested in. Join the <a href="/about/working-groups">working groups</a> to collaborate with other contributors.
			</p>
		</div>
		<div class="two-column-layout">
			<div class="icon-column">
				<img src="{GiftIcon}" alt="Gift Icon" class="icon-left" />
			</div>
			<div class="text-column">
				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Develop Skills</strong></div>
						Create tangible deliverables that showcase your expertise and can be featured in your professional portfolio or resume. Work on real projects that challenge and expand your capabilities in content creation, community building, or technical documentation.
					</li>
				</ul>
			</div>
		</div>	
		<div class="steps">
			<a href="/projects" class="cta-button" target="_blank">Step 5. Spread the Word</a>
			<p>
				Stay connected with the community through foundation events such as Community Calls, Office Hours, and Working Group Meetings. These events provide opportunities to share your work, learn from others, and build relationships within the wider DevRel community about our <a href="/projects">projects</a>.
			</p>
		</div>
		<div class="two-column-layout">
			<div class="icon-column">
				<img src="{MegaphoneIcon}" alt="Megaphone Icon" class="icon-left" />
			</div>
			<div class="text-column">
				<ul class="benefit-list">
					<li class="benefit-item"><div><strong>Evangelize the Foundation projects</strong></div>
						Share your experience with the projects with others who may need resources to help them in their own DevRel journey. This can include writing blog posts, giving talks, or creating tutorials.
					</li>
				</ul>
			</div>
		</div>	
	</section>

	<div class="section-divider"></div>
	
	<div> <a name="lead"></a> </div>	
	<section class="container-content">
		<h2 class="content-header">Become a Leader</h2>
		<p>
			How far will you go? Lead a working group, organize events, or become a member of the steering committee in the next election. The foundation is always looking for passionate individuals to take on leadership roles and help shape the future of Developer Relations.
		</p>
		<div class="steps">
			<a href="/about/steering-committee" class="cta-button" target="_blank">Step 6. Contact the Steering Committee</a>
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
	
	.content-box {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-s);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
		margin-top: var(--space-m);
		display: flex;
		flex-direction: column;
		min-height: 300px;
	}

	.hero .content-box {
		background-color: var(--color-background);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
	}

	.box-header {
		font-size: var(--step-2);
		font-weight: 700;
		margin: calc(var(--space-s) * -1) calc(var(--space-s) * -1) var(--space-xs) calc(var(--space-s) * -1);
		padding: var(--space-xs) var(--space-xs);
		border-radius: var(--radius-s) var(--radius-s) 0 0;
		text-align: center;
		color: var(--color-dark);
	}

	.members .box-header {
		background-color: var(--color-mint-dark);
		color: var(--color-mint);
	}

	.contributors .box-header {
		background-color: var(--color-mint-dark);
		color: var(--color-mint);
	}

	.end-users .box-header {
		background-color: var(--color-mint-dark);
		color: var(--color-mint);
	}

	.box-question {
		font-size: var(--step-0);
		font-weight: 900;
		margin: 0 0 var(--space-s) 0;
		color: var(--color-text);
	}

	.box-description {
		font-size: var(--step-0);
		line-height: 1.5;
		margin: 0 0 var(--space-l) 0;
		color: var(--color-text);
		flex-grow: 1;
	}

	.box-cta {
		display: inline-block;
		font-size: var(--step--1);
		font-weight: 700;
		text-decoration: none;
		color: var(--color-text);
		border-bottom: 3px solid var(--color-mint);
		padding-bottom: var(--space-3xs);
		margin-top: auto;
		transition: all 0.2s ease;
	}

	.box-cta:hover {
		border-bottom-color: var(--color-mint-dark);
		color: var(--color-mint-dark);
	}

	.cta-button {
		display: inline-block;
		padding: var(--space-s) var(--space-l);
		background-color: var(--color-link);
		color: var(--color-background);
		border-radius: var(--radius-s);
		text-decoration: none;
		font-weight: 600;
		margin-right: var(--space-s);
		transition: all 0.2s ease;
		margin-top: var(--space-s);
	}

	.cta-button:hover {
		background-color: var(--color-text);
	}

	p {
		font-size: var(--step-0);
		margin-bottom: var(--space-s);
	}

	.container-content {
		margin: var(--space-l);
	}

	.content-header {
		font-size: var(--step-3);
		margin-top: var(--space-m);
		color: var(--color-text);
		scroll-margin-top: 5rem;
	}

	/* Alternative approach using the anchor elements */
	a[name] {
		display: block;
		position: relative;
		top: -5rem;
		visibility: hidden;
	}

	.two-column-layout {
		display: grid;
		grid-template-columns: 1fr 5fr;
		gap: var(--space-l);
		align-items: center;
	}

	.icon-column {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-height: 200px;
	}

	.text-column {
		flex: 1;
	}

	.icon-left {
		height: auto;
		max-width: min(50vw, 250px);
		width: 50%;
		flex-shrink: 0;
		filter: var(--icon-filter);
		stroke-width: 1;
		opacity: 0.8;
	}

	.icon-left-r90 {
		height: auto;
		max-width: min(50vw, 250px);
		width: 50%;
		flex-shrink: 0;
		filter: var(--icon-filter);
		stroke-width: 1;
		opacity: 0.8;
		transform: rotate(90deg);
	}

	@media (max-width: 768px) {
		.two-column-layout {
			grid-template-columns: 1fr;
			gap: var(--space-m);
		}
		
		.icon-column {
			justify-content: center;
			min-height: 150px;
		}

		.icon-left {
			max-width: min(40vw, 150px);
			stroke-width: 1;
			opacity: 0.8;
			transform: rotate(90deg);
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

	.section-divider {
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--color-mint), transparent);
		margin: var(--space-s) var(--space-xs);
		border-radius: var(--radius-s);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.steps .cta-button {
		width: auto;
		text-align: left;
		box-sizing: border-box;
		margin: var(--space-s) 0;
		display: block;
	}

	@media (min-width: 769px) {
		.steps .cta-button {
			text-align: left;
		}
	}
</style>
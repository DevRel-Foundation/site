<script>

  import StrategyIcon from 'iconoir/icons/strategy.svg';
  import DownloadIcon from 'iconoir/icons/download.svg';
  import HeadsetIcon from 'iconoir/icons/headset-solid.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import MailIcon from 'iconoir/icons/mail.svg';
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import CalendarIcon from 'iconoir/icons/regular/calendar.svg';

</script>


<svelte:head>
	<title>Working Groups | Projects | Developer Relations Foundation</title>
</svelte:head>

<main class="container">
	<div class="container-content">
		<h1>DevRel Working Groups</h1>

		<p class="box-question">Working groups are open to everyone!</p>

		<p>
			Participating in working groups and projects is the best way to immerse yourself in
			the DevRel community. Working groups meet regularly to discuss, track progress, and collaborate on projects addressing some of the biggest challenges DevRel professionals face today.
		</p>

		<ul class="list">
			<li class="list-item">How should a DevRel organization be structured?</li>
			<li class="list-item">What are the best practices for measuring DevRel impact?</li>
			<li class="list-item">How can we improve community engagement and developer experience?</li>
			<li class="list-item">What tools and resources can help DevRel teams succeed?</li>
			<li class="list-item">etc, ...</li>
		</ul>

		<p>We welcome participation from individuals across experience levels, as well as organizations, eager to jump in and contribute to the goals of the working groups and achieve success for the role Developer Relations plays in the industry.
			
			
		</p>

		<div class="section-divider"></div>

		<h2>How It Works</h2>
		<p>
			Each working group is overseen by volunteer managers passionate about the topic and committed to driving progress. These group managers are responsible for setting the agenda and ensuring the group stays on track to meet its goals. A liaison is appointed to facilitate communication between the working group, steering committee, and the broader community.
		</p>

		<ul class="list">
			<li class="list-item">Working groups are formed on a rolling basis.</li>
			<li class="list-item">Each group is time-bound, with clearly scoped objectives.</li>
			<li class="list-item">
				Contributors participate asynchronously through GitHub and collaboratively during community
				calls.
			</li>
			<li class="list-item">Outputs are openly published and maintained as living resources and projects.</li>
		</ul>


		<div class="u-grid u-grid-3">
			
			<div class="content-box">
				<h3 class="box-header">Sourcing</h3>
				<img src="{DownloadIcon}" alt="Download Icon" class="icon-left" />
				<p class="box-description">
					Some groups will curate and evaluate proven frameworks, models, templates, and resources from across the ecosystem. By consolidating what already works, legitimacy and consistency are achieved through proven and trustworthy guides.
				</p>
				<a href="/learn/what-is-devrel" class="box-cta">LEARNING RESOURCES</a>
			</div>

			<div class="content-box">
				<h3 class="box-header">Innovation</h3>
				<img src="{StrategyIcon}" alt="Strategy Icon" class="icon-left" />
				<p class="box-description">
					Some groups will focus on experimental initiatives designed to fill gaps in the field. Each innovation working group is launched around a clearly defined problem statement.
				</p>
				<a href="/projects" class="box-cta">EXPLORE PROJECTS</a>
			</div>

			<div class="content-box">
				<h3 class="box-header">Calls</h3>
				<img src="{HeadsetIcon}" alt="Headset Icon" class="icon-left" />
				<p class="box-description">
					Working Groups meet regularly on their specific projects. Community Calls bring together the entire community to hear reports on progress and share updates.
				</p>
				<a href="#groups" class="box-cta">FIND A WORKING GROUP</a>
			</div>
		</div>

		<div class="section-divider"></div>

		<div> <a name="groups"></a> </div>


		<h2>Active Working Groups</h2>

		<h3>Community Engagement and Support</h3>
		<p>The Community Engagement and Support Working Group documents standardized approaches and frameworks that help organizations to build, nurture, and scale developer communities.</p>

		<p>
		<a href="https://github.com/DevRel-Foundation/wg-community-engagement-support">
			<img src={GitHubIcon} alt="Learn More" class="social-icon" /> wg-community-engagement-support
		</a>

		</p>
		<p>
		<a href="https://lists.dev-rel.org/g/wg-community-engagement-support">
			<img src={MailIcon} alt="Subscribe" class="social-icon" /> wg-community-engagement-support@lists.dev-rel.org
		</a>
		</p>

		<p>
		<a href="https://discord.gg/G7CSTKZcuT">
			<img src={DiscordIcon} alt="Lets Chat" class="social-icon" /> #community-engage-support
		</a>
		</p>

		<h3>Resources</h3>
		<p>The Resources Working Group innovates on building open-data tools such as the Persona Library, Tools Catalog, and Events Directory to support DevRel activities.</p>

		<p>
		<a href="https://github.com/DevRel-Foundation/wg-resource-aggregation">
			<img src={GitHubIcon} alt="Learn More" class="social-icon" /> wg-resource-aggregation
		</a>

		</p>
		<p>
		<a href="https://lists.dev-rel.org/g/wg-resource-aggregation">
			<img src={MailIcon} alt="Subscribe" class="social-icon" /> wg-resource-aggregation@lists.dev-rel.org
		</a>
		</p>

		<p>
		<a href="https://discord.gg/G7CSTKZcuT">
			<img src={DiscordIcon} alt="Lets Chat" class="social-icon" /> #resource-aggregation
		</a>
		</p>

		<p>
		<a href="https://lists.dev-rel.org/g/wg-resource-aggregation/calendar">
			<img src={CalendarIcon} alt="Join a Call" class="social-icon" /></a> First Thursday of each month (<a href="https://github.com/DevRel-Foundation/wg-resource-aggregation/discussions/categories/working-group-calls">Agenda and Notes</a>)
		</p>

		<div class="section-divider"></div>


	</div>
</main>

<style>
	.container {
		margin-bottom: var(--space-2xl);
	}

	.section-divider {
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--color-mint), transparent);
		margin: var(--space-s) var(--space-xs);
		border-radius: var(--radius-s);
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
		font-size: var(--step-0);
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

	.box-question {
		font-size: var(--step-0);
		font-weight: 900;
		margin: 0 0 var(--space-s) 0;
		color: var(--color-text);
	}

	.box-description {
		font-size: var(--step-0);
		line-height: 1.5;
		margin: var(--space-s) 0 var(--space-l) 0;
		color: var(--color-text);
		flex-grow: 1;
	}

	.box-cta {
		display: inline-block;
		font-size: var(--step--1);
		font-weight: 700;
		text-decoration: none;
		color: var(--color-text);
		border-bottom: 3px solid var(--color-accent-text);
		padding-bottom: var(--space-3xs);
		margin-top: auto;
		transition: all 0.2s ease;
	}

	.box-cta:hover {
		border-bottom-color: var(--color-accent-text);
		color: var(--color-secondary-2-dark);
	}

	.box-header {
		font-size: var(--step-2);
		font-weight: 700;
		margin: calc(var(--space-s) * -1) calc(var(--space-s) * -1) var(--space-xs) calc(var(--space-s) * -1);
		padding: var(--space-xs) var(--space-xs);
		border-radius: var(--radius-s) var(--radius-s) 0 0;
		text-align: center;
		background-color: var(--color-background-dark);
		color: var(--color-text-dark);
	}

	.dark .box-header {
		background-color: var(--color-background);
		color: var(--color-mint);
	}


	.icon-left {
		height: auto;
		max-width: min(50vw, 50px);
		width: 50%;
		flex-shrink: 0;
		filter: var(--icon-filter);
		stroke-width: 1;
		opacity: 0.8;
		display: block;
		margin: 0 auto;
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

	.social-icon {
		width: 1rem;
		height: 1rem;
		filter: var(--icon-filter);
		display: inline;
		vertical-align: middle;
		margin-right: var(--space-2xs);
	}

</style>

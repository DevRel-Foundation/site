<script lang="ts">
  import { goto } from '$app/navigation';
  import StrategyIcon from 'iconoir/icons/strategy.svg';
  import DownloadIcon from 'iconoir/icons/download.svg';
  import HeadsetIcon from 'iconoir/icons/headset-solid.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import MailIcon from 'iconoir/icons/mail.svg';
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import CalendarIcon from 'iconoir/icons/regular/calendar.svg';
  import ActionCard from '$lib/components/ui/molecules/ActionCard.svelte';

  function scrollToGroups() {
    document.getElementById('groups')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>


<svelte:head>
	<title>Working groups | Projects | Developer Relations Foundation</title>
</svelte:head>

<div class="container">
		<h1>DevRel Foundation working groups</h1>


		<h2>What are working groups?</h2>

		<p>

		   Working groups are volunteer-led teams within the Developer Relations Foundation that focus on specific DevRel topics or challenges. They collaborate to create open-source resources, best practices, and frameworks to support the DevRel community.

		</p>


		<p class="question">Working groups are public and open for anybody to join!</p>

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


		<h2>How it works</h2>



		<p>
			A <strong>working group manager</strong> is a leadership position within working groups responsible for keeping the group focused, organized, and moving forward. They help create an environment where all working group participants can share ideas, co-create meaningful outputs, and make an impact in the DevRel ecosystem. Working group managers are appointed by the Steering Committee and act as a liaison between the working group and the overall community.
		</p>

		<ul class="list">
			<li class="list-item">Working groups are formed on a rolling basis.</li>
			<li class="list-item">Each working group should have clearly scoped objectives.</li>
			<li class="list-item">Contributors can participate asynchronously through GitHub or collaboratively during working group calls.
			</li>
			<li class="list-item">Outputs are openly published and maintained as living project resources.</li>
		</ul>


		<div class="u-grid u-grid-3 wg-cards-grid">
			<ActionCard
				icon={DownloadIcon}
				title="Sourcing"
				description="Some groups curate and evaluate proven frameworks, models, templates, and resources from across the ecosystem. By consolidating what already works, legitimacy and consistency are achieved through trustworthy guides."
				ctaLabel="Learning resources →"
				onclick={() => goto('/learn/what-is-devrel')}
			/>

			<ActionCard
				icon={StrategyIcon}
				title="Innovation"
				description="Some groups focus on experimental initiatives designed to fill gaps in the field. Each innovation working group is launched around a clearly defined problem statement."
				ctaLabel="Explore projects →"
				onclick={() => goto('/projects')}
			/>

			<ActionCard
				icon={HeadsetIcon}
				title="Calls"
				description="Working groups meet regularly on their specific projects. Community calls bring together the entire community to hear reports on progress and share updates."
				ctaLabel="Find a working group →"
				onclick={scrollToGroups}
			/>
		</div>


		<h2 id="groups">Active working groups</h2>

		<h3>Community Engagement and Support</h3>
		<p>The Community Engagement and Support Working Group documents standardized approaches and frameworks that help organizations to build, nurture, and scale developer communities.</p>

		<p>
		<a href="https://github.com/DevRel-Foundation/wg-community-engagement-support">
			<img src={GitHubIcon} alt="Learn more" class="social-icon" /> wg-community-engagement-support
		</a>

		</p>
		<p>
		<a href="https://lists.dev-rel.org/g/wg-community-engagement-support">
			<img src={MailIcon} alt="Subscribe" class="social-icon" /> wg-community-engagement-support@lists.dev-rel.org
		</a>
		</p>

		<p>
		<a href="https://discord.gg/G7CSTKZcuT">
			<img src={DiscordIcon} alt="Let's chat" class="social-icon" /> #community-engage-support
		</a>
		</p>

		<h3>Resources</h3>
		<p>The Resources Working Group innovates on building open-data tools such as the persona library, tools catalog, and events directory to support DevRel activities.</p>

		<p>
		<a href="https://github.com/DevRel-Foundation/wg-resource-aggregation">
			<img src={GitHubIcon} alt="Learn more" class="social-icon" /> wg-resource-aggregation
		</a>

		</p>
		<p>
		<a href="https://lists.dev-rel.org/g/wg-resource-aggregation">
			<img src={MailIcon} alt="Subscribe" class="social-icon" /> wg-resource-aggregation@lists.dev-rel.org
		</a>
		</p>

		<p>
		<a href="https://discord.gg/G7CSTKZcuT">
			<img src={DiscordIcon} alt="Let's chat" class="social-icon" /> #resource-aggregation
		</a>
		</p>

		<p>
		<a href="https://lists.dev-rel.org/g/wg-resource-aggregation/calendar">
			<img src={CalendarIcon} alt="Join a call" class="social-icon" /></a> First Thursday of each month (<a href="https://github.com/DevRel-Foundation/wg-resource-aggregation/discussions/categories/working-group-calls">Agenda and notes</a>)
		</p>

</div>

<style>
	.container {
		margin-bottom: var(--space-2xl);
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

	.wg-cards-grid {
		margin-top: var(--space-m);
	}

	.question {
		font-size: var(--step-0);
		font-weight: 900;
		margin: 0 0 var(--space-s) 0;
		color: var(--color-text);
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

<script>
	import BioSteeringCommittee from '$lib/components/page/bios/BioSteeringCommittee.svelte';
	import GovernanceNotice from '$lib/components/ui/molecules/GovernanceNotice.svelte';
	import { MotifConcentricCircles } from '$lib/components/ui/atoms/motifs';
	import { TRANSITION_UPDATE_URL } from '$lib/community';

	const CHARTER_URL =
		'https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter.adoc';
	const img_ana = '/images/steering-committee/ana_j.jpg';
</script>

<svelte:head>
	<title>Governance | About | Developer Relations Foundation</title>
	<meta
		name="description"
		content="How the DevRel Foundation is governed, and how the community takes part in its current governance transition."
	/>
</svelte:head>

<div class="motif-section governance-page">
	<MotifConcentricCircles />
	<div class="container">
		<section class="governance-section">
			<h1 id="governance">Governance</h1>
			<p>
				The Developer Relations Foundation (DRF) is a Linux Foundation project governed by its
				<a href={CHARTER_URL} class="link" target="_blank" rel="noopener noreferrer"
					>Technical Charter ↗</a
				>. The charter defines how the Foundation's work is overseen and how
				<a href="/about/working-groups" class="link">working groups</a> are formed.
			</p>

			<GovernanceNotice />

			<h2 id="transition">The transition at a glance</h2>
			<p>
				The previous Steering Committee recognized that the Foundation's next phase needs a renewed
				governance structure and completed its service. The Linux Foundation is facilitating the
				transition by restoring regular communication, community touchpoints, and clear ways for
				members to take part.
			</p>
			<p>The next phase starts with an open community process that focuses on:</p>
			<ul class="governance-list">
				<li>The Foundation's future priorities</li>
				<li>Clearer and more accessible contribution paths</li>
				<li>The resources and programs that are most valuable to the community</li>
				<li>Community members who want to help lead and deliver the work</li>
			</ul>
			<p>
				Establishing the next Steering Committee is part of this process. The immediate priority is
				to rebuild an active, transparent, and participatory community where leadership grows from
				meaningful contributions.
			</p>
			<div class="governance-actions">
				<a class="governance-cta" href="/community/touchpoints">Join a Community Touchpoint</a>
				<a href={TRANSITION_UPDATE_URL} class="link" target="_blank" rel="noopener noreferrer"
					>Read the full update ↗</a
				>
			</div>

			<h2 id="foundation-staff">Foundation staff</h2>
			<p>
				Linux Foundation staff provide guidance and expertise to support our mission and this
				transition.
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
	.governance-page {
		position: relative;
		overflow: visible;
	}

	.governance-page .container {
		margin-bottom: var(--space-m);
	}

	.governance-section h2 {
		margin-top: var(--space-xl);
	}

	.governance-list {
		margin-left: var(--space-m);
		list-style: disc;
	}

	.governance-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-m);
		margin-top: var(--space-s);
	}

	.governance-cta {
		padding: var(--space-xs) var(--space-l);
		border-radius: var(--radius-pill);
		background: var(--color-button-background);
		color: var(--color-button-text);
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
	}
</style>

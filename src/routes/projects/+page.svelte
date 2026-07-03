<script lang="ts">
	import { goto } from '$app/navigation';
	import ActionCard from '$lib/components/ui/molecules/ActionCard.svelte';
	import { CtaButton } from '$lib/components/ui/primitives';

	type ProjectStatus = 'sandbox' | 'incubation' | 'graduated';
	type ProjectFilter = 'all' | ProjectStatus;

	interface Project {
		title: string;
		description: string;
		status: ProjectStatus;
		learnMoreUrl: string;
	}
	
	function handleJoinClick() {
		goto('/join-us');
	}

	const projects: Project[] = [
		{
			title: 'Tools catalog',
			description: 'Collection of physical and digital tools useful to evaluate in DevRel programs. Assets are categorized by use case and jobs to be done.',
			status: 'incubation',
			learnMoreUrl: '/projects/tools-catalog'
		},
		{
			title: 'Persona library',
			description: 'Reference collection for the study and standardization of developer personas. Aims to offer pragmatic advice for use in day-to-day go-to-market strategies.',
			status: 'incubation',
			learnMoreUrl: 'https://github.com/devrel-foundation/persona-library'
		},
		{
			title: 'Events directory',
			description: 'Directory of developer events, conferences, and meetups to engage with community strategies.',
			status: 'sandbox',
			learnMoreUrl: 'https://github.com/devrel-foundation/events-directory'
		},
		{
			title: 'Metrics index',
			description: 'Index of metrics and KPIs for measuring the performance and impact of DevRel initiatives.',
			status: 'sandbox',
			learnMoreUrl: 'https://github.com/devrel-foundation/metrics-index'
		},
		{
			title: 'DevRel maturity model',
			description: 'Framework for assessing the maturity of the organization and structure in executing DevRel tactics and programs.',
			status: 'sandbox',
			learnMoreUrl: 'https://github.com/devrel-foundation/devrel-maturity-model'
		}
	];

	let selectedFilter = 'all';
	let searchTerm = '';
	
	$: filteredProjects = projects.filter(project => {
		const statusMatch = selectedFilter === 'all' || project.status === selectedFilter;
		
		const searchMatch = !searchTerm ||
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase());
		
		return statusMatch && searchMatch;
	});

	function setFilter(filter: ProjectFilter) {
		selectedFilter = filter;
	}
</script>

<svelte:head>
	<title>Projects | Developer Relations Foundation</title>
</svelte:head>

<div class="container">
	<section>
		<h1>Projects</h1>
		<p>
			<strong>Projects are the output of the Developer Relations Foundation working group initiatives to source and innovate on best practices.</strong> These open-source initiatives gather knowledge, open-data, and other resources that advance the effectiveness of Developer Relations activities and tactics.
		</p>

		<h2>Explore projects</h2>
		<div class="filter-controls">
			<div class="filter-menu">
				<button 
					class="category-link {selectedFilter === 'all' ? 'active' : ''}"
					onclick={() => setFilter('all')}
				>
					All projects
				</button>
				<button 
					class="category-link {selectedFilter === 'sandbox' ? 'active' : ''}"
					onclick={() => setFilter('sandbox')}
				>
					Sandbox
				</button>
				<button 
					class="category-link {selectedFilter === 'incubation' ? 'active' : ''}"
					onclick={() => setFilter('incubation')}
				>
					Incubating
				</button>
				<button 
					class="category-link {selectedFilter === 'graduated' ? 'active' : ''}"
					onclick={() => setFilter('graduated')}
				>
					Graduated
				</button>
			</div>
			
			<div class="search-container">
				<div class="search-input-wrapper">
					<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
					<input 
						type="text" 
						placeholder="Find project..." 
						bind:value={searchTerm}
						class="category-search"
					/>
				</div>
			</div>
		</div>

		<div>
			{#if selectedFilter === 'graduated'}
				<p>Graduated projects are at a level of maturity to be recommended for everybody to use. Contributions are still incoming as the DevRel community learns from day-to-day usage.</p>
			{:else if selectedFilter === 'sandbox'}
				<p>Sandbox projects are early experiments and proof of concepts. Make an impact by providing early feedback on these initiatives.</p>
			{:else if selectedFilter === 'incubation'}
				<p>Incubating projects have efforts underway and are showing early signs of value. These projects are best for early adopters who want to be on the cutting edge of Developer Relations practices, even if there are some bumps along the way.</p>
			{:else}
				<p>
					Projects are maintained in the <a href="https://github.com/orgs/DevRel-Foundation/repositories" target="_blank" rel="noopener noreferrer">
						DevRel Foundation GitHub</a> organization.
				</p>
			{/if}
		</div>

		<div class="u-grid u-grid-auto-fill projects-grid">
			{#each filteredProjects as project (project.title)}
				<ActionCard
					title={project.title}
					description={project.description}
					descriptionClamp={true}
					ctaLabel="Learn more →"
					onclick={() => {
						if (project.learnMoreUrl.startsWith('http')) {
							window.open(project.learnMoreUrl, '_blank');
						} else {
							goto(project.learnMoreUrl);
						}
					}}
				/>
			{:else}
				<div class="no-projects">
					<p>
						No projects found
						{#if searchTerm && selectedFilter !== 'all'}
							for "{searchTerm}" in {selectedFilter} projects.
						{:else if searchTerm}
							for "{searchTerm}".
						{:else if selectedFilter !== 'all'}
							for the {selectedFilter} lifecycle stage yet.
						{:else}
							.
						{/if}
					</p>
				</div>
			{/each}
		</div>

		<h2>Contributing to projects</h2>

		<p>
			The value of open-source projects comes from the collaborative ideation that happens when gathering professionals of varied backgrounds and experiences with common goals.
		</p>

		<p>
			To propose new projects or give feedback, attend a working group call, and start the conversation.
		</p>

		<CtaButton onclick={handleJoinClick}>Join us</CtaButton>

	</section>
</div>

<style>
	.container {
		margin-bottom: var(--space-l);
	}

	p {
		margin-bottom: var(--space-s);
	}

	.filter-controls {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-m);
		margin: var(--space-s) 0;
		flex-wrap: wrap;
	}

	.filter-menu {
		display: flex;
		gap: var(--space-s);
		flex-wrap: wrap;
	}

	.search-container {
		flex-shrink: 0;
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: var(--space-s);
		width: 1rem;
		height: 1rem;
		color: var(--color-background-secondary-2-dark);
		pointer-events: none;
		z-index: 1;
	}

	:global(body.dark-mode) .search-input-wrapper .search-icon,
	:global(html.dark-mode) .search-input-wrapper .search-icon {
		color: var(--color-text-dark);
	}

	.projects-grid {
		margin-top: var(--space-m);
	}

	.no-projects {
		grid-column: 1 / -1;
		text-align: center;
		padding: var(--space-l);
		color: var(--color-gray);
		font-style: italic;
	}

	.no-projects p {
		margin: 0;
	}

</style>

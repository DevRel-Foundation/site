<script>
	import { goto } from '$app/navigation';
	
	function handleJoinClick() {
		goto('/join-us');
	}

	const projects = [
		{
			title: "Tools Catalog",
			description: "Collection of physical and digital tools useful to evaluate in DevRel programs. Assets are categorized by use case and jobs to be done.",
			status: "incubation",
			learnMoreUrl: "https://github.com/devrel-foundation/tools-catalog"
		},
		{
			title: "Persona Library",
			description: "Reference collection for the study and standardization of developer personas. Aims to offer pragmatic advice for use in day-to-day go-to-market strategies.",
			status: "incubation",
			learnMoreUrl: "https://github.com/devrel-foundation/persona-library"
		},
		{
			title: "Events Directory",
			description: "Directory of developer events, conferences, and meetups to engage with community strategies.",
			status: "sandbox",
			learnMoreUrl: "https://github.com/devrel-foundation/events-directory"
		}
	];

	let selectedFilter = 'all';
	let searchTerm = '';
	
	$: filteredProjects = projects.filter(project => {
		// Filter by status
		const statusMatch = selectedFilter === 'all' || project.status === selectedFilter;
		
		// Filter by search term
		const searchMatch = !searchTerm || 
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase());
		
		return statusMatch && searchMatch;
	});

	function setFilter(filter) {
		selectedFilter = filter;
	}
</script>

<svelte:head>
	<title>Projects | Developer Relations Foundation</title>
</svelte:head>

<div class="container container-content">
	<section>
		<h1>Projects</h1>
		<p>
			<strong>Projects are the output of Developer Relations Foundation working group initiatives to source and innovate on best practices.</strong> These open-source initiatives gather knowledge, open-data, and other resources that advance the effectiveness of Developer Relations activities and tactics.
		</p>

		<h2>Explore</h2>
		<div class="filter-controls">
			<div class="filter-menu">
				<button 
					class="filter-btn {selectedFilter === 'all' ? 'active' : ''}"
					on:click={() => setFilter('all')}
				>
					All Projects
				</button>
				<button 
					class="filter-btn {selectedFilter === 'sandbox' ? 'active' : ''}"
					on:click={() => setFilter('sandbox')}
				>
					Sandbox
				</button>
				<button 
					class="filter-btn {selectedFilter === 'incubation' ? 'active' : ''}"
					on:click={() => setFilter('incubation')}
				>
					Incubation
				</button>
				<button 
					class="filter-btn {selectedFilter === 'graduated' ? 'active' : ''}"
					on:click={() => setFilter('graduated')}
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
						class="search-input"
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
				<p>Incubating projects have efforts underway and are showing early signs of value. These projects are best for early adopters who want to be on the cutting edge of Developer Relations practices even if there are some bumps along the way.</p>
			{:else}
				<p>
					Projects are maintained in the <a href="https://github.com/orgs/DevRel-Foundation/repositories" target="_blank" rel="noopener noreferrer">
						DevRel Foundation GitHub</a> organization.
				</p>
			{/if}
		</div>

		<div class="projects-grid">
			{#each filteredProjects as project}
				<div class="project-card">
					<h3>{project.title}</h3>
					<p class="description">{project.description}</p>
					<button class="cta" on:click={() => window.open(project.learnMoreUrl, '_blank')}>
						Learn more →
					</button>
				</div>
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

		<h2>Contributing</h2>

		<p>
			The value of open-source projects comes from the collaborative ideation that happens when gathering professionals of varied backgrounds and experiences with common goals.
		</p>

		<p>
			To propose new projects or give feedback, attend a working group call and start the conversation.
		</p>

		<button class="cta" on:click={handleJoinClick}>Join Us</button>

	</section>
</div>

<style>
	.container {
		margin-bottom: var(--space-l);
	}

	p {
		margin-bottom: var(--space-s);
	}

	.cta {
		margin: 0;
		padding: 0.75em;
		padding-left: 3em;;
		padding-right: 3em;;
		background: color-mix(in srgb, var(--color-mint) 35%, black 65%);
		border: none;
		cursor: pointer;
		border-radius: 4px;
		font-weight: 500;
		transition: all 0.2s ease;
		color: var(--color-mint);
		display: block;
	}

	.cta:hover {
		background-color: var(--color-mint-dark);
		transform: translateY(-1px);
		color: var(--color-mint);
		text-decoration: underline;
	}

	.cta:focus {
		outline: 2px solid var(--color-mint-dark);
		outline-offset: 2px;
	}

	.cta:active {
		transform: translateY(0);
		background-color: var(--color-mint-dark);
	}

	.cta:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
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
		gap: 1rem;
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
		left: 0.75rem;
		width: 1rem;
		height: 1rem;
		color: var(--color-mint-dark);
		pointer-events: none;
		z-index: 1;
	}

	.search-input {
		padding: 0.5rem 1rem 0.5rem 2.5rem;
		border: 2px solid var(--color-mint);
		border-radius: 4px;
		font-size: 1rem;
		min-width: 200px;
		transition: border-color 0.2s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-mint-dark);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-l);
		margin-top: var(--space-m);
	}

	.project-card {
		border: 1px solid var(--color-light-gray);
		border-radius: 8px;
		padding: var(--space-m);
		background-color: var(--color-background-secondary-1);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.2s ease, transform 0.2s ease;
	}

	.project-card:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
		background-color: var(--color-background-secondary-1);
		transform: translateY(-2px);
	}

	.project-card h3 {
		margin: 0 0 var(--space-s) 0;
		color: var(--color-dark);
	}

	.project-card p {
		margin: 0 0 var(--space-m) 0;
		color: var(--color-gray);
		line-height: 1.5;
	}

	.learn-more {
		color: var(--color-mint-dark);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.learn-more:hover {
		color: var(--color-link-light);
		text-decoration: underline;
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

	.filter-btn {
		padding: 0.5rem 1rem;
		border: 2px solid var(--color-mint);
		background: transparent;
		color: var(--color-mint-dark);
		cursor: pointer;
		border-radius: 4px;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.filter-btn:hover:not(.active) {
		background-color: var(--color-mint-dark);
		color: var(--color-mint);
	}

	.filter-btn.active {
		background-color: var(--color-mint) !important;
		color: var(--color-dark) !important;
	}

	.filter-btn:not(.active) {
		background: transparent;
		color: var(--color-mint-dark);
	}

	.description {
		font-size: var(--step-0);
		color: var(--color-gray);
		margin-bottom: var(--space-m);
		height: calc(4 * 1.5em);
		line-height: 1.5;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

</style>

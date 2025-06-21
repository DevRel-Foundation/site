<script lang="ts">
	interface Event {
		title: string;
		date: string;
		type: 'upcoming' | 'past';
		link: string;
		description: string;
		path: string;
	}

	const eventModules = import.meta.glob('/src/events/*.md', { eager: true });
	
	const events: Event[] = Object.entries(eventModules).map(([path, module]) => {
		const { metadata } = module as { metadata: Record<string, unknown> };
		return {
			...metadata,
			path
		} as Event;
	});
	
	const upcomingEvents = events
		.filter(event => event.type === 'upcoming')
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	
	const pastEvents = events
		.filter(event => event.type === 'past')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<div class="container container-content">
	<h1>Events</h1>
	
	<div class="events-list">
		{#if upcomingEvents.length > 0}
			<h2>Upcoming events</h2>
			<ul>
				{#each upcomingEvents as event}
					<li>
						<a href={event.link} target="_blank" rel="noopener noreferrer">
							{event.title}
						</a>
						<p class="event-date">{formatDate(event.date)}</p>
						<p>{event.description}</p>

					</li>
				{/each}
			</ul>
		{/if}

		{#if pastEvents.length > 0}
			<h2>Past events</h2>
			<ul>
				{#each pastEvents as event}
					<li>
						<a href={event.link} target="_blank" rel="noopener noreferrer">
							{formatDate(event.date)} - {event.title}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.container {
		margin-bottom: var(--space-2xl);
	}
	.events-list {
		margin-top: var(--space-m);
	}
	
	.events-list h2 {
		margin-bottom: var(--space-m);
		color: var(--color-text);
	}
	
	.events-list ul {
		list-style: none;
		padding: 0;
	}
	
	.events-list li {
		margin-bottom: var(--space-l);
		padding: 0;
	}
	
	.events-list a {
		color: var(--color-link);
		text-decoration: none;
		font-weight: 600;
		font-size: var(--step-1);
	}
	
	.events-list a:hover {
		color: var(--color-accent-text);
		text-decoration: underline;
	}
	
	.events-list p {
		margin-top: var(--space-2xs);
		color: var(--color-text);
		line-height: 1.5;
		font-size: var(--step-0);
	}
	
	.event-date {
		color: var(--color-text);
		font-size: var(--step--1);
		margin-top: var(--space-xs);
		font-weight: 500;
	}
</style> 
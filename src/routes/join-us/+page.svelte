<script lang="ts">
	let email = '';

	function handleNewsletterSubmit(event: SubmitEvent) {
		event.preventDefault();
		// Handle newsletter signup
		console.log('Newsletter signup:', email);
		email = '';
	}
</script>

<svelte:head>
	<title>Join Us - Developer Relations Foundation</title>
</svelte:head>

<div class="container">
	<section class="hero container-content">
		<h1>Join Us</h1>
		<p>
			We welcome anyone passionate about developer relations to join our community. Whether you're a seasoned DevRel professional, just starting your journey, or simply interested in learning more about the field, there's a place for you in our foundation.
		</p>
		
		<div class="u-grid u-grid-3">
			<div class="content-box">
				<p role="heading" aria-level="3">Impact</p>
				<p>Join our community and make an impact building industry standards and best practices.</p>
			</div>
			
			<div class="content-box">
				<p role="heading" aria-level="3">Contribute</p>
				<p>Contribute your expertise and make a meaningful differenceby joining a working group.</p>
			</div>
			
			<div class="content-box">
				<p role="heading" aria-level="3">Connect</p>
				<p>Connect during quarterly Community Calls and monthly Open Coffee Chats.</p>
			</div>
		</div>
	</section>

	<section class="space-stack-2xl container-content">
		<h2>Why join the DevRel Foundation?</h2>
		<ul>
			<li><strong>🚀 Career Growth</strong> - Gain visibility in the DevRel community, build your professional network, and access opportunities that can accelerate your career progression. Working group contributions are excellent portfolio pieces.</li>
			<li><strong>🤝 Networking & Mentorship</strong> - Connect with experienced DevRel professionals who can offer guidance, share insights, and help you navigate challenges. Find mentors and become one for others.</li>
			<li><strong>📚 Learning & Development</strong> - Access exclusive resources, workshops, and knowledge sharing sessions. Learn from real-world case studies and stay ahead of industry trends.</li>
			<li><strong>💡 Industry Impact</strong> - Help shape the future of developer relations by contributing to industry standards, best practices, and thought leadership that benefits the entire ecosystem.</li>
		</ul>
	</section>

	<section class="space-stack-2xl container-content">
		<h2>Working Groups: Your Path to Impact</h2>
		<p>
			Joining a working group is one of the most rewarding ways to contribute to the DevRel community. Here's what you can expect:
		</p>
		
		<ul>
			<li><strong>Skill Development</strong> - Work on real projects that challenge and expand your capabilities in content creation, event planning, community building, or technical documentation.</li>
			<li><strong>Leadership Opportunities</strong> - Take on leadership roles within working groups, gaining valuable experience in project management and team coordination.</li>
			<li><strong>Portfolio Building</strong> - Create tangible deliverables that showcase your expertise and can be featured in your professional portfolio or resume.</li>
			<li><strong>Industry Recognition</strong> - Get recognized for your contributions through our community channels and build your reputation as a thought leader.</li>
		</ul>
	</section>

	<section class="space-stack-2xl container-content">
		<h2>Stay Connected Through Our Events</h2>
		<ul>
			<li><strong>Quarterly Community Calls</strong> - Join our larger community gatherings where we share updates, discuss industry trends, and provide a platform for members to present their work and ideas.</li>
			<li><strong>Monthly Open Coffee Chats</strong> - More intimate, casual conversations where you can ask questions, share challenges, and connect with peers in a relaxed setting.</li>
			<li><strong>Working Group Meetings</strong> - Regular focused sessions where working group members collaborate on specific projects and initiatives.</li>
		</ul>
	</section>

	<section class="space-stack-2xl container-content">
		<h2>Ready to Get Started?</h2>
		<p>
			Join our community today and start making connections that will last throughout your DevRel career.
		</p>
		<div class="space-stack-s">
			<a href="https://discord.gg/devrel" class="cta-button">Join Discord Community</a>
			<a href="https://github.com/DevRel-Foundation" class="cta-button">Explore on GitHub</a>
		</div>
	</section>

</div>

<style>
	.container {
		margin-bottom: var(--space-2xl);
	}
	
	.content-box {
		background-color: var(--color-background-secondary-1);
		padding: var(--space-m);
		border-radius: var(--radius-m);
		border: var(--border-thickness) solid var(--color-background-secondary-2);
		margin-top: var(--space-m);
	}

	.hero .content-box {
		background-color: transparent;
	}

	.content-box p:first-child {
		font-size: var(--step-1);
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

</style> 
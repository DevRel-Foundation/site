<script>
  import BioSteeringCommittee from '$lib/BioSteeringCommittee.svelte';
</script>

<svelte:head>
  <title>About - Developer Relations Foundation</title>
</svelte:head>

<div class="container">
  <section class="mission-section">
    <h1>About</h1>
    <p>
      <strong>Mission:</strong> To elevate the professional practice of developer relations and increase awareness of it as a driver of business value.
    </p>
  </section>

  <section class="charter-section">
    <h2>Charter</h2>
    <p>
      The Developer Relations Foundation Charter outlines the foundation's mission, purpose, and scope. It helps the community understand its role and direction and can be updated as the foundation evolves, with input from the community.
    </p>
    <p>
      <a href="https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter_v1.0.adoc" target="_blank" rel="noopener">Read the full charter →</a>
    </p>
  </section>

  <section class="team-section">
    <h2>Steering Committee</h2>
    <p class="llm-gen">
      The Steering Committee provides oversight for the entire open collaborative project and helps establish initial lightweight processes to support community-driven initiatives. These experienced DevRel professionals work together to shape the day-to-day work within the Developer Relations Foundation and ensure the organization's mission is carried out effectively.
    </p>
    
    <div class="team-grid">
      <BioSteeringCommittee 
        name="Sarah Chen"
        title="Founding Developer Advocate at Promptfoo"
        description="Experienced developer relations professional with expertise in community building and developer advocacy."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      
      <BioSteeringCommittee 
        name="Marcus Rodriguez"
        title="Senior DevRel Manager at TechCorp"
        description="Dedicated to building meaningful developer communities and fostering authentic connections between developers and companies."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      
      <BioSteeringCommittee 
        name="Alex Thompson"
        title="Developer Experience Lead at CodeFlow"
        description="Focused on creating exceptional developer experiences through thoughtful tooling, documentation, and support systems."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      
      <BioSteeringCommittee 
        name="Priya Patel"
        title="Content Strategy Director at DevMedia"
        description="Creating educational content and resources that help DevRel professionals grow and succeed in their careers."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      
      <BioSteeringCommittee 
        name="David Kim"
        title="Events and Community Coordinator"
        description="Organizing events and gatherings that bring the DevRel community together to learn, connect, and collaborate."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      
      <BioSteeringCommittee 
        name="Emily Watson"
        title="Metrics and Analytics Specialist"
        description="Developing frameworks and tools to measure the impact and success of developer relations programs."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      
      <BioSteeringCommittee 
        name="Jordan Lee"
        title="Innovation and Emerging Trends Lead"
        description="Exploring emerging trends and technologies to keep the DevRel community ahead of the curve."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
    </div>
  </section>
</div>

<style>

    .mission-section {
      margin-bottom: var(--space-2xl);
    }
    
    .mission-section h1 {
      color: var(--color-text);
      margin-bottom: var(--space-l);
    }
    
    .mission-section p {
      color: var(--color-text);
      font-size: var(--step-1);
      margin-bottom: var(--space-m);
    }
    
    .charter-section {
      margin-bottom: var(--space-2xl);
      padding: var(--space-l);
      background-color: var(--color-background-secondary-1);
      border-radius: var(--radius-m);
    }
    
    .charter-section h2 {
      color: var(--color-text);
      margin-bottom: var(--space-s);
      font-size: var(--step-3);
    }
    
    .charter-section p {
      color: var(--color-text);
      margin-bottom: var(--space-s);
    }
    
    .charter-section a {
      color: var(--color-link);
    }
    
    .team-section h2 {
      color: var(--color-text);
      margin-bottom: var(--space-l);
      font-size: var(--step-3);
    }
    
    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-l);
    }
    
    @media (max-width: 1024px) {
      .team-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
  

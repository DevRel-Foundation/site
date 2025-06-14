<script>
  import BioWorkingGroup from '$lib/BioWorkingGroup.svelte';
  import GitHubIcon from 'iconoir/icons/github.svg';
</script>

<svelte:head>
  <title>Working Groups - Developer Relations Foundation</title>
</svelte:head>

<div class="container">
  <h1>Working Groups</h1>
  <p class="llm-gen">Our working groups are specialized teams focused on specific areas of developer relations, from community building and content creation to metrics and measurement. Each group brings together experts and practitioners to develop resources, standards, and best practices for their respective domains.</p>
  <p class="llm-gen">These collaborative efforts result in valuable resources like guidelines, toolkits, and frameworks that help elevate the entire DevRel profession. Working group members have the opportunity to shape industry standards and contribute to the advancement of developer relations practices.</p>

  <section class="working-group">
    <h2>Resource and Aggregation Group</h2>
    <p>Aggregates resources for a wide variety of use cases to support the Developer Relations professional community.</p>
    <a href="https://github.com/DevRel-Foundation/wg-resource-aggregation" target="_blank" rel="noopener" class="github-link">
      <img src={GitHubIcon} alt="GitHub" class="github-icon" />
      View on GitHub
    </a>
    
    <h3>Manager</h3>
    <BioWorkingGroup 
      name="Rachel Kim"
      title="Resource Manager at DevTools Inc"
      description="Leading resource aggregation and curation for the DevRel community."
      linkedin="#"
      twitter="#"
      bluesky="#"
      github="#"
      website="#"
    />
    
    <h3>Contributing Members</h3>
    <div class="members-grid">
      <BioWorkingGroup 
        name="Tom Chen"
        title="Content Strategist"
        description="Specializing in technical documentation and resource organization."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      <BioWorkingGroup 
        name="Lisa Park"
        title="DevRel Consultant"
        description="Expert in community resource development and knowledge sharing."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
    </div>
  </section>

  <section class="working-group">
    <h2>Metrics Reporting</h2>
    <p>Developing frameworks and methodologies for measuring the success and impact of developer relations programs. This group creates standardized metrics, reporting templates, and ROI measurement tools for the DevRel industry.</p>
    <a href="https://github.com/DevRel-Foundation/wg-metrics-reporting" target="_blank" rel="noopener" class="github-link">
      <img src={GitHubIcon} alt="GitHub" class="github-icon" />
      View on GitHub
    </a>
    
    <h3>Manager</h3>
    <BioWorkingGroup 
      name="Mike Rodriguez"
      title="Analytics Director at DataCorp"
      description="Expert in DevRel metrics and data-driven decision making."
      linkedin="#"
      twitter="#"
      bluesky="#"
      github="#"
      website="#"
    />
    
    <h3>Contributing Members</h3>
    <div class="members-grid">
      <BioWorkingGroup 
        name="Sarah Johnson"
        title="Data Analyst"
        description="Specializing in DevRel performance metrics and reporting."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      <BioWorkingGroup 
        name="David Lee"
        title="DevRel Manager"
        description="Focused on measuring community engagement and developer satisfaction."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
    </div>
  </section>

  <section class="working-group">
    <h2>Community Engagement</h2>
    <p>Creating strategies and best practices for building and nurturing developer communities. This group focuses on community management, engagement techniques, and fostering inclusive spaces for developers to connect and grow.</p>
    <a href="https://github.com/DevRel-Foundation/wg-community-engagement-support" target="_blank" rel="noopener" class="github-link">
      <img src={GitHubIcon} alt="GitHub" class="github-icon" />
      View on GitHub
    </a>
    
    <h3>Manager</h3>
    <BioWorkingGroup 
      name="Emma Wilson"
      title="Community Director at DevHub"
      description="Passionate about building inclusive and engaging developer communities."
      linkedin="#"
      twitter="#"
      bluesky="#"
      github="#"
      website="#"
    />
    
    <h3>Contributing Members</h3>
    <div class="members-grid">
      <BioWorkingGroup 
        name="Alex Thompson"
        title="Community Manager"
        description="Expert in community building and developer engagement strategies."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      <BioWorkingGroup 
        name="Priya Singh"
        title="DevRel Specialist"
        description="Focused on creating meaningful connections within developer communities."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
    </div>
  </section>

  <section class="working-group">
    <h2>Innovation & Emerging Trends</h2>
    <p>Exploring new technologies, platforms, and methodologies that are shaping the future of developer relations. This group identifies emerging trends and helps the DevRel community stay ahead of industry changes.</p>
    <a href="https://github.com/DevRel-Foundation/wg-innovation-emerging-trends" target="_blank" rel="noopener" class="github-link">
      <img src={GitHubIcon} alt="GitHub" class="github-icon" />
      View on GitHub
    </a>
    
    <h3>Manager</h3>
    <BioWorkingGroup 
      name="Jordan Smith"
      title="Innovation Lead at TechForward"
      description="Exploring emerging trends and technologies in the DevRel space."
      linkedin="#"
      twitter="#"
      bluesky="#"
      github="#"
      website="#"
    />
    
    <h3>Contributing Members</h3>
    <div class="members-grid">
      <BioWorkingGroup 
        name="Chris Brown"
        title="Technology Evangelist"
        description="Tracking new platforms and tools for developer engagement."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      <BioWorkingGroup 
        name="Maria Garcia"
        title="DevRel Researcher"
        description="Analyzing emerging trends and their impact on developer relations."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
    </div>
  </section>

  <section class="working-group">
    <h2>Structure & Organization</h2>
    <p>Developing organizational frameworks and governance structures for DevRel teams and initiatives. This group creates guidelines for team structures, roles, responsibilities, and organizational best practices.</p>
    <a href="https://github.com/DevRel-Foundation/wg-structure-organization" target="_blank" rel="noopener" class="github-link">
      <img src={GitHubIcon} alt="GitHub" class="github-icon" />
      View on GitHub
    </a>
    
    <h3>Manager</h3>
    <BioWorkingGroup 
      name="Kevin O'Brien"
      title="Organizational Consultant"
      description="Expert in DevRel team structures and organizational design."
      linkedin="#"
      twitter="#"
      bluesky="#"
      github="#"
      website="#"
    />
    
    <h3>Contributing Members</h3>
    <div class="members-grid">
      <BioWorkingGroup 
        name="Nina Patel"
        title="HR Specialist"
        description="Focused on DevRel role definitions and career development paths."
        linkedin="#"
        twitter="#"
        bluesky="#"
        github="#"
        website="#"
      />
      <BioWorkingGroup 
        name="Ryan Davis"
        title="DevRel Director"
        description="Creating organizational frameworks for effective DevRel teams."
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
  .working-group {
    margin-bottom: var(--space-2xl);
  }
  
  .working-group h2 {
    color: var(--color-text);
    margin-bottom: var(--space-s);
    font-size: var(--step-3);
  }
  
  .working-group h3 {
    color: var(--color-text);
    margin-top: var(--space-l);
    margin-bottom: var(--space-s);
    font-size: var(--step-2);
  }
  
  .working-group p {
    color: var(--color-text);
    font-size: var(--step-0);
    line-height: 1.6;
    margin-bottom: var(--space-m);
  }
  
  .github-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-text);
    text-decoration: none;
    font-size: var(--step-0);
    margin-bottom: var(--space-l);
    transition: color 0.2s ease;
  }
  
  .github-link:hover {
    color: var(--color-primary);
  }
  
  .github-icon {
    width: 1.2em;
    height: 1.2em;
  }
  
  .members-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-m);
  }
  
  @media (min-width: 769px) {
    .members-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }
</style> 
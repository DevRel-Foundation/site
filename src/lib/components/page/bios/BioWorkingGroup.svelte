<script>
  const { 
    name, 
    title, 
    description, 
    linkedin = '', 
    twitter = '', 
    bluesky = '', 
    github = '', 
    website = '' 
  } = $props();
  
  import LinkedInIcon from 'iconoir/icons/linkedin.svg';
  import TwitterIcon from 'iconoir/icons/twitter.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import GlobeIcon from 'iconoir/icons/globe.svg';
</script>

<div class="bio-member">
  <img src="/images/steering-committee/tabs.jpg" alt="{name}" class="member-avatar" />
  <div class="member-info">
    <div class="member-name">{name}</div>
    <div class="member-title">{title}</div>
    <div class="member-description">{description}</div>
    <div class="social-links">
      {#if linkedin}
        <a href={linkedin} title="LinkedIn" target="_blank" rel="noopener">
          <img src={LinkedInIcon} alt="LinkedIn" class="social-icon" />
        </a>
      {/if}
      {#if twitter}
        <a href={twitter} title="X (Twitter)" target="_blank" rel="noopener">
          <img src={TwitterIcon} alt="Twitter" class="social-icon" />
        </a>
      {/if}
      {#if bluesky}
        <a href={bluesky} title="Bluesky" target="_blank" rel="noopener">
          <svg class="social-icon" viewBox="0 0 512 452" fill="none" stroke="currentColor" stroke-width="40">
            <path d="M111 30.4c58.7 44.2 121.8 133.9 145 182 23.2-48.1 86.3-137.7 145-182 42.4-31.9 111-56.6 111 22 0 15.7-9 131.8-14.2 150.6-18.3 65.5-84.9 82.2-144.1 72.1 103.5 17.7 129.9 76.2 73 134.8-108 111.2-155.3-27.9-167.4-63.6-3.5-10.3-3-10.5-6.6 0-12.1 35.6-59.3 174.8-167.4 63.6-56.9-58.6-30.6-117.1 73-134.8-59.2 10.1-125.8-6.6-144.1-72.1C9 184.2 0 68.1 0 52.4c0-78.5 68.6-53.9 111-22z"/>
          </svg>
        </a>
      {/if}
      {#if github}
        <a href={github} title="GitHub" target="_blank" rel="noopener">
          <img src={GitHubIcon} alt="GitHub" class="social-icon" />
        </a>
      {/if}
      {#if website}
        <a href={website} title="Website" target="_blank" rel="noopener">
          <img src={GlobeIcon} alt="Website" class="social-icon" />
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .bio-member {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: var(--space-s);
    padding: var(--space-s);
    background-color: var(--color-background-secondary-1);
    border-radius: var(--radius-s);
    border: var(--border-thickness) solid var(--color-background-secondary-2);
    margin-bottom: var(--space-s);
  }
  
  .member-avatar {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-circle);
    object-fit: cover;
    flex-shrink: 0;
    align-self: center;
  }
  
  .member-info {
    flex: 1;
  }
  
  .member-name {
    font-size: var(--step-0);
    color: var(--color-text);
    margin-bottom: var(--space-2xs);
  }
  
  .member-title {
    font-size: var(--step--1);
    color: var(--color-text);
    margin-bottom: var(--space-2xs);
  }
  
  .member-description {
    font-size: var(--step--2);
    color: var(--color-text);
    margin-bottom: var(--space-2xs);
    line-height: 1.3;
  }
  
  .social-links {
    display: flex;
    gap: var(--space-3xs);
  }
  
  .social-icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .social-icon:hover {
    opacity: 1;
  }
  
  @media (min-width: 769px) {
    .bio-member {
      flex-direction: row;
      text-align: left;
    }
    
    .member-avatar {
      align-self: flex-start;
    }
  }
</style> 
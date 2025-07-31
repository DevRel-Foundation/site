<script lang="ts">
  const { 
    name, 
    title, 
    accountabilities, 
    bio = '', 
    linkedin = '', 
    twitter = '', 
    bluesky = '', 
    github = '', 
    website = '',
    discord = '',
    headshot = ''
  } = $props();
  
  import LinkedInIcon from 'iconoir/icons/linkedin.svg';
  import TwitterIcon from 'iconoir/icons/x.svg';
  import GitHubIcon from 'iconoir/icons/github.svg';
  import GlobeIcon from 'iconoir/icons/globe.svg';
  import DiscordIcon from 'iconoir/icons/discord.svg';
  
  let isFlipped = $state(false);
  
  function handleMouseEnter() {
    isFlipped = true;
  }
  
  function handleMouseLeave() {
    isFlipped = false;
  }
</script>

<div 
  class="bio-card-container"
  role="button"
  tabindex="0"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <div class="bio-card {isFlipped ? 'flipped' : ''}">
    <div class="card-side front">
      <img src={headshot || "/images/steering-committee/tabs.jpg"} alt="{name}" class="member-avatar" />
      <div class="member-info">
        <div class="member-name">{name}</div>
        <div class="member-title">{title}</div>
        <div class="member-accountabilities">{accountabilities}</div>
        <div class="social-links">
          {#if linkedin}
            <a href={linkedin} title="LinkedIn" target="_blank" rel="noopener" aria-label="LinkedIn profile for {name}">
              <img src={LinkedInIcon} alt="LinkedIn" class="social-icon" />
            </a>
          {/if}
          {#if twitter}
            <a href={twitter} title="X (Twitter)" target="_blank" rel="noopener" aria-label="Twitter profile for {name}">
              <img src={TwitterIcon} alt="Twitter" class="social-icon" />
            </a>
          {/if}
          {#if bluesky}
            <a href={bluesky} title="Bluesky" target="_blank" rel="noopener" aria-label="Bluesky profile for {name}">
              <svg class="social-icon" viewBox="0 0 512 452" fill="none" stroke="currentColor" stroke-width="40" aria-label="Bluesky">
                <path d="M111 30.4c58.7 44.2 121.8 133.9 145 182 23.2-48.1 86.3-137.7 145-182 42.4-31.9 111-56.6 111 22 0 15.7-9 131.8-14.2 150.6-18.3 65.5-84.9 82.2-144.1 72.1 103.5 17.7 129.9 76.2 73 134.8-108 111.2-155.3-27.9-167.4-63.6-3.5-10.3-3-10.5-6.6 0-12.1 35.6-59.3 174.8-167.4 63.6-56.9-58.6-30.6-117.1 73-134.8-59.2 10.1-125.8-6.6-144.1-72.1C9 184.2 0 68.1 0 52.4c0-78.5 68.6-53.9 111-22z"/>
              </svg>
            </a>
          {/if}
          {#if github}
            <a href={github} title="GitHub" target="_blank" rel="noopener" aria-label="GitHub profile for {name}">
              <img src={GitHubIcon} alt="GitHub" class="social-icon" />
            </a>
          {/if}
          {#if website}
            <a href={website} title="Website" target="_blank" rel="noopener" aria-label="Website for {name}">
              <img src={GlobeIcon} alt="Website" class="social-icon" />
            </a>
          {/if}
          {#if discord}
            <span title="{discord} on Discord" aria-label="{discord} on Discord">
              <img src={DiscordIcon} alt="{discord} on Discord" class="social-icon" />
            </span>
          {/if}
        </div>
      </div>
    </div>
    
    <div class="card-side back">
      <div class="back-content">
        <h3>About {name}</h3>
        <p class="back-bio">
          {bio}
        </p>
        <div class="social-links">
          {#if linkedin}
            <a href={linkedin} title="Visit LinkedIn profile" target="_blank" rel="noopener" aria-label="LinkedIn profile for {name}">
              <img src={LinkedInIcon} alt="Visit LinkedIn profile" class="social-icon" />
            </a>
          {/if}
          {#if twitter}
            <a href={twitter} title="Visit X (Twitter) profile" target="_blank" rel="noopener" aria-label="Twitter profile for {name}">
              <img src={TwitterIcon} alt="Visit X (Twitter) profile" class="social-icon" />
            </a>
          {/if}
          {#if bluesky}
            <a href={bluesky} title="Visit Bluesky profile" target="_blank" rel="noopener" aria-label="Bluesky profile for {name}">
              <svg class="social-icon" viewBox="0 0 512 452" fill="none" stroke="currentColor" stroke-width="40" aria-label="Bluesky">
                <path d="M111 30.4c58.7 44.2 121.8 133.9 145 182 23.2-48.1 86.3-137.7 145-182 42.4-31.9 111-56.6 111 22 0 15.7-9 131.8-14.2 150.6-18.3 65.5-84.9 82.2-144.1 72.1 103.5 17.7 129.9 76.2 73 134.8-108 111.2-155.3-27.9-167.4-63.6-3.5-10.3-3-10.5-6.6 0-12.1 35.6-59.3 174.8-167.4 63.6-56.9-58.6-30.6-117.1 73-134.8-59.2 10.1-125.8-6.6-144.1-72.1C9 184.2 0 68.1 0 52.4c0-78.5 68.6-53.9 111-22z"/>
              </svg>
            </a>
          {/if}
          {#if github}
            <a href={github} title="Visit GitHub profile" target="_blank" rel="noopener" aria-label="GitHub profile for {name}">
              <img src={GitHubIcon} alt="Visit GitHub profile" class="social-icon" />
            </a>
          {/if}
          {#if website}
            <a href={website} title="Visit website" target="_blank" rel="noopener" aria-label="Website for {name}">
              <img src={GlobeIcon} alt="Visit website" class="social-icon" />
            </a>
          {/if}
          {#if discord}
            <span title="{discord} on Discord" aria-label="{discord} on Discord">
              <img src={DiscordIcon} alt="{discord} on Discord" class="social-icon" />
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .bio-card-container {
    perspective: 1000px;
    height: 500px;
  }
  
  .bio-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
    cursor: pointer;
  }
  
  .bio-card.flipped {
    transform: rotateY(180deg);
  }
  
  .card-side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-color: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
    border: var(--border-thickness) solid var(--color-background-secondary-2);
    padding: var(--space-s);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .front {
    transform: rotateY(0deg);
  }
  
  .back {
    transform: rotateY(180deg);
    text-align: center;
  }
  
  .member-avatar {
    width: 120px;
    height: 120px;
    border-radius: var(--radius-circle);
    object-fit: cover;
    margin: 0 auto var(--space-s);
    border: 8px solid var(--color-link);
  }
  
  .member-info {
    text-align: center;
  }
  
  .member-name {
    font-size: var(--step-1);
    color: var(--color-text);
    margin-bottom: var(--space-2xs);
  }
  
  .member-title {
    font-size: var(--step-0);
    color: var(--color-text);
    margin-bottom: var(--space-xs);
    font-weight: 800;
  }
  
  .member-accountabilities {
    font-size: var(--step--1);
    color: var(--color-text);
    margin-bottom: var(--space-s);
    line-height: 1.4;
    min-height: calc(var(--step--1) * 1.4 * 6);
    display: flex;
    align-items: flex-start;
  }
  
  .social-links {
    display: flex;
    gap: var(--space-2xs);
    justify-content: center;
  }
  
  .social-icon {
    width: 24px;
    height: 24px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    filter: var(--icon-filter);
  }
  
  .social-icon:hover {
    opacity: 1;
  }
  
  .back-content {
    padding: var(--space-xs);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
  }
  
  .back-content h3 {
    color: var(--color-text);
    margin-bottom: var(--space-s);
    margin-top: 0;
    font-size: var(--step-0);
    text-align: center;
    margin-top: 0;
  }
  
  .back-bio {
    color: var(--color-text);
    font-size: var(--step--1);
    line-height: 1.4;
    margin-bottom: var(--space-m);
    flex-grow: 1;
  }
</style>
<script>
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import LinkedInIcon from 'iconoir/icons/regular/linkedin.svg';
  import GitHubIcon from 'iconoir/icons/regular/github.svg';
</script>

<footer>
  <div class="footer-content">
    <div class="footer-column">
      <h2>Join us</h2>
      <div class="social-icons">
        <a href="https://discord.gg/devrel" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord">
          <img src={DiscordIcon} alt="Discord" />
        </a>
        <a href="https://linkedin.com/company/devrel-foundation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
          <img src={LinkedInIcon} alt="LinkedIn" />
        </a>
        <a href="https://github.com/devrel-foundation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on GitHub">
          <img src={GitHubIcon} alt="GitHub" />
        </a>
      </div>
    </div>
    
    <div class="footer-column">
      <h2>About</h2>
      <a href="/about#about">About DRF</a>
      <a href="/about#steering-committee">Steering Committee</a>
      <a href="/about#charter">Charter</a>
      <a href="/working-groups">Working Group members</a>
      <a href="https://github.com/DevRel-Foundation/governance/blob/main/code_of_conduct.md">Code of Conduct</a>
    </div>
    
    <div class="footer-column">
      <h2>Community</h2>
      <a href="#">Get started</a>
      <a href="#">Meetings and Calendar</a>
      <a href="#">Events</a>
    </div>
    
    <div class="footer-column">
      <h2>Resources</h2>
      <a href="#">Gimme some links??</a>
      <a href="#">Use Cases</a>
      <a href="#">Brand/Style Guidebook</a>
    </div>
  </div>
  
  
  <div class="legal-notice container-content">
    <hr />
    <p>
      All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. 
      See the <a href="https://www.linuxfoundation.org/legal/trademark-usage" target="_blank" rel="noopener noreferrer">LF Trademark Usage</a> page for a list of trademarks. 
      Linux is a registered trademark of Linus Torvalds: 
      <a href="https://www.linuxfoundation.org/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and 
      <a href="https://www.linuxfoundation.org/legal/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>.
    </p>
  </div>
</footer> 

<style>
  footer {
    background-color: var(--color-background-secondary-1);
    padding: var(--space-xl) var(--space-m);
    border-top: var(--border-thickness) solid var(--color-background-secondary-1);
  }

  .footer-content {
    max-width: var(--grid-max-width);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-l);
  }
  
  .footer-column h2 {
    color: var(--color-text);
    font-size: var(--step-1);
    margin-bottom: var(--space-s);
  }
  
  .footer-column p {
    color: var(--color-text);
    font-size: var(--step-0);
    margin-bottom: var(--space-xs);
  }
  
  .footer-column a {
    color: var(--color-link);
    text-decoration: none;
    font-size: var(--step--1);
    display: block;
    margin-bottom: var(--space-2xs);
  }
  
  .social-icons {
    display: flex;
    gap: var(--space-s);
  }
  
  .social-icons a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-icons img {
    filter: var(--icon-filter);
  }
  
  @media (min-width: 481px) {
    .footer-content {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-m);
    }
  }
  
  @media (min-width: 769px) {
    .footer-content {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: var(--space-l);
    }
  }
  
  hr {
    border: none;
    border-top: var(--border-thickness) solid var(--color-background-secondary-1);
    margin: var(--space-l) 0;
  }
  
  .legal-notice {
    text-align: center;
    margin-top: var(--space-m);
  }
  
  .legal-notice p {
    color: var(--color-text-secondary);
    font-size: var(--step--2);
    line-height: 1.4;
    margin: 0;
  }
  
  .legal-notice a {
    color: var(--color-link);
    text-decoration: none;
  }
  
  .legal-notice a:hover {
    text-decoration: underline;
  }
</style>
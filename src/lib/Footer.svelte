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
      <a href="#">About DRF</a>
      <a href="#">Steering Committee</a>
      <a href="#">Managers</a>
      <a href="#">Working Group members</a>
      <a href="#">Charter</a>
      <a href="#">Code of Conduct</a>
      <a href="#">Q&A</a>
      <a href="#">Brand</a>
    </div>
    
    <div class="footer-column">
      <h2>Community</h2>
      <a href="#">Get started</a>
      <a href="#">Meetings and Calendar</a>
      <a href="#">Events</a>
    </div>
    
    <div class="footer-column">
      <h2>Resources</h2>
      <a href="#">Glossary</a>
      <a href="#">Use Cases</a>
      <a href="#">Brand/Style Guidebook</a>
    </div>
  </div>
</footer> 

<style>
  footer {
    background-color: var(--color-background-secondary-2);
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
</style>
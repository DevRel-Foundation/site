<script>
  import DiscordIcon from 'iconoir/icons/regular/discord.svg';
  import LinkedInIcon from 'iconoir/icons/regular/linkedin.svg';
  import GitHubIcon from 'iconoir/icons/regular/github.svg';
  import MailIcon from 'iconoir/icons/regular/mail.svg';
</script>

<footer>
  <div class="footer-content">

    
    <div class="footer-column">
      <h2>About</h2>
      <a href="/about/mission">About DevRel Foundation</a>
      <a href="/about/steering-committee">Steering Committee</a>
      <a href="/about/working-groups">Working Groups</a>
      <a href="https://github.com/DevRel-Foundation/governance/blob/main/Technical_Charter.adoc" target="_blank" rel="noopener noreferrer">Charter ↗</a>
    </div>
    
    <div class="footer-column">
      <h2>Resources</h2>
      <a href="/blog">Blog</a>
      <a href="/projects">Projects</a>
      <a href="https://github.com/DevRel-Foundation/drf-branding" target="_blank" rel="noopener noreferrer">Brand Guidelines ↗</a>
    </div>

    <div class="footer-column">
      <h2>Find Us</h2>
      <div class="social-icons">
        <a href="https://discord.gg/kfJkJ3Xd" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord">
          <img src={DiscordIcon} alt="Discord" />
        </a>
        <a href="https://linkedin.com/company/devrel-foundation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
          <img src={LinkedInIcon} alt="LinkedIn" />
        </a>
        <a href="https://github.com/devrel-foundation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on GitHub">
          <img src={GitHubIcon} alt="GitHub" />
        </a>
        <a href="https://lists.dev-rel.org/g/community" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to Community Group">
          <img src={MailIcon} alt="Mail" />
        </a>
      </div>
    </div>

  </div>
  
  
  <div class="legal-notice">
    <hr />
    <p>
      Copyright © 2024 The Linux Foundation® .
      
      <br />

      All rights reserved. 
      
      The Linux Foundation has registered trademarks and uses trademarks. 
      
      <br />

      For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/legal/trademark-usage" target="_blank" rel="noopener noreferrer">Trademark Usage</a>  page. Linux is a registered trademark of Linus Torvalds. 

      <br />

      <a href="/privacy">Privacy Policy</a> • 
      <a href="https://github.com/DevRel-Foundation/governance/blob/main/code_of_conduct.md" target="_blank" rel="noopener noreferrer">Code of Conduct</a>
    </p>
  </div>
</footer> 

<style>
  footer {
    background-color: var(--color-background-secondary-1);
    padding: var(--space-s) var(--space-m);
    border-top: var(--border-thickness) solid var(--color-background-secondary-1);
  }

  .footer-content {
    max-width: var(--grid-max-width);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-m);
  }
  
  .footer-column h2 {
    color: var(--color-text);
    font-size: var(--step-1);
    margin-bottom: var(--space-s);
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
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--space-l);
      justify-items: center;
    }
  }
  
  hr {
    border: none;
    border-top: var(--border-thickness) solid var(--color-background-secondary-1);
    margin: var(--space-s) 0 var(--space-2xs) 0;
  }
  
  .legal-notice {
    text-align: center;
    max-width: var(--grid-max-width);
    margin: 0 auto;
    padding: 0 var(--space-xl);
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
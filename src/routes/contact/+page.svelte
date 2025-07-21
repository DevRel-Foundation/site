<svelte:head>
  <title>Contact | Developer Relations Foundation</title>
</svelte:head>

<script>
  const emailContacts = [
    { label: "General", email: "info@dev-rel.org" },
    { label: "Steering Committee", email: "steering-committee@dev-rel.org" },
    { label: "Code of Conduct", email: "conduct@dev-rel.org" }
  ];

  const gettingHelp = [
    { label: "LFX Project Control Center Support (Meetings)", url: "https://lfx.linuxfoundation.org/services/request" },
    { label: "Report a Website Issue", url: "https://github.com/DevRel-Foundation/site/issues" },
    { label: "Give Feedback on Discord (Chat)", url: "https://discord.gg/kfJkJ3Xd" },
    { label: "Give Feedback on GitHub Discussions (Forum)", url: "https://github.com/DevRel-Foundation/governance/discussions" },
  ];
</script>

<div class="container container-content">
  <h1>Contact Us</h1>
  <p>
    Have a question or looking to get involved? Reach out to us through email or explore our quick links for helpful resources
  </p>

  <div class="cards-wrapper">
    <div class="section">
      <h2>Email Inquiries</h2>
      <div class="card">
        <ul class="contact-list">
          {#each emailContacts as contact}
            <li>
              <span class="contact-label">{contact.label}</span>
              <a class="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="section">
      <h2>Getting Help</h2>
      <div class="card">
        <ul class="contact-list">
          {#each gettingHelp as link}
            <li><a href={link.url} target="_blank">{link.label}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    padding: var(--space-s);
    margin-top: var(--space-s);
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-l);
    margin-top: var(--space-l);
  }

  .card {
    border: 1px solid var(--color-light-gray);
    border-radius: 8px;
    padding: var(--space-s);
    background-color: var(--color-background-secondary-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  h2 {
    margin-top: var(--space-xs);
  }

  .contact-list {
    list-style: none;
    padding-left: 0;
    font-size: var(--step-0);
    margin: 0;
  }

  .contact-list li {
    margin-bottom: var(--space-xs);
    display: flex;
    flex-direction: column;
  }

  .contact-label {
    font-weight: bold;
    color: var(--color-text);
    margin-bottom: 0.1rem;
  }

  .contact-email {
    color: var(--color-link);
    font-family: monospace;
    font-size: var(--step--1);
  }

  @media (max-width: 768px) {
    .cards-wrapper {
      grid-template-columns: 1fr;
    }
  }
</style>

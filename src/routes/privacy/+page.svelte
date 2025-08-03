<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Privacy Policy | DevRel Foundation</title>
  <meta name="description" content="DevRel Foundation privacy policy and data protection information" />
</svelte:head>

<div class="container container-content">
  <header class="page-header">
    <h1>Privacy Policy</h1>
    <p class="subtitle">How we protect and handle your personal information</p>
  </header>

  <div class="content">
    <section>
      <h2>Information We Collect</h2>
      <p>We collect information to provide better services to our users and community members:</p>
      <ul>
        <li><strong>Analytics Data:</strong> We use PostHog to collect anonymized usage analytics, including page views, interactions, and performance metrics</li>
        <li><strong>Email Addresses:</strong> When you subscribe to our mailing list, we collect your email address</li>
        <li><strong>Cookies:</strong> We use essential cookies for site functionality and analytics cookies (with your consent)</li>
      </ul>
    </section>

    <section>
      <h2>How We Use Your Information</h2>
      <ul>
        <li><strong>Analytics:</strong> To understand how our site is used and improve user experience</li>
        <li><strong>Communications:</strong> To send you updates about the DevRel Foundation (only if you subscribe)</li>
        <li><strong>Site Functionality:</strong> To ensure our website works properly and securely</li>
      </ul>
    </section>

    <section>
      <h2>Your Rights and Choices</h2>
      <p>You have control over your personal information:</p>
      <ul>
        <li><strong>Cookie Consent:</strong> You can accept or reject analytics cookies via our consent banner</li>
        <li><strong>Mailing List:</strong> You can unsubscribe from our mailing list at any time</li>
        <li><strong>Data Access:</strong> You can request access to your personal data by contacting us</li>
        <li><strong>Data Deletion:</strong> You can request deletion of your personal data</li>
      </ul>
    </section>

    <section>
      <h2>Data Protection</h2>
      <p>We take appropriate measures to protect your personal information:</p>
      <ul>
        <li>All data is transmitted over secure HTTPS connections</li>
        <li>Analytics data is anonymized and aggregated</li>
        <li>We only collect data that is necessary for our stated purposes</li>
        <li>We do not sell or share your personal information with third parties for marketing purposes</li>
      </ul>
    </section>

    <section>
      <h2>Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li><strong>PostHog:</strong> For analytics and user experience insights (<a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">PostHog Privacy Policy</a>)</li>
        <li><strong>Netlify:</strong> For website hosting (<a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify Privacy Policy</a>)</li>
        <li><strong>Groups.io:</strong> For mailing list management (<a href="https://groups.io/static/privacy" target="_blank" rel="noopener noreferrer">Groups.io Privacy Policy</a>)</li>
      </ul>
    </section>

    <section>
      <h2>Cookie Policy</h2>
      <p>We use cookies to enhance your experience:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for basic site functionality (these cannot be disabled)</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how you use our site (these require your consent)</li>
      </ul>
      <p>You can manage your cookie preferences through our consent banner or your browser settings.</p>
    </section>

    <section>
      <h2>Updates to This Policy</h2>
      <p>We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>
      <p><strong>Last updated:</strong> August 2025</p>
    </section>

    <section>
      <h2>Contact Us</h2>
      <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
      <ul>
        <li><strong>Email:</strong> website@dev-rel.org</li>
        <li><strong>GitHub:</strong> <a href="https://github.com/DevRel-Foundation/site/issues" target="_blank" rel="noopener noreferrer">Create an issue</a></li>
      </ul>
    </section>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-l);
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-2xl);
  }

  .page-header h1 {
    font-size: var(--step-4);
    color: var(--color-text);
    margin-bottom: var(--space-s);
  }

  .subtitle {
    font-size: var(--step-0);
    color: var(--color-text-secondary);
    margin: 0;
  }

  .content section {
    margin-bottom: var(--space-xl);
  }

  .content h2 {
    font-size: var(--step-2);
    color: var(--color-mint-dark);
    margin-bottom: var(--space-m);
    border-bottom: 2px solid var(--color-background-secondary-2);
    padding-bottom: var(--space-xs);
  }

  .content p {
    line-height: 1.6;
    margin-bottom: var(--space-m);
    color: var(--color-text);
  }

  .content ul {
    margin-bottom: var(--space-m);
    padding-left: var(--space-l);
  }

  .content li {
    margin-bottom: var(--space-xs);
    line-height: 1.6;
    color: var(--color-text);
  }

  .content a {
    color: var(--color-mint-dark);
    text-decoration: underline;
  }

  .content a:hover {
    color: var(--color-mint);
  }

  .content strong {
    color: var(--color-text);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .container {
      padding: var(--space-l) var(--space-m);
    }
    
    .page-header h1 {
      font-size: var(--step-3);
    }
  }
</style>

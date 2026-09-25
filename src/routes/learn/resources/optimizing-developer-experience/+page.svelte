<script lang="ts">
  import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import { CtaButton } from '$lib/components/ui/primitives';
  import { devExReport as report } from '$lib/research';
</script>

<svelte:head>
  <link rel="canonical" href="https://dev-rel.org/learn/resources/optimizing-developer-experience" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={report.title} />
  <meta property="og:description" content={report.description} />
  <meta property="og:url" content={`https://dev-rel.org${report.href}`} />
  <meta property="og:image" content={`https://dev-rel.org${report.cover}`} />
  <meta property="og:image:alt" content={`Cover of ${report.title}`} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<InfoPage title={report.title} description={report.description}
  breadcrumbs={[{ label: 'Research & resources', link: '/learn/resources' }]}>
  <div class="report-intro">
    <img src={report.cover} alt={`Cover of ${report.title}`} width="1188" height="918" />
    <div>
      <p class="subtitle">{report.subtitle}</p>
      <p><strong>{report.author}</strong>, Volvo Cars<br />Foreword by Arun Gupta, NVIDIA</p>
      <p>{report.date} · {report.format}</p>
      <p>Published by The Linux Foundation with the Developer Relations Foundation.</p>
      <CtaButton href={report.pdf}>Read the report (PDF)</CtaButton>
      <p class="download"><a href={report.pdf} download>Download the PDF</a></p>
    </div>
  </div>

  <h2>About the report</h2>
  <p>{report.description}</p>
  <p>This report focuses on the experience of an enterprise's own engineers as they build and deliver software. If you work in developer relations, it can help you collaborate with engineering and platform teams on developer onboarding, documentation, feedback, and tooling.</p>

  <h2>What you will find</h2>
  <ul>
    <li>A framework for reducing workflow friction, improving tooling and infrastructure, and supporting engineering culture.</li>
    <li>Practical approaches to documentation, onboarding, knowledge sharing, and developer feedback.</li>
    <li>Metrics spanning delivery, satisfaction, collaboration, code quality, productivity, and tooling.</li>
    <li>Guidance on reading metrics as team trends and allowing time for improvements to produce results.</li>
  </ul>

  <h2>Attribution and reuse</h2>
  <p>Copyright © 2026 The Linux Foundation. The report and cover are licensed under <a href="https://creativecommons.org/licenses/by-nd/4.0/">Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)</a>.</p>
  <p>Author and affiliation details are as published in the report. See the PDF for references and its suggested citation.</p>
  <p><a href="/learn/resources">← Browse research & resources</a></p>
</InfoPage>

<style>
  p {
    margin-bottom: var(--space-s);
  }
  .report-intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: var(--space-l);
    align-items: start;
    margin-bottom: var(--space-l);
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  .subtitle {
    font-size: var(--step-1);
  }
  .download {
    margin-top: var(--space-s);
  }
  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: var(--space-l);
  }
  li {
    margin-bottom: var(--space-xs);
  }
  @media (max-width: 768px) {
    .report-intro {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>

<script lang="ts">
  import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';
  import { CtaButton } from '$lib/components/ui/primitives';
  import { devExReport as report } from '$lib/research';
</script>

<InfoPage
  title="Research & resources"
  description="Explore research and practical resources to support your work in developer relations and developer experience."
>
  <p>Explore research and practical resources to support your work in developer relations and developer experience.</p>
  <article class="report-card">
    <a href={report.href} aria-label={`Read about ${report.title}`}>
      <img src={report.cover} alt={`Cover of ${report.title}`} width="1188" height="918" />
    </a>
    <div>
      <p class="eyebrow">Research report · {report.date}</p>
      <h2><a href={report.href}>{report.title}</a></h2>
      <p>{report.description}</p>
      <p>{report.author} · Foreword by Arun Gupta</p>
      <CtaButton href={report.href}>Explore the report →</CtaButton>
    </div>
  </article>
  <p class="related">Looking for community-maintained tools and frameworks? <a href="/projects">Explore DevRel Foundation projects</a>.</p>
</InfoPage>

<style>
  p {
    margin-bottom: var(--space-s);
  }
  .report-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
    gap: var(--space-l);
    padding: var(--space-m);
    margin-block: var(--space-l);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--space-xs);
    background: var(--color-background-secondary-1);
    align-items: start;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  h2 {
    margin-top: 0;
    font-size: var(--step-2);
  }
  .eyebrow {
    color: var(--color-text-secondary);
    font-size: var(--step--1);
  }
  .related {
    margin-top: var(--space-l);
  }
  @media (max-width: 768px) {
    .report-card {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>

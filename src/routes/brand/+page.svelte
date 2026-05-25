<script lang="ts">
  import VoiceAndTone from './voice-and-tone.md';
  import ScrollSidebarLayout from '$lib/components/ui/organisms/ScrollSidebarLayout.svelte';
  import type { ScrollSidebarItem } from '$lib/scroll-sidebar';

  const sidebarItems: ScrollSidebarItem[] = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#color-palette', label: 'Color palette' },
    { href: '#state-colors', label: 'State colors' },
    { href: '#typography', label: 'Typography' },
    { href: '#logo-usage', label: 'Logo usage' },
    { href: '#motifs-and-patterns', label: 'Motifs and patterns' },
    { href: '#spacing-system', label: 'Spacing system' },
    { href: '#image-guidelines', label: 'Image guidelines' },
    { href: '#voice-and-tone', label: 'Voice and tone' }
  ];

  const backgroundLight = [
    { name: 'Primary background', variable: '--color-background', hex: '#FFFEF8', rgb: '255, 254, 248', cmyk: '0%, 0%, 3%, 0%', hsl: '48, 100%, 98%', swatch: 'var(--color-background)' },
    { name: 'Secondary background 1', variable: '--color-background-secondary-1', hex: '#F7F4E1', rgb: '247, 244, 225', cmyk: '0%, 1%, 9%, 3%', hsl: '48, 61.8%, 94%', swatch: 'var(--color-background-secondary-1)' },
    { name: 'Secondary background 2', variable: '--color-background-secondary-2', hex: '#F0EFEA', rgb: '240, 239, 234', cmyk: '0%, 0%, 3%, 6%', hsl: '48, 13%, 92%', swatch: 'var(--color-background-secondary-2)' }
  ];

  const backgroundDark = [
    { name: 'Primary background', variable: '--color-background-dark', hex: '#10100C', rgb: '16, 16, 12', cmyk: '—', hsl: '60, 3.2%, 6.1%', swatch: 'var(--color-background-dark)' },
    { name: 'Secondary background 1', variable: '--color-background-secondary-1-dark', hex: '#1B1B15', rgb: '27, 27, 21', cmyk: '—', hsl: '60, 5.2%, 9.9%', swatch: 'var(--color-background-secondary-1-dark)' },
    { name: 'Secondary background 2', variable: '--color-background-secondary-2-dark', hex: '#2C2B24', rgb: '44, 43, 36', cmyk: '—', hsl: '60, 8.4%, 16%', swatch: 'var(--color-background-secondary-2-dark)' }
  ];

  const accentLight = [
    { name: 'Mint', variable: '--color-mint', hex: '#c8ecad', rgb: '200, 236, 173', cmyk: '—', hsl: '90, 65%, 81%', swatch: 'var(--color-mint)' },
    { name: 'Sky', variable: '--color-sky', hex: '#d8f7ff', rgb: '216, 247, 255', cmyk: '—', hsl: '193, 100%, 92%', swatch: 'var(--color-sky)' },
    { name: 'Agave', variable: '--color-agave', hex: '#d3f9f0', rgb: '211, 249, 240', cmyk: '—', hsl: '168, 85%, 91%', swatch: 'var(--color-agave)' },
    { name: 'Sand', variable: '--color-sand', hex: '#fff5d6', rgb: '255, 245, 214', cmyk: '—', hsl: '41.9, 100%, 91.6%', swatch: 'var(--color-sand)' }
  ];

  const accentDark = [
    { name: 'Forest', variable: '--color-forest', hex: '#0F1E01', rgb: '15, 30, 1', cmyk: '—', hsl: '91, 93.5%, 6.1%', swatch: 'var(--color-forest)' },
    { name: 'Sea', variable: '--color-sea', hex: '#0a313c', rgb: '10, 49, 60', cmyk: '—', hsl: '193, 72%, 14%', swatch: 'var(--color-sea)' },
    { name: 'Hosta', variable: '--color-hosta', hex: '#15372f', rgb: '21, 55, 47', cmyk: '—', hsl: '168, 63%, 14%', swatch: 'var(--color-hosta)' },
    { name: 'Gold', variable: '--color-gold', hex: '#6B4F1B', rgb: '107, 79, 27', cmyk: '—', hsl: '41.7, 74.5%, 21.6%', swatch: 'var(--color-gold)' }
  ];

  const typographyLight = [
    { name: 'Main text', variable: '--color-text', hex: '#515151', rgb: '81, 81, 81', cmyk: '0%, 0%, 0%, 68%', hsl: '0, 0%, 32%', swatch: 'var(--color-text)' },
    { name: 'Link color', variable: '--color-link', hex: '#174027', rgb: '23, 64, 39', cmyk: '64%, 0%, 39%, 75%', hsl: '140, 38.2%, 18%', swatch: 'var(--color-link)' }
  ];

  const typographyDark = [
    { name: 'Main text', variable: '--color-text-dark', hex: '#E9E8E1', rgb: '233, 232, 225', cmyk: '—', hsl: '60, 20%, 91%', swatch: 'var(--color-text-dark)' },
    { name: 'Link color', variable: '--color-link-dark', hex: '#c8ecad', rgb: '200, 236, 173', cmyk: '36%, 0%, 19%, 14%', hsl: '90, 65%, 81%', swatch: 'var(--color-link-dark)' }
  ];

  const stateLight = [
    { name: 'Success (surface)', variable: '--color-success', hex: '#D1FAE5', rgb: '209, 250, 229', cmyk: '—', hsl: '152, 76%, 90%', swatch: 'var(--color-success)' },
    { name: 'Success (text)', variable: '--color-success-text', hex: '#065F46', rgb: '6, 95, 70', cmyk: '—', hsl: '166, 91%, 20%', swatch: 'var(--color-success-text)' },
    { name: 'Success (border)', variable: '--color-success-border', hex: '#9DE0BD', rgb: '157, 224, 189', cmyk: '—', hsl: '152, 55%, 78%', swatch: 'var(--color-success-border)' },
    { name: 'Warning (surface)', variable: '--color-warning', hex: '#FFF5D6', rgb: '255, 245, 214', cmyk: '—', hsl: '41.9, 100%, 91.6%', swatch: 'var(--color-warning)' },
    { name: 'Warning (text)', variable: '--color-warning-text', hex: '#814F0E', rgb: '129, 79, 14', cmyk: '—', hsl: '32, 80%, 28%', swatch: 'var(--color-warning-text)' },
    { name: 'Warning (border)', variable: '--color-warning-border', hex: '#F2D49E', rgb: '242, 212, 158', cmyk: '—', hsl: '41, 85%, 75%', swatch: 'var(--color-warning-border)' },
    { name: 'Error (surface)', variable: '--color-error', hex: '#FEE2E2', rgb: '254, 226, 226', cmyk: '—', hsl: '0, 93%, 94%', swatch: 'var(--color-error)' },
    { name: 'Error (text)', variable: '--color-error-text', hex: '#991B1B', rgb: '153, 27, 27', cmyk: '—', hsl: '0, 72%, 35%', swatch: 'var(--color-error-text)' },
    { name: 'Error (border)', variable: '--color-error-border', hex: '#F9C5C5', rgb: '249, 197, 197', cmyk: '—', hsl: '0, 70%, 85%', swatch: 'var(--color-error-border)' },
    { name: 'Info (surface)', variable: '--color-info', hex: '#D8F7FF', rgb: '216, 247, 255', cmyk: '—', hsl: '193, 100%, 92%', swatch: 'var(--color-info)' },
    { name: 'Info (text)', variable: '--color-info-text', hex: '#0A313C', rgb: '10, 49, 60', cmyk: '—', hsl: '193, 72%, 14%', swatch: 'var(--color-info-text)' },
    { name: 'Info (border)', variable: '--color-info-border', hex: '#A8DFF0', rgb: '168, 223, 240', cmyk: '—', hsl: '193, 70%, 80%', swatch: 'var(--color-info-border)' },
    { name: 'Syntax string (code)', variable: '--color-syntax-string', hex: '#814F0E', rgb: '129, 79, 14', cmyk: '—', hsl: '32, 80%, 28%', swatch: 'var(--color-syntax-string)' }
  ];

  const stateDark = [
    { name: 'Success (surface)', variable: '--color-success-dark', hex: '#1E3318', rgb: '30, 51, 24', cmyk: '—', hsl: '90, 35%, 16%', swatch: 'var(--color-success-dark)' },
    { name: 'Success (text)', variable: '--color-success-text-dark', hex: '#C8ECAD', rgb: '200, 236, 173', cmyk: '—', hsl: '90, 65%, 81%', swatch: 'var(--color-success-text-dark)' },
    { name: 'Success (border)', variable: '--color-success-border-dark', hex: '#3D6B27', rgb: '61, 107, 39', cmyk: '—', hsl: '90, 45%, 28%', swatch: 'var(--color-success-border-dark)' },
    { name: 'Warning (surface)', variable: '--color-warning-dark', hex: '#452E17', rgb: '69, 46, 23', cmyk: '—', hsl: '41.7, 50%, 18%', swatch: 'var(--color-warning-dark)' },
    { name: 'Warning (text)', variable: '--color-warning-text-dark', hex: '#FFF5D6', rgb: '255, 245, 214', cmyk: '—', hsl: '41.9, 100%, 91.6%', swatch: 'var(--color-warning-text-dark)' },
    { name: 'Warning (border)', variable: '--color-warning-border-dark', hex: '#7A5220', rgb: '122, 82, 32', cmyk: '—', hsl: '41.7, 55%, 30%', swatch: 'var(--color-warning-border-dark)' },
    { name: 'Error (surface)', variable: '--color-error-dark', hex: '#421919', rgb: '66, 25, 25', cmyk: '—', hsl: '0, 45%, 18%', swatch: 'var(--color-error-dark)' },
    { name: 'Error (text)', variable: '--color-error-text-dark', hex: '#F9D2D2', rgb: '249, 210, 210', cmyk: '—', hsl: '0, 75%, 88%', swatch: 'var(--color-error-text-dark)' },
    { name: 'Error (border)', variable: '--color-error-border-dark', hex: '#632B2B', rgb: '99, 43, 43', cmyk: '—', hsl: '0, 40%, 28%', swatch: 'var(--color-error-border-dark)' },
    { name: 'Info (surface)', variable: '--color-info-dark', hex: '#142D36', rgb: '20, 45, 54', cmyk: '—', hsl: '193, 50%, 16%', swatch: 'var(--color-info-dark)' },
    { name: 'Info (text)', variable: '--color-info-text-dark', hex: '#D8F7FF', rgb: '216, 247, 255', cmyk: '—', hsl: '193, 100%, 92%', swatch: 'var(--color-info-text-dark)' },
    { name: 'Info (border)', variable: '--color-info-border-dark', hex: '#275566', rgb: '39, 85, 102', cmyk: '—', hsl: '193, 45%, 28%', swatch: 'var(--color-info-border-dark)' },
    { name: 'Syntax string (code)', variable: '--color-syntax-string-dark', hex: '#FFF5D6', rgb: '255, 245, 214', cmyk: '—', hsl: '41.9, 100%, 91.6%', swatch: 'var(--color-syntax-string-dark)' }
  ];

  const colorCombinationItems = [
    {
      id: 'mint-text',
      previewClass: 'mint-bg',
      elementClass: '',
      text: 'This combination is good for larger text blocks.',
      label: 'Text on mint'
    },
    {
      id: 'sand-button',
      previewClass: '',
      elementClass: 'sand-bg',
      text: 'Click me',
      label: 'Sand button'
    },
    {
      id: 'sky-border',
      previewClass: 'sky-bg text-border',
      elementClass: '',
      text: 'Sentence on sky with a text-colored border.',
      label: 'Text with border on sky'
    },
    {
      id: 'agave-border',
      previewClass: 'agave-bg text-border',
      elementClass: '',
      text: 'Sentence on agave with a text-colored border.',
      label: 'Text with border on agave'
    }
  ];

  let copiedKey = $state<string | null>(null);
  let copyTimeout: ReturnType<typeof setTimeout> | undefined;

  async function copyValue(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      copiedKey = key;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        if (copiedKey === key) copiedKey = null;
      }, 1500);
    } catch {
      /* clipboard unavailable */
    }
  }
</script>

<ScrollSidebarLayout
  items={sidebarItems}
  navLabel="Brand guide sections"
  sidebarTitle="On this page"
  class="brand-page-layout"
>
  {#snippet header()}
    <div class="container brand-page brand-page__header">
      <h1>Brand guidelines</h1>
    </div>
  {/snippet}

  <div class="container brand-page">
    <p>
      Representing the DevRel Foundation brand in public should be done with care and consistency. Please
      <a href="/contact">contact us</a> for permission and guidance on using brand assets.
    </p>

    <h2 id="introduction">Introduction</h2>
  <p>
    The Developer Relations Foundation (also DevRel Foundation or DRF) is a community-driven organisation that supports
    the global developer relations community. We value growth, support, community, collaboration, and adaptability.
  </p>
  <p>
    Our visual identity draws inspiration from typical imagery associated with growth (nature), adaptability (water),
    and physical documents as a nod towards strategy and planning. We embrace concepts like the golden ratio and
    rounded, fluid forms as well as stationery-like motifs.
  </p>

  <h2 id="color-palette">Color palette</h2>
  <p>
    Our color palette is designed to be accessible, warm, and professional. The system adapts seamlessly between light
    and dark modes.
  </p>

  <h3>Background colors</h3>
  <p>
    The primary background color should be used as the main canvas for content. Secondary background colors provide
    subtle contrast for alternating sections, cards, and UI elements.
  </p>
  <ul>
    <li><strong>Primary background:</strong> Main canvas for content, default page background</li>
    <li><strong>Secondary background 1:</strong> Alternating sections, subtle contrast areas</li>
    <li><strong>Secondary background 2:</strong> Cards, form fields, highlighted content boxes</li>
  </ul>

  <div class="color-mode-container color-mode-container--light">
    <h4>Light mode</h4>
    <table class="palette-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Swatch</th>
          <th>Variable</th>
          <th>HEX</th>
          <th>RGB</th>
          <th>CMYK</th>
          <th>HSL</th>
        </tr>
      </thead>
      <tbody>
        {#each backgroundLight as row (row.variable)}
          <tr>
            <td>{row.name}</td>
            <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                <span class="copy-value-text">{row.variable}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                <span class="copy-value-text">{row.hex}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                <span class="copy-value-text">{row.rgb}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                <span class="copy-value-text">{row.cmyk}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                <span class="copy-value-text">{row.hsl}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="color-mode-container color-mode-container--dark">
    <h4>Dark mode</h4>
    <table class="palette-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Swatch</th>
          <th>Variable</th>
          <th>HEX</th>
          <th>RGB</th>
          <th>CMYK</th>
          <th>HSL</th>
        </tr>
      </thead>
      <tbody>
        {#each backgroundDark as row (row.variable)}
          <tr>
            <td>{row.name}</td>
            <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                <span class="copy-value-text">{row.variable}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                <span class="copy-value-text">{row.hex}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                <span class="copy-value-text">{row.rgb}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                <span class="copy-value-text">{row.cmyk}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                <span class="copy-value-text">{row.hsl}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <h3>Accent colors</h3>
  <p>Our accent colors should be used strategically to draw attention to important elements and actions.</p>
  <ul>
    <li><strong>Mint & forest:</strong> Primary green accent pair; mint in light mode, forest in dark mode.</li>
    <li><strong>Sky & sea:</strong> Blue accent pair for highlights and secondary emphasis.</li>
    <li><strong>Agave & hosta:</strong> Teal accent pair — use in small amounts.</li>
    <li><strong>Sand & gold:</strong> Warm accent pair — use sparingly.</li>
  </ul>
  <p>
    Any page should mostly consist of background and text colors, using accent colors to highlight information as
    required. On any page, mint/forest and sky/sea should make up the majority of the accent colors.
  </p>
  <p>
    Light mode should feature the lighter colors as background colors for accentuated elements. Conversely, dark mode
    should feature the darker colors as background colors for accentuated elements. These can be swapped for minor
    highlighting.
  </p>
  <div class="highlight-box accent-usage-note">
    <h4>Button and accent usage</h4>
    <ul>
      <li>
        <strong>Buttons:</strong> Limit button fills to the first two accent colours — <strong>mint</strong> and
        <strong>sky</strong>. Do not use agave, hosta, sand, or gold for buttons.
      </li>
      <li>
        <strong>Sky & sea:</strong> The blue accent pair is for accents only — tags, highlights, borders, and small
        emphasis — not for page backgrounds, large text areas, or replacing mint/forest as the primary accent.
      </li>
    </ul>
  </div>

  <div class="color-mode-container color-mode-container--light">
    <h4>Light mode</h4>
    <table class="palette-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Swatch</th>
          <th>Variable</th>
          <th>HEX</th>
          <th>RGB</th>
          <th>CMYK</th>
          <th>HSL</th>
        </tr>
      </thead>
      <tbody>
        {#each accentLight as row (row.variable)}
          <tr>
            <td>{row.name}</td>
            <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                <span class="copy-value-text">{row.variable}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                <span class="copy-value-text">{row.hex}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                <span class="copy-value-text">{row.rgb}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                <span class="copy-value-text">{row.cmyk}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                <span class="copy-value-text">{row.hsl}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="color-mode-container color-mode-container--dark">
    <h4>Dark mode</h4>
    <table class="palette-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Swatch</th>
          <th>Variable</th>
          <th>HEX</th>
          <th>RGB</th>
          <th>CMYK</th>
          <th>HSL</th>
        </tr>
      </thead>
      <tbody>
        {#each accentDark as row (row.variable)}
          <tr>
            <td>{row.name}</td>
            <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                <span class="copy-value-text">{row.variable}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                <span class="copy-value-text">{row.hex}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                <span class="copy-value-text">{row.rgb}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                <span class="copy-value-text">{row.cmyk}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
            <td>
              <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                <span class="copy-value-text">{row.hsl}</span>
                <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <h3>Typography colors</h3>
  <p>Our typography colors ensure readability while maintaining brand consistency.</p>
  <ul>
    <li><strong>Main text:</strong> Primary content, body text, headings</li>
    <li><strong>Link color:</strong> Interactive text elements and hyperlinks</li>
  </ul>

  <div class="typography-colors-container">
    <div class="color-mode-container color-mode-container--light">
      <h4>Light mode</h4>
      <table class="palette-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Swatch</th>
            <th>Variable</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>CMYK</th>
            <th>HSL</th>
          </tr>
        </thead>
        <tbody>
          {#each typographyLight as row (row.variable)}
            <tr>
              <td>{row.name}</td>
              <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                  <span class="copy-value-text">{row.variable}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                  <span class="copy-value-text">{row.hex}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                  <span class="copy-value-text">{row.rgb}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                  <span class="copy-value-text">{row.cmyk}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                  <span class="copy-value-text">{row.hsl}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="color-mode-container color-mode-container--dark">
      <h4>Dark mode</h4>
      <table class="palette-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Swatch</th>
            <th>Variable</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>CMYK</th>
            <th>HSL</th>
          </tr>
        </thead>
        <tbody>
          {#each typographyDark as row (row.variable)}
            <tr>
              <td>{row.name}</td>
              <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                  <span class="copy-value-text">{row.variable}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                  <span class="copy-value-text">{row.hex}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                  <span class="copy-value-text">{row.rgb}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                  <span class="copy-value-text">{row.cmyk}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                  <span class="copy-value-text">{row.hsl}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <h3 id="state-colors">State colors</h3>
  <p>
    Semantic colors for feedback, status badges, and alerts. Each state has a <strong>surface</strong>,
    <strong>text</strong>, and <strong>border</strong> token. In the site stylesheet, light-mode values are active by
    default; <code>body.dark-mode</code> swaps to the <code>-dark</code> primitives automatically.
  </p>
  <ul>
    <li><strong>Success:</strong> Approvals, confirmations, positive outcomes</li>
    <li><strong>Warning:</strong> Caution, pending review, syntax strings in code blocks</li>
    <li><strong>Error:</strong> Failures, rejections, validation errors</li>
    <li><strong>Info:</strong> Neutral notices, “considering” status, supplementary context</li>
  </ul>

  <div class="state-previews" aria-label="State color examples">
    <span class="state-success">Success</span>
    <span class="state-warning">Warning</span>
    <span class="state-error">Error</span>
    <span class="state-info">Info</span>
  </div>
  <p class="state-utility-note">
    Utility classes: <code>.state-success</code>, <code>.state-warning</code>, <code>.state-error</code>,
    <code>.state-info</code> (surface + text + border). Text-only: <code>.text-success</code>,
    <code>.text-warning</code>, <code>.text-error</code>, <code>.text-info</code>.
  </p>

  <div class="typography-colors-container state-colors-container">
    <div class="color-mode-container color-mode-container--light">
      <h4>Light mode</h4>
      <table class="palette-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Swatch</th>
            <th>Variable</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>CMYK</th>
            <th>HSL</th>
          </tr>
        </thead>
        <tbody>
          {#each stateLight as row (row.variable)}
            <tr>
              <td>{row.name}</td>
              <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                  <span class="copy-value-text">{row.variable}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                  <span class="copy-value-text">{row.hex}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                  <span class="copy-value-text">{row.rgb}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                  <span class="copy-value-text">{row.cmyk}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                  <span class="copy-value-text">{row.hsl}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="color-mode-container color-mode-container--dark">
      <h4>Dark mode</h4>
      <table class="palette-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Swatch</th>
            <th>Variable</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>CMYK</th>
            <th>HSL</th>
          </tr>
        </thead>
        <tbody>
          {#each stateDark as row (row.variable)}
            <tr>
              <td>{row.name}</td>
              <td><span class="color-swatch-circle" style="background-color: {row.swatch};"></span></td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-var`} onclick={() => copyValue(`${row.variable}-var`, row.variable)}>
                  <span class="copy-value-text">{row.variable}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-var` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hex`} onclick={() => copyValue(`${row.variable}-hex`, row.hex)}>
                  <span class="copy-value-text">{row.hex}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hex` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-rgb`} onclick={() => copyValue(`${row.variable}-rgb`, row.rgb)}>
                  <span class="copy-value-text">{row.rgb}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-rgb` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-cmyk`} onclick={() => copyValue(`${row.variable}-cmyk`, row.cmyk)}>
                  <span class="copy-value-text">{row.cmyk}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-cmyk` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
              <td>
                <button type="button" class="copy-value" class:is-copied={copiedKey === `${row.variable}-hsl`} onclick={() => copyValue(`${row.variable}-hsl`, row.hsl)}>
                  <span class="copy-value-text">{row.hsl}</span>
                  <span class="copy-value-hint">{copiedKey === `${row.variable}-hsl` ? 'Copied!' : 'Copy'}</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <h3>Color combinations & accessibility</h3>
  <p>
    These examples show recommended accent pairings in each color mode. You may swap them out for emphasis as required.
  </p>

  <p>
    The majority of the hues used should be the initial green and the shade of brown/gold. Blues are to be used sparingly as accent colours to draw attention as required.
  </p>

  <div class="color-combinations-container">
    {#snippet colorCombinations()}
      <div class="color-combinations">
        {#each colorCombinationItems as combo (combo.id)}
          <div class="color-combo">
            <div class="combo-preview {combo.previewClass}">
              <div class="combo-element {combo.elementClass}">{combo.text}</div>
            </div>
            <div class="combo-label">{combo.label}</div>
          </div>
        {/each}
      </div>
    {/snippet}

    <div class="color-mode-container color-mode-container--light">
      <h4>Light mode</h4>
      {@render colorCombinations()}
    </div>

    <div class="color-mode-container color-mode-container--dark">
      <h4>Dark mode</h4>
      {@render colorCombinations()}
    </div>
  </div>

  <div class="highlight-box">
    <h4>Accessibility considerations</h4>
    <p>
      Always ensure sufficient contrast between text and background colors. Our color palette has been designed with
      accessibility in mind, but always verify contrast ratios when creating new combinations.
    </p>
    <p>
      For text on colored backgrounds, use white text on dark colors and dark text on light colors to maintain a minimum
      contrast ratio of 4.5:1 for normal text and 3:1 for large text.
    </p>
    <p>
      Accent colors used as part of layout contrast should ideally be accompanied by other elements (borders, underlines,
      etc.) to show separation — especially when the saturation difference between the accent color and the background
      color is low. If solid borders are too heavy, experiment with dashed and dotted borders sparingly.
    </p>
  </div>

  <h2 id="typography">Typography</h2>
  <p>
    Our typography system uses Nunito for headings and Nunito Sans for body text. The type scale is fluid, adapting to
    different screen sizes while maintaining proportions.
  </p>
  <p>
    We use sentence case for headings, titles, and labels — capitalizing only the first word and proper nouns. Sentence
    case feels more approachable and conversational than title case, which aligns with our friendly voice and usability values.
  </p>

  <div class="type-specimens u-grid u-grid-2">
    <div class="type-specimen">
      <div class="type-specimen-header">
        <span class="type-specimen-name">Nunito</span>
        <span class="type-specimen-details">Headings</span>
      </div>
      <p class="alphabet">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
      <p class="alphabet">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
    </div>
    <div class="type-specimen">
      <div class="type-specimen-header">
        <span class="type-specimen-name">Nunito Sans</span>
        <span class="type-specimen-details">Body text</span>
      </div>
      <p class="alphabet">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
      <p class="alphabet">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
    </div>
    <div class="type-weights">
      <p class="font-light">Light (300) — Used sparingly for large headings</p>
      <p class="font-regular">Regular (400) — Primary body text weight</p>
      <p class="font-semibold">Semibold (600) — Used for headings and emphasis</p>
      <p class="font-bold">Bold (700) — Used for strong emphasis</p>
    </div>
  </div>

  <h3>Fluid type scale</h3>
  <p>
    Our type scale uses the golden ratio (1.618) to create a harmonious progression that matches our spacing system.
  </p>
  <div class="type-scale">
    <div class="type-scale-item">
      <div class="type-scale-label">Step -2 <small>(0.68–0.75rem)</small></div>
      <div class="type-scale-preview text-xs">The quick brown fox jumps over the lazy dog.</div>
    </div>
    <div class="type-scale-item">
      <div class="type-scale-label">Step 0 <small>(1–1.2rem)</small></div>
      <div class="type-scale-preview text-m">The quick brown fox jumps over the lazy dog.</div>
    </div>
    <div class="type-scale-item">
      <div class="type-scale-label">Step 2 <small>(1.44–2rem)</small></div>
      <div class="type-scale-preview text-xl">The quick brown fox jumps over the lazy dog.</div>
    </div>
    <div class="type-scale-item">
      <div class="type-scale-label">Step 5 <small>(2.49–4.05rem)</small></div>
      <div class="type-scale-preview text-4xl">The quick brown fox jumps over the lazy dog.</div>
    </div>
  </div>

  <h3>Heading examples</h3>
  <div class="highlight-box heading-examples">
    <h1>Heading level 1</h1>
    <h2>Heading level 2</h2>
    <h3>Heading level 3</h3>
    <h4>Heading level 4</h4>
  </div>

  <div class="u-grid u-grid-2 text-styles-grid">
    <div class="highlight-box">
      <h4>Body text</h4>
      <p>
        Primary body text uses the regular weight of Nunito Sans at Step 0. Line height is set to 1.6 for longer text
        blocks.
      </p>
      <p>
        <strong>Important:</strong> Large blocks of text must respect the color mode — dark text on light backgrounds in
        light mode, and light text on dark backgrounds in dark mode.
      </p>
    </div>
    <div class="highlight-box">
      <h4>Text emphasis</h4>
      <p>Use <strong>bold</strong> for strong emphasis.</p>
      <p>Use <em>italic</em> for subtle emphasis or technical terms.</p>
      <p>Use <a href="#typography">links</a> for interactive elements.</p>
      <p>Use <code>monospace</code> for code snippets.</p>
      <p>Use <small>small text</small> for supplementary information.</p>
    </div>
  </div>

  <h3>Implementation</h3>
  <pre class="code-example">{`h1 { font-size: var(--step-5); }
h2 { font-size: var(--step-4); }
h3 { font-size: var(--step-3); }
.text-m { font-size: var(--step-0); }`}</pre>
  <p>
    The fluid scale adapts smoothly between viewport sizes. Each step is approximately 1.618 times larger than the
    previous, aligning with our spacing system and brand values.
  </p>

  <h2 id="logo-usage">Logo usage</h2>
  <p>
    Download
    <a href="https://github.com/DevRel-Foundation/drf-branding" target="_blank" rel="noopener noreferrer"
      >brand assets ↗</a
    >
    from the GitHub repository.
  </p>
  <table class="brand-colors-table">
    <tbody>
      <tr>
        <td class="brand-colors-table__cell brand-colors-table__cell--light">
          <img src="/images/brand/logo-dark-text.svg" alt="logo-dark-text.svg" width="300" />
          logo-dark-text.svg
        </td>
        <td class="brand-colors-table__cell brand-colors-table__cell--dark">
          <img src="/images/brand/logo-light-text.svg" alt="logo-light-text.svg" width="300" />
          logo-light-text.svg
        </td>
      </tr>
      <tr>
        <td class="brand-colors-table__cell brand-colors-table__cell--light">
          <img src="/images/brand/logo.svg" alt="logo.svg" width="75" />
          logo.svg
        </td>
        <td class="brand-colors-table__cell brand-colors-table__cell--dark">
          <img src="/images/brand/logo-gray.png" alt="logo-gray.png" width="300" />
          logo-gray.png
        </td>
      </tr>
    </tbody>
  </table>

  <h2 id="motifs-and-patterns">Motifs and patterns</h2>
  <p>
    Our brand embraces organic shapes and rounded forms throughout our visual language. These elements reflect our
    approachable nature and represent the continuous, supportive relationship we foster within developer communities.
  </p>

  <div class="radius-demo">
    <h3>Border radius scale</h3>
    <p>
      We use a consistent border radius scale across all UI elements to maintain visual harmony. We should choose the
      roundest option preferable, screen size and layout permitting. Try to use the border radii at a specific screen
      size for consistency.
    </p>

    <div class="radius-grid">
      <div class="radius-item">
        <div class="radius-example" style="border-radius: var(--radius-m);"></div>
        <div class="radius-info">
          <div class="radius-name">M (12px)</div>
          <div class="radius-usage">Cards, panels, highlight boxes</div>
        </div>
      </div>
      <div class="radius-item">
        <div class="radius-example" style="border-radius: var(--radius-l);"></div>
        <div class="radius-info">
          <div class="radius-name">L (16px)</div>
          <div class="radius-usage">Large cards, modals, feature sections</div>
        </div>
      </div>
      <div class="radius-item">
        <div class="radius-example" style="border-radius: var(--radius-xl);"></div>
        <div class="radius-info">
          <div class="radius-name">XL (24px)</div>
          <div class="radius-usage">Hero sections, large feature panels</div>
        </div>
      </div>
      <div class="radius-item">
        <div class="radius-example" style="border-radius: var(--radius-circle);"></div>
        <div class="radius-info">
          <div class="radius-name">Circle (50%)</div>
          <div class="radius-usage">Avatars, icons, decorative elements</div>
        </div>
      </div>
    </div>
  </div>

  <div class="motif-examples">
    <h3>Core motifs</h3>
    <p>These foundational motifs can be used as decorative elements throughout our brand materials.</p>

    <div class="u-grid u-grid-2 motif-row">
      <div>
        <h4>Journal grid</h4>
        <p>Our dotted background pattern is reminiscent of journal grids, representing structure, organization, and thoughtful planning.</p>
        <p>Use this pattern for backgrounds, section dividers, or as subtle texture in documentation materials.</p>
      </div>
      <div class="motif-example-large journal-grid-demo" aria-hidden="true"></div>
    </div>

    <div class="u-grid u-grid-2 motif-row">
      <div>
        <h4>Concentric circles</h4>
        <p>Concentric circles represent growth, expansion, and the ripple effect of knowledge sharing within communities.</p>
        <p>Use as decorative elements in headers, backgrounds, or as visual metaphors for community impact.</p>
      </div>
      <div class="motif-example-large concentric-circles-demo" aria-hidden="true">
        <div class="circle-inner"></div>
        <div class="circle-innermost"></div>
      </div>
    </div>

    <div class="u-grid u-grid-2 motif-row">
      <div>
        <h4>Pill shapes</h4>
        <p>Pill-shaped elements are used for buttons, tags, and form inputs to create a friendly, accessible interface.</p>
        <p>The elongated rounded form provides ample touch targets while maintaining our organic visual language.</p>
      </div>
      <div class="motif-example-large pill-shapes-demo">
        <div class="top-section">
          <button type="button" class="pill-button primary">Primary action</button>
          <button type="button" class="pill-button secondary">Secondary action</button>
          <div class="pill-tag">Tag example</div>
        </div>
        <div class="bottom-section">
          <input type="text" class="pill-input" placeholder="Form input example" />
        </div>
      </div>
    </div>

    <div class="u-grid u-grid-2 motif-row">
      <div>
        <h4>Background circles</h4>
        <p>Large, low-contrast circles create depth and visual interest in backgrounds without overwhelming content.</p>
        <p>Use these subtle circular forms to add dimension to sections while maintaining readability.</p>
      </div>
      <div class="motif-example-large background-circles-demo" aria-hidden="true"></div>
    </div>
  </div>

  <div class="motif-examples">
    <h3>Additional motifs</h3>
    <p>These motifs can be combined and adapted to create a rich visual language across different applications.</p>

    <div class="motif-grid">
      <div class="motif-item">
        <div class="motif-example motif-group" aria-hidden="true"></div>
        <div class="motif-name">Circle group</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-overlap" aria-hidden="true"></div>
        <div class="motif-name">Overlapping circles</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-dots" aria-hidden="true"></div>
        <div class="motif-name">Dot grid</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-wave" aria-hidden="true"></div>
        <div class="motif-name">Wave pattern</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-arc" aria-hidden="true"></div>
        <div class="motif-name">Arc</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-bubble" aria-hidden="true"></div>
        <div class="motif-name">Bubble group</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-half-circle" aria-hidden="true"></div>
        <div class="motif-name">Half circle</div>
      </div>
      <div class="motif-item">
        <div class="motif-example motif-quarter-circle" aria-hidden="true"></div>
        <div class="motif-name">Quarter circle</div>
      </div>
    </div>
  </div>

  <h2 id="spacing-system">Spacing system</h2>
  <p>
    Our spacing system uses the golden ratio (1.618) to create an organic, harmonious flow that mirrors the natural
    growth patterns reflected in our leaf-inspired logo.
  </p>

  <h3>Visual scale</h3>
  <div class="spacing-scale">
    <div class="spacing-demo">
      <div class="spacing-label">3XS (0.25–0.31rem)</div>
      <div class="spacing-visual" style="height: var(--space-3xs);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">2XS (0.4–0.5rem)</div>
      <div class="spacing-visual" style="height: var(--space-2xs);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">XS (0.65–0.81rem)</div>
      <div class="spacing-visual" style="height: var(--space-xs);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">S (1.05–1.31rem)</div>
      <div class="spacing-visual" style="height: var(--space-s);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">M (1.7–2.12rem)</div>
      <div class="spacing-visual" style="height: var(--space-m);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">L (2.75–3.43rem)</div>
      <div class="spacing-visual" style="height: var(--space-l);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">XL (4.45–5.55rem)</div>
      <div class="spacing-visual" style="height: var(--space-xl);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">2XL (7.2–8.98rem)</div>
      <div class="spacing-visual" style="height: var(--space-2xl);"></div>
    </div>
  </div>

  <h3>Fluid spacing pairs</h3>
  <p>These pairs show how spacing transitions between two adjacent sizes as the viewport changes.</p>
  <div class="spacing-scale">
    <div class="spacing-demo">
      <div class="spacing-label">XS → S (0.65–1.31rem)</div>
      <div class="spacing-visual" style="height: var(--space-xs-s);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">S → M (1.05–2.12rem)</div>
      <div class="spacing-visual" style="height: var(--space-s-m);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">M → L (1.7–3.43rem)</div>
      <div class="spacing-visual" style="height: var(--space-m-l);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">L → XL (2.75–5.55rem)</div>
      <div class="spacing-visual" style="height: var(--space-l-xl);"></div>
    </div>
  </div>

  <h3>Component example</h3>
  <p>This example shows how our spacing system creates harmonious components:</p>

  <div class="example-component">
    <div class="example-header">
      <h4>Developer workshop registration</h4>
    </div>
    <div class="example-body">
      <p class="example-date">October 15-16, 2023 • Virtual Event</p>
      <h5 class="example-title">Advanced API design patterns</h5>
      <p class="example-description">
        Join us for a two-day intensive workshop on designing scalable and developer-friendly APIs. Learn best
        practices from industry experts and apply them in hands-on sessions.
      </p>
      <div class="example-details">
        <div class="example-detail-item">
          <span class="example-detail-icon" aria-hidden="true">👥</span>
          <span>Limited to 50 participants</span>
        </div>
        <div class="example-detail-item">
          <span class="example-detail-icon" aria-hidden="true">🔧</span>
          <span>Hands-on exercises included</span>
        </div>
        <div class="example-detail-item">
          <span class="example-detail-icon" aria-hidden="true">📜</span>
          <span>Certificate upon completion</span>
        </div>
      </div>
      <div class="example-buttons">
        <button type="button" class="example-button">Register now</button>
        <button type="button" class="example-button secondary">View details</button>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <h4>Spacing used in this component</h4>
    <ul class="component-spacing-list">
      <li><strong>Card padding:</strong> <code>var(--space-m)</code> — Creates comfortable content area</li>
      <li><strong>Header padding:</strong> <code>var(--space-s)</code> — Balanced header spacing</li>
      <li><strong>Title margin:</strong> <code>var(--space-xs)</code> — Tight grouping with date</li>
      <li><strong>Description margin:</strong> <code>var(--space-s)</code> — Separates content sections</li>
      <li><strong>Details margin:</strong> <code>var(--space-s)</code> — Creates visual hierarchy</li>
      <li><strong>Button padding:</strong> <code>var(--space-xs) var(--space-s)</code> — Comfortable touch target</li>
      <li><strong>Button gap:</strong> <code>var(--space-xs)</code> — Related actions spacing</li>
    </ul>
  </div>

  <h3>Text spacing examples</h3>

  <div class="spacing-text-block">
    <h4>3XS spacing (micro)</h4>
    <div class="space-stack-3xs">This text has 3XS spacing below</div>
    <div>This demonstrates our smallest spacing unit</div>
  </div>

  <div class="spacing-text-block">
    <h4>Small spacing</h4>
    <div class="space-stack-s">This text has S spacing below</div>
    <div>Used for related content grouping</div>
  </div>

  <div class="spacing-text-block">
    <h4>Medium spacing</h4>
    <div class="space-stack-m">This text has M spacing below</div>
    <div>Our default spacing for section elements</div>
  </div>

  <div class="spacing-text-block">
    <h4>Large spacing</h4>
    <div class="space-stack-l">This text has L spacing below</div>
    <div>Used for major section breaks</div>
  </div>

  <div class="spacing-text-block">
    <h4>Inline spacing demo</h4>
    <div>
      <span class="space-inline-s">Item 1</span>
      <span class="space-inline-s">Item 2</span>
      <span>Item 3</span>
    </div>
  </div>

  <h3>Grid and layout system</h3>
  <p>
    Our grid system uses the same fluid spacing scale to create harmonious layouts that adapt to different screen sizes,
    inspired by Utopia's approach but customized to follow our golden ratio theme.
  </p>

  <div class="highlight-box">
    <h4>Container width</h4>
    <p>
      We constrain content to a maximum width of 1240px (77.5rem) with fluid gutters on either side that scale
      proportionally with the viewport.
    </p>
    <pre class="code-example">{`.u-container {
  max-width: var(--grid-max-width);
  padding-inline: var(--grid-gutter);
  margin-inline: auto;
  width: 100%;
}`}</pre>
  </div>

  <h4>Grid examples</h4>
  <p>Our grid uses fluid gutters based on our spacing scale, ensuring consistent spacing throughout layouts.</p>

  <div class="grid-demo">
    <h5>Fluid responsive grid</h5>
    <p>This grid automatically adjusts the number of columns based on available space.</p>
    <div class="u-grid-fluid">
      <div class="grid-item">Auto</div>
      <div class="grid-item">Auto</div>
      <div class="grid-item">Auto</div>
      <div class="grid-item">Auto</div>
    </div>
  </div>

  <div class="grid-demo">
    <h5>Golden ratio grid</h5>
    <p>This grid uses the golden ratio (1:1.618) for column proportions.</p>
    <div class="u-grid-golden">
      <div class="grid-item">1 part</div>
      <div class="grid-item">1.618 parts</div>
    </div>
  </div>

  <div class="grid-demo">
    <h5>Three-column grid</h5>
    <div class="u-grid u-grid-3">
      <div class="grid-item">Column 1</div>
      <div class="grid-item">Column 2</div>
      <div class="grid-item">Column 3</div>
    </div>
  </div>

  <div class="grid-demo">
    <h5>12-column grid</h5>
    <div class="u-grid u-grid-12">
      <div class="grid-item" style="grid-column: span 8;">Main content (8/12)</div>
      <div class="grid-item" style="grid-column: span 4;">Sidebar (4/12)</div>
    </div>
  </div>

  <div class="highlight-box">
    <h4>Implementation</h4>
    <p>Our grid system provides several approaches to layout:</p>
    <pre class="code-example">&lt;div class="u-grid-fluid"&gt;
  &lt;div&gt;Auto-sizing column&lt;/div&gt;
  &lt;div&gt;Auto-sizing column&lt;/div&gt;
&lt;/div&gt;

&lt;div class="u-grid-golden"&gt;
  &lt;div&gt;Smaller column (1 part)&lt;/div&gt;
  &lt;div&gt;Larger column (1.618 parts)&lt;/div&gt;
&lt;/div&gt;

&lt;div class="u-grid u-grid-3"&gt;
  &lt;div&gt;Column 1&lt;/div&gt;
  &lt;div&gt;Column 2&lt;/div&gt;
  &lt;div&gt;Column 3&lt;/div&gt;
&lt;/div&gt;</pre>
    <p>
      All grids automatically adjust to single column on mobile devices, maintaining the harmonious spacing. The fluid
      nature of our grid system means it adapts to any viewport size without requiring breakpoints, following the same
      organic growth principles as our spacing and typography systems.
    </p>
  </div>

  <h2 id="image-guidelines">Image guidelines</h2>
  <p>
    We prioritize images of DevRel practitioners — preferably our own community members —
    actively doing DevRel work: speaking, mentoring, collaborating, or building together.
  </p>
  <p>
    Generic photos don't add value to a page or post.
  </p>

    <section id="voice-and-tone" class="brand-markdown">
      <h2>Voice and tone</h2>
      <VoiceAndTone />
    </section>
  </div>
</ScrollSidebarLayout>

<style>
  :global(.brand-page-layout) {
    padding-top: var(--space-s);
    padding-bottom: var(--space-xl);
  }

  .brand-page.container,
  .brand-page__header.container {
    max-width: none;
    padding: 0;
  }

  .brand-page__header h1 {
    margin-bottom: var(--space-m);
  }

  @media (min-width: 48.0625rem) {
    .brand-page.container {
      padding-right: 0;
    }
  }

  .brand-page > h2 {
    margin-top: var(--space-2xl);
  }

  .brand-page > h2:first-of-type {
    margin-top: var(--space-l);
  }

  .brand-page > h3 {
    margin-top: var(--space-l);
  }

  .brand-page > h4 {
    margin-top: var(--space-m);
    font-size: var(--step-1);
    opacity: 0.85;
  }

  .color-mode-container {
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    padding: var(--space-s);
    overflow-x: auto;
  }

  .color-mode-container h4 {
    margin: 0 0 var(--space-s);
    font-size: var(--step-1);
    opacity: 0.75;
  }

  /* Pin light-mode sections to :root light tokens regardless of site theme */
  .brand-page .color-mode-container--light {
    --color-background: hsl(48, 100%, 98%);
    --color-background-secondary-1: hsl(48, 61.8%, 94%);
    --color-background-secondary-2: hsl(48, 13%, 92%);
    --color-accent-green: var(--color-mint);
    --color-accent-gold: var(--color-sand);
    --color-accent-blue: var(--color-sky);
    --color-accent-teal: var(--color-agave);
    --color-accent-text: var(--color-mint);
    --color-text: hsl(0, 0%, 32%);
    --color-link: hsl(140, 38.2%, 18%);
    --color-success: hsl(152, 76%, 90%);
    --color-success-text: hsl(166, 91%, 20%);
    --color-success-border: hsl(152, 55%, 78%);
    --color-warning: hsl(41.9, 100%, 91.6%);
    --color-warning-text: hsl(32, 80%, 28%);
    --color-warning-border: hsl(41, 85%, 75%);
    --color-error: hsl(0, 93%, 94%);
    --color-error-text: hsl(0, 72%, 35%);
    --color-error-border: hsl(0, 70%, 85%);
    --color-info: hsl(193, 100%, 92%);
    --color-info-text: hsl(193, 72%, 14%);
    --color-info-border: hsl(193, 70%, 80%);
    --color-syntax-string: hsl(32, 80%, 28%);
    background-color: var(--color-background);
    color: var(--color-text);
    border-color: var(--color-background-secondary-2);
  }

  /* Pin dark-mode sections to static -dark primitives regardless of site theme */
  .brand-page .color-mode-container--dark {
    --color-background: var(--color-background-dark);
    --color-background-secondary-1: var(--color-background-secondary-1-dark);
    --color-background-secondary-2: var(--color-background-secondary-2-dark);
    --color-accent-green: var(--color-forest);
    --color-accent-gold: var(--color-gold);
    --color-accent-blue: var(--color-sea);
    --color-accent-teal: var(--color-hosta);
    --color-accent-text: var(--color-forest);
    --color-text: var(--color-text-dark);
    --color-link: var(--color-link-dark);
    --color-success: var(--color-success-dark);
    --color-success-text: var(--color-success-text-dark);
    --color-success-border: var(--color-success-border-dark);
    --color-warning: var(--color-warning-dark);
    --color-warning-text: var(--color-warning-text-dark);
    --color-warning-border: var(--color-warning-border-dark);
    --color-error: var(--color-error-dark);
    --color-error-text: var(--color-error-text-dark);
    --color-error-border: var(--color-error-border-dark);
    --color-info: var(--color-info-dark);
    --color-info-text: var(--color-info-text-dark);
    --color-info-border: var(--color-info-border-dark);
    --color-syntax-string: var(--color-syntax-string-dark);
    background-color: var(--color-background-dark);
    color: var(--color-text-dark);
    border-color: var(--color-background-secondary-2-dark);
  }

  .palette-table {
    width: 100%;
    font-size: var(--step--1);
    border-collapse: collapse;
    border: 2px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    overflow: hidden;
  }

  .palette-table th,
  .palette-table td {
    padding: 0.65rem 0.75rem;
    border-bottom: 1px solid var(--color-background-secondary-2);
    text-align: left;
    vertical-align: middle;
  }

  .palette-table th {
    background: var(--color-background-secondary-1);
    font-weight: 600;
    font-size: var(--step--1);
    white-space: nowrap;
  }

  .palette-table tr:last-child td {
    border-bottom: none;
  }

  .palette-table td:first-child {
    font-weight: 600;
    white-space: nowrap;
  }

  .color-swatch-circle {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: var(--border-thickness) solid var(--color-text);
    flex-shrink: 0;
  }

  .brand-page .color-mode-container--light .color-swatch-circle {
    border-color: var(--color-text);
  }

  .brand-page .color-mode-container--dark .color-swatch-circle {
    border-color: var(--color-text-dark);
  }

  .copy-value {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    width: 100%;
    padding: 0.2rem 0.35rem;
    margin: -0.2rem -0.35rem;
    border: none;
    border-radius: var(--radius-pill);
    background: transparent;
    color: inherit;
    font: inherit;
    font-family: monospace;
    font-size: inherit;
    text-align: left;
    cursor: pointer;
    position: relative;
  }

  .copy-value-hint {
    opacity: 0;
    font-family: var(--font-main);
    font-size: var(--step--2);
    font-weight: 600;
    color: var(--color-link);
    white-space: nowrap;
    transition: opacity 0.15s ease;
  }

  .copy-value:hover .copy-value-hint,
  .copy-value:focus-visible .copy-value-hint,
  .copy-value.is-copied .copy-value-hint {
    opacity: 1;
  }

  .copy-value:hover,
  .copy-value:focus-visible {
    background: var(--color-background-secondary-1);
    outline: none;
  }

  .copy-value.is-copied {
    background: var(--color-accent-green);
  }

  .brand-page .color-mode-container--dark .copy-value.is-copied {
    background: var(--color-forest);
    color: var(--color-text-dark);
  }

  .copy-value-text {
    word-break: break-all;
  }

  .typography-colors-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  .color-combinations-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    margin-bottom: var(--space-m);
  }

  .state-previews {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-s);
    margin: var(--space-s) 0;
  }

  .state-previews :global(.state-success),
  .state-previews :global(.state-warning),
  .state-previews :global(.state-error),
  .state-previews :global(.state-info) {
    padding: var(--space-2xs) var(--space-s);
    font-size: var(--step--1);
    font-weight: 600;
  }

  .state-utility-note {
    font-size: var(--step--1);
    color: var(--color-text);
    margin-bottom: var(--space-m);
  }

  .state-utility-note code {
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    .palette-table {
      font-size: 0.7rem;
    }

    .palette-table th,
    .palette-table td {
      padding: 0.5rem;
    }
  }

  .highlight-box {
    background: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
    padding: var(--space-s);
    margin: var(--space-m) 0;
  }

  .highlight-box h4 {
    margin-top: 0;
  }

  .color-combinations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-m);
  }

  .color-mode-container .color-combinations {
    margin-bottom: 0;
  }

  .color-combo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .combo-preview {
    width: 100%;
    min-height: 120px;
    border-radius: var(--radius-m);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-s);
    margin-bottom: var(--space-xs);
  }

  .combo-element {
    padding: var(--space-xs) var(--space-s);
    border-radius: var(--radius-s);
    font-weight: 600;
    text-align: center;
    font-size: var(--step--1);
  }

  .combo-label {
    font-size: var(--step--1);
    text-align: center;
  }

  .mint-bg {
    background-color: var(--color-accent-green);
  }

  .brand-page .color-mode-container--light .mint-bg {
    background-color: var(--color-mint);
  }

  .brand-page .color-mode-container--dark .mint-bg {
    background-color: var(--color-forest);
  }

  .brand-page .color-mode-container--light .copy-value.is-copied {
    background: var(--color-mint);
    color: inherit;
  }

  .sky-bg {
    background-color: var(--color-accent-blue);
  }

  .brand-page .color-mode-container--light .sky-bg {
    background-color: var(--color-sky);
  }

  .brand-page .color-mode-container--dark .sky-bg {
    background-color: var(--color-sea);
  }

  .agave-bg {
    background-color: var(--color-accent-teal);
  }

  .brand-page .color-mode-container--light .agave-bg {
    background-color: var(--color-agave);
  }

  .brand-page .color-mode-container--dark .agave-bg {
    background-color: var(--color-hosta);
  }

  .sand-bg {
    background-color: var(--color-accent-gold);
  }

  .brand-page .color-mode-container--light .sand-bg {
    background-color: var(--color-sand);
  }

  .brand-page .color-mode-container--dark .sand-bg {
    background-color: var(--color-gold);
  }

  .text-border .combo-element {
    border: 1px solid var(--color-text);
  }

  .type-specimens {
    margin: var(--space-m) 0 var(--space-l);
    align-items: start;
  }

  .type-specimen {
    padding: var(--space-s);
    border-radius: var(--radius-m);
    background: var(--color-background-secondary-1);
    margin-bottom: var(--space-s);
  }

  .type-specimen-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-xs);
  }

  .type-specimen-name {
    font-weight: 600;
    font-size: var(--step-1);
  }

  .type-specimen-details {
    font-size: var(--step--1);
    opacity: 0.8;
  }

  .alphabet {
    font-size: var(--step-1);
    line-height: 1.6;
    letter-spacing: 0.02em;
    margin: 0 0 var(--space-xs);
  }

  .type-weights {
    grid-column: 1 / -1;
  }

  .type-weights p {
    margin: 0 0 var(--space-xs);
  }

  .type-scale {
    margin: var(--space-m) 0 var(--space-l);
  }

  .type-scale-item {
    display: flex;
    align-items: center;
    gap: var(--space-m);
    margin-bottom: var(--space-s);
  }

  .type-scale-label {
    flex-shrink: 0;
    width: 180px;
    font-size: var(--step--1);
    opacity: 0.85;
  }

  .type-scale-preview {
    flex: 1;
    min-width: 0;
  }

  .heading-examples :global(h1),
  .heading-examples :global(h2),
  .heading-examples :global(h3),
  .heading-examples :global(h4) {
    margin-top: var(--space-s);
    margin-bottom: var(--space-xs);
  }

  .heading-examples :global(h1:first-child) {
    margin-top: 0;
  }

  .text-styles-grid {
    margin-bottom: var(--space-l);
  }

  .code-example {
    background: rgba(0, 0, 0, 0.05);
    padding: var(--space-s);
    border-radius: var(--radius-s);
    font-family: monospace;
    font-size: var(--step--1);
    overflow-x: auto;
    white-space: pre-wrap;
    margin: var(--space-s) 0 var(--space-m);
  }

  .radius-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-m);
    margin: var(--space-m) 0 var(--space-l);
  }

  .radius-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .radius-example {
    width: 120px;
    height: 120px;
    background: var(--color-accent-text);
    margin-bottom: var(--space-xs);
  }

  .radius-name {
    font-weight: 700;
    margin-bottom: var(--space-2xs);
  }

  .radius-usage {
    font-size: var(--step--1);
    opacity: 0.85;
  }

  .radius-example:hover {
    transform: scale(1.05);
  }

  .motif-row {
    margin-bottom: var(--space-m);
    align-items: center;
  }

  .motif-row:last-child {
    margin-bottom: 0;
  }

  .motif-examples {
    margin-bottom: var(--space-l);
  }

  .motif-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-m);
    margin-top: var(--space-m);
  }

  .motif-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .motif-example {
    width: 150px;
    height: 150px;
    background-color: var(--color-background);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    margin-bottom: var(--space-xs);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .motif-group::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: var(--color-accent-text);
    border-radius: var(--radius-circle);
    left: 30px;
    top: 30px;
  }

  .motif-group::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: var(--color-accent-blue);
    border-radius: var(--radius-circle);
    right: 30px;
    bottom: 30px;
  }

  .motif-overlap::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: var(--color-accent-text);
    border-radius: var(--radius-circle);
    opacity: 0.7;
    left: 25px;
  }

  .motif-overlap::after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: var(--color-accent-blue);
    border-radius: var(--radius-circle);
    opacity: 0.7;
    right: 20px;
    bottom: 20px;
  }

  .motif-name {
    font-weight: 700;
  }

  .motif-example-large {
    width: 100%;
    min-height: 250px;
    background-color: var(--color-background);
    border-radius: var(--radius-m);
    padding: var(--space-m);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-s);
    overflow: hidden;
    border: 1px solid var(--color-background-secondary-2);
  }

  .journal-grid-demo {
    background-color: var(--color-background);
    background-image: radial-gradient(circle, var(--pattern-color) 1px, transparent 1px);
    background-size: var(--space-m) var(--space-m);
  }

  .concentric-circles-demo::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.7;
  }

  .concentric-circles-demo::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: var(--color-accent-blue);
    border-radius: var(--radius-circle);
    right: 30px;
    bottom: 30px;
    opacity: 0.7;
  }

  .concentric-circles-demo .circle-inner {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.7;
  }

  .concentric-circles-demo .circle-innermost {
    position: absolute;
    width: 50px;
    height: 50px;
    border: 2px solid var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.7;
  }

  .pill-shapes-demo {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  .pill-shapes-demo .top-section {
    display: flex;
    gap: var(--space-s);
    align-items: center;
    flex-wrap: wrap;
  }

  .pill-shapes-demo .bottom-section {
    width: 100%;
    margin-top: auto;
  }

  .pill-button {
    padding: var(--space-xs) var(--space-m);
    border-radius: 50px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.2s ease;
  }

  .pill-button.primary {
    background-color: var(--color-accent-text);
    color: var(--color-text);
  }

  .pill-button.secondary {
    background-color: var(--color-accent-blue);
    color: var(--color-text);
  }

  .pill-button:hover {
    transform: translateY(-2px);
  }

  .pill-tag {
    display: inline-block;
    padding: var(--space-2xs) var(--space-s);
    background-color: var(--color-accent-blue);
    color: var(--color-text);
    border-radius: 50px;
    font-size: 0.9rem;
  }

  .pill-input {
    padding: var(--space-xs) var(--space-s);
    border-radius: 50px;
    border: 1px solid var(--color-background-secondary-2);
    width: 100%;
    max-width: 250px;
    font-family: inherit;
    background: var(--color-background);
    color: var(--color-text);
  }

  .background-circles-demo::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.1;
    top: -100px;
    left: -50px;
  }

  .background-circles-demo::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: var(--color-accent-blue);
    border-radius: 50%;
    opacity: 0.1;
    bottom: -50px;
    right: -50px;
  }

  .motif-dots {
    background-image: radial-gradient(var(--color-accent-text) 2px, transparent 2px);
    background-size: 15px 15px;
  }

  .motif-wave {
    overflow: hidden;
  }

  .motif-wave::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 17.5 5, 25 10 Q 32.5 15, 40 10' stroke='%2379bf44' fill='none' stroke-width='2'/%3E%3C/svg%3E");
    background-size: 60px 20px;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.7;
  }

  .motif-arc::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border: 3px solid var(--color-accent-text);
    border-radius: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
    opacity: 0.7;
  }

  .motif-bubble::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.3;
    top: 30px;
    left: 30px;
  }

  .motif-bubble::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.5;
    bottom: 40px;
    right: 40px;
  }

  .motif-half-circle {
    overflow: hidden;
  }

  .motif-half-circle::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.3;
    bottom: -75px;
    left: 0;
  }

  .motif-quarter-circle {
    overflow: hidden;
  }

  .motif-quarter-circle::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: var(--color-accent-text);
    border-radius: 50%;
    opacity: 0.3;
    bottom: -75px;
    right: -75px;
  }

  .spacing-scale {
    margin: var(--space-m) 0 var(--space-l);
  }

  .spacing-demo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-xs);
  }

  .spacing-label {
    width: 180px;
    flex-shrink: 0;
    font-size: var(--step--1);
  }

  .spacing-visual {
    flex: 1;
    min-width: 50px;
    max-width: calc(100% - 190px);
    background: var(--color-accent-text);
    border-radius: var(--radius-s);
    transition: height 0.3s ease;
  }

  .spacing-text-block {
    margin-bottom: var(--space-l);
    padding: var(--space-s);
    background: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
  }

  .spacing-text-block h4 {
    margin: 0 0 var(--space-xs);
  }

  .example-component {
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-l);
    overflow: hidden;
    max-width: 600px;
    background-color: var(--color-background);
    margin-bottom: var(--space-m);
  }

  .example-header {
    background-color: var(--color-background-secondary-1);
    padding: var(--space-s);
  }

  .example-header h4 {
    margin: 0;
    font-weight: 600;
  }

  .example-body {
    padding: var(--space-m);
  }

  .example-date {
    margin: 0 0 var(--space-xs);
    opacity: 0.8;
    font-size: 0.9rem;
  }

  .example-title {
    margin: 0 0 var(--space-s);
    font-size: 1.4rem;
  }

  .example-description {
    margin: 0 0 var(--space-s);
    line-height: 1.5;
  }

  .example-details {
    margin-bottom: var(--space-s);
    padding: var(--space-xs);
    background-color: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
  }

  .example-detail-item {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-2xs);
  }

  .example-detail-item:last-child {
    margin-bottom: 0;
  }

  .example-detail-icon {
    margin-right: var(--space-xs);
    font-size: 1.2rem;
  }

  .example-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: var(--space-s);
  }

  .example-button {
    padding: var(--space-xs) var(--space-s);
    border-radius: var(--radius-pill);
    border: none;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.2s ease;
    background-color: var(--color-accent-text);
    color: var(--color-text);
  }

  .example-button:hover {
    transform: translateY(-2px);
  }

  .example-button.secondary {
    background-color: var(--color-accent-blue);
  }

  .component-spacing-list {
    margin: 0;
    padding-left: var(--space-m);
  }

  .component-spacing-list li {
    margin-bottom: var(--space-2xs);
  }

  .component-spacing-list :global(code) {
    background-color: rgba(0, 0, 0, 0.06);
    padding: 0.1rem 0.3rem;
    border-radius: var(--radius-xs);
    font-family: monospace;
    font-size: 0.9rem;
  }

  .grid-demo {
    margin-bottom: var(--space-m);
  }

  .grid-demo h5 {
    margin: 0 0 var(--space-xs);
  }

  .grid-item {
    background-color: var(--color-background-secondary-1);
    padding: var(--space-s);
    border-radius: var(--radius-s);
    text-align: center;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }

  .brand-colors-table {
    width: 100%;
    font-size: var(--step--1);
    border-collapse: collapse;
    margin: var(--space-m) 0 var(--space-l);
    border: 2px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    overflow: hidden;
  }

  .brand-colors-table td {
    padding: var(--space-s);
    border-bottom: 1px solid var(--color-background-secondary-2);
    vertical-align: middle;
  }

  .brand-colors-table__cell--light {
    background-color: hsl(48, 100%, 98%);
    color: hsl(0, 0%, 32%);
    border-color: hsl(48, 13%, 92%);
  }

  .brand-colors-table__cell--dark {
    background-color: hsl(60, 3.2%, 6.1%);
    color: hsl(60, 20%, 91%);
    border-color: hsl(60, 8.4%, 16%);
  }

  .brand-colors-table tr:last-child td {
    border-bottom: none;
  }

  .brand-markdown {
    margin-top: var(--space-2xl);
  }

  .brand-markdown :global(h2) {
    font-size: var(--step-2);
    color: var(--color-text);
    margin: var(--space-xl) 0 var(--space-m);
  }

  .brand-markdown > h2 {
    margin-top: 0;
  }

  .brand-markdown :global(h3) {
    font-size: var(--step-1);
    color: var(--color-text);
    margin: var(--space-l) 0 var(--space-s);
  }

  .brand-markdown :global(p) {
    line-height: 1.6;
    margin-bottom: var(--space-m);
    color: var(--color-text);
  }

  .brand-markdown :global(ul) {
    margin-bottom: var(--space-m);
    padding-left: var(--space-l);
  }

  .brand-markdown :global(li) {
    margin-bottom: var(--space-xs);
    line-height: 1.6;
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    .motif-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .type-scale-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .type-scale-label {
      width: 100%;
    }

    .spacing-label {
      width: 100%;
    }

    .spacing-visual {
      width: 100%;
      max-width: none;
    }
  }
</style>

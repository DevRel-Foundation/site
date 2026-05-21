<script lang="ts">
  import VoiceAndTone from './voice-and-tone.md';
  import ScrollSidebarLayout from '$lib/components/ui/organisms/ScrollSidebarLayout.svelte';
  import type { ScrollSidebarItem } from '$lib/scroll-sidebar';

  const sidebarItems: ScrollSidebarItem[] = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#color-palette', label: 'Color palette' },
    { href: '#state-colors', label: 'State colors' },
    { href: '#typography', label: 'Typography' },
    { href: '#logo-construction', label: 'Logo construction' },
    { href: '#logo-usage', label: 'Logo usage' },
    { href: '#motifs-and-patterns', label: 'Motifs and patterns' },
    { href: '#spacing-system', label: 'Spacing system' },
    { href: '#image-guidelines', label: 'Image guidelines' },
    { href: '#voice-and-tone', label: 'Voice and tone' }
  ];

  const backgroundLight = [
    { name: 'Primary Background', variable: '--color-background', hex: '#FFFEF8', rgb: '255, 254, 248', cmyk: '0%, 0%, 3%, 0%', hsl: '48, 100%, 98%', swatch: 'var(--color-background)' },
    { name: 'Secondary Background 1', variable: '--color-background-secondary-1', hex: '#F7F4E1', rgb: '247, 244, 225', cmyk: '0%, 1%, 9%, 3%', hsl: '48, 61.8%, 94%', swatch: 'var(--color-background-secondary-1)' },
    { name: 'Secondary Background 2', variable: '--color-background-secondary-2', hex: '#F0EFEA', rgb: '240, 239, 234', cmyk: '0%, 0%, 3%, 6%', hsl: '48, 13%, 92%', swatch: 'var(--color-background-secondary-2)' }
  ];

  const backgroundDark = [
    { name: 'Primary Background', variable: '--color-background-dark', hex: '#10100C', rgb: '16, 16, 12', cmyk: '—', hsl: '60, 3.2%, 6.1%', swatch: 'var(--color-background-dark)' },
    { name: 'Secondary Background 1', variable: '--color-background-secondary-1-dark', hex: '#1B1B15', rgb: '27, 27, 21', cmyk: '—', hsl: '60, 5.2%, 9.9%', swatch: 'var(--color-background-secondary-1-dark)' },
    { name: 'Secondary Background 2', variable: '--color-background-secondary-2-dark', hex: '#2C2B24', rgb: '44, 43, 36', cmyk: '—', hsl: '60, 8.4%, 16%', swatch: 'var(--color-background-secondary-2-dark)' }
  ];

  const accentLight = [
    { name: 'Forest Green', variable: '--color-mint', hex: '#c8ecad', rgb: '200, 236, 173', cmyk: '—', hsl: '90, 65%, 81%', swatch: 'var(--color-mint)' },
    { name: 'Sky Blue', variable: '--color-blue', hex: '#d8f7ff', rgb: '216, 247, 255', cmyk: '—', hsl: '193, 100%, 92%', swatch: 'var(--color-blue)' },
    { name: 'Ocean Teal', variable: '--color-teal', hex: '#d3f9f0', rgb: '211, 249, 240', cmyk: '—', hsl: '168, 85%, 91%', swatch: 'var(--color-teal)' },
    { name: 'Sunset Gold', variable: '--color-gold', hex: '#fff5d6', rgb: '255, 245, 214', cmyk: '—', hsl: '41.9, 100%, 91.6%', swatch: 'var(--color-gold)' }
  ];

  const accentDark = [
    { name: 'Forest Green Dark', variable: '--color-mint-dark', hex: '#275901', rgb: '39, 89, 1', cmyk: '—', hsl: '90, 98%, 18%', swatch: 'var(--color-mint-dark)' },
    { name: 'Sky Blue Dark', variable: '--color-blue-dark', hex: '#0a313c', rgb: '10, 49, 60', cmyk: '—', hsl: '193, 72%, 14%', swatch: 'var(--color-blue-dark)' },
    { name: 'Ocean Teal Dark', variable: '--color-teal-dark', hex: '#15372f', rgb: '21, 55, 47', cmyk: '—', hsl: '168, 63%, 14%', swatch: 'var(--color-teal-dark)' },
    { name: 'Sunset Gold Dark', variable: '--color-gold-dark', hex: '#6B4F1B', rgb: '107, 79, 27', cmyk: '—', hsl: '41.7, 74.5%, 21.6%', swatch: 'var(--color-gold-dark)' }
  ];

  const typographyLight = [
    { name: 'Main Text', variable: '--color-text', hex: '#515151', rgb: '81, 81, 81', cmyk: '0%, 0%, 0%, 68%', hsl: '0, 0%, 32%', swatch: 'var(--color-text)' },
    { name: 'Link Color', variable: '--color-link', hex: '#174027', rgb: '23, 64, 39', cmyk: '64%, 0%, 39%, 75%', hsl: '140, 38.2%, 18%', swatch: 'var(--color-link)' }
  ];

  const typographyDark = [
    { name: 'Main Text', variable: '--color-text-dark', hex: '#E9E8E1', rgb: '233, 232, 225', cmyk: '—', hsl: '60, 20%, 91%', swatch: 'var(--color-text-dark)' },
    { name: 'Link Color', variable: '--color-link-dark', hex: '#c8ecad', rgb: '200, 236, 173', cmyk: '36%, 0%, 19%, 14%', hsl: '90, 65%, 81%', swatch: 'var(--color-link-dark)' }
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

  let copiedKey = $state(null);
  let copyTimeout;

  async function copyValue(key, value) {
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
    <div class="container container-content brand-page brand-page__header">
      <h1>Brand Guidelines</h1>
    </div>
  {/snippet}

  <div class="container container-content brand-page">
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
    <li><strong>Primary Background:</strong> Main canvas for content, default page background</li>
    <li><strong>Secondary Background 1:</strong> Alternating sections, subtle contrast areas</li>
    <li><strong>Secondary Background 2:</strong> Cards, form fields, highlighted content boxes</li>
  </ul>

  <div class="color-mode-container">
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

  <div class="color-mode-container">
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
    <li><strong>Greens:</strong> Primary accent color; use for initial focus if it's the only accent.</li>
    <li><strong>Blues:</strong> Use in addition or alternative to the greens.</li>
    <li><strong>Teal:</strong> Use in small amounts.</li>
    <li><strong>Gold:</strong> Use sparingly.</li>
  </ul>
  <p>
    Any page should mostly consist of background and text colors, using accent colors to highlight information as
    required. On any page, green and blue should make up the majority of the accent colors.
  </p>
  <p>
    Light mode should feature the lighter colors as background colors for accentuated elements. Conversely, dark mode
    should feature the darker colors as background colors for accentuated elements. These can be swapped for minor
    highlighting.
  </p>

  <div class="color-mode-container">
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

  <div class="color-mode-container">
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
    <li><strong>Main Text:</strong> Primary content, body text, headings</li>
    <li><strong>Link Color:</strong> Interactive text elements and hyperlinks</li>
  </ul>

  <div class="typography-colors-container">
    <div class="color-mode-container">
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
    <div class="color-mode-container">
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
    <div class="color-mode-container">
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
    <div class="color-mode-container">
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
  <div class="highlight-box">
    <h4>Color combinations</h4>
    <div class="color-combinations">
      <div class="color-combo">
        <div class="combo-preview mint-bg">
          <div class="combo-element">This combination is good for larger text blocks.</div>
        </div>
        <div class="combo-label">Text on forest green</div>
      </div>
      <div class="color-combo">
        <div class="combo-preview">
          <div class="combo-element gold-bg">Click me</div>
        </div>
        <div class="combo-label">Gold button</div>
      </div>
      <div class="color-combo">
        <div class="combo-preview blue-bg text-border">
          <div class="combo-element">Sentence on sky blue with a text-colored border.</div>
        </div>
        <div class="combo-label">Text with border on sky blue</div>
      </div>
      <div class="color-combo">
        <div class="combo-preview teal-bg text-border">
          <div class="combo-element">Sentence on teal with a text-colored border.</div>
        </div>
        <div class="combo-label">Text with border on teal</div>
      </div>
    </div>
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
        <span class="type-specimen-details">Body Text</span>
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

  <h2 id="logo-construction">Logo construction</h2>
  <p>Logo construction guidelines coming soon.</p>

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
        <td style="background: var(--color-background);">
          <img src="/images/brand/logo-dark-text.svg" alt="logo-dark-text.svg" width="300" />
          logo-dark-text.svg
        </td>
        <td style="background: var(--color-background-dark);">
          <img src="/images/brand/logo-light-text.svg" alt="logo-light-text.svg" width="300" />
          <span style="color: var(--color-text-dark);">logo-light-text.svg</span>
        </td>
      </tr>
      <tr>
        <td style="background: var(--color-background);">
          <img src="/images/brand/logo.svg" alt="logo.svg" width="75" />
          logo.svg
        </td>
        <td style="background: var(--color-background-dark);">
          <img src="/images/brand/logo-gray.png" alt="logo-gray.png" width="300" />
          <span style="color: var(--color-text-dark);">logo-gray.png</span>
        </td>
      </tr>
    </tbody>
  </table>

  <h2 id="motifs-and-patterns">Motifs and patterns</h2>
  <p>
    Our brand embraces organic shapes and rounded forms throughout our visual language. These elements reflect our
    approachable nature and the continuous, supportive relationship we foster within developer communities.
  </p>

  <h3>Border radius scale</h3>
  <p>
    Use a consistent border radius scale across UI elements. Choose the roundest option that layout permits, and stay
    consistent at a given screen size.
  </p>
  <div class="radius-grid">
    <div class="radius-item">
      <div class="radius-example" style="border-radius: var(--radius-m);"></div>
      <div class="radius-name">M (12px)</div>
      <div class="radius-usage"><code>--radius-m</code> — Cards, panels</div>
    </div>
    <div class="radius-item">
      <div class="radius-example" style="border-radius: var(--radius-l);"></div>
      <div class="radius-name">L (16px)</div>
      <div class="radius-usage"><code>--radius-l</code> — Large cards, modals</div>
    </div>
    <div class="radius-item">
      <div class="radius-example" style="border-radius: var(--radius-xl);"></div>
      <div class="radius-name">XL (24px)</div>
      <div class="radius-usage"><code>--radius-xl</code> — Hero sections</div>
    </div>
    <div class="radius-item">
      <div class="radius-example" style="border-radius: var(--radius-circle);"></div>
      <div class="radius-name">Circle (50%)</div>
      <div class="radius-usage"><code>--radius-circle</code> — Avatars, icons</div>
    </div>
  </div>

  <h3>Core motifs</h3>
  <ul>
    <li>
      <strong>Journal grid:</strong> Dotted backgrounds reminiscent of journal grids — structure, organization, and
      thoughtful planning. Use for backgrounds, section dividers, or subtle texture in documentation.
    </li>
    <li>
      <strong>Concentric circles:</strong> Growth, expansion, and the ripple effect of knowledge sharing. Use in headers,
      backgrounds, or as metaphors for community impact.
    </li>
    <li>
      <strong>Pill shapes:</strong> Buttons, tags, and form inputs with friendly, accessible rounded forms and ample touch
      targets.
    </li>
    <li>
      <strong>Background circles:</strong> Large, low-contrast circles for depth without overwhelming content.
    </li>
  </ul>

  <h3>Additional motifs</h3>
  <p>These can be combined across applications: circle groups, overlapping circles, dot grids, wave patterns, arcs, bubble groups, half circles, and quarter circles.</p>

  <h2 id="spacing-system">Spacing system</h2>
  <p>
    Our spacing system uses the golden ratio (1.618) to create an organic, harmonious flow that mirrors the natural
    growth patterns in our leaf-inspired logo.
  </p>

  <h3>Visual scale</h3>
  <div class="spacing-scale">
    <div class="spacing-demo">
      <div class="spacing-label">3XS <small>(0.25–0.31rem)</small></div>
      <div class="spacing-visual" style="height: var(--space-3xs);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">XS <small>(0.65–0.81rem)</small></div>
      <div class="spacing-visual" style="height: var(--space-xs);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">S <small>(1.05–1.31rem)</small></div>
      <div class="spacing-visual" style="height: var(--space-s);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">M <small>(1.7–2.12rem)</small></div>
      <div class="spacing-visual" style="height: var(--space-m);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">L <small>(2.75–3.43rem)</small></div>
      <div class="spacing-visual" style="height: var(--space-l);"></div>
    </div>
    <div class="spacing-demo">
      <div class="spacing-label">XL <small>(4.45–5.55rem)</small></div>
      <div class="spacing-visual" style="height: var(--space-xl);"></div>
    </div>
  </div>

  <h3>Fluid spacing pairs</h3>
  <p>One-up pairs transition between adjacent sizes as the viewport changes:</p>
  <ul>
    <li><code>--space-xs-s</code>, <code>--space-s-m</code>, <code>--space-m-l</code>, <code>--space-l-xl</code></li>
  </ul>

  <h3>Grid and layout</h3>
  <p>
    Content is constrained to a maximum width of 1240px (<code>--grid-max-width</code>) with fluid gutters
    (<code>--grid-gutter</code>). Utility classes include <code>u-grid-fluid</code>, <code>u-grid-golden</code>, and fixed
    column grids (<code>u-grid-2</code>, <code>u-grid-3</code>, etc.). Grids collapse to a single column on smaller
    viewports.
  </p>

  <h2 id="image-guidelines">Image guidelines</h2>
  <p>Image usage guidelines coming soon.</p>

    <section id="voice-and-tone" class="brand-markdown">
      <h2>Voice and Tone</h2>
      <VoiceAndTone />
    </section>
  </div>
</ScrollSidebarLayout>

<style>
  .brand-page-layout {
    padding-top: var(--space-s);
    padding-bottom: var(--space-xl);
  }

  .brand-page.container-content,
  .brand-page__header.container-content {
    max-width: none;
    padding: 0;
  }

  .brand-page__header h1 {
    margin-bottom: var(--space-m);
  }

  @media (min-width: 48.0625rem) {
    .brand-page.container-content {
      padding-right: 0;
    }
  }

  .brand-page > h2 {
    margin-top: var(--space-xl);
    padding-top: var(--space-l);
    border-top: 1px solid var(--color-background-secondary-2);
  }

  .brand-page > h2:first-of-type {
    margin-top: var(--space-l);
    padding-top: 0;
    border-top: none;
  }

  .brand-page > h3 {
    margin-top: var(--space-l);
  }

  .brand-page > h4 {
    margin-top: var(--space-m);
    font-size: var(--step-1);
    opacity: 0.85;
  }

  /* Color palette tables */
  .color-mode-container {
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-m);
    padding: var(--space-s);
    margin-bottom: var(--space-m);
    overflow-x: auto;
  }

  .color-mode-container h4 {
    margin: 0 0 var(--space-s);
    font-size: var(--step-1);
    opacity: 0.75;
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

  :global(body.dark-mode) .brand-page .color-swatch-circle {
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
    border-radius: var(--radius-xs);
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
    background: var(--color-mint);
  }

  :global(body.dark-mode) .brand-page .copy-value.is-copied {
    background: var(--color-mint-dark);
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

  /* Highlight boxes */
  .highlight-box {
    background: var(--color-background-secondary-1);
    border-radius: var(--radius-m);
    padding: var(--space-s);
    margin: var(--space-m) 0;
  }

  .highlight-box h4 {
    margin-top: 0;
  }

  /* Color combination demos */
  .color-combinations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-m);
    margin-bottom: var(--space-m);
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
    background-color: var(--color-mint);
  }

  .blue-bg {
    background-color: var(--color-blue);
  }

  .teal-bg {
    background-color: var(--color-teal);
  }

  .gold-bg {
    background-color: var(--color-gold);
  }

  .text-border .combo-element {
    border: 1px solid var(--color-text);
  }

  :global(body.dark-mode) .brand-page .mint-bg {
    background-color: var(--color-mint-dark);
  }

  :global(body.dark-mode) .brand-page .blue-bg {
    background-color: var(--color-blue-dark);
  }

  :global(body.dark-mode) .brand-page .teal-bg {
    background-color: var(--color-teal-dark);
  }

  :global(body.dark-mode) .brand-page .gold-bg {
    background-color: var(--color-gold-dark);
  }

  :global(body.dark-mode) .brand-page .text-border .combo-element {
    border-color: var(--color-text-dark);
  }

  /* Typography specimens */
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

  /* Border radius demos */
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

  /* Spacing scale bars */
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
    min-width: 80px;
    max-width: calc(100% - 200px);
    background: var(--color-accent-text);
    border-radius: var(--radius-s);
  }

  /* Logo assets table */
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

  .brand-colors-table tr:last-child td {
    border-bottom: none;
  }

  /* Voice and tone */
  .brand-markdown {
    margin-top: var(--space-xl);
    padding-top: var(--space-l);
    border-top: 1px solid var(--color-background-secondary-2);
  }

  .brand-markdown :global(h2) {
    font-size: var(--step-2);
    color: var(--color-text);
    margin: 0 0 var(--space-m);
    border-bottom: 2px solid var(--color-background-secondary-2);
    padding-bottom: var(--space-xs);
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

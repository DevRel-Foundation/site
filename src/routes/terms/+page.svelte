<script>

  import CopyIcon from 'iconoir/icons/copy.svg';

  let copiedIndex = null;
  let copyTimeout;

  function handleCopy(index, event) {
    // Find the blockquote element
    const blockquote = event.currentTarget.closest('blockquote');
    if (!blockquote) return;
    // Get the text content (excluding the icon)
    const text = Array.from(blockquote.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE || node.nodeName !== 'IMG')
      .map(node => node.textContent)
      .join(' ')
      .trim();

    navigator.clipboard.writeText(text);
    copiedIndex = index;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => copiedIndex = null, 1500);
  }


</script>

<svelte:head>
  <title>Terms of Use | DevRel Foundation</title>
  <meta name="description" content="DevRel Foundation Terms of Use and Licensing" />
</svelte:head>

<div class="container container-content">
  <header class="page-header">
    <h1>Terms of Use</h1>
    <p class="subtitle">Intellectual property and licensing considerations for DevRel Foundation projects.</p>
  </header>

  <div class="content">

    <section>
      <h2>License and Intellectual Property</h2>
      <p>All documentation is made available by the Developer Relations Foundation under the <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"> Creative Commons Attribution 4.0 International License</a>.</p>
      <p>
        This means that anyone contributing to or using this documentation—including managers, working groups, and users—must follow the terms of this license. In simple terms:
      </p>
      <ul>
        <li>You are free to share and adapt the content (copy, redistribute, remix, transform)</li>
        <li>But <strong>you must give proper credit to the Developer Relations Foundation</strong></li>
        <li>You also need to indicate if changes were made</li>
      </ul>
    </section>

    <section>
      <h2>Citation</h2>
      <p><b>How to reference if reusing the content as-is (without modifications):</b></p>
      {#if copiedIndex===0}
        <span class="copy-confirm">Copied!</span>
      {/if}
      <blockquote>
        <img src="{CopyIcon}" alt="Copy Citation" class="copy-icon" on:click={(e) => handleCopy(0,e)} />
        This documentation includes material from the Developer Relations Foundation, available under the 
        <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
          Creative Commons Attribution 4.0 International License
        </a>.
      </blockquote>


      <p><b>How to reference adapting or modifying the content:</b></p>
      {#if copiedIndex===1}
        <span class="copy-confirm">Copied!</span>
      {/if}
      <blockquote>
        <img src="{CopyIcon}" alt="Copy Citation" class="copy-icon" on:click={(e) => handleCopy(1,e)} />
        This documentation is adapted from materials originally created by the Developer Relations Foundation, available under the 
        <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
          Creative Commons Attribution 4.0 International License
        </a>. Changes have been made from the original. 
      </blockquote>
    </section>

    <section>
      <h2>Contact Us</h2>
      <p>If you have any questions about these terms and proper use, please contact us:</p>
      <ul>
        <li><strong>Email:</strong> info@dev-rel.org</li>
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
    color: var(--color-background-secondary-2-dark);
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
    color: var(--color-background-secondary-2-dark);
    text-decoration: underline;
  }

  .content a:hover {
    color: var(--color-text-accent);
  }

  .content strong {
    color: var(--color-text);
    font-weight: 600;
  }

  .content blockquote {
    margin: var(--space-m) 0;
    padding: var(--space-m) var(--space-l);
    background: var(--color-background-secondary-1);
    border-left: 4px solid var(--color-background-secondary-2-dark);
    border-radius: var(--radius-m);
    color: var(--color-text);
    font-size: var(--step-0);
    font-style: italic;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.03);
  }

  .copy-icon {
    float: right;
    margin-left: var(--space-m);
    margin-top: 0.2em;
    margin-right: 0.2em;
    width: 1.5em;
    height: 1.5em;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .copy-icon:hover {
    opacity: 1;
  }

  .copy-confirm {
    position: absolute;
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    font-size: var(--step--2);
    white-space: nowrap;
    z-index: 10;
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

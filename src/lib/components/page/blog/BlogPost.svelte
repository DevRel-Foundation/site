<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import TwitterIcon from 'iconoir/icons/x.svg';
  import LinkedInIcon from 'iconoir/icons/linkedin.svg';
  import LinkIcon from 'iconoir/icons/link.svg';
  import FacebookIcon from 'iconoir/icons/facebook.svg';
  
  const { 
    title, 
    excerpt, 
    author, 
    date, 
    category = 'all',
    tags = [],
    readingTime = '',
    slug,
    image,
    children
  } = $props();
  
  let showShareMenu = $state(false);
  let githubUsers = $state<Array<{
    type: 'github' | 'text';
    username?: string;
    name: string;
    avatar?: string | null;
    url?: string;
    bio?: string | null;
  }>>([]);
  let showCopyConfirmation = $state(false);
  let copiedAnchorId = $state<string | null>(null);
  let anchorCopyTimeout: number;
  let tocHeadings = $state<Array<{
    id: string;
    text: string;
  }>>([]);
  let activeHeadingId = $state<string | null>(null);
  
  // Foundation representatives who don't need disclaimers
  const foundationRepresentatives = [
    '@j12y',
    '@devrel-foundation',
    '@anajsana',
    '@wesley83',
    '@jcleblanc',
    '@kmillrunner',
    '@ssk_14',
    '@adityaoberai1'
  ];
  
  // Check if author is a foundation representative
  const isFoundationRepresentative = $derived(
    author && foundationRepresentatives.some(rep => 
      author.toLowerCase().includes(rep.toLowerCase())
    )
  );
  
  function toggleShareMenu() {
    showShareMenu = !showShareMenu;
  }
  
  function copyLink() {
    navigator.clipboard.writeText($page.url.href);
    showCopyConfirmation = true;
    setTimeout(() => {
      showCopyConfirmation = false;
    }, 2000);
  }
  
  function shareTwitter() {
    const url = encodeURIComponent($page.url.href);
    const text = encodeURIComponent(`${title}\n\n${excerpt || ''}\n\n`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }
  
  function shareLinkedIn() {
    const url = encodeURIComponent($page.url.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }
  
  function shareFacebook() {
    const url = encodeURIComponent($page.url.href);
    const quote = encodeURIComponent(`${title}\n\n${excerpt || ''}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank');
  }
  
  function shareBluesky() {
    const url = encodeURIComponent($page.url.href);
    const text = encodeURIComponent(`${title}\n\n${excerpt || ''}\n\n${$page.url.href}`);
    window.open(`https://bsky.app/intent/compose?text=${text}`, '_blank');
  }

  function copyAnchorLink(headingId: string) {
    const url = `${$page.url.origin}${$page.url.pathname}#${headingId}`;
    navigator.clipboard.writeText(url);
    copiedAnchorId = headingId;
    
    // Clear any existing timeout
    if (anchorCopyTimeout) {
      clearTimeout(anchorCopyTimeout);
    }
    
    // Clear the confirmation after 2 seconds
    anchorCopyTimeout = setTimeout(() => {
      copiedAnchorId = null;
    }, 2000);
  }

  function generateId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  // Parse authors and load from authors.json
  onMount(() => {
    let handleScroll: () => void;
    
    async function initializeComponent() {
      if (author) {
        const authors = author.split(',').map((a: string) => a.trim());
        
        // Load authors data from API endpoint
        let authorsData = {};
        try {
          const response = await fetch('/api/authors');
          if (response.ok) {
            authorsData = await response.json();
          }
        } catch (error) {
          console.error('Failed to load authors data:', error);
        }
        
        const userPromises = authors.map(async (authorName: string) => {
          if (authorName.startsWith('@')) {
            const username = authorName.slice(1);
            const authorKey = `@${username}`;
            const authorData = authorsData[authorKey];
            
            if (authorData) {
              return {
                type: 'github' as const,
                username,
                name: authorData.name || username,
                avatar: authorData.avatar,
                url: authorData.url,
                bio: authorData.bio
              };
            } else {
              // Fallback for authors not in authors.json
              return { 
                type: 'github' as const, 
                username, 
                name: username, 
                avatar: null, 
                url: `https://github.com/${username}`, 
                bio: null 
              };
            }
          }
          return { type: 'text' as const, name: authorName };
        });
        
        githubUsers = await Promise.all(userPromises);
      }

      // Add anchor links to headings and collect H2s for TOC
      const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3');
      const h2Headings: Array<{ id: string; text: string }> = [];
      
      headings.forEach((heading) => {
        const text = heading.textContent || '';
        const id = generateId(text);
        
        // Set the heading ID if it doesn't already have one
        if (!heading.id) {
          heading.id = id;
        }
        
        // Collect H2 headings for table of contents
        if (heading.tagName === 'H2') {
          h2Headings.push({ id, text });
        }
        
        // Create anchor link container
        const anchorContainer = document.createElement('span');
        anchorContainer.className = 'heading-anchor';
        anchorContainer.innerHTML = `
          <svg class="anchor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          <span class="copy-confirmation" style="opacity: 0;">Copied!</span>
        `;
        
        // Add click handler
        anchorContainer.addEventListener('click', (e) => {
          e.preventDefault();
          copyAnchorLink(heading.id);
          
          // Show confirmation for this specific anchor
          const confirmation = anchorContainer.querySelector('.copy-confirmation');
          if (confirmation) {
            confirmation.style.opacity = '1';
            setTimeout(() => {
              confirmation.style.opacity = '0';
            }, 2000);
          }
        });
        
        // Append the anchor to the heading
        heading.appendChild(anchorContainer);
      });
      
      // Update table of contents
      tocHeadings = h2Headings;
    }

    // Set up scroll listener for active heading tracking
    let scrollTimeout: number;
    handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        const headingElements = document.querySelectorAll('.post-content h2');
        let currentActiveId = null;
        
        // Find the heading that's currently in view
        headingElements.forEach((heading) => {
          const rect = heading.getBoundingClientRect();
          // Consider a heading active if it's within the top 30% of the viewport
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            currentActiveId = heading.id;
          }
        });
        
        // If no heading is in the top 30%, use the last heading that passed the top
        if (!currentActiveId) {
          let lastPassedId = null;
          headingElements.forEach((heading) => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.3) {
              lastPassedId = heading.id;
            }
          });
          currentActiveId = lastPassedId;
        }
        
        activeHeadingId = currentActiveId;
      }, 10); // Small throttle to improve performance
    };

    initializeComponent().then(() => {
      // Add scroll listener after initialization
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    });

    // Cleanup function
    return () => {
      if (anchorCopyTimeout) {
        clearTimeout(anchorCopyTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Effect to update copy confirmations
  $effect(() => {
    const confirmations = document.querySelectorAll('.copy-confirmation');
    confirmations.forEach((confirmation, index) => {
      const heading = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3')[index];
      if (heading && copiedAnchorId === heading.id) {
        confirmation.textContent = 'Copied!';
        confirmation.classList.add('show');
      } else {
        confirmation.textContent = '';
        confirmation.classList.remove('show');
      }
    });
  });
</script>

<div class="blog-header-wrapper">
  <header class="blog-header">
    <div class="post-meta">
      <a href="/blog" class="blog-title">BLOG</a> | 
      <a href="/blog/category/{category}" class="category-tag">{category}</a>
      <time datetime={date}>{new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
      })}</time>
      {#if readingTime}
        <span class="reading-time">{readingTime}</span>
      {/if}
    </div>
    
    <h1 class="main-title">{title}</h1>

    <div class="header-content">
      <div class="image-section">
        <div class="post-image">
          <img src={image || '/images/blog/devrel-foundation-blog.png'} alt={title} />
        </div>
        
        <div class="share-icons">
          <button onclick={shareLinkedIn} class="share-icon-button" aria-label="Share on LinkedIn">
            <img src={LinkedInIcon} alt="Share on LinkedIn" class="social-icon" />
          </button>
          <button onclick={shareFacebook} class="share-icon-button" aria-label="Share on Facebook">
            <img src={FacebookIcon} alt="Share on Facebook" class="social-icon" />
          </button>
          <button onclick={shareBluesky} class="share-icon-button" aria-label="Share on Bluesky">

              <svg class="social-icon" viewBox="0 0 512 452" fill="none" stroke="currentColor" stroke-width="40" aria-label="Bluesky">
                <path d="M111 30.4c58.7 44.2 121.8 133.9 145 182 23.2-48.1 86.3-137.7 145-182 42.4-31.9 111-56.6 111 22 0 15.7-9 131.8-14.2 150.6-18.3 65.5-84.9 82.2-144.1 72.1 103.5 17.7 129.9 76.2 73 134.8-108 111.2-155.3-27.9-167.4-63.6-3.5-10.3-3-10.5-6.6 0-12.1 35.6-59.3 174.8-167.4 63.6-56.9-58.6-30.6-117.1 73-134.8-59.2 10.1-125.8-6.6-144.1-72.1C9 184.2 0 68.1 0 52.4c0-78.5 68.6-53.9 111-22z"/>
              </svg>

          </button>
          <button onclick={shareTwitter} class="share-icon-button" aria-label="Share on X/Twitter">
            <img src={TwitterIcon} alt="Share on X" class="social-icon" />
          </button>
          <button onclick={copyLink} class="share-icon-button" aria-label="Copy link" title="Copy link to this post">
            <img src={LinkIcon} alt="Copy link" class="social-icon" />
            {#if showCopyConfirmation}
              <span class="copy-confirmation">Copied!</span>
            {/if}
          </button>
        </div>
      </div>
      
      <div class="title-section">
        
        {#if excerpt}
          <p class="excerpt">{excerpt}</p>
        {/if}
        
        <div class="post-actions">
          <div class="author-info">
            {#if githubUsers.length > 0}
              <div class="authors">
                <div class="author-line">

                  {#each githubUsers as user, index}
                    {#if user.type === 'github'}
                      <a href="/blog/author/{user.username}" class="github-author">
                        {#if user.avatar}
                          <img src={user.avatar} alt={user.name} class="author-avatar" />
                        {/if}
                        {user.name}
                      </a>
                    {:else}
                      <span class="text-author">{user.name}</span>
                    {/if}
                    {#if index < githubUsers.length - 1}
                      <span class="author-separator">, </span>
                    {/if}
                  {/each}
                </div>
                
                {#each githubUsers as user}
                  {#if user.type === 'github' && user.bio}
                    <div class="author-bio">
                      {#each user.bio.split('\n') as bioLine}
                        <p class="author-bio">{bioLine}</p>
                      {/each}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </header>
</div>


<article class="blog-post">
  {#if !isFoundationRepresentative}
    <div class="disclaimer">
      <p><em>This blog post represents the viewpoint of its author(s) and does not necessarily reflect an official position or perspective of the DevRel Foundation or any subsidiary working group. Authors' current workplace or affiliated products, if mentioned, are disclosed for transparency.</em></p>
    </div>
  {/if}
  
  <div class="post-layout">
    <div class="post-content">
      {@render children?.()}
    </div>
    
    {#if tags.length > 0 || tocHeadings.length > 0}
      <aside class="post-sidebar">
        {#if tocHeadings.length > 0}
          <div class="sidebar-toc">
            <h4 class="sidebar-title">Contents</h4>
            <nav class="toc-nav">
              {#each tocHeadings as heading}
                <a 
                  href="#{heading.id}" 
                  class="toc-link"
                  class:active={activeHeadingId === heading.id}
                >
                  {heading.text}
                </a>
              {/each}
            </nav>
          </div>
        {/if}
        
        {#if tags.length > 0}
          <div class="sidebar-tags">
            <h4 class="sidebar-title">Topics</h4>
            <div class="meta-tags">
              {#each tags as tag}
                <a href="/blog/tag/{tag}"><span class="meta-tag">#{tag}</span></a>
              {/each}
            </div>
          </div>
        {/if}
      </aside>
    {/if}
  </div>
</article>

<style>
  .blog-header-wrapper {
    background-color: var(--color-background-secondary-1);
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    padding: var(--space-l) 0;
    overflow-x: hidden;
  }
  
  .blog-header {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-l);
  }
  
  .header-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: var(--space-m);
    align-items: start;
    margin-top: var(--space-s);
  }
  
  .post-image {
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: var(--radius-m);
  }
  
  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .blog-post {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-l);
  }
  
  .post-layout {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: var(--space-xl);
    align-items: start;
  }
  
  .post-content {
    max-width: 800px;
    line-height: 1.7;
    margin-bottom: var(--space-xl);
  }
  
  .post-sidebar {
    position: sticky;
    top: 6rem;
    height: fit-content;
  }
  
  .sidebar-tags {
    padding: var(--space-m);
  }
  
  .sidebar-toc {
    padding: var(--space-m);
    border-bottom: 1px solid var(--color-background-secondary-2);
    margin-bottom: var(--space-m);
  }
  
  .toc-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }
  
  .toc-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--step--1);
    line-height: 1.4;
    padding: var(--space-3xs) 0;
    border-left: 2px solid transparent;
    padding-left: var(--space-2xs);
    transition: all 0.2s ease;
  }
  
  .toc-link:hover {
    color: var(--color-background-secondary-2-dark);
    border-left-color: var(--color-background-secondary-2-dark);
  }
  
  .toc-link.active {
    color: var(--color-text-secondary);
    border-left-color: var(--color-background-secondary-2-dark);
    font-weight: 600;
  }
  
  .sidebar-title {
    margin: 0 0 var(--space-s) 0;
    font-size: var(--step--1);
    font-weight: 600;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    margin-bottom: var(--space-m);
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .blog-title {
    font-family: var(--font-family-heading);
    font-size: var(--step-0);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
  }
  
  .blog-title:hover {
    color: var(--color-background-secondary-2-dark);
  }
  
  .category-tag {
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--step--2);
  }
  
  .main-title {
    margin: 0 0 var(--space-2xs) 0;
    font-size: var(--step-3);
    line-height: 1.2;
    word-break: break-word;
    hyphens: auto;
  }
  
  .excerpt {
    font-size: var(--step-0);
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-m);
    margin-top: 0;
  }
  
  .post-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .authors {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }
  
  .author-line {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    flex-wrap: wrap;
  }
  
  .author-bio {
    color: var(--color-text-secondary);
    opacity: 0.8;
    line-height: 1.4;
    max-width: 50ch;
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .author-bio p {
    margin: 0;
    margin-bottom: var(--space-3xs);
  }
  
  .author-bio p:last-child {
    margin-bottom: 0;
  }
  
  .image-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }
  
  .share-icons {
    display: flex;
    gap: var(--space-2xs);
    justify-content: center;
  }
  
  .share-icon-button {
    background: none;
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    padding: var(--space-2xs);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .share-icon-button:hover {
    background-color: var(--color-background-secondary-2);
    border-color: var(--color-background-secondary-2-dark);
  }
  
  .social-icon {
    width: 1rem;
    height: 1rem;
    filter: var(--icon-filter);
  }
  
  .post-content :global(h1),
  .post-content :global(h2),
  .post-content :global(h3) {
    margin-top: var(--space-l);
    margin-bottom: var(--space-m);
    line-height: 1.3;
  }
  
  .post-content :global(h1) {
    font-size: var(--step-2);
  }
  
  .post-content :global(h2) {
    font-size: var(--step-1);
  }
  
  .post-content :global(h3) {
    font-size: var(--step-0);
    font-weight: 600;
  }
  
  .post-content :global(p) {
    margin-bottom: var(--space-m);
    font-size: var(--step-0);
  }
  
  .post-content :global(code) {
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-background-secondary-2);
    padding: 0.125em 0.25em;
    border-radius: var(--radius-s);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875em;
  }
  
  .post-content :global(pre) {
    background-color: var(--color-code-background);
    border: 1px solid var(--color-background-secondary-2);
    border-radius: var(--radius-s);
    padding: var(--space-s);
    overflow-x: auto;
    margin: var(--space-s) 0;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  .post-content :global(pre code) {
    background: none;
    padding: 0;
    color: var(--color-accent-text-dark);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  /* JSON syntax highlighting */
  .post-content :global(pre code .token.property) {
    color: var(--color-accent-text-dark);
  }
  
  .post-content :global(pre code .token.string) {
    color: #fbbf24; /* yellow-400 */
  }
  
  .post-content :global(pre code .token.number),
  .post-content :global(pre code .token.boolean) {
    color: var(--color-accent-text);
  }
  
  .post-content :global(pre code .token.punctuation) {
    color: rgba(var(--color-accent-text-rgb), 0.7);
  }
  
  .post-content :global(pre code .token.comment) {
    color: rgba(var(--color-accent-text-rgb), 0.6);
    font-style: italic;
  }
  
  .post-content :global(pre code .token.keyword) {
    color: var(--color-accent-text);
    font-weight: 600;
  }
  
  .post-content :global(blockquote) {
    border-left: 4px solid var(--color-accent-text);
    background-color: var(--color-background-secondary-1);
    padding: var(--space-m);
    margin: var(--space-m) 0;
    font-style: italic;
  }
  
  .post-content :global(blockquote p) {
    margin-bottom: 0;
  }
  
  .post-content :global(ul),
  .post-content :global(ol) {
    margin-top: var(--space-s);
    margin-bottom: var(--space-m);
    font-size: var(--step-0);
  }
  
  .post-content :global(ul.contains-task-list) {
    list-style: none;
    padding-left: 0;
  }
  
  .post-content :global(li.task-list-item) {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
  
  .post-content :global(li.task-list-item input[type="checkbox"]) {
    margin-right: var(--space-2xs);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: auto;
    height: auto;
    background: none;
    border: none;
    outline: none;
  }
  
  .post-content :global(li.task-list-item input[type="checkbox"]:checked) {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: auto;
    height: auto;
    margin-right: var(--space-2xs);
    background: none;
    border: none;
    outline: none;
  }
  
  .post-content :global(li.task-list-item input[type="checkbox"]:checked::before) {
    content: "✅";
    font-size: 1em;
    margin-left: 0;
    display: inline-block;
    line-height: 1;
  }
  
  .github-author {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    text-decoration: none;
    color: var(--color-link);
    font-size: var(--step--1);
    transition: opacity 0.2s ease;
  }
  
  .github-author:hover {
    opacity: 0.8;
  }
  
  .author-avatar {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 1px solid var(--color-background-secondary-2);
  }
  
  .text-author {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .author-separator {
    font-size: var(--step--1);
    color: var(--color-text-secondary);
  }
  
  .meta-tags {
    display: flex;
    gap: var(--space-2xs);
    flex-wrap: wrap;
    margin-top: 0;
  }
  
  .sidebar-tags .meta-tags {
    flex-direction: column;
    gap: var(--space-2xs);
  }
  
  .sidebar-tags .meta-tags a {
    padding-left: var(--space-2xs);
  }
  
  .meta-tags a {
    text-decoration: none;
  }
  
  .meta-tag {
    font-weight: 700;
    color: var(--color-text);
    font-size: var(--step--1);
    transition: color 0.2s ease;
  }
  
  .meta-tags a:hover .meta-tag {
    color: var(--color-background-secondary-2-dark);
  }
  
  .disclaimer {
    background-color: var(--color-background-secondary-1);
    border-left: 3px solid var(--color-background-secondary-2-dark);
    padding: var(--space-s);
    margin: var(--space-l) 0;
    border-radius: var(--radius-s);
  }
  
  .disclaimer p {
    margin: 0;
    font-size: var(--step--1);
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .blog-header-wrapper {
      width: 100%;
      margin-left: 0;
      padding: var(--space-m) 0;
    }
    
    .blog-header {
      padding: 0 var(--space-m);
    }
    
    .header-content {
      grid-template-columns: 1fr;
      gap: var(--space-m);
    }
    
    .post-image {
      aspect-ratio: 16/9;
    }
    
    .blog-post {
      padding: var(--space-m);
      overflow-x: hidden;
    }
    
    .post-layout {
      grid-template-columns: 1fr;
      gap: var(--space-l);
    }
    
    .post-content {
      max-width: none;
      overflow-x: hidden;
      word-wrap: break-word;
    }
    
    .post-content :global(img),
    .post-content :global(table) {
      max-width: 100%;
      height: auto;
      box-sizing: border-box;
    }
    
    .post-sidebar {
      position: static;
      order: 1;
    }
    
    .sidebar-tags {
      padding: var(--space-s);
    }
    
    .sidebar-toc {
      padding: var(--space-s);
      border-bottom: 1px solid var(--color-background-secondary-2);
      margin-bottom: var(--space-s);
    }
    
    .toc-nav {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--space-2xs);
    }
    
    .toc-link {
      border-left: none;
      padding-left: 0;
      background-color: var(--color-background-secondary-1-dark);
      padding: var(--space-3xs) var(--space-2xs);
      border-radius: var(--radius-s);
      font-size: var(--step--2);
    }
    
    .toc-link.active {
      background-color: var(--color-background-secondary-2-dark);
      color: var(--color-background);
      font-weight: 700;
      margin-left: 0;
    }
    
    .sidebar-tags .meta-tags {
      flex-direction: row;
      flex-wrap: wrap;
    }
    
    .post-meta {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2xs);
    }
    
    .post-actions {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-s);
    }
  }
  
  .copy-confirmation {
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    font-size: var(--step--2);
    white-space: nowrap;
    z-index: 10;
  }

  /* Heading anchor styles */
  .post-content :global(h1),
  .post-content :global(h2), 
  .post-content :global(h3) {
    position: relative;
    scroll-margin-top: 5rem;
  }

  .post-content :global(.heading-anchor) {
    position: absolute;
    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .post-content :global(h1:hover .heading-anchor),
  .post-content :global(h2:hover .heading-anchor),
  .post-content :global(h3:hover .heading-anchor) {
    opacity: 1;
  }

  .post-content :global(.anchor-icon) {
    width: 1rem;
    height: 1rem;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
  }

  .post-content :global(.heading-anchor:hover .anchor-icon) {
    color: var(--color-background-secondary-2-dark);
  }

  .post-content :global(.heading-anchor .copy-confirmation) {
    position: absolute;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-background-secondary-2-dark);
    color: var(--color-background);
    padding: var(--space-3xs) var(--space-2xs);
    border-radius: var(--radius-s);
    font-size: var(--step--2);
    white-space: nowrap;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .post-content :global(.heading-anchor .copy-confirmation.show) {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .post-content :global(.heading-anchor) {
      position: static;
      opacity: 1;
      margin-left: var(--space-2xs);
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
    }
    
    .post-content :global(.anchor-icon) {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
</style>
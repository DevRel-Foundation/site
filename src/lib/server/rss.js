const SITE_URL = 'https://dev-rel.org';
const SITE_TITLE = 'DevRel Foundation Blog';
const SITE_DESCRIPTION = 'Elevating the professional practice of Developer Relations';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateRSSFeed(posts, options = {}) {
  const {
    title = SITE_TITLE,
    description = SITE_DESCRIPTION,
    feedPath = '/blog',
    siteUrl = SITE_URL
  } = options;

  const lastBuildDate = new Date().toUTCString();
  const pubDate = posts.length > 0 ? new Date(posts[0].date).toUTCString() : lastBuildDate;

  const items = posts.map(post => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const postDate = new Date(post.date).toUTCString();
    
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || '')}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <category>${escapeXml(post.category || '')}</category>
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
      ${post.tags ? post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ') : ''}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${siteUrl}${feedPath}</link>
    <atom:link href="${siteUrl}${feedPath}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>60</ttl>
    <generator>SvelteKit</generator>
    ${items}
  </channel>
</rss>`;
}

export function createRSSResponse(rssContent) {
  return new Response(rssContent, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'max-age=3600' // Cache for 1 hour
    }
  });
}

export function sortPostsByDate(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

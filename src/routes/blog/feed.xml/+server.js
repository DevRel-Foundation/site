import { getBlogPosts } from '$lib/server/blog.js';
import { generateRSSFeed, createRSSResponse, sortPostsByDate } from '$lib/server/rss.js';
import { error } from '@sveltejs/kit';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    const sortedPosts = sortPostsByDate(posts);
    
    const rss = generateRSSFeed(sortedPosts, {
      title: 'DevRel Foundation Blog',
      description: 'Elevating the professional practice of Developer Relations',
      feedPath: '/blog'
    });
    
    return createRSSResponse(rss);
  } catch (err) {
    console.error('Error generating main blog RSS feed:', err);
    throw error(500, 'Internal server error');
  }
}

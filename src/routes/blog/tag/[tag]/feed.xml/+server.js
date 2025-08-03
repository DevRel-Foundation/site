import { getBlogPosts } from '$lib/server/blog.js';
import { generateRSSFeed, createRSSResponse, sortPostsByDate } from '$lib/server/rss.js';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
  try {
    const posts = await getBlogPosts();
    
    // Filter posts by tag
    const filteredPosts = posts.filter(post => 
      post.tags && post.tags.includes(params.tag)
    );
    
    const sortedPosts = sortPostsByDate(filteredPosts);
    
    const title = `DevRel Foundation Blog - Posts tagged "${params.tag}"`;
    const description = `All blog posts tagged with "${params.tag}" from the DevRel Foundation`;
    
    const rss = generateRSSFeed(sortedPosts, {
      title,
      description,
      feedPath: `/blog/tag/${params.tag}`
    });
    
    return createRSSResponse(rss);
  } catch (err) {
    console.error('Error generating tag RSS feed:', err);
    throw error(500, 'Internal server error');
  }
}

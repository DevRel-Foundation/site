import { getBlogPostsByAuthor, getAuthor } from '$lib/server/blog.js';
import { generateRSSFeed } from '$lib/server/rss.js';
import { error } from '@sveltejs/kit';

export async function GET({ params, url }) {
  try {
    const author = await getAuthor(params.username);
    
    if (!author) {
      throw error(404, 'Author not found');
    }
    
    const posts = await getBlogPostsByAuthor(params.username);
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const rssContent = generateRSSFeed({
      title: `DevRel Foundation Blog - ${author.name || author.username}`,
      description: author.bio || `Posts by ${author.name || author.username}`,
      link: url.origin + `/blog/author/${params.username}`,
      posts: sortedPosts,
      baseUrl: url.origin
    });
    
    return new Response(rssContent, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (err) {
    console.error('Error generating author RSS feed:', err);
    if (err.status === 404) {
      throw err;
    }
    throw error(500, 'Failed to generate RSS feed');
  }
}

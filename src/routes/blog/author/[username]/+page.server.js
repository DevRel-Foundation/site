import { getBlogPostsByAuthor, getAuthor } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
  try {
    const author = await getAuthor(params.username);
    
    // Check if author exists
    if (!author) {
      throw error(404, 'Author not found');
    }
    
    const posts = await getBlogPostsByAuthor(params.username);
    
    return {
      posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)),
      author,
      username: params.username,
      // Force reactivity by including the current path
      currentPath: url.pathname
    };
  } catch (err) {
    console.error('Error loading author page:', err);
    if (err.status === 404) {
      throw err;
    }
    throw error(500, 'Failed to load author posts');
  }
}

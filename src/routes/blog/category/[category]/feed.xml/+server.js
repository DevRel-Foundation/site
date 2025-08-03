import { getBlogPostsByCategory, getCategories } from '$lib/server/blog.js';
import { generateRSSFeed, createRSSResponse, sortPostsByDate } from '$lib/server/rss.js';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
  try {
    const categoryData = getCategories();
    const validCategories = categoryData.categories;
    
    // Check if category exists
    if (!validCategories.includes(params.category)) {
      throw error(404, 'Category not found');
    }
    
    const posts = await getBlogPostsByCategory(params.category);
    const sortedPosts = sortPostsByDate(posts);
    
    const categoryDescription = categoryData.descriptions[params.category] || `Posts in the ${params.category} category`;
    const title = `DevRel Foundation Blog - ${params.category.charAt(0).toUpperCase() + params.category.slice(1)}`;
    
    const rss = generateRSSFeed(sortedPosts, {
      title,
      description: categoryDescription,
      feedPath: `/blog/category/${params.category}`
    });
    
    return createRSSResponse(rss);
  } catch (err) {
    if (err.status === 404) {
      throw err;
    }
    throw error(500, 'Internal server error');
  }
}

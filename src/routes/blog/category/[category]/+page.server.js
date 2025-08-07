import { getBlogPostsByCategory, getCategories } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
  try {
    const categoryData = getCategories();
    const validCategories = categoryData.categories;
    
    // Check if category exists
    if (!validCategories.includes(params.category)) {
      throw error(404, 'Category not found');
    }
    
    const posts = await getBlogPostsByCategory(params.category);
    
    return {
      posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)),
      category: params.category,
      categories: categoryData.categories,
      categoryDescriptions: categoryData.descriptions,
      // Force reactivity by including the current path
      currentPath: url.pathname
    };
  } catch (err) {
    console.error('Error loading category page:', err);
    throw error(500, 'Failed to load category posts');
  }
}

import { getBlogPostsByCategory, getCategories } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
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
    categoryDescriptions: categoryData.descriptions
  };
}

import { getBlogPosts, getCategories } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const posts = await getBlogPosts();
  const categoryData = getCategories();
  
  // Filter posts by tag
  const filteredPosts = posts.filter(post => 
    post.tags && post.tags.includes(params.tag)
  );
  
  return {
    posts: filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)),
    tag: params.tag,
    categoryDescriptions: categoryData.descriptions
  };
}

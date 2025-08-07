import { getBlogPost } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    throw error(404, 'Post not found');
  }
  
  return {
    post
  };
}

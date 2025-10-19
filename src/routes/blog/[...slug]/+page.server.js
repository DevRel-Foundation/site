import { getBlogPost } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  const post = await getBlogPost(slug);

  if (!post) {
    throw error(404, 'Post not found');
  }
  
  return {
    post
  };
}

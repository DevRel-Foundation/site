import { getBlogPosts } from '$lib/server/blog.js';

export async function load() {
  const posts = await getBlogPosts();

  return {
    posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  };
}

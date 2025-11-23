import { getBlogPostsByTag } from '$lib/server/blog.js';

const projectName = 'persona-library';

export async function load({ fetch }) {
  try {
    const relatedPosts = await getBlogPostsByTag(projectName);

    return {
      relatedPosts
    };
  } catch (err) {
    console.error(`Error fetching server-side project data for ${projectName}`, err);
    return { categories: [], labels: [], relatedPosts: [] };
  }
}
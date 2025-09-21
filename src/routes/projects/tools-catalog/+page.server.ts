import { getBlogPostsByTag } from '$lib/server/blog.js';

const projectName = 'tools-catalog';

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
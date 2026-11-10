import { getBlogPosts } from '$lib/server/blog.js';
import { LEGACY_TAG_TOPICS, getTopic } from '$lib/blog-topics';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const legacy = LEGACY_TAG_TOPICS[params.tag];
  if (legacy) {
    redirect(301, `/blog/tag/${legacy}`);
  }

  const topic = getTopic(params.tag);
  if (!topic) {
    error(404, 'Topic not found');
  }

  const posts = await getBlogPosts();
  const filteredPosts = posts.filter((post) => post.tags?.includes(topic.slug));

  return {
    posts: filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)),
    topic
  };
}

import { getBlogPosts } from '$lib/server/blog.js';
import { generateRSSFeed, createRSSResponse, sortPostsByDate } from '$lib/server/rss.js';
import { LEGACY_TAG_TOPICS, getTopic } from '$lib/blog-topics';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ params }) {
  const legacy = LEGACY_TAG_TOPICS[params.tag];
  if (legacy) {
    redirect(301, `/blog/tag/${legacy}/feed.xml`);
  }

  const topic = getTopic(params.tag);
  if (!topic) {
    error(404, 'Topic not found');
  }

  const posts = await getBlogPosts();
  const sortedPosts = sortPostsByDate(posts.filter((post) => post.tags?.includes(topic.slug)));

  const rss = generateRSSFeed(sortedPosts, {
    title: `DevRel Foundation Blog - ${topic.label}`,
    description: topic.description,
    feedPath: `/blog/tag/${topic.slug}`
  });

  return createRSSResponse(rss);
}

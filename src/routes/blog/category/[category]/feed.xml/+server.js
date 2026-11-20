import { LEGACY_CATEGORY_TOPICS } from '$lib/blog-topics';
import { redirect } from '@sveltejs/kit';

export function GET({ params }) {
  const topic = LEGACY_CATEGORY_TOPICS[params.category];
  redirect(301, topic ? `/blog/tag/${topic}/feed.xml` : '/blog/feed.xml');
}

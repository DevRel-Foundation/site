import { LEGACY_CATEGORY_TOPICS } from '$lib/blog-topics';
import { redirect } from '@sveltejs/kit';

// The blog used audience categories before topics; send old links to the closest topic.
export function GET({ params }) {
  const topic = LEGACY_CATEGORY_TOPICS[params.category];
  redirect(301, topic ? `/blog/tag/${topic}` : '/blog');
}

import type { RequestHandler } from '@sveltejs/kit';
import { getJobCategories } from '$lib/server/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  const categories = await getJobCategories();
  return new Response(JSON.stringify({ categories }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

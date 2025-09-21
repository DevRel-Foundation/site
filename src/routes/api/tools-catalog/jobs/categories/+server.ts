import type { RequestHandler } from '@sveltejs/kit';
import { getJobCategories } from '$lib/server/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  try {
    const categories = await getJobCategories();
    console.log('GET /api/tools-catalog/jobs/categories ->', Array.isArray(categories) ? categories.length : typeof categories);
    return new Response(JSON.stringify({ categories }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error in GET /api/tools-catalog/jobs/categories', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

import type { RequestHandler } from '@sveltejs/kit';
import { getJobOutcomes } from '$lib/server/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  const outcomes = await getJobOutcomes();
  return new Response(JSON.stringify({ outcomes }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

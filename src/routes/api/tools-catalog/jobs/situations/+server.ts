import type { RequestHandler } from '@sveltejs/kit';
import { getJobSituations } from '$lib/server/projects/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  const situations = await getJobSituations();
  return new Response(JSON.stringify({ situations }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

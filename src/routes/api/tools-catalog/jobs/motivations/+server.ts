import type { RequestHandler } from '@sveltejs/kit';
import { getJobMotivations } from '$lib/server/projects/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  const motivations = await getJobMotivations();
  return new Response(JSON.stringify({ motivations }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

// src/routes/api/tools-catalog/labels/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { getLabels} from '$lib/server/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  const labels = await getLabels();
  return new Response(JSON.stringify({ labels }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
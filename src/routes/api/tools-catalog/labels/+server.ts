// src/routes/api/tools-catalog/labels/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { getLabels} from '$lib/server/tools-catalog/schema-reader';

export const GET: RequestHandler = async () => {
  try {
    const labels = await getLabels();
    console.log('GET /api/tools-catalog/labels ->', Array.isArray(labels) ? labels.length : typeof labels);
    return new Response(JSON.stringify({ labels }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error in GET /api/tools-catalog/labels', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
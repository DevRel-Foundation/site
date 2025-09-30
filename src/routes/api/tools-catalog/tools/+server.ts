import type { RequestHandler } from '@sveltejs/kit';

import * as indexer from '$lib/server/projects/tools-catalog/tools-index-reader';

export const GET: RequestHandler = async () => {
  try {
    const tools = await indexer.get_tools();
    const count = await indexer.get_total_tools_count();

    let data = {
        count: count,
        tools: tools,
    };

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error in GET /api/tools-catalog', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
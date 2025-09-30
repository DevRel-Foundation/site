import type { RequestHandler } from '@sveltejs/kit';

import * as indexer from '$lib/server/projects/tools-catalog/tools-index-reader';

export const GET: RequestHandler = async () => {
  try {
    const count = await indexer.get_total_tools_count();
    const labels = await indexer.get_labels_list();
    const categories = await indexer.get_job_categories_list();

    let data = {
        count: count,
        labels: labels,
        categories: categories,
        outcomes: await indexer.get_job_outcomes_list(),
        motivations: await indexer.get_job_motivations_list(),
        situations: await indexer.get_job_situations_list()
    };

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error in GET /api/tools-catalog', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
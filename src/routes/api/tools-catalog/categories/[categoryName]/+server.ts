import type { RequestHandler } from '@sveltejs/kit';

import { get_job_categories } from '$lib/server/projects/tools-catalog/tools-index-reader';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const categoryName = params['categoryName'];
        const categories = await get_job_categories();

        let data = {
            categories: categories[categoryName] || []
        };

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Error in GET /api/tools-catalog/tools/{tool-id}', err);

        return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
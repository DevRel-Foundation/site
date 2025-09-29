import type { RequestHandler } from '@sveltejs/kit';

import { get_tools_by_label } from '$lib/server/projects/tools-catalog/tools-index-reader';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const labelName = params['labelName'];
        const tools = await get_tools_by_label(labelName);

        let data = {
            result: tools
        };

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Error in GET /api/tools-catalog/tools/{tool-id}', err);

        return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
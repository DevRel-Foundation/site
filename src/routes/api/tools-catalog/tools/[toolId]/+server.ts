import type { RequestHandler } from '@sveltejs/kit';

import * as reader from '$lib/server/projects/tools-catalog/tool-reader';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const toolId = params['toolId'];
        const tool = await reader.get_tool_by_id(toolId);

        let data = {
            result: tool
        };

        return new Response(JSON.stringify(data) , {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Error in GET /api/tools-catalog/tools/{tool-id}', err);
        return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
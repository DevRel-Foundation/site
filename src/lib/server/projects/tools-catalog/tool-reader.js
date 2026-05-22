const DATA_URL = 'https://raw.githubusercontent.com/DevRel-Foundation/tools-catalog/main/data/';

export async function get_tool_by_id(toolId) {
    const res = await fetch(DATA_URL + toolId + '.json');

    if (!res.ok) throw new Error('Failed to fetch tool data.');

    const tool = await res.json();

    return tool;
}
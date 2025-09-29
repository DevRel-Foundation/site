
let toolsCache: any = null;
let lastFetch = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const TOOLS_INDEX_URL = 'https://raw.githubusercontent.com/DevRel-Foundation/tools-catalog/main/docs/index/index.json';


export async function get_tools_index() {
  const now = Date.now();
  if (!toolsCache || now - lastFetch > CACHE_TTL) {
    const res = await fetch(TOOLS_INDEX_URL);
    console.log(res);
    if (!res.ok) throw new Error('Failed to fetch tools index');
    toolsCache = await res.json();
    console.log(toolsCache);
    lastFetch = now;
  }
  return toolsCache;
}

export async function get_total_tools_count() {
    const tools = await get_tools_index();
    return tools.total;
}

export async function get_labels() {
    const tools = await get_tools_index();

    return Object.keys(tools.labels); 
}

export async function get_tools_by_label(label: string) {
    const tools = await get_tools_index();

    return tools.labels[label] || [];
}

export async function get_job_categories() {
    const tools = await get_tools_index();
    return Object.keys(tools.jobs.categories);
}

export async function get_job_outcomes() {
    const tools = await get_tools_index();
    return Object.keys(tools.jobs.outcomes);
}

export async function get_job_motivations() {
    const tools = await get_tools_index();
    return Object.keys(tools.jobs.motivations);
}

export async function get_job_situations() {
    const tools = await get_tools_index();
    return Object.keys(tools.jobs.situations);
}


// TODO: Fix below endpoints

/*
export async function getJobOutcomes() {
  const schema = await getToolsSchema();
  const defs = schema.$defs;
  const outcomes = Object.keys(defs)
    .filter(key => key.startsWith('outcome-'))
    .map(key => ({
      value: defs[key].const,
      description: defs[key].description
    }));
  return outcomes;
}

export async function getJobMotivations() {
  const schema = await getToolsSchema();
  const defs = schema.$defs;
  const motivations = Object.keys(defs)
    .filter(key => key.startsWith('motivation-'))
    .map(key => ({
      value: defs[key].const,
      description: defs[key].description
    }));
  return motivations;
}

export async function getJobSituations() {
  const schema = await getToolsSchema();
  const defs = schema.$defs;
  const situations = Object.keys(defs)
    .filter(key => key.startsWith('situation-'))
    .map(key => ({
      value: defs[key].const,
      description: defs[key].description
    }));
  return situations;
}

*/
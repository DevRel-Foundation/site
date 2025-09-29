// src/lib/server/tools-catalog/schema-reader.ts
// (moved from schema.ts)
import { json } from '@sveltejs/kit';

let schemaCache: any = null;
let lastFetch = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const SCHEMA_URL = 'https://raw.githubusercontent.com/DevRel-Foundation/tools-catalog/main/src/schemas/tools.json';

// Reads the tools schema periodically and reuses it for future requests.
export async function getToolsSchema() {
  const now = Date.now();
  if (!schemaCache || now - lastFetch > CACHE_TTL) {
    const res = await fetch(SCHEMA_URL);
    if (!res.ok) throw new Error('Failed to fetch tools schema');
    schemaCache = await res.json();
    lastFetch = now;
  }
  return schemaCache;
}

// Returns a list of labels for the tools catalog. They are returned as a dictionary
// in case we want to enrich them with additional details.
export async function getLabels() {
  const schema = await getToolsSchema();
  const labelEnum = schema.properties.labels.items.enum;
  return labelEnum.map(label => ({
    label
  }));
}

export async function getJobCategories() {
  const schema = await getToolsSchema();
  const defs = schema.$defs;
  const categories = Object.keys(defs)
    .filter(key => key.startsWith('category-'))
    .map(key => ({
      value: defs[key].const,
      description: defs[key].description
    }));
  return categories;
}

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

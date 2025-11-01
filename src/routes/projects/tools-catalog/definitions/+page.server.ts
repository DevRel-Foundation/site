import { getJobCategories, getJobOutcomes } from '$lib/server/projects/tools-catalog/schema-reader';

export async function load() {
	const [categories, outcomes] = await Promise.all([
		getJobCategories(),
		getJobOutcomes()
	]);
	return {
		categories,
		outcomes
	};
}

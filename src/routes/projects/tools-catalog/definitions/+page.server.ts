import { getJobCategories, getJobMotivations, getJobOutcomes, getJobSituations } from '$lib/server/projects/tools-catalog/schema-reader';

export async function load() {
	const [categories, outcomes, motivations, situations] = await Promise.all([
		getJobCategories(),
		getJobOutcomes(), 
        getJobMotivations(),
        getJobSituations(),
	]);
	return {
		categories,
		outcomes,
        motivations,
        situations
	};
}

import { getAllUsedTags } from '$lib/tag/tags';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tags = await getAllUsedTags();

	return {
		tags
	};
}) satisfies PageServerLoad;

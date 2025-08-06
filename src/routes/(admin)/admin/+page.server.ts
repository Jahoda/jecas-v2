import { getAllDrafts, getAllPosts } from '$lib/post/post';
import { getAllTags } from '$lib/tag/tags';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = getAllPosts();
	const drafts = await getAllDrafts();
	const tags = getAllTags();

	return {
		drafts,
		optional: {
			posts,
			tags
		}
	};
}) satisfies PageServerLoad;

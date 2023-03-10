import { getAllDrafts, getAllPosts } from '$lib/post/post';
import { getAllTags } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = await getAllPosts();
	const drafts = getAllDrafts();
	const tags = getAllTags();

	return {
		drafts,
		optional: {
			posts,
			tags
		}
	};
}) satisfies PageServerLoad;

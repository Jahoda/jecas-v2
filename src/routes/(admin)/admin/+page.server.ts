import { getAllDrafts, getAllPosts, getFuturePosts } from '$lib/post/post';
import { getAllTags } from '$lib/tag/tags';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = getAllPosts();
	const drafts = await getAllDrafts();
	const futurePosts = getFuturePosts();
	const tags = getAllTags();

	return {
		drafts,
		optional: {
			posts,
			futurePosts,
			tags
		}
	};
}) satisfies PageServerLoad;

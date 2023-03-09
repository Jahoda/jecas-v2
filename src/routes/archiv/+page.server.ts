import { getAllPosts, getPagesTags } from '$lib/post/post';
import { getAllUsedTags } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = await getAllPosts();

	const pagesTags = await getPagesTags(posts);

	const tags = await getAllUsedTags();

	return {
		posts: posts,
		tags: tags,
		pagesTags
	};
}) satisfies PageServerLoad;

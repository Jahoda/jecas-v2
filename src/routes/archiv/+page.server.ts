import { getAllPosts, getPagesTags } from '$lib/post/post';
import { getAllTags } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = await getAllPosts();

	const pagesTags = await getPagesTags(posts);

	const tags = await getAllTags();

	return {
		posts: posts,
		tags: tags,
		pagesTags
	};
}) satisfies PageServerLoad;

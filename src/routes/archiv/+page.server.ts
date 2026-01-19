// Use GitHub API loaders for ISR
import { getAllPosts } from '$lib/post/markdown-github';
import { getAllUsedTags, getPagesTags } from '$lib/tag/tags-github';
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

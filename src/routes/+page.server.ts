// Use GitHub API loaders for ISR
import {
	getAllPosts,
	getPostsBySlug,
	getPostsCount
} from '$lib/post/markdown-github';
import { getAllUsedTags, getPagesTags } from '$lib/tag/tags-github';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const postCount = await getPostsCount();

	const posts = await getAllPosts(15);

	const tags = await getAllUsedTags();

	const favoriteSlugs = [
		'centrovani',
		'kontrola-stranky',
		'svg',
		'https',
		'tvar-url',
		'format-obrazku',
		'chyby-formularu',
		'ceska-pisma',
		'responsivni-web',
		'vykreslovani',
		'css-selektory',
		'ceska-klavesnice',
		'ceska-klavesnice-mac'
	];

	const favorite = await getPostsBySlug(favoriteSlugs);

	const allPosts = [...posts, ...favorite];

	const pagesTags = await getPagesTags(allPosts);

	return {
		tags,
		posts,
		favorite,
		pagesTags,
		postCount
	};
}) satisfies PageServerLoad;

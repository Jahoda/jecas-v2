import { getAllPosts, getPagesTags, getPostsBySlug, getPostsCount } from '$lib/post/post';
import { getAllUsedTags } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const postCount = await getPostsCount();

	const posts = await getAllPosts(15);

	const tags = await getAllUsedTags();

	const favoriteSlugs = [
		'svg',
		'tvar-url',
		'format-obrazku',
		'srank',
		'kontrola-stranky',
		'https',
		'chyby-formularu',
		'ceska-pisma',
		'responsivni-web',
		'vykreslovani',
		'css-selektory',
		'centrovani',
		'ceska-klavesnice'
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

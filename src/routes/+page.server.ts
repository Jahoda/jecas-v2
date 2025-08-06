import { getAllPosts, getPagesTags, getPostsBySlug, getPostsCount } from '$lib/post/post';
import { getAllUsedTags } from '$lib/tag/tags';
import type { CommentContent } from '$lib/comments/comment';
import type { PageServerLoad } from './$types';

async function fetchLatestComments(): Promise<CommentContent[]> {
	try {
		const response = await fetch(
			'https://disqus.com/api/3.0/forums/listPosts.json?forum=jecas&limit=10&related=thread&api_key=BwcwyR03Y19LVAHRVIq0Uly6e0L0QOjaIlrpEaUSoAu8hnUZ8iKJoNllOXT2bSue'
		);
		const data = await response.json();

		if (data.code === 0) {
			return data.response;
		}
		return [];
	} catch (_e) {
		return [];
	}
}

export const load = (async () => {
	const postCount = await getPostsCount();

	const posts = await getAllPosts(15);

	const tags = await getAllUsedTags();

	const comments = fetchLatestComments();

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
		postCount,
		comments
	};
}) satisfies PageServerLoad;

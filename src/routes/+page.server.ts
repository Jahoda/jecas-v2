import { getAllPosts, getPagesTags, getPostsBySlug, getPostsCount, getSinglePostBySlug } from '$lib/post/post';
import { getAllUsedTags } from '$lib/tag/tags';
import { supabase } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

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

async function fetchLatestComments() {
	try {
		const { data: rawComments } = await supabase
			.from('comments')
			.select('id, slug, author_name, author_email, message, created_at')
			.eq('is_approved', true)
			.order('created_at', { ascending: false })
			.limit(10);

		if (!rawComments || rawComments.length === 0) return [];

		const uniqueSlugs = [...new Set(rawComments.map((c) => c.slug))];
		const titleEntries = await Promise.all(
			uniqueSlugs.map(async (slug) => {
				const post = await getSinglePostBySlug(slug);
				return [slug, post?.title || slug] as const;
			})
		);
		const titleMap = new Map(titleEntries);

		return rawComments.map((c) => ({
			...c,
			article_title: titleMap.get(c.slug) || c.slug
		}));
	} catch {
		return [];
	}
}

export const load = (async () => {
	const [postCount, posts, tags, favorite, latestComments] = await Promise.all([
		getPostsCount(),
		getAllPosts(15),
		getAllUsedTags(),
		getPostsBySlug(favoriteSlugs),
		fetchLatestComments()
	]);

	const allPosts = [...posts, ...favorite];
	const pagesTags = await getPagesTags(allPosts);

	return {
		tags,
		posts,
		favorite,
		pagesTags,
		postCount,
		latestComments
	};
}) satisfies PageServerLoad;

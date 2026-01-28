import { getAllPosts, getPagesTags, getPostsBySlug, getPostsCount, getSinglePostBySlug } from '$lib/post/post';
import { getAllUsedTags } from '$lib/tag/tags';
import { supabase } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const postCount = await getPostsCount();

	const posts = await getAllPosts(15);

	const tags = await getAllUsedTags();

	// Načtení posledních komentářů
	const { data: rawComments } = await supabase
		.from('comments')
		.select('id, slug, author_name, author_email, message, created_at')
		.eq('is_approved', true)
		.order('created_at', { ascending: false })
		.limit(10);

	let latestComments: Array<{
		id: number;
		slug: string;
		author_name: string;
		author_email: string | null;
		message: string;
		created_at: string;
		article_title: string;
	}> = [];

	if (rawComments && rawComments.length > 0) {
		const uniqueSlugs = [...new Set(rawComments.map((c) => c.slug))];
		const titleMap = new Map<string, string>();
		for (const slug of uniqueSlugs) {
			const post = await getSinglePostBySlug(slug);
			if (post) titleMap.set(slug, post.title);
		}
		latestComments = rawComments.map((c) => ({
			...c,
			article_title: titleMap.get(c.slug) || c.slug
		}));
	}

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
		latestComments
	};
}) satisfies PageServerLoad;

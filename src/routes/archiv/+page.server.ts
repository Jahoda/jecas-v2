import { getAllPosts, getPagesTags } from '$lib/post/post';
import { getAllTagsByPageId } from '$lib/tag/tags';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 36;

export const load = (async ({ url }) => {
	const pageParam = url.searchParams.get('page');
	const page = Math.max(1, Number(pageParam) || 1);

	const allPosts = await getAllPosts();
	const totalPosts = allPosts.length;
	const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
	const safePage = Math.min(page, totalPages);

	const start = (safePage - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;
	const posts = allPosts.slice(start, end);

	const pagesTags = await getPagesTags(posts);

	const postTagsEntries = await Promise.all(
		posts.map(async (post) => {
			const tags = await getAllTagsByPageId(post.url_slug);
			return [post.url_slug, tags] as const;
		})
	);

	const postTagsBySlug = Object.fromEntries(postTagsEntries);

	return {
		posts,
		pagesTags,
		postTagsBySlug,
		pages: {
			page: safePage,
			pageSize: PAGE_SIZE,
			totalPosts,
			totalPages
		}
	};
}) satisfies PageServerLoad;

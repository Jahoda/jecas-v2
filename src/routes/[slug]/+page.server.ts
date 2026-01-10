import {
	getAllPosts,
	getPostsByTagId,
	getRelatedPostsByMostTags,
	getSinglePostBySlug,
	getPagesTags,
	getPrevNextPosts,
	type Post
} from '$lib/post/post';
import { getAllTagsByPageId, getSingleTagBySlug, getAllUsedTags, type Tag } from '$lib/tag/tags';
import { groupByPageId } from '$lib/tags/tags';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

// Skip prerendering on Vercel preview deployments for faster builds
// Pages will be rendered on-demand via SSR instead
const isPreviewBuild = env.VERCEL_ENV === 'preview';

// Enable static pre-rendering for post and tag pages (production only)
export const prerender = !isPreviewBuild;

// Generate entries for all posts and tags at build time (production only)
// Note: Drafts are excluded from prerendering to stay under the 2048 route limit
// Exception: kontakt page is explicitly included
export const entries: EntryGenerator = async () => {
	if (isPreviewBuild) {
		return [];
	}

	const posts = await getAllPosts();
	const tags = await getAllUsedTags();

	const postEntries = posts.map((post) => ({ slug: post.url_slug }));
	const tagEntries = tags.map((tag) => ({ slug: tag.url_slug }));

	return [{ slug: 'kontakt' }, ...postEntries, ...tagEntries];
};

export const load = (async ({ params }) => {
	const slug = params.slug;

	let tags: Tag[] = [];
	let tag: Tag | undefined;
	let tagPosts: Post[] | undefined;
	let relatedPosts: Post[] | undefined;
	let allTags: Tag[] = [];
	let pagesTags: Record<string, string[]> = {};
	let prevNextPosts: { prev: Post | null; next: Post | null } | undefined;

	const page = await getSinglePostBySlug(slug);

	if (page?.url_slug) {
		tags = await getAllTagsByPageId(page.url_slug);

		if (tags.length > 0) {
			relatedPosts = await getRelatedPostsByMostTags(tags, page.url_slug);
		}

		prevNextPosts = await getPrevNextPosts(page.url_slug);

		// Load all tags and pagesTags for the PostList component
		allTags = await getAllUsedTags();
		const allPosts = relatedPosts || [];
		const pagesTagsArray = await getPagesTags(allPosts);
		pagesTags = groupByPageId(pagesTagsArray);
	} else {
		// Try to find tag
		tag = await getSingleTagBySlug(slug);

		if (tag?.name) {
			tagPosts = await getPostsByTagId(tag.url_slug);
		}

		if (!tag) {
			throw error(404, {
				message: 'Not found'
			});
		}

		// Load all tags and pagesTags for the PostList component
		allTags = await getAllUsedTags();
		const allPosts = tagPosts || [];
		const pagesTagsArray = await getPagesTags(allPosts);
		pagesTags = groupByPageId(pagesTagsArray);
	}

	return {
		page,
		tag,
		tags,
		tagPosts,
		relatedPosts,
		allTags,
		pagesTags,
		prevNextPosts
	};
}) satisfies PageServerLoad;

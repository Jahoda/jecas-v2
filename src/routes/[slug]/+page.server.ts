import {
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
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;

	// Debug: log page load
	console.log(`[page.server] Loading slug: '${slug}'`);

	let tags: Tag[] = [];
	let tag: Tag | undefined;
	let tagPosts: Post[] | undefined;
	let relatedPosts: Post[] | undefined;
	let allTags: Tag[] = [];
	let pagesTags: Record<string, string[]> = {};
	let prevNextPosts: { prev: Post | null; next: Post | null } | undefined;

	const page = await getSinglePostBySlug(slug);
	console.log(`[page.server] Post found: ${!!page}`);

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
		console.log(`[page.server] Looking for tag: '${slug}'`);
		tag = await getSingleTagBySlug(slug);
		console.log(`[page.server] Tag found: ${!!tag}, name: ${tag?.name}`);

		if (tag?.name) {
			tagPosts = await getPostsByTagId(tag.url_slug);
		}

		if (!tag) {
			console.log(`[page.server] 404 for slug: '${slug}'`);
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

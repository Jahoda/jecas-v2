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
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// ISR: pages generated on first request, cached permanently until next deploy
export const config = {
	isr: {
		expiration: false
	}
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
			// Try stripping trailing invalid characters (., , ¨ etc.) and redirect
			const cleaned = slug.replace(/[\.,;:\)¨"'\s&\/]+$/, '');
			if (cleaned && cleaned !== slug) {
				const cleanedPost = await getSinglePostBySlug(cleaned);
				const cleanedTag = !cleanedPost ? await getSingleTagBySlug(cleaned) : undefined;
				if (cleanedPost || cleanedTag) {
					throw redirect(301, `/${cleaned}`);
				}
			}

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

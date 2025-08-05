import {
	getPostsByTagId,
	getRelatedPostsByMostTags,
	getSinglePostBySlug,
	type Post
} from '$lib/post/post';
import { getAllTagsByPageId, getSingleTagBySlug, type Tag } from '$lib/tag/tags';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;

	let tags: Tag[] = [];
	let tag: Tag | undefined;
	let tagPosts: Post[] | undefined;
	let relatedPosts: Post[] | undefined;

	const page = await getSinglePostBySlug(slug);

	if (page?.url_slug) {
		tags = await getAllTagsByPageId(page.url_slug);

		if (tags.length > 0) {
			relatedPosts = await getRelatedPostsByMostTags(
				tags.map((tag) => tag.name),
				page.url_slug
			);
		}
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
	}

	return {
		page,
		tag,
		tags,
		tagPosts,
		relatedPosts
	};
}) satisfies PageServerLoad;

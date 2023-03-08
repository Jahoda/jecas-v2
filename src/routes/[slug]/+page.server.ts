import { getPostsByTagId, getSinglePostBySlug, type Post } from '$lib/post/post';
import { getAllTagsByPageId, getSingleTagBySlug, type Tag } from '$lib/tag/tag';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;

	let tags: Tag[] = [];
	let tag: Tag | undefined;
	let tagPosts: Post[] | undefined;

	const page = await getSinglePostBySlug(slug);

	if (page?.id) {
		tags = await getAllTagsByPageId(page.id);
	} else {
		// Try to find tag
		tag = await getSingleTagBySlug(slug);

		if (tag?.id) {
			tagPosts = await getPostsByTagId(tag.id);
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
		tagPosts
	};
}) satisfies PageServerLoad;

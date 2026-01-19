// Use GitHub API loaders for ISR - content is fetched at runtime from GitHub
import {
	getSinglePostBySlug,
	getRelatedPostsByMostTags,
	getPrevNextPosts,
	getAllPosts,
	getPostsBySlug,
	type MarkdownPost as Post
} from '$lib/post/markdown-github';
import {
	getAllTagsByPageId,
	getSingleTagBySlug,
	getAllUsedTags,
	getPostsByTagSlug,
	getPagesTags,
	type Tag
} from '$lib/tag/tags-github';
import { groupByPageId } from '$lib/tags/tags';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Helper to get posts by tag ID using GitHub loader
async function getPostsByTagId(tagSlug: string): Promise<Post[]> {
	const postSlugs = await getPostsByTagSlug(tagSlug);
	const now = new Date();
	const posts: Post[] = [];

	for (const slug of postSlugs) {
		const post = await getSinglePostBySlug(slug);
		if (post && post.status === 1) {
			const effectiveDate = post.last_modification || post.date;
			if (effectiveDate <= now) {
				posts.push(post);
			}
		}
	}

	return posts.sort((a, b) => {
		const dateA = a.last_modification || a.date;
		const dateB = b.last_modification || b.date;
		return dateB.getTime() - dateA.getTime();
	});
}

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
			relatedPosts = await getRelatedPostsByMostTags(
				tags.map((t) => t.name),
				page.url_slug
			);
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

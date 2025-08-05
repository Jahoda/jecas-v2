import {
	getAllPosts as getMarkdownPosts,
	getAllDrafts as getMarkdownDrafts,
	getPostsBySlug as getMarkdownPostsBySlug,
	getSinglePostBySlug as getMarkdownSinglePostBySlug,
	getPostsCount as getMarkdownPostsCount,
	getPostsByTag,
	getRelatedPostsByMostTags as getMarkdownRelatedPosts,
	type MarkdownPost
} from './markdown';
import type { PostCount, TagPost, Tag } from '$lib/tag/tags';

export interface Post {
	id: string | number;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	date: Date;
	last_modification: Date;
	comments: number;
	status: number;
	tags?: string[];
	word_count?: number;
}

export interface PostIn {
	id: number;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	// date: Date;
	last_modification: Date;
	// comments: number;
	status: number;
	postTags?: string;
}

export async function getAllPosts(limit: number | null = null, status = 1): Promise<Post[]> {
	return await getMarkdownPosts(limit, status);
}

export async function getAllDrafts(limit: number | null = null): Promise<Post[]> {
	return await getMarkdownDrafts(limit);
}

export async function getPostsBySlug(slugs: string[]): Promise<Post[]> {
	return await getMarkdownPostsBySlug(slugs);
}

export async function getSinglePostBySlug(slug: string): Promise<Post | undefined> {
	return await getMarkdownSinglePostBySlug(slug);
}

export async function getPostsCount(): Promise<number> {
	return await getMarkdownPostsCount();
}

export async function getPagesTags(posts: Post[]): Promise<TagPost[]> {
	const { getPagesTags: getMarkdownPagesTags } = await import('$lib/tag/tags');
	return await getMarkdownPagesTags(posts as any);
}

export async function getPostsByTagId(tagSlug: string): Promise<Post[]> {
	const { getPostsByTagSlug } = await import('$lib/tag/tags');
	const postSlugs = await getPostsByTagSlug(tagSlug);

	const posts: Post[] = [];
	for (const slug of postSlugs) {
		const post = await getSinglePostBySlug(slug);
		if (post && post.status === 1) {
			posts.push(post);
		}
	}

	return posts.sort((a, b) => b.last_modification.getTime() - a.last_modification.getTime());
}

export async function getRelatedPostsByMostTags(tags: Tag[], currentSlug: string): Promise<Post[]> {
	const allPosts = await getAllPosts();
	const tagSlugs = tags.map((tag) => tag.url_slug);

	const scoredPosts = allPosts
		.filter((post) => post.url_slug !== currentSlug)
		.map((post) => {
			// Get the tags for this post
			const postTags = post.tags || [];
			const commonTagSlugs = postTags
				.map((tagName: string) => {
					// Try to find matching tag by name
					const matchingTag = tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase());
					return matchingTag?.url_slug;
				})
				.filter((slug: string | undefined) => slug && tagSlugs.includes(slug));

			return {
				post,
				score: commonTagSlugs.length
			};
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (a.score !== b.score) return b.score - a.score;
			return b.post.last_modification.getTime() - a.post.last_modification.getTime();
		})
		.slice(0, 4);

	return scoredPosts.map((item) => item.post);
}

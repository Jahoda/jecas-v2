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
import type { PostCount, TagPost } from '$lib/tag/tags';

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
	const { getSingleTagBySlug } = await import('$lib/tag/tags');
	const tag = await getSingleTagBySlug(tagSlug);

	if (!tag) return [];

	return await getPostsByTag(tag.name);
}

export async function getRelatedPostsByMostTags(
	tagNames: string[],
	postSlug: string
): Promise<Post[]> {
	return await getMarkdownRelatedPosts(tagNames, postSlug);
}
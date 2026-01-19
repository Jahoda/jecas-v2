import matter from 'gray-matter';
import { fetchPostContent, getPostFiles, clearCache } from '$lib/github/content';

export interface MarkdownPost {
	id: string;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	date: Date;
	last_modification: Date | null;
	comments: number;
	status: number;
	tags?: string[];
	word_count?: number;
}

export interface PostFrontmatter {
	title: string;
	headline: string;
	description: string;
	date: string;
	last_modification?: string;
	status?: number;
	tags?: string[];
}

// In-memory cache for runtime (cleared on revalidation)
let postsCache: Map<string, MarkdownPost> | null = null;
let postFilesCache: string[] | null = null;
let allPostsSortedCache: MarkdownPost[] | null = null;

function getEffectiveModificationDate(post: MarkdownPost): Date {
	return post.last_modification || post.date;
}

async function getPostFilesList(): Promise<string[]> {
	if (postFilesCache) return postFilesCache;
	postFilesCache = await getPostFiles();
	return postFilesCache;
}

async function parseMarkdownContent(fileName: string, content: string): Promise<MarkdownPost> {
	const { data, content: htmlContent } = matter(content);
	const frontmatter = data as PostFrontmatter;
	const url_slug = fileName.replace(/\.md$/, '');

	const wordCount = (htmlContent.match(/\b\w+\b/g) || []).length;

	return {
		id: url_slug,
		title: frontmatter.title,
		url_slug,
		headline: frontmatter.headline,
		text_html: htmlContent,
		description: frontmatter.description,
		date: new Date(frontmatter.date),
		last_modification: frontmatter.last_modification
			? new Date(frontmatter.last_modification)
			: null,
		comments: 0,
		status: frontmatter.status !== undefined ? frontmatter.status : 1,
		tags: frontmatter.tags || [],
		word_count: wordCount
	};
}

async function parseMarkdownFile(fileName: string): Promise<MarkdownPost> {
	const slug = fileName.replace(/\.md$/, '');
	const content = await fetchPostContent(slug);
	return parseMarkdownContent(fileName, content);
}

async function loadAllPostsToCache(): Promise<Map<string, MarkdownPost>> {
	if (postsCache) return postsCache;

	const postFiles = await getPostFilesList();
	const posts = await Promise.all(postFiles.map((fileName) => parseMarkdownFile(fileName)));

	postsCache = new Map();
	for (const post of posts) {
		postsCache.set(post.url_slug, post);
	}

	return postsCache;
}

export async function getAllPosts(
	limit: number | null = null,
	status = 1
): Promise<MarkdownPost[]> {
	if (status === 1 && !limit && allPostsSortedCache) {
		return allPostsSortedCache;
	}

	const cache = await loadAllPostsToCache();
	const posts = Array.from(cache.values());

	const now = new Date();
	const filteredPosts = posts
		.filter((post) => {
			if (post.status !== status) return false;
			if (status === 1 && getEffectiveModificationDate(post) > now) return false;
			return true;
		})
		.sort(
			(a, b) =>
				getEffectiveModificationDate(b).getTime() - getEffectiveModificationDate(a).getTime()
		);

	if (status === 1 && !limit) {
		allPostsSortedCache = filteredPosts;
	}

	return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

export async function getAllDrafts(limit: number | null = null): Promise<MarkdownPost[]> {
	return getAllPosts(limit, 0);
}

export async function getFuturePosts(limit: number | null = null): Promise<MarkdownPost[]> {
	const cache = await loadAllPostsToCache();
	const posts = Array.from(cache.values());

	const now = new Date();
	const futurePosts = posts
		.filter((post) => {
			return post.status === 1 && getEffectiveModificationDate(post) > now;
		})
		.sort(
			(a, b) =>
				getEffectiveModificationDate(a).getTime() - getEffectiveModificationDate(b).getTime()
		);

	return limit ? futurePosts.slice(0, limit) : futurePosts;
}

export async function getPostsBySlug(slugs: string[]): Promise<MarkdownPost[]> {
	const cache = await loadAllPostsToCache();
	const posts: MarkdownPost[] = [];
	const now = new Date();

	for (const slug of slugs) {
		const post = cache.get(slug);
		if (post && post.status === 1 && getEffectiveModificationDate(post) <= now) {
			posts.push(post);
		}
	}

	return posts;
}

export async function getSinglePostBySlug(slug: string): Promise<MarkdownPost | undefined> {
	// First try cache
	if (postsCache) {
		return postsCache.get(slug);
	}

	// If no cache, try to fetch single post directly (more efficient for ISR)
	try {
		const content = await fetchPostContent(slug);
		const post = await parseMarkdownContent(`${slug}.md`, content);

		// Initialize cache with this post
		if (!postsCache) {
			postsCache = new Map();
		}
		postsCache.set(slug, post);

		return post;
	} catch {
		return undefined;
	}
}

export async function getPostsCount(): Promise<number> {
	const posts = await getAllPosts();
	return posts.length;
}

export async function getPostsByTag(tagName: string): Promise<MarkdownPost[]> {
	const allPosts = await getAllPosts();
	return allPosts.filter((post) => post.tags && post.tags.includes(tagName));
}

export async function getRelatedPostsByMostTags(
	tags: string[],
	currentSlug: string
): Promise<MarkdownPost[]> {
	const allPosts = await getAllPosts();

	const scoredPosts = allPosts
		.filter((post) => post.url_slug !== currentSlug)
		.map((post) => {
			const commonTags = (post.tags || []).filter((tag) => tags.includes(tag));
			return {
				post,
				score: commonTags.length
			};
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (a.score !== b.score) return b.score - a.score;
			return (
				getEffectiveModificationDate(b.post).getTime() -
				getEffectiveModificationDate(a.post).getTime()
			);
		})
		.slice(0, 4);

	return scoredPosts.map((item) => item.post);
}

export async function getPrevNextPosts(currentSlug: string): Promise<{
	prev: MarkdownPost | null;
	next: MarkdownPost | null;
}> {
	const allPosts = await getAllPosts();
	const currentIndex = allPosts.findIndex((post) => post.url_slug === currentSlug);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	return {
		prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
		next: currentIndex > 0 ? allPosts[currentIndex - 1] : null
	};
}

export async function getAllUsedTags(): Promise<string[]> {
	const allPosts = await getAllPosts();
	const allTags = new Set<string>();

	for (const post of allPosts) {
		if (post.tags) {
			post.tags.forEach((tag) => allTags.add(tag));
		}
	}

	return Array.from(allTags).sort();
}

/**
 * Clear all caches - call this for on-demand revalidation
 */
export function invalidateCache(): void {
	postsCache = null;
	postFilesCache = null;
	allPostsSortedCache = null;
	clearCache();
}

import matter from 'gray-matter';

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

const postModules = import.meta.glob('/content/posts/*.md', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>;

let postsCache: Map<string, MarkdownPost> | null = null;
let allPostsSortedCache: MarkdownPost[] | null = null;

function getEffectiveModificationDate(post: MarkdownPost): Date {
	return post.last_modification || post.date;
}

function parseMarkdownContent(fileName: string, fileContent: string): MarkdownPost {
	const { data, content } = matter(fileContent);
	const frontmatter = data as PostFrontmatter;
	const url_slug = fileName.replace(/\.md$/, '');

	const text_html = content;
	const wordCount = (content.match(/\b\w+\b/g) || []).length;

	return {
		id: url_slug,
		title: frontmatter.title,
		url_slug,
		headline: frontmatter.headline,
		text_html,
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

async function loadAllPostsToCache(): Promise<Map<string, MarkdownPost>> {
	if (postsCache) return postsCache;

	const cache = new Map<string, MarkdownPost>();

	const entries = Object.entries(postModules);
	const results = await Promise.all(entries.map(([, loader]) => loader()));

	for (let i = 0; i < entries.length; i++) {
		const fileName = entries[i][0].split('/').pop()!;
		const post = parseMarkdownContent(fileName, results[i]);
		cache.set(post.url_slug, post);
	}

	postsCache = cache;
	return cache;
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
	const cache = await loadAllPostsToCache();
	return cache.get(slug);
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

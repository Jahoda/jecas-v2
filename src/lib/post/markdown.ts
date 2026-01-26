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

function getPostFiles(): string[] {
	return Object.keys(postModules).map((path) => path.split('/').pop()!);
}

function getEffectiveModificationDate(post: MarkdownPost): Date {
	return post.last_modification || post.date;
}

async function parseMarkdownFile(fileName: string): Promise<MarkdownPost> {
	const fullPath = `/content/posts/${fileName}`;
	const loader = postModules[fullPath];

	if (!loader) {
		throw new Error(`Post file not found: ${fileName}`);
	}

	const fileContent = await loader();

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

	const postFiles = getPostFiles();
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
	// Debug: Check if the file exists in postModules
	if (slug === 'js-parsovani-cisel') {
		const expectedPath = `/content/posts/${slug}.md`;
		const exists = expectedPath in postModules;
		console.log('DEBUG getSinglePostBySlug:', slug);
		console.log('DEBUG expectedPath:', expectedPath);
		console.log('DEBUG exists in postModules:', exists);
		console.log('DEBUG postModules keys count:', Object.keys(postModules).length);
		if (!exists) {
			console.log('DEBUG sample keys:', Object.keys(postModules).slice(0, 5));
		}
	}

	const cache = await loadAllPostsToCache();
	const post = cache.get(slug);
	if (!post && slug === 'js-parsovani-cisel') {
		console.warn('DEBUG cache miss for js-parsovani-cisel');
		console.warn('DEBUG cache size:', cache.size);
	}
	return post;
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

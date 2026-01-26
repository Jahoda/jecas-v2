import matter from 'gray-matter';
import { marked } from 'marked';
import { getAllPosts as getMarkdownAllPosts, getSinglePostBySlug } from '../post/markdown';

function removeDiacritics(str: string): string {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Unified Tag interface (replaces both Tag and PowerfulTag)
export interface Tag {
	url_slug: string;
	name: string;
	headline: string | null;
	text_html: string | null;
	status: number;
	background: string | null;
	color: string | null;
	count?: number;
	usage_count?: number; // Alias for count for backward compatibility
}

// Raw tag data from frontmatter
export interface TagFrontmatter {
	title: string;
	headline: string | null;
	background: string | null;
	color: string | null;
	status: number;
}

// Tag-Post relationship
export interface TagPost {
	tag_slug: string;
	page_slug: string;
}

const tagModules = import.meta.glob('/content/tags/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Caching
let tagFilesCache: Map<string, Tag> | null = null;
let usageCountsCache: Map<string, number> | null = null;
let tagPostsCache: Map<string, string[]> | null = null;
let tagFilesLoadingPromise: Promise<Map<string, Tag>> | null = null;
let usageCountsLoadingPromise: Promise<Map<string, number>> | null = null;
let tagPostsLoadingPromise: Promise<Map<string, string[]>> | null = null;
let lastModified = 0;
let usageCountsLastCalculated = 0;
let tagPostsLastCalculated = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getContrastColor(bgColor: string | null): string {
	if (!bgColor) return '#000000';

	// Remove # if present
	const hex = bgColor.replace('#', '');

	// Convert to RGB
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	// Calculate brightness
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	return brightness > 128 ? '#000000' : '#ffffff';
}

function normalizeTag(frontmatter: TagFrontmatter, content: string, slug: string): Tag {
	// Handle background color - allow null if not specified
	const background =
		frontmatter.background && frontmatter.background !== 'null' ? frontmatter.background : null;

	// Only set color if background is defined, otherwise leave it null
	const color = background
		? frontmatter.color && frontmatter.color !== 'null'
			? frontmatter.color
			: getContrastColor(background)
		: null;

	return {
		url_slug: slug,
		name: frontmatter.title,
		headline: frontmatter.headline,
		text_html: content,
		status: frontmatter.status,
		background,
		color
	};
}

async function loadAllTagFiles(): Promise<Map<string, Tag>> {
	const now = Date.now();

	// Return cached data if still fresh
	if (tagFilesCache && now - lastModified < CACHE_DURATION) {
		return tagFilesCache;
	}

	// If already loading, wait for that to complete (prevents race condition)
	if (tagFilesLoadingPromise) {
		return tagFilesLoadingPromise;
	}

	// Start loading and store the promise
	tagFilesLoadingPromise = (async () => {
		const tags = new Map<string, Tag>();

		try {
			for (const [filePath, fileContent] of Object.entries(tagModules)) {
				const { data: frontmatter, content } = matter(fileContent);

				// Extract slug from filename (remove .md extension)
				const filename = filePath.split('/').pop()!;
				const slug = filename.replace(/\.md$/, '');

				// Convert markdown to HTML
				const htmlContent = await marked(content);

				// Create normalized tag
				const tag = normalizeTag(frontmatter as TagFrontmatter, htmlContent, slug);

				tags.set(tag.url_slug, tag);
			}

			tagFilesCache = tags;
			lastModified = Date.now();
		} catch (error) {
			// Error loading tag files
		}

		return tags;
	})();

	return tagFilesLoadingPromise;
}

// Calculate ALL tag usage counts in one pass for efficiency
async function calculateAllUsageCounts(): Promise<Map<string, number>> {
	const now = Date.now();

	if (usageCountsCache && now - usageCountsLastCalculated < CACHE_DURATION) {
		return usageCountsCache;
	}

	// If already calculating, wait for that to complete (prevents race condition)
	if (usageCountsLoadingPromise) {
		return usageCountsLoadingPromise;
	}

	// Start calculating and store the promise
	usageCountsLoadingPromise = (async () => {
		const posts = await getMarkdownAllPosts(null, 1);

		const counts = new Map<string, number>();
		const tags = await loadAllTagFiles();

		Array.from(tags.values()).forEach((tag) => {
			counts.set(tag.url_slug, 0);
		});

		for (const post of posts) {
			if (post.tags) {
				const processedSlugs = new Set<string>();

				for (const tagName of post.tags) {
					let matchingTag = Array.from(tags.values()).find(
						(t) => removeDiacritics(t.name.toLowerCase()) === removeDiacritics(tagName.toLowerCase())
					);

					if (!matchingTag) {
						const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
						matchingTag = tags.get(tagSlug);
					}

					if (matchingTag && !processedSlugs.has(matchingTag.url_slug)) {
						counts.set(matchingTag.url_slug, (counts.get(matchingTag.url_slug) || 0) + 1);
						processedSlugs.add(matchingTag.url_slug);
					}
				}
			}
		}

		usageCountsCache = counts;
		usageCountsLastCalculated = Date.now();

		return counts;
	})();

	return usageCountsLoadingPromise;
}

async function calculateAllTagPosts(): Promise<Map<string, string[]>> {
	const now = Date.now();

	if (tagPostsCache && now - tagPostsLastCalculated < CACHE_DURATION) {
		return tagPostsCache;
	}

	// If already calculating, wait for that to complete (prevents race condition)
	if (tagPostsLoadingPromise) {
		return tagPostsLoadingPromise;
	}

	// Start calculating and store the promise
	tagPostsLoadingPromise = (async () => {
		const posts = await getMarkdownAllPosts(null, 1);

		const tagPosts = new Map<string, string[]>();
		const tags = await loadAllTagFiles();

		Array.from(tags.values()).forEach((tag) => {
			tagPosts.set(tag.url_slug, []);
		});

		for (const post of posts) {
			if (post.tags) {
				const processedSlugs = new Set<string>();

				for (const tagName of post.tags) {
					let matchingTag = Array.from(tags.values()).find(
						(t) => removeDiacritics(t.name.toLowerCase()) === removeDiacritics(tagName.toLowerCase())
					);

					if (!matchingTag) {
						const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
						matchingTag = tags.get(tagSlug);
					}

					if (matchingTag && !processedSlugs.has(matchingTag.url_slug)) {
						const currentPosts = tagPosts.get(matchingTag.url_slug) || [];
						currentPosts.push(post.url_slug);
						tagPosts.set(matchingTag.url_slug, currentPosts);
						processedSlugs.add(matchingTag.url_slug);
					}
				}
			}
		}

		tagPostsCache = tagPosts;
		tagPostsLastCalculated = Date.now();

		return tagPosts;
	})();

	return tagPostsLoadingPromise;
}

// Main API functions

export async function getAllTags(): Promise<Tag[]> {
	const tags = await loadAllTagFiles();
	const allCounts = await calculateAllUsageCounts();

	// Convert to array and sort by usage count, then by name
	return Array.from(tags.values())
		.map((tag) => ({
			...tag,
			count: allCounts.get(tag.url_slug) || 0,
			usage_count: allCounts.get(tag.url_slug) || 0
		}))
		.sort((a, b) => {
			if (a.count !== b.count) return b.count - a.count;
			return a.name.localeCompare(b.name);
		});
}

export async function getAllUsedTags(): Promise<Tag[]> {
	const allTags = await getAllTags();
	return allTags.filter((tag) => (tag.count || 0) > 0);
}

export async function getSingleTagBySlug(slug: string): Promise<Tag | undefined> {
	const tags = await loadAllTagFiles();
	const tag = tags.get(slug);

	if (!tag) return undefined;

	// Add usage count
	const allCounts = await calculateAllUsageCounts();
	const count = allCounts.get(slug) || 0;

	return {
		...tag,
		count,
		usage_count: count
	};
}

export async function getAllTagsByPageId(postSlug: string): Promise<Tag[]> {
	const post = await getSinglePostBySlug(postSlug);

	if (!post || !post.tags) return [];

	const tags = await loadAllTagFiles();
	const allCounts = await calculateAllUsageCounts();
	const matchingTags: Tag[] = [];

	for (const tagName of post.tags) {
		let matchingTag = Array.from(tags.values()).find(
			(t) => removeDiacritics(t.name.toLowerCase()) === removeDiacritics(tagName.toLowerCase())
		);

		if (!matchingTag) {
			const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
			matchingTag = tags.get(tagSlug);
		}

		if (matchingTag) {
			const count = allCounts.get(matchingTag.url_slug) || 0;
			matchingTags.push({
				...matchingTag,
				count,
				usage_count: count
			});
		}
	}

	return matchingTags.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPostsForTag(tagSlug: string): Promise<string[]> {
	const allTagPosts = await calculateAllTagPosts();
	return allTagPosts.get(tagSlug) || [];
}

// Legacy function aliases for backward compatibility

export const getTagsByPostSlug = getAllTagsByPageId;
export const getPostsByTagSlug = getPostsForTag;

// Generate TagPost relationships for compatibility
export async function getPagesTags(posts: any[]): Promise<TagPost[]> {
	const pagesTags: TagPost[] = [];
	const allTags = await loadAllTagFiles();
	const tagsByName = new Map();
	const tagsBySlug = new Map();

	Array.from(allTags.values()).forEach((tag) => {
		if (tag.name) {
			tagsByName.set(tag.name.toLowerCase(), tag);
		}
		if (tag.url_slug) {
			tagsBySlug.set(tag.url_slug.toLowerCase(), tag);
		}
	});

	posts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tagName: string) => {
				if (!tagName || typeof tagName !== 'string') {
					return;
				}

				// Try to find tag by exact name first (with diacritics normalization)
				let tag = Array.from(allTags.values()).find(
					(t) =>
						removeDiacritics(t.name?.toLowerCase() || '') ===
						removeDiacritics(tagName.toLowerCase())
				);

				// If not found, try by converting name to slug
				if (!tag) {
					const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
					tag = tagsBySlug.get(tagSlug);
				}

				if (tag) {
					pagesTags.push({
						tag_slug: tag.url_slug,
						page_slug: post.url_slug
					});
				}
			});
		}
	});

	return pagesTags;
}

// Cache invalidation
export function invalidateTagCaches(): void {
	tagFilesCache = null;
	usageCountsCache = null;
	tagPostsCache = null;
	tagFilesLoadingPromise = null;
	usageCountsLoadingPromise = null;
	tagPostsLoadingPromise = null;
	lastModified = 0;
	usageCountsLastCalculated = 0;
	tagPostsLastCalculated = 0;
}

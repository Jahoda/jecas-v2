import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Unified Tag interface (replaces both Tag and PowerfulTag)
export interface Tag {
	url_slug: string;
	name: string;
	headline: string | null;
	text_html: string | null;
	status: number;
	background: string;
	color: string;
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

// Legacy interfaces for backward compatibility
export interface PowerfulTag extends Tag {} // PowerfulTag is now just an alias
export interface MarkdownTag extends Tag {} // MarkdownTag is now just an alias

export interface PostCount {
	count: number;
}

const TAG_PAGES_DIR = path.join(process.cwd(), 'content', 'tags');

// Caching
let tagFilesCache: Map<string, Tag> | null = null;
let usageCountsCache: Map<string, number> | null = null;
let tagPostsCache: Map<string, string[]> | null = null;
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
	// Ensure background color has a default
	const background = frontmatter.background || '#3b82f6';

	// Auto-calculate color if null
	const color = frontmatter.color || getContrastColor(background);

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

	const tags = new Map<string, Tag>();

	try {
		if (!fs.existsSync(TAG_PAGES_DIR)) {
			console.warn('Tag pages directory not found:', TAG_PAGES_DIR);
			return tags;
		}

		const files = fs.readdirSync(TAG_PAGES_DIR).filter((file) => file.endsWith('.md'));

		for (const file of files) {
			const filePath = path.join(TAG_PAGES_DIR, file);
			const fileContent = fs.readFileSync(filePath, 'utf8');
			const { data: frontmatter, content } = matter(fileContent);

			// Extract slug from filename (remove .md extension)
			const slug = path.basename(file, '.md');

			// Convert markdown to HTML
			const htmlContent = await marked(content);

			// Create normalized tag
			const tag = normalizeTag(frontmatter as TagFrontmatter, htmlContent, slug);

			// Only include active tags
			if (tag.status === 1) {
				tags.set(tag.url_slug, tag);
			}
		}

		tagFilesCache = tags;
		lastModified = now;
	} catch (error) {
		console.error('Error loading tag files:', error);
	}

	return tags;
}

// Calculate ALL tag usage counts in one pass for efficiency
async function calculateAllUsageCounts(): Promise<Map<string, number>> {
	const now = Date.now();

	// Return cached data if still fresh
	if (usageCountsCache && now - usageCountsLastCalculated < CACHE_DURATION) {
		return usageCountsCache;
	}

	const { getAllPosts } = await import('../post/markdown');
	const posts = await getAllPosts(null, 1); // Only published posts

	const counts = new Map<string, number>();
	const tags = await loadAllTagFiles();

	// Initialize counts for all existing tags
	Array.from(tags.values()).forEach((tag) => {
		counts.set(tag.url_slug, 0);
	});

	// Count usage in a single pass through posts
	for (const post of posts) {
		if (post.tags) {
			const processedSlugs = new Set<string>(); // Prevent double counting same tag in one post

			for (const tagName of post.tags) {
				// Try exact name match first
				let matchingTag = Array.from(tags.values()).find(
					(t) => t.name.toLowerCase() === tagName.toLowerCase()
				);

				// If not found, try slug match
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

	// Cache the results
	usageCountsCache = counts;
	usageCountsLastCalculated = now;

	return counts;
}

// Calculate tag-to-posts mapping in one pass
async function calculateAllTagPosts(): Promise<Map<string, string[]>> {
	const now = Date.now();

	// Return cached data if still fresh
	if (tagPostsCache && now - tagPostsLastCalculated < CACHE_DURATION) {
		return tagPostsCache;
	}

	const { getAllPosts } = await import('../post/markdown');
	const posts = await getAllPosts(null, 1); // Only published posts

	const tagPosts = new Map<string, string[]>();
	const tags = await loadAllTagFiles();

	// Initialize arrays for all existing tags
	Array.from(tags.values()).forEach((tag) => {
		tagPosts.set(tag.url_slug, []);
	});

	// Map posts to tags in a single pass
	for (const post of posts) {
		if (post.tags) {
			const processedSlugs = new Set<string>(); // Prevent double adding same tag

			for (const tagName of post.tags) {
				// Try exact name match first
				let matchingTag = Array.from(tags.values()).find(
					(t) => t.name.toLowerCase() === tagName.toLowerCase()
				);

				// If not found, try slug match
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

	// Cache the results
	tagPostsCache = tagPosts;
	tagPostsLastCalculated = now;

	return tagPosts;
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
	// Get tags from the actual post markdown file
	const { getSinglePostBySlug } = await import('../post/markdown');
	const post = await getSinglePostBySlug(postSlug);

	if (!post || !post.tags) return [];

	const tags = await loadAllTagFiles();
	const allCounts = await calculateAllUsageCounts();
	const matchingTags: Tag[] = [];

	for (const tagName of post.tags) {
		// Try exact title match first
		let matchingTag = Array.from(tags.values()).find(
			(t) => t.name.toLowerCase() === tagName.toLowerCase()
		);

		// If not found, try slug match
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

export async function getTagUsageCount(tagSlug: string): Promise<number> {
	const allCounts = await calculateAllUsageCounts();
	return allCounts.get(tagSlug) || 0;
}

// Legacy function aliases for backward compatibility

// PowerfulTag aliases
export const getAllPowerfulTags = getAllTags;
export const getPowerfulTagBySlug = getSingleTagBySlug;
export const getTagsByPostSlug = getAllTagsByPageId;
export const getPostsByTagSlug = getPostsForTag;

// MarkdownTag aliases
export const getAllMarkdownTags = getAllTags;
export const getMarkdownTagBySlug = getSingleTagBySlug;
export const getMarkdownTagsByPostSlug = getAllTagsByPageId;
export const getMarkdownPostsForTag = getPostsForTag;

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

				// Try to find tag by exact name first
				let tag = tagsByName.get(tagName.toLowerCase());

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
				} else {
					console.warn(`Tag not found for: "${tagName}" in post: ${post.url_slug}`);
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
	lastModified = 0;
	usageCountsLastCalculated = 0;
	tagPostsLastCalculated = 0;
}

// Disabled functions for markdown-based system
export function createTag(data: any) {
	throw new Error(
		'createTag not implemented for markdown files - create tag files in content/tags/'
	);
}

export function updateTagBySlug(slug: string, data: any) {
	throw new Error(
		'updateTagBySlug not implemented for markdown files - edit tag files in content/tags/'
	);
}

export function deleteTagBySlug(slug: string) {
	throw new Error(
		'deleteTagBySlug not implemented for markdown files - delete tag files in content/tags/'
	);
}

export function createPageTags(pageId: number, tags: string[]) {
	throw new Error(
		'createPageTags not implemented for markdown files - manage tags in post frontmatter'
	);
}

export function removePageTags(pageId: number) {
	throw new Error(
		'removePageTags not implemented for markdown files - manage tags in post frontmatter'
	);
}

// Legacy PowerfulTag functions that are now disabled
export function createPowerfulTag(tagData: any) {
	throw new Error(
		'createPowerfulTag is disabled - create tags using markdown files in content/tags/'
	);
}

export function updatePowerfulTag(slug: string, updates: any) {
	throw new Error(
		'updatePowerfulTag is disabled - update tags using markdown files in content/tags/'
	);
}

export function deletePowerfulTag(slug: string) {
	throw new Error('deletePowerfulTag is disabled - delete tag markdown files in content/tags/');
}

export function addTagToPost(postSlug: string, tagSlug: string) {
	throw new Error('addTagToPost is disabled - manage tags in post markdown frontmatter');
}

export function removeTagFromPost(postSlug: string, tagSlug: string) {
	throw new Error('removeTagFromPost is disabled - manage tags in post markdown frontmatter');
}

export function migrateFromSimpleTags(postSlug: string, tagNames: string[]) {
	throw new Error(
		'migrateFromSimpleTags is disabled - use markdown frontmatter for tag relationships'
	);
}

export { calculateAllUsageCounts };

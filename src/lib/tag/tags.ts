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

let tagFilesCache: Map<string, Tag> | null = null;
let tagByNormalizedNameCache: Map<string, Tag> | null = null;
let usageCountsCache: Map<string, number> | null = null;
let tagPostsCache: Map<string, string[]> | null = null;

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

function loadAllTagFiles(): Map<string, Tag> {
	if (tagFilesCache) return tagFilesCache;

	const tags = new Map<string, Tag>();

	for (const [filePath, fileContent] of Object.entries(tagModules)) {
		const { data: frontmatter, content } = matter(fileContent);
		const filename = filePath.split('/').pop()!;
		const slug = filename.replace(/\.md$/, '');
		const htmlContent = marked(content) as string;
		const tag = normalizeTag(frontmatter as TagFrontmatter, htmlContent, slug);
		tags.set(tag.url_slug, tag);
	}

	tagFilesCache = tags;

	// Build normalized name → tag lookup for O(1) matching
	const byName = new Map<string, Tag>();
	for (const tag of tags.values()) {
		byName.set(removeDiacritics(tag.name.toLowerCase()), tag);
	}
	tagByNormalizedNameCache = byName;

	return tags;
}

function findTagByName(tagName: string): Tag | undefined {
	if (!tagByNormalizedNameCache) loadAllTagFiles();
	const tags = tagFilesCache!;
	const byName = tagByNormalizedNameCache!;

	const normalized = removeDiacritics(tagName.toLowerCase());
	let tag = byName.get(normalized);
	if (!tag) {
		const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
		tag = tags.get(tagSlug);
	}
	return tag;
}

// Calculate ALL tag usage counts in one pass for efficiency
async function calculateAllUsageCounts(): Promise<Map<string, number>> {
	if (usageCountsCache) return usageCountsCache;

	const posts = await getMarkdownAllPosts(null, 1);
	const tags = loadAllTagFiles();

	const counts = new Map<string, number>();

	// Initialize all tag counts to 0
	for (const tag of tags.values()) {
		counts.set(tag.url_slug, 0);
	}

	// Count articles and collect posts for each tag in a single pass
	const tagPosts = new Map<string, string[]>();
	for (const tag of tags.values()) {
		tagPosts.set(tag.url_slug, []);
	}

	for (const post of posts) {
		if (post.tags) {
			const processedSlugs = new Set<string>();

			for (const tagName of post.tags) {
				const matchingTag = findTagByName(tagName);

				if (matchingTag && !processedSlugs.has(matchingTag.url_slug)) {
					counts.set(matchingTag.url_slug, (counts.get(matchingTag.url_slug) || 0) + 1);
					tagPosts.get(matchingTag.url_slug)!.push(post.url_slug);
					processedSlugs.add(matchingTag.url_slug);
				}
			}
		}
	}

	usageCountsCache = counts;
	tagPostsCache = tagPosts;
	return counts;
}

async function getOrCalculateTagPosts(): Promise<Map<string, string[]>> {
	if (tagPostsCache) return tagPostsCache;
	// Calculating usage counts also populates tagPostsCache
	await calculateAllUsageCounts();
	return tagPostsCache!;
}

// Main API functions

export async function getAllTags(): Promise<Tag[]> {
	const tags = loadAllTagFiles();
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
	const tags = loadAllTagFiles();
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

	const allCounts = await calculateAllUsageCounts();
	const matchingTags: Tag[] = [];

	for (const tagName of post.tags) {
		const matchingTag = findTagByName(tagName);

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
	const allTagPosts = await getOrCalculateTagPosts();
	return allTagPosts.get(tagSlug) || [];
}

// Legacy function aliases for backward compatibility

export const getTagsByPostSlug = getAllTagsByPageId;
export const getPostsByTagSlug = getPostsForTag;

// Generate TagPost relationships for compatibility
export function getPagesTags(posts: any[]): TagPost[] {
	const pagesTags: TagPost[] = [];

	for (const post of posts) {
		if (post.tags) {
			for (const tagName of post.tags) {
				if (!tagName || typeof tagName !== 'string') continue;

				const tag = findTagByName(tagName);
				if (tag) {
					pagesTags.push({
						tag_slug: tag.url_slug,
						page_slug: post.url_slug
					});
				}
			}
		}
	}

	return pagesTags;
}

// Cache invalidation
export function invalidateTagCaches(): void {
	tagFilesCache = null;
	tagByNormalizedNameCache = null;
	usageCountsCache = null;
	tagPostsCache = null;
}

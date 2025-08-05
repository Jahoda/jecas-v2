import fs from 'fs';
import path from 'path';

export interface PowerfulTag {
	name: string;
	url_slug: string;
	headline: string | null;
	text_html: string | null;
	background: string; // Always non-null after normalization
	color: string; // Always non-null after normalization
	status: number;
	usage_count?: number; // Optional usage count
}

export interface RawPowerfulTag {
	name: string;
	url_slug: string;
	headline: string | null;
	text_html: string | null;
	background: string | null; // Can be null in raw data
	color: string | null; // Can be null in raw data
	status: number;
}

export interface TagsData {
	tags: RawPowerfulTag[]; // Raw data can have null colors
	relationships: {
		page_slug: string;
		tag_slug: string;
	}[];
}

const TAG_METADATA_FILE = path.join(process.cwd(), 'data', 'tag-metadata.json');
const LEGACY_TAGS_FILE = path.join(process.cwd(), 'data', 'tags.json');

// Cache for tags data
let tagsCache: Record<string, RawPowerfulTag> | null = null;
let lastModified = 0;

function loadTagsData(): Record<string, RawPowerfulTag> {
	const now = Date.now();
	
	// Return cached data if still fresh
	if (tagsCache && (now - lastModified) < CACHE_DURATION) {
		return tagsCache;
	}
	
	try {
		// First try the new metadata file
		if (fs.existsSync(TAG_METADATA_FILE)) {
			const data = JSON.parse(fs.readFileSync(TAG_METADATA_FILE, 'utf8'));
			const tags: Record<string, RawPowerfulTag> = {};
			
			Object.entries(data).forEach(([slug, tagData]: [string, any]) => {
				tags[slug] = {
					name: tagData.name,
					url_slug: slug,
					headline: tagData.headline,
					text_html: null, // Content comes from markdown files
					background: tagData.background,
					color: tagData.color,
					status: tagData.status
				};
			});
			
			tagsCache = tags;
			lastModified = now;
			return tags;
		}
		
		// Fallback to legacy tags.json file
		if (fs.existsSync(LEGACY_TAGS_FILE)) {
			const data = JSON.parse(fs.readFileSync(LEGACY_TAGS_FILE, 'utf8'));
			const tags: Record<string, RawPowerfulTag> = {};
			
			data.tags.forEach((tag: any) => {
				tags[tag.url_slug] = {
					name: tag.name,
					url_slug: tag.url_slug,
					headline: tag.headline,
					text_html: tag.text_html,
					background: tag.background,
					color: tag.color,
					status: tag.status
				};
			});
			
			tagsCache = tags;
			lastModified = now;
			return tags;
		}
		
		return {};
	} catch (error) {
		console.error('Error loading tags data:', error);
		return {};
	}
}

function saveTagsData(data: TagsData): void {
	// Note: Since we're using markdown files as source of truth,
	// saving to JSON files is disabled. Use markdown files instead.
	console.warn('saveTagsData is disabled - use markdown files for tag data');
}

function getContrastColor(bgColor: string | null): string {
	if (!bgColor) return '#000000';
	
	// Remove # if present
	const hex = bgColor.replace('#', '');
	
	// Convert to RGB
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);
	
	// Calculate brightness
	const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	
	return brightness > 128 ? '#000000' : '#ffffff';
}

function normalizeTag(tag: RawPowerfulTag): PowerfulTag {
	// Ensure background color has a default
	const background = tag.background || '#3b82f6';
	
	// Auto-calculate color if null
	const color = tag.color || getContrastColor(background);
	
	return {
		...tag,
		background,
		color
	};
}

// Cache for tag usage counts
let usageCountsCache: Map<string, number> | null = null;
let usageCountsLastCalculated = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Efficiently calculate ALL tag usage counts in one pass
async function calculateAllUsageCounts(): Promise<Map<string, number>> {
	const now = Date.now();
	
	// Return cached data if still fresh
	if (usageCountsCache && (now - usageCountsLastCalculated) < CACHE_DURATION) {
		return usageCountsCache;
	}
	
	const { getAllPosts } = await import('../post/markdown');
	const posts = await getAllPosts(null, 1); // Only published posts
	
	const counts = new Map<string, number>();
	const data = loadTagsData();
	
			// Initialize counts for all existing tags
		Object.values(data).forEach(tag => {
			counts.set(tag.url_slug, 0);
		});
	
	// Count usage in a single pass through posts
	for (const post of posts) {
		if (post.tags) {
			const processedSlugs = new Set<string>(); // Prevent double counting same tag in one post
			
			for (const tagName of post.tags) {
				// Try exact name match first
				let matchingTag = Object.values(data).find(t => t.name.toLowerCase() === tagName.toLowerCase());
				
				// If not found, try slug match
				if (!matchingTag) {
					const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
					matchingTag = data[tagSlug];
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

// Helper function to calculate real-time usage count for a specific tag
async function calculateUsageCount(tagSlug: string): Promise<number> {
	const allCounts = await calculateAllUsageCounts();
	return allCounts.get(tagSlug) || 0;
}

export async function getAllPowerfulTags(): Promise<PowerfulTag[]> {
	// Use the new markdown-based tags if available
	try {
		const { getAllMarkdownTags } = await import('./markdownTags');
		const markdownTags = await getAllMarkdownTags();
		// Convert MarkdownTagFile[] to PowerfulTag[]
		return markdownTags.map(tag => ({
			name: tag.title,
			url_slug: tag.slug,
			headline: tag.headline,
			text_html: tag.text_html,
			background: tag.background || '#3b82f6',
			color: tag.color || '#ffffff',
			status: tag.status,
			usage_count: tag.usage_count
		}));
	} catch (error) {
		console.warn('Markdown tags not available, falling back to legacy system:', error instanceof Error ? error.message : String(error));
	}
	
	// Fallback to legacy system
	const data = loadTagsData();
	const activeTags = Object.values(data)
		.filter(tag => tag.status === 1)
		.map(normalizeTag);
	
	// Get all usage counts in one efficient operation
	const allCounts = await calculateAllUsageCounts();
	
	// Sort by usage count and include usage_count in tags
	return activeTags
		.map(tag => ({
			tag: { ...tag, usage_count: allCounts.get(tag.url_slug) || 0 },
			usageCount: allCounts.get(tag.url_slug) || 0
		}))
		.sort((a, b) => {
			if (a.usageCount !== b.usageCount) return b.usageCount - a.usageCount;
			return a.tag.name.localeCompare(b.tag.name);
		})
		.map(item => item.tag);
}

export function getPowerfulTagBySlug(slug: string): PowerfulTag | undefined {
	// Use the new markdown-based tags if available
	try {
		const { getMarkdownTagBySlug } = require('./markdownTags');
		const markdownTag = getMarkdownTagBySlug(slug);
		if (markdownTag) {
			return {
				name: markdownTag.title,
				url_slug: markdownTag.slug,
				headline: markdownTag.headline,
				text_html: markdownTag.text_html,
				background: markdownTag.background,
				color: markdownTag.color,
				status: markdownTag.status
			};
		}
	} catch (error) {
		console.warn('Markdown tags not available, falling back to legacy system');
	}
	
	// Fallback to legacy system
	const data = loadTagsData();
	const tag = data[slug];
	return tag ? normalizeTag(tag) : undefined;
}

// Helper function to get real-time usage count for a specific tag
export async function getTagUsageCount(tagSlug: string): Promise<number> {
	return await calculateUsageCount(tagSlug);
}

// Export for use in other modules
export { calculateAllUsageCounts };

// Function to invalidate caches (useful when posts are added/modified)
export function invalidateTagCaches(): void {
	usageCountsCache = null;
	tagPostsCache = null;
	usageCountsLastCalculated = 0;
	tagPostsLastCalculated = 0;
}

// Cache for tag-to-posts mapping
let tagPostsCache: Map<string, string[]> | null = null;
let tagPostsLastCalculated = 0;

// Efficiently calculate tag-to-posts mapping in one pass
async function calculateAllTagPosts(): Promise<Map<string, string[]>> {
	const now = Date.now();
	
	// Return cached data if still fresh
	if (tagPostsCache && (now - tagPostsLastCalculated) < CACHE_DURATION) {
		return tagPostsCache;
	}
	
	const { getAllPosts } = await import('../post/markdown');
	const posts = await getAllPosts(null, 1); // Only published posts
	
	const tagPosts = new Map<string, string[]>();
	const data = loadTagsData();
	
			// Initialize arrays for all existing tags
		Object.values(data).forEach(tag => {
			tagPosts.set(tag.url_slug, []);
		});
	
	// Map posts to tags in a single pass
	for (const post of posts) {
		if (post.tags) {
			const processedSlugs = new Set<string>(); // Prevent double adding same tag
			
			for (const tagName of post.tags) {
				// Try exact name match first
				let matchingTag = Object.values(data).find(t => t.name.toLowerCase() === tagName.toLowerCase());
				
				// If not found, try slug match
				if (!matchingTag) {
					const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
					matchingTag = data[tagSlug];
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

// Helper function to get posts for a specific tag
export async function getPostsForTag(tagSlug: string): Promise<string[]> {
	const allTagPosts = await calculateAllTagPosts();
	return allTagPosts.get(tagSlug) || [];
}

export async function getTagsByPostSlug(postSlug: string): Promise<PowerfulTag[]> {
	// Use the new markdown-based tags
	try {
		const { getMarkdownTagsByPostSlug } = await import('./markdownTags');
		const markdownTags = await getMarkdownTagsByPostSlug(postSlug);
		// Convert MarkdownTagFile[] to PowerfulTag[]
		return markdownTags.map(tag => ({
			name: tag.title,
			url_slug: tag.slug,
			headline: tag.headline,
			text_html: tag.text_html,
			background: tag.background || '#3b82f6',
			color: tag.color || '#ffffff',
			status: tag.status,
			usage_count: tag.usage_count
		}));
	} catch (error) {
		console.warn('Markdown tags not available for post:', postSlug);
		return [];
	}
}

export async function getPostsByTagSlug(tagSlug: string): Promise<string[]> {
	return await getPostsForTag(tagSlug);
}

export function createPowerfulTag(tagData: PowerfulTag): PowerfulTag {
	// Legacy function disabled - create tags using markdown files instead
	throw new Error('createPowerfulTag is disabled - create tags using markdown files in content/tags/');
}

export function updatePowerfulTag(slug: string, updates: Partial<PowerfulTag>): PowerfulTag | null {
	// Legacy function disabled - update tags using markdown files instead
	throw new Error('updatePowerfulTag is disabled - update tags using markdown files in content/tags/');
}

export function deletePowerfulTag(slug: string): boolean {
	// Legacy function disabled - delete tags using file system instead
	throw new Error('deletePowerfulTag is disabled - delete tag markdown files in content/tags/');
}

export function addTagToPost(postSlug: string, tagSlug: string): boolean {
	// Legacy function disabled - manage tags through post frontmatter instead
	throw new Error('addTagToPost is disabled - manage tags in post markdown frontmatter');
}

export function removeTagFromPost(postSlug: string, tagSlug: string): boolean {
	// Legacy function disabled - manage tags through post frontmatter instead
	throw new Error('removeTagFromPost is disabled - manage tags in post markdown frontmatter');
}

// Migration helper: Import tags from simple string format
export function migrateFromSimpleTags(postSlug: string, tagNames: string[]): void {
	// Legacy function disabled - use markdown frontmatter for tag relationships
	throw new Error('migrateFromSimpleTags is disabled - use markdown frontmatter for tag relationships');
}
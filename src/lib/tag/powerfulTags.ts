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
	try {
		fs.mkdirSync(path.dirname(TAGS_DATA_FILE), { recursive: true });
		fs.writeFileSync(TAGS_DATA_FILE, JSON.stringify(data, null, 2));
		tagsCache = data;
		lastModified = Date.now();
	} catch (error) {
		console.error('Error saving tags data:', error);
	}
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
		return await getAllMarkdownTags();
	} catch (error) {
		console.warn('Markdown tags not available, falling back to legacy system:', error.message);
	}
	
	// Fallback to legacy system
	const data = loadTagsData();
	const activeTags = Object.values(data)
		.filter(tag => tag.status === 1)
		.map(normalizeTag);
	
	// Get all usage counts in one efficient operation
	const allCounts = await calculateAllUsageCounts();
	
	// Sort by usage count
	return activeTags
		.map(tag => ({
			tag,
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
				name: markdownTag.name,
				url_slug: markdownTag.url_slug,
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
	// Get tags from the actual post markdown file
	const { getSinglePostBySlug } = await import('../post/markdown');
	const post = await getSinglePostBySlug(postSlug);
	
	if (!post || !post.tags) return [];
	
	const data = loadTagsData();
	const matchingTags: PowerfulTag[] = [];
	
	for (const tagName of post.tags) {
		// Try exact name match first
		let tag = data.tags.find(t => t.name.toLowerCase() === tagName.toLowerCase() && t.status === 1);
		
		// If not found, try slug match
		if (!tag) {
			const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
			tag = data.tags.find(t => t.url_slug === tagSlug && t.status === 1);
		}
		
		if (tag) {
			matchingTags.push(normalizeTag(tag));
		}
	}
	
	return matchingTags.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPostsByTagSlug(tagSlug: string): Promise<string[]> {
	return await getPostsForTag(tagSlug);
}

export function createPowerfulTag(tagData: PowerfulTag): PowerfulTag {
	const data = loadTagsData();
	
	// Check if tag with same slug already exists
	const existing = data.tags.find(t => t.url_slug === tagData.url_slug);
	if (existing) {
		throw new Error(`Tag with slug '${tagData.url_slug}' already exists`);
	}
	
	const newTag: RawPowerfulTag = {
		...tagData,
		background: tagData.background || null,
		color: tagData.color || null
	};
	
	data.tags.push(newTag);
	saveTagsData(data);
	
	return normalizeTag(newTag);
}

export function updatePowerfulTag(slug: string, updates: Partial<PowerfulTag>): PowerfulTag | null {
	const data = loadTagsData();
	const tagIndex = data.tags.findIndex(tag => tag.url_slug === slug);
	
	if (tagIndex === -1) return null;
	
	// If updating url_slug, check it doesn't conflict with existing tags
	if (updates.url_slug && updates.url_slug !== slug) {
		const existing = data.tags.find(t => t.url_slug === updates.url_slug);
		if (existing) {
			throw new Error(`Tag with slug '${updates.url_slug}' already exists`);
		}
	}
	
	data.tags[tagIndex] = { ...data.tags[tagIndex], ...updates };
	saveTagsData(data);
	
	return normalizeTag(data.tags[tagIndex]);
}

export function deletePowerfulTag(slug: string): boolean {
	const data = loadTagsData();
	const tagIndex = data.tags.findIndex(tag => tag.url_slug === slug);
	
	if (tagIndex === -1) return false;
	
	// Remove tag
	data.tags.splice(tagIndex, 1);
	
	// Remove all relationships
	data.relationships = data.relationships.filter(rel => rel.tag_slug !== slug);
	
	saveTagsData(data);
	return true;
}

export function addTagToPost(postSlug: string, tagSlug: string): boolean {
	const data = loadTagsData();
	const tag = data.tags.find(t => t.url_slug === tagSlug);
	
	if (!tag) return false;
	
	// Check if relationship already exists
	const exists = data.relationships.some(
		rel => rel.page_slug === postSlug && rel.tag_slug === tagSlug
	);
	
	if (!exists) {
		data.relationships.push({
			page_slug: postSlug,
			tag_slug: tagSlug
		});
		
		saveTagsData(data);
	}
	
	return true;
}

export function removeTagFromPost(postSlug: string, tagSlug: string): boolean {
	const data = loadTagsData();
	const initialLength = data.relationships.length;
	
	data.relationships = data.relationships.filter(
		rel => !(rel.page_slug === postSlug && rel.tag_slug === tagSlug)
	);
	
	if (data.relationships.length < initialLength) {
		saveTagsData(data);
		return true;
	}
	
	return false;
}

// Migration helper: Import tags from simple string format
export function migrateFromSimpleTags(postSlug: string, tagNames: string[]): void {
	const data = loadTagsData();
	
	for (const tagName of tagNames) {
		// Find or create tag
		let tag = data.tags.find(t => t.name === tagName);
		
		if (!tag) {
			// Create new tag with default properties
			const slug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
			
			tag = {
				name: tagName,
				url_slug: slug,
				headline: `Articles tagged with ${tagName}`,
				text_html: `<p>All articles related to ${tagName}</p>`,
				background: '#3b82f6', // Default blue
				color: '#ffffff',
				status: 1
			};
			
			data.tags.push(tag);
		}
		
		// Add relationship if it doesn't exist
		const exists = data.relationships.some(
			rel => rel.page_slug === postSlug && rel.tag_slug === tag!.url_slug
		);
		
		if (!exists) {
			data.relationships.push({
				page_slug: postSlug,
				tag_slug: tag.url_slug
			});
		}
	}
	
	saveTagsData(data);
}
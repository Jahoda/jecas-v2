import fs from 'fs';
import path from 'path';

export interface PowerfulTag {
	id: string;
	name: string;
	url_slug: string;
	headline: string | null;
	text_html: string | null;
	background: string; // Always non-null after normalization
	color: string; // Always non-null after normalization
	status: number;
	usage_count?: number;
	posts?: string[]; // Array of post slugs using this tag
}

export interface RawPowerfulTag {
	id: string;
	name: string;
	url_slug: string;
	headline: string | null;
	text_html: string | null;
	background: string | null; // Can be null in raw data
	color: string | null; // Can be null in raw data
	status: number;
	usage_count?: number;
	posts?: string[];
}

export interface TagsData {
	tags: RawPowerfulTag[]; // Raw data can have null colors
	relationships: {
		page_slug: string;
		tag_id: string;
		tag_slug: string;
	}[];
}

const TAGS_DATA_FILE = path.join(process.cwd(), 'data', 'tags.json');
const TAGS_DIRECTORY = path.join(process.cwd(), 'data', 'tags');

// Cache for tags data
let tagsCache: TagsData | null = null;
let lastModified = 0;

function loadTagsData(): TagsData {
	try {
		if (!fs.existsSync(TAGS_DATA_FILE)) {
			// If tags.json doesn't exist, create a minimal structure
			return { tags: [], relationships: [] };
		}
		
		const stats = fs.statSync(TAGS_DATA_FILE);
		if (tagsCache && stats.mtimeMs === lastModified) {
			return tagsCache;
		}
		
		const data = JSON.parse(fs.readFileSync(TAGS_DATA_FILE, 'utf8'));
		tagsCache = data;
		lastModified = stats.mtimeMs;
		
		return data;
	} catch (error) {
		console.error('Error loading tags data:', error);
		return { tags: [], relationships: [] };
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

export function getAllPowerfulTags(): PowerfulTag[] {
	const data = loadTagsData();
	return data.tags
		.filter(tag => tag.status === 1)
		.map(normalizeTag)
		.sort((a, b) => {
			const aCount = a.usage_count || 0;
			const bCount = b.usage_count || 0;
			if (aCount !== bCount) return bCount - aCount;
			return a.name.localeCompare(b.name);
		});
}

export function getPowerfulTagBySlug(slug: string): PowerfulTag | undefined {
	const data = loadTagsData();
	const tag = data.tags.find(tag => tag.url_slug === slug);
	return tag ? normalizeTag(tag) : undefined;
}

export function getPowerfulTagById(id: string): PowerfulTag | undefined {
	const data = loadTagsData();
	const tag = data.tags.find(tag => tag.id === id);
	return tag ? normalizeTag(tag) : undefined;
}

export function getTagsByPostSlug(postSlug: string): PowerfulTag[] {
	const data = loadTagsData();
	const tagIds = data.relationships
		.filter(rel => rel.page_slug === postSlug)
		.map(rel => rel.tag_id);
	
	return data.tags
		.filter(tag => tagIds.includes(tag.id) && tag.status === 1)
		.map(normalizeTag)
		.sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByTagSlug(tagSlug: string): string[] {
	const data = loadTagsData();
	const tag = data.tags.find(t => t.url_slug === tagSlug);
	if (!tag) return [];
	
	return data.relationships
		.filter(rel => rel.tag_id === tag.id)
		.map(rel => rel.page_slug);
}

export function createPowerfulTag(tagData: Omit<PowerfulTag, 'id' | 'usage_count'>): PowerfulTag {
	const data = loadTagsData();
	
	// Generate new ID
	const maxId = Math.max(0, ...data.tags.map(t => parseInt(t.id) || 0));
	const newId = (maxId + 1).toString();
	
	const newTag: PowerfulTag = {
		...tagData,
		id: newId,
		usage_count: 0
	};
	
	data.tags.push(newTag);
	saveTagsData(data);
	
	return newTag;
}

export function updatePowerfulTag(id: string, updates: Partial<PowerfulTag>): PowerfulTag | null {
	const data = loadTagsData();
	const tagIndex = data.tags.findIndex(tag => tag.id === id);
	
	if (tagIndex === -1) return null;
	
	data.tags[tagIndex] = { ...data.tags[tagIndex], ...updates };
	saveTagsData(data);
	
	return data.tags[tagIndex];
}

export function deletePowerfulTag(id: string): boolean {
	const data = loadTagsData();
	const tagIndex = data.tags.findIndex(tag => tag.id === id);
	
	if (tagIndex === -1) return false;
	
	// Remove tag
	data.tags.splice(tagIndex, 1);
	
	// Remove all relationships
	data.relationships = data.relationships.filter(rel => rel.tag_id !== id);
	
	saveTagsData(data);
	return true;
}

export function addTagToPost(postSlug: string, tagId: string): boolean {
	const data = loadTagsData();
	const tag = data.tags.find(t => t.id === tagId);
	
	if (!tag) return false;
	
	// Check if relationship already exists
	const exists = data.relationships.some(
		rel => rel.page_slug === postSlug && rel.tag_id === tagId
	);
	
	if (!exists) {
		data.relationships.push({
			page_slug: postSlug,
			tag_id: tagId,
			tag_slug: tag.url_slug
		});
		
		// Update usage count
		tag.usage_count = (tag.usage_count || 0) + 1;
		
		saveTagsData(data);
	}
	
	return true;
}

export function removeTagFromPost(postSlug: string, tagId: string): boolean {
	const data = loadTagsData();
	const initialLength = data.relationships.length;
	
	data.relationships = data.relationships.filter(
		rel => !(rel.page_slug === postSlug && rel.tag_id === tagId)
	);
	
	if (data.relationships.length < initialLength) {
		// Update usage count
		const tag = data.tags.find(t => t.id === tagId);
		if (tag && tag.usage_count) {
			tag.usage_count = Math.max(0, tag.usage_count - 1);
		}
		
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
			const maxId = Math.max(0, ...data.tags.map(t => parseInt(t.id) || 0));
			
			tag = {
				id: (maxId + 1).toString(),
				name: tagName,
				url_slug: slug,
				headline: `Articles tagged with ${tagName}`,
				text_html: `<p>All articles related to ${tagName}</p>`,
				background: '#3b82f6', // Default blue
				color: '#ffffff',
				status: 1,
				usage_count: 0
			};
			
			data.tags.push(tag);
		}
		
		// Add relationship if it doesn't exist
		const exists = data.relationships.some(
			rel => rel.page_slug === postSlug && rel.tag_id === tag!.id
		);
		
		if (!exists) {
			data.relationships.push({
				page_slug: postSlug,
				tag_id: tag.id,
				tag_slug: tag.url_slug
			});
			
			tag.usage_count = (tag.usage_count || 0) + 1;
		}
	}
	
	saveTagsData(data);
}
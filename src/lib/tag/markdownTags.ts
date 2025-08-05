import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface TagFrontmatter {
	title: string;
	headline: string | null;
	background: string | null;
	color: string | null;
	status: number;
}

export interface MarkdownTagFile extends TagFrontmatter {
	slug: string;
	text_html: string;
	usage_count?: number; // Optional usage count
}

const TAG_PAGES_DIR = path.join(process.cwd(), 'content', 'tags');
const TAG_METADATA_FILE = path.join(process.cwd(), 'data', 'tag-metadata.json');

// Cache for tag files
let tagFilesCache: Map<string, MarkdownTagFile> | null = null;
let tagMetadataCache: Record<string, any> | null = null;
let lastModified = 0;
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
	const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	
	return brightness > 128 ? '#000000' : '#ffffff';
}

function normalizeTag(tag: TagFrontmatter, content: string, slug: string): MarkdownTagFile {
	// Ensure background color has a default
	const background = tag.background || '#3b82f6';
	
	// Auto-calculate color if null
	const color = tag.color || getContrastColor(background);
	
	return {
		title: tag.title,
		slug,
		headline: tag.headline,
		text_html: content,
		background,
		color,
		status: tag.status
	};
}

async function loadAllTagFiles(): Promise<Map<string, MarkdownTagFile>> {
	const now = Date.now();
	
	// Return cached data if still fresh
	if (tagFilesCache && (now - lastModified) < CACHE_DURATION) {
		return tagFilesCache;
	}
	
	const tags = new Map<string, MarkdownTagFile>();
	
	try {
		if (!fs.existsSync(TAG_PAGES_DIR)) {
			console.warn('Tag pages directory not found:', TAG_PAGES_DIR);
			return tags;
		}
		
		const files = fs.readdirSync(TAG_PAGES_DIR).filter(file => file.endsWith('.md'));
		
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
				tags.set(tag.slug, tag);
			}
		}
		
		tagFilesCache = tags;
		lastModified = now;
		
	} catch (error) {
		console.error('Error loading tag files:', error);
	}
	
	return tags;
}

export async function getAllMarkdownTags(): Promise<MarkdownTagFile[]> {
	const tags = await loadAllTagFiles();
	
	// Calculate usage counts for sorting
	const { calculateAllUsageCounts } = await import('./powerfulTags');
	const allCounts = await calculateAllUsageCounts();
	
	// Convert to array and sort by usage count
	return Array.from(tags.values())
		.map(tag => ({
			...tag,
			usage_count: allCounts.get(tag.slug) || 0,
			usageCount: allCounts.get(tag.slug) || 0
		}))
		.sort((a, b) => {
			if (a.usageCount !== b.usageCount) return b.usageCount - a.usageCount;
			return a.title.localeCompare(b.title);
		})
		.map(item => {
			const { usageCount, ...tag } = item;
			return tag;
		});
}

export async function getMarkdownTagBySlug(slug: string): Promise<MarkdownTagFile | undefined> {
	const tags = await loadAllTagFiles();
	return tags.get(slug);
}

export async function getMarkdownTagsByPostSlug(postSlug: string): Promise<MarkdownTagFile[]> {
	// Get tags from the actual post markdown file
	const { getSinglePostBySlug } = await import('../post/markdown');
	const post = await getSinglePostBySlug(postSlug);
	
	if (!post || !post.tags) return [];
	
	const tags = await loadAllTagFiles();
	const matchingTags: MarkdownTagFile[] = [];
	
	for (const tagName of post.tags) {
		// Try exact title match first
		let matchingTag = Array.from(tags.values()).find(t => t.title.toLowerCase() === tagName.toLowerCase());
		
		// If not found, try slug match
		if (!matchingTag) {
			const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
			matchingTag = tags.get(tagSlug);
		}
		
		if (matchingTag) {
			matchingTags.push(matchingTag);
		}
	}
	
	return matchingTags.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getMarkdownPostsForTag(tagSlug: string): Promise<string[]> {
	const { getPostsForTag } = await import('./powerfulTags');
	return await getPostsForTag(tagSlug);
}

// Function to invalidate caches
export function invalidateMarkdownTagCaches(): void {
	tagFilesCache = null;
	tagMetadataCache = null;
	lastModified = 0;
}
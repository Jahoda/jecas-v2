import {
	getAllMarkdownTags,
	getMarkdownTagBySlug,
	getMarkdownTagsByPostSlug,
	getMarkdownPostsForTag,
	type MarkdownTagFile
} from './markdownTags';
import { getTagUsageCount } from './powerfulTags';
import type { MarkdownPost } from '../post/markdown';

export interface MarkdownTag {
	url_slug: string;
	name: string;
	headline: string | null;
	text_html: string | null;
	status: number | null;
	background: string | null;
	color: string | null;
	count?: number;
}

export interface TagPost {
	tag_slug: string;
	page_slug: string;
}

const TAG_COLORS = [
	'#3b82f6',
	'#10b981',
	'#f59e0b',
	'#ef4444',
	'#8b5cf6',
	'#06b6d4',
	'#84cc16',
	'#f97316',
	'#ec4899',
	'#6366f1'
];

export async function getAllUsedTags(): Promise<MarkdownTag[]> {
	const markdownTags = await getAllMarkdownTags();

	// Get all usage counts efficiently (cached and batch-calculated)
	const { calculateAllUsageCounts } = await import('./powerfulTags');
	const allCounts = await calculateAllUsageCounts();

	// Map to MarkdownTag format with counts
	return markdownTags.map((tag) => ({
		url_slug: tag.slug,
		name: tag.title,
		headline: tag.headline,
		text_html: tag.text_html,
		status: tag.status,
		background: tag.background,
		color: tag.color,
		count: allCounts.get(tag.slug) || 0
	}));
}

export async function getAllTags(): Promise<MarkdownTag[]> {
	return await getAllUsedTags();
}

export async function getAllTagsByPageId(postSlug: string): Promise<MarkdownTag[]> {
	const markdownTags = await getMarkdownTagsByPostSlug(postSlug);

	// Get all usage counts efficiently (cached and batch-calculated)
	const { calculateAllUsageCounts } = await import('./powerfulTags');
	const allCounts = await calculateAllUsageCounts();

	// Map to MarkdownTag format with counts
	return markdownTags.map((tag) => ({
		url_slug: tag.slug,
		name: tag.title,
		headline: tag.headline,
		text_html: tag.text_html,
		status: tag.status,
		background: tag.background,
		color: tag.color,
		count: allCounts.get(tag.slug) || 0
	}));
}

export async function getSingleTagBySlug(slug: string): Promise<MarkdownTag | undefined> {
	const markdownTag = await getMarkdownTagBySlug(slug);

	if (!markdownTag) return undefined;

	// Get usage count efficiently (cached)
	const count = await getTagUsageCount(markdownTag.slug);

	return {
		url_slug: markdownTag.slug,
		name: markdownTag.title,
		headline: markdownTag.headline,
		text_html: markdownTag.text_html,
		status: markdownTag.status,
		background: markdownTag.background,
		color: markdownTag.color,
		count
	};
}

export async function getPagesTags(posts: MarkdownPost[]): Promise<TagPost[]> {
	const pagesTags: TagPost[] = [];

	// Get all tags for lookup from the new markdown system
	const allTags = await getAllMarkdownTags();
	const tagsByName = new Map();
	const tagsBySlug = new Map();

	allTags.forEach((tag) => {
		if (tag.title) {
			tagsByName.set(tag.title.toLowerCase(), tag);
		}
		if (tag.slug) {
			tagsBySlug.set(tag.slug.toLowerCase(), tag);
		}
	});

	posts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tagName) => {
				// Skip if tagName is undefined or empty
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
						tag_slug: tag.slug,
						page_slug: post.url_slug // Use slug as the primary identifier
					});
				} else {
					console.warn(`Tag not found for: "${tagName}" in post: ${post.url_slug}`);
				}
			});
		}
	});

	return pagesTags;
}

import {
	getAllPowerfulTags,
	getPowerfulTagBySlug,
	getTagsByPostSlug,
	getPostsByTagSlug,
	type PowerfulTag
} from './powerfulTags';

export interface MarkdownTag {
	id: string;
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
	tag_id: string;
	page_id: string;
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
	const powerfulTags = getAllPowerfulTags();
	
	return powerfulTags.map(tag => ({
		id: tag.id,
		url_slug: tag.url_slug,
		name: tag.name,
		headline: tag.headline,
		text_html: tag.text_html,
		status: tag.status,
		background: tag.background,
		color: tag.color,
		count: tag.usage_count
	}));
}

export async function getAllTags(): Promise<MarkdownTag[]> {
	return await getAllUsedTags();
}

export async function getAllTagsByPageId(postSlug: string): Promise<MarkdownTag[]> {
	const powerfulTags = getTagsByPostSlug(postSlug);
	
	return powerfulTags.map(tag => ({
		id: tag.id,
		url_slug: tag.url_slug,
		name: tag.name,
		headline: tag.headline,
		text_html: tag.text_html,
		status: tag.status,
		background: tag.background,
		color: tag.color,
		count: tag.usage_count
	}));
}

export async function getSingleTagBySlug(slug: string): Promise<MarkdownTag | undefined> {
	const powerfulTag = getPowerfulTagBySlug(slug);
	
	if (!powerfulTag) return undefined;
	
	return {
		id: powerfulTag.id,
		url_slug: powerfulTag.url_slug,
		name: powerfulTag.name,
		headline: powerfulTag.headline,
		text_html: powerfulTag.text_html,
		status: powerfulTag.status,
		background: powerfulTag.background,
		color: powerfulTag.color,
		count: powerfulTag.usage_count
	};
}

export async function getPagesTags(posts: MarkdownPost[]): Promise<TagPost[]> {
	const { getAllPowerfulTags } = await import('$lib/tag/powerfulTags');
	const pagesTags: TagPost[] = [];
	
	// Get all tags for lookup
	const allTags = getAllPowerfulTags();
	const tagsByName = new Map();
	const tagsBySlug = new Map();
	
	allTags.forEach(tag => {
		tagsByName.set(tag.name.toLowerCase(), tag);
		tagsBySlug.set(tag.url_slug.toLowerCase(), tag);
	});

	posts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tagName) => {
				// Try to find tag by exact name first
				let tag = tagsByName.get(tagName.toLowerCase());
				
				// If not found, try by converting name to slug
				if (!tag) {
					const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
					tag = tagsBySlug.get(tagSlug);
				}
				
				if (tag) {
					pagesTags.push({
						tag_id: tag.id.toString(),
						page_id: post.url_slug  // Use slug as the primary identifier
					});
				} else {
					console.warn(`Tag not found for: "${tagName}" in post: ${post.url_slug}`);
				}
			});
		}
	});

	return pagesTags;
}

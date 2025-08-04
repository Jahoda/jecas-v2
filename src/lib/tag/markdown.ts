import {
	getAllPosts as getMarkdownPosts,
	getPostsByTag,
	type MarkdownPost
} from '$lib/post/markdown';

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
	const posts = await getMarkdownPosts();
	const tagCounts = new Map<string, number>();

	posts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tag) => {
				tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
			});
		}
	});

	const tags: MarkdownTag[] = Array.from(tagCounts.entries()).map(([tagName, count], index) => ({
		id: tagName.toLowerCase().replace(/\s+/g, '-'),
		url_slug: tagName.toLowerCase().replace(/\s+/g, '-'),
		name: tagName,
		headline: `Articles tagged with ${tagName}`,
		text_html: `<p>All articles related to ${tagName}</p>`,
		status: 1,
		background: TAG_COLORS[index % TAG_COLORS.length],
		color: '#ffffff',
		count
	}));

	return tags.sort((a, b) => (b.count || 0) - (a.count || 0));
}

export async function getAllTags(): Promise<MarkdownTag[]> {
	return await getAllUsedTags();
}

export async function getAllTagsByPageId(postSlug: string): Promise<MarkdownTag[]> {
	const posts = await getMarkdownPosts();
	const post = posts.find((p) => p.url_slug === postSlug || p.id === postSlug);

	if (!post?.tags) {
		return [];
	}

	const allTags = await getAllUsedTags();
	return allTags.filter((tag) => post.tags!.includes(tag.name));
}

export async function getSingleTagBySlug(slug: string): Promise<MarkdownTag | undefined> {
	const allTags = await getAllUsedTags();
	return allTags.find((tag) => tag.url_slug === slug);
}

export async function getPagesTags(posts: MarkdownPost[]): Promise<TagPost[]> {
	const pagesTags: TagPost[] = [];

	posts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tag) => {
				pagesTags.push({
					tag_id: tag.toLowerCase().replace(/\s+/g, '-'),
					page_id: post.url_slug
				});
			});
		}
	});

	return pagesTags;
}

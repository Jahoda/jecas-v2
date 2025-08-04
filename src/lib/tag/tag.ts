import {
	getAllUsedTags as getMarkdownUsedTags,
	getAllTags as getMarkdownAllTags,
	getAllTagsByPageId as getMarkdownTagsByPageId,
	getSingleTagBySlug as getMarkdownSingleTagBySlug,
	type MarkdownTag
} from './markdown';

export interface Tag {
	id: string | number;
	url_slug: string;
	name: string;
	headline: string | null;
	text_html: string | null;
	status: number | null;
	background: string | null;
	color: string | null;
	count?: number;
}

export interface TagIn {
	url_slug: string;
	name: string;
	headline: string;
	text_html: string;
	background: string;
	color: string;
}

export interface TagPost {
	tag_id: string;
	page_id: string;
}

export interface PostCount {
	count: number;
}

export async function getAllUsedTags(): Promise<Tag[]> {
	return await getMarkdownUsedTags();
}

export async function getAllTags(): Promise<Tag[]> {
	return await getMarkdownAllTags();
}

export async function getAllTagsByPageId(pageSlug: string): Promise<Tag[]> {
	return await getMarkdownTagsByPageId(pageSlug);
}

export async function getSingleTagBySlug(slug: string): Promise<Tag | undefined> {
	return await getMarkdownSingleTagBySlug(slug);
}

// Database-based tag operations are not needed for markdown files
// Tags are managed through frontmatter in markdown files

export function updateTagBySlug(slug: string, data: TagIn) {
	throw new Error(
		'updateTagBySlug not implemented for markdown files - tags are managed through frontmatter'
	);
}

export function createTag(data: TagIn) {
	throw new Error(
		'createTag not implemented for markdown files - tags are managed through frontmatter'
	);
}

export async function deleteTagBySlug(slug: string) {
	throw new Error(
		'deleteTagBySlug not implemented for markdown files - tags are managed through frontmatter'
	);
}

export async function removePageTags(pageId: number) {
	throw new Error(
		'removePageTags not implemented for markdown files - tags are managed through frontmatter'
	);
}

export async function createPageTags(pageId: number, tags: string[]) {
	throw new Error(
		'createPageTags not implemented for markdown files - tags are managed through frontmatter'
	);
}

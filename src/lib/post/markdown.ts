import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface MarkdownPost {
	id: string;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	date: Date;
	last_modification: Date;
	comments: number;
	status: number;
	tags?: string[];
	word_count?: number;
}

export interface PostFrontmatter {
	title: string;
	headline: string;
	description: string;
	date: string;
	last_modification?: string;
	status?: number;
	tags?: string[];
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

function getPostFiles(): string[] {
	if (!fs.existsSync(POSTS_DIRECTORY)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'));
}

async function parseMarkdownFile(fileName: string): Promise<MarkdownPost> {
	const filePath = path.join(POSTS_DIRECTORY, fileName);
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	const frontmatter = data as PostFrontmatter;
	const url_slug = fileName.replace(/\.md$/, '');

	const text_html = await marked(content);
	const wordCount = (content.match(/\b\w+\b/g) || []).length;

	return {
		id: url_slug,
		title: frontmatter.title,
		url_slug,
		headline: frontmatter.headline,
		text_html,
		description: frontmatter.description,
		date: new Date(frontmatter.date),
		last_modification: frontmatter.last_modification
			? new Date(frontmatter.last_modification)
			: new Date(frontmatter.date),
		comments: 0,
		status: frontmatter.status !== undefined ? frontmatter.status : 1,
		tags: frontmatter.tags || [],
		word_count: wordCount
	};
}

export async function getAllPosts(
	limit: number | null = null,
	status = 1
): Promise<MarkdownPost[]> {
	const postFiles = getPostFiles();

	const posts = await Promise.all(postFiles.map((fileName) => parseMarkdownFile(fileName)));

	const filteredPosts = posts
		.filter((post) => post.status === status && post.url_slug !== 'home')
		.sort((a, b) => b.last_modification.getTime() - a.last_modification.getTime());

	return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

export async function getAllDrafts(limit: number | null = null): Promise<MarkdownPost[]> {
	return getAllPosts(limit, 0);
}

export async function getPostsBySlug(slugs: string[]): Promise<MarkdownPost[]> {
	const posts: MarkdownPost[] = [];

	for (const slug of slugs) {
		const fileName = `${slug}.md`;
		const filePath = path.join(POSTS_DIRECTORY, fileName);

		if (fs.existsSync(filePath)) {
			const post = await parseMarkdownFile(fileName);
			// Only include published posts in lists
			if (post.status === 1) {
				posts.push(post);
			}
		}
	}

	return posts;
}

export async function getSinglePostBySlug(slug: string): Promise<MarkdownPost | undefined> {
	const fileName = `${slug}.md`;
	const filePath = path.join(POSTS_DIRECTORY, fileName);

	if (!fs.existsSync(filePath)) {
		return undefined;
	}

	return await parseMarkdownFile(fileName);
}

export async function getPostsCount(): Promise<number> {
	const posts = await getAllPosts();
	return posts.length;
}

export async function getPostsByTag(tagName: string): Promise<MarkdownPost[]> {
	const allPosts = await getAllPosts();
	return allPosts.filter((post) => post.tags && post.tags.includes(tagName));
}

export async function getRelatedPostsByMostTags(
	tags: string[],
	currentSlug: string
): Promise<MarkdownPost[]> {
	const allPosts = await getAllPosts();

	const scoredPosts = allPosts
		.filter((post) => post.url_slug !== currentSlug)
		.map((post) => {
			const commonTags = (post.tags || []).filter((tag) => tags.includes(tag));
			return {
				post,
				score: commonTags.length
			};
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (a.score !== b.score) return b.score - a.score;
			return b.post.last_modification.getTime() - a.post.last_modification.getTime();
		})
		.slice(0, 4);

	return scoredPosts.map((item) => item.post);
}

export async function getAllUsedTags(): Promise<string[]> {
	const postFiles = getPostFiles();
	const allTags = new Set<string>();

	for (const fileName of postFiles) {
		const post = await parseMarkdownFile(fileName);
		// Only include tags from published posts
		if (post.status === 1 && post.tags) {
			post.tags.forEach((tag) => allTags.add(tag));
		}
	}

	return Array.from(allTags).sort();
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { 
	getTagsByPostSlug, 
	type PowerfulTag 
} from '$lib/tag/powerfulTags';

export interface EnhancedMarkdownPost {
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
	tags: PowerfulTag[]; // Rich tag objects instead of simple strings
	word_count?: number;
}

export interface EnhancedPostFrontmatter {
	title: string;
	headline: string;
	description: string;
	date: string;
	last_modification?: string;
	status?: number;
	tags?: string[] | string; // Support both array and comma-separated string
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

function getPostFiles(): string[] {
	if (!fs.existsSync(POSTS_DIRECTORY)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'));
}

async function parseEnhancedMarkdownFile(fileName: string): Promise<EnhancedMarkdownPost> {
	const filePath = path.join(POSTS_DIRECTORY, fileName);
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);
	
	const frontmatter = data as EnhancedPostFrontmatter;
	const url_slug = fileName.replace(/\.md$/, '');
	
	const text_html = await marked(content);
	const wordCount = (content.match(/\b\w+\b/g) || []).length;
	
	// Handle tags migration
	let tagNames: string[] = [];
	if (frontmatter.tags) {
		if (Array.isArray(frontmatter.tags)) {
			tagNames = frontmatter.tags;
		} else if (typeof frontmatter.tags === 'string') {
			// Support comma-separated tags
			tagNames = frontmatter.tags.split(',').map(t => t.trim()).filter(t => t);
		}
	}
	
	// Get rich tag objects - tags are now managed through frontmatter
	const tags = await getTagsByPostSlug(url_slug);
	
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
		tags,
		word_count: wordCount
	};
}

export async function getAllEnhancedPosts(
	limit: number | null = null,
	status = 1
): Promise<EnhancedMarkdownPost[]> {
	const postFiles = getPostFiles();

	const posts = await Promise.all(postFiles.map((fileName) => parseEnhancedMarkdownFile(fileName)));

	const filteredPosts = posts
		.filter((post) => post.status === status && post.url_slug !== 'home')
		.sort((a, b) => b.last_modification.getTime() - a.last_modification.getTime());

	return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

export async function getSingleEnhancedPostBySlug(slug: string): Promise<EnhancedMarkdownPost | undefined> {
	const fileName = `${slug}.md`;
	const filePath = path.join(POSTS_DIRECTORY, fileName);

	if (!fs.existsSync(filePath)) {
		return undefined;
	}

	return await parseEnhancedMarkdownFile(fileName);
}

export async function getEnhancedPostsBySlug(slugs: string[]): Promise<EnhancedMarkdownPost[]> {
	const posts: EnhancedMarkdownPost[] = [];

	for (const slug of slugs) {
		const fileName = `${slug}.md`;
		const filePath = path.join(POSTS_DIRECTORY, fileName);

		if (fs.existsSync(filePath)) {
			const post = await parseEnhancedMarkdownFile(fileName);
			// Only include published posts in lists
			if (post.status === 1) {
				posts.push(post);
			}
		}
	}

	return posts;
}

export async function getEnhancedPostsCount(): Promise<number> {
	const posts = await getAllEnhancedPosts();
	return posts.length;
}

export async function getEnhancedPostsByTag(tagSlug: string): Promise<EnhancedMarkdownPost[]> {
	const { getPostsByTagSlug } = await import('$lib/tag/powerfulTags');
	const postSlugs = await getPostsByTagSlug(tagSlug);
	
	const posts: EnhancedMarkdownPost[] = [];
	for (const slug of postSlugs) {
		const post = await getSingleEnhancedPostBySlug(slug);
		if (post && post.status === 1) {
			posts.push(post);
		}
	}
	
	return posts.sort((a, b) => b.last_modification.getTime() - a.last_modification.getTime());
}

export async function getEnhancedRelatedPostsByMostTags(
	tags: PowerfulTag[],
	currentSlug: string
): Promise<EnhancedMarkdownPost[]> {
	const allPosts = await getAllEnhancedPosts();
	const tagSlugs = tags.map(tag => tag.url_slug);

	const scoredPosts = allPosts
		.filter((post) => post.url_slug !== currentSlug)
		.map((post) => {
			const commonTagSlugs = post.tags.map(tag => tag.url_slug).filter((tagSlug) => tagSlugs.includes(tagSlug));
			return {
				post,
				score: commonTagSlugs.length
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
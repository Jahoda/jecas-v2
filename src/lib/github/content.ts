import { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } from '$env/static/private';

interface GitHubFileContent {
	name: string;
	path: string;
	sha: string;
	content?: string;
	encoding?: string;
	download_url: string;
}

interface GitHubTreeItem {
	path: string;
	type: string;
	sha: string;
}

const cache = new Map<string, { data: string; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache for individual files

function getHeaders(): HeadersInit {
	const headers: HeadersInit = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'jecas-v2'
	};

	if (GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
	}

	return headers;
}

function getCacheKey(path: string): string {
	return `github:${GITHUB_OWNER}/${GITHUB_REPO}:${GITHUB_BRANCH}:${path}`;
}

/**
 * Fetch raw file content from GitHub
 */
export async function fetchFileContent(path: string): Promise<string> {
	const cacheKey = getCacheKey(path);
	const cached = cache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data;
	}

	const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;

	const response = await fetch(url, { headers: getHeaders() });

	if (!response.ok) {
		throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
	}

	const content = await response.text();
	cache.set(cacheKey, { data: content, timestamp: Date.now() });

	return content;
}

/**
 * List all files in a directory from GitHub
 */
export async function listDirectory(path: string): Promise<string[]> {
	const cacheKey = getCacheKey(`dir:${path}`);
	const cached = cache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return JSON.parse(cached.data);
	}

	const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;

	const response = await fetch(url, { headers: getHeaders() });

	if (!response.ok) {
		throw new Error(`Failed to list ${path}: ${response.status} ${response.statusText}`);
	}

	const items: GitHubFileContent[] = await response.json();
	const files = items.filter((item) => item.name.endsWith('.md')).map((item) => item.name);

	cache.set(cacheKey, { data: JSON.stringify(files), timestamp: Date.now() });

	return files;
}

/**
 * Get all markdown files from content/posts directory
 */
export async function getPostFiles(): Promise<string[]> {
	return listDirectory('content/posts');
}

/**
 * Get all markdown files from content/tags directory
 */
export async function getTagFiles(): Promise<string[]> {
	return listDirectory('content/tags');
}

/**
 * Fetch a single post file content
 */
export async function fetchPostContent(slug: string): Promise<string> {
	return fetchFileContent(`content/posts/${slug}.md`);
}

/**
 * Fetch a single tag file content
 */
export async function fetchTagContent(slug: string): Promise<string> {
	return fetchFileContent(`content/tags/${slug}.md`);
}

/**
 * Clear the cache (useful for on-demand revalidation)
 */
export function clearCache(): void {
	cache.clear();
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(path: string): void {
	cache.delete(getCacheKey(path));
}

#!/usr/bin/env node

/**
 * Script to verify all articles and tags are accessible at their URLs
 * Usage: node scripts/verify-urls.js [--base-url=URL] [--concurrency=N] [--published]
 *
 * Options:
 *   --base-url=URL    Base URL to check (default: http://localhost:5173)
 *   --concurrency=N   Number of concurrent requests (default: 10)
 *   --published       Only check published articles/tags (status: 1)
 *   --tags-only       Only check tags
 *   --posts-only      Only check posts/articles
 *
 * Examples:
 *   node scripts/verify-urls.js --base-url=https://jecas.cz
 *   node scripts/verify-urls.js --base-url=http://localhost:5173 --concurrency=5
 */

import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import matter from 'gray-matter';

// Configuration
const POSTS_DIR = 'content/posts';
const TAGS_DIR = 'content/tags';
const DEFAULT_BASE_URL = 'http://localhost:5173';
const DEFAULT_CONCURRENCY = 10;
const TIMEOUT = 15000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

// Colors for console output
const colors = {
	red: (text) => `\x1b[31m${text}\x1b[0m`,
	green: (text) => `\x1b[32m${text}\x1b[0m`,
	yellow: (text) => `\x1b[33m${text}\x1b[0m`,
	cyan: (text) => `\x1b[36m${text}\x1b[0m`,
	dim: (text) => `\x1b[2m${text}\x1b[0m`,
	bold: (text) => `\x1b[1m${text}\x1b[0m`
};

/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse command line arguments
 */
function parseArgs() {
	const args = process.argv.slice(2);
	const options = {
		baseUrl: DEFAULT_BASE_URL,
		concurrency: DEFAULT_CONCURRENCY,
		publishedOnly: false,
		tagsOnly: false,
		postsOnly: false
	};

	for (const arg of args) {
		if (arg.startsWith('--base-url=')) {
			options.baseUrl = arg.split('=')[1];
		} else if (arg.startsWith('--concurrency=')) {
			options.concurrency = parseInt(arg.split('=')[1], 10);
		} else if (arg === '--published') {
			options.publishedOnly = true;
		} else if (arg === '--tags-only') {
			options.tagsOnly = true;
		} else if (arg === '--posts-only') {
			options.postsOnly = true;
		}
	}

	// Remove trailing slash from base URL
	options.baseUrl = options.baseUrl.replace(/\/$/, '');

	return options;
}

/**
 * Get all articles with their metadata
 */
function getArticles(publishedOnly = false) {
	const postsDir = resolve(process.cwd(), POSTS_DIR);
	const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'));

	const articles = [];

	for (const file of files) {
		const filePath = join(postsDir, file);
		const content = readFileSync(filePath, 'utf-8');
		const { data: frontmatter } = matter(content);

		const slug = file.replace('.md', '');
		const isPublished = frontmatter.status === 1;

		if (publishedOnly && !isPublished) {
			continue;
		}

		articles.push({
			slug,
			title: frontmatter.title || slug,
			isPublished,
			type: 'article'
		});
	}

	return articles;
}

/**
 * Get all tags with their metadata
 */
function getTags(publishedOnly = false) {
	const tagsDir = resolve(process.cwd(), TAGS_DIR);
	const files = readdirSync(tagsDir).filter((f) => f.endsWith('.md'));

	const tags = [];

	for (const file of files) {
		const filePath = join(tagsDir, file);
		const content = readFileSync(filePath, 'utf-8');
		const { data: frontmatter } = matter(content);

		const slug = file.replace('.md', '');
		const isPublished = frontmatter.status === 1;

		if (publishedOnly && !isPublished) {
			continue;
		}

		tags.push({
			slug,
			title: frontmatter.title || slug,
			isPublished,
			type: 'tag'
		});
	}

	return tags;
}

/**
 * Check if a URL is accessible
 */
async function checkUrl(url, attempt = 1) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

		const response = await fetch(url, {
			method: 'GET',
			signal: controller.signal,
			headers: {
				'User-Agent': 'VerifyUrls/1.0 (jecas-v2)',
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
			},
			redirect: 'follow'
		});

		clearTimeout(timeoutId);

		return {
			url,
			ok: response.status >= 200 && response.status < 400,
			status: response.status
		};
	} catch (error) {
		// Retry on network errors
		if (attempt < MAX_RETRIES) {
			await sleep(RETRY_DELAY * attempt);
			return checkUrl(url, attempt + 1);
		}

		const errorMessage =
			error.name === 'AbortError'
				? 'Timeout'
				: error.cause?.code || error.message || 'Unknown error';

		return {
			url,
			ok: false,
			error: errorMessage
		};
	}
}

/**
 * Check URLs with concurrency limit
 */
async function checkUrlsWithConcurrency(items, baseUrl, concurrency) {
	const results = [];
	const queue = [...items];
	const inProgress = new Set();

	async function processItem(item) {
		const url = `${baseUrl}/${item.slug}`;
		const result = await checkUrl(url);
		return {
			...item,
			url,
			...result
		};
	}

	while (queue.length > 0 || inProgress.size > 0) {
		// Start new requests up to concurrency limit
		while (queue.length > 0 && inProgress.size < concurrency) {
			const item = queue.shift();
			const promise = processItem(item).then((result) => {
				inProgress.delete(promise);
				results.push(result);

				// Print progress
				const statusIcon = result.ok ? colors.green('✓') : colors.red('✗');
				const statusText = result.error || `HTTP ${result.status}`;
				const typeLabel = result.type === 'tag' ? colors.cyan('[tag]') : colors.dim('[article]');
				console.log(`${statusIcon} ${typeLabel} /${result.slug} - ${statusText}`);
			});
			inProgress.add(promise);
		}

		// Wait for at least one to complete
		if (inProgress.size > 0) {
			await Promise.race(inProgress);
		}
	}

	return results;
}

/**
 * Main function
 */
async function main() {
	const options = parseArgs();

	console.log(colors.cyan('\n=== URL Verification ==='));
	console.log(`Base URL: ${colors.bold(options.baseUrl)}`);
	console.log(`Concurrency: ${options.concurrency}`);
	console.log(`Filter: ${options.publishedOnly ? 'published only' : 'all'}`);
	console.log('');

	// Collect items to check
	const items = [];

	if (!options.tagsOnly) {
		const articles = getArticles(options.publishedOnly);
		items.push(...articles);
		console.log(`Found ${colors.bold(articles.length)} articles`);
	}

	if (!options.postsOnly) {
		const tags = getTags(options.publishedOnly);
		items.push(...tags);
		console.log(`Found ${colors.bold(tags.length)} tags`);
	}

	if (items.length === 0) {
		console.log(colors.yellow('\nNo items to check.'));
		process.exit(0);
	}

	console.log(`\nChecking ${colors.bold(items.length)} URLs...\n`);

	// Check all URLs
	const results = await checkUrlsWithConcurrency(items, options.baseUrl, options.concurrency);

	// Analyze results
	const successful = results.filter((r) => r.ok);
	const failed = results.filter((r) => !r.ok);

	const articlesFailed = failed.filter((r) => r.type === 'article');
	const tagsFailed = failed.filter((r) => r.type === 'tag');

	// Print summary
	console.log(colors.cyan('\n=== Summary ==='));
	console.log(`Total checked: ${results.length}`);
	console.log(`${colors.green('Successful:')} ${successful.length}`);
	console.log(`${colors.red('Failed:')} ${failed.length}`);

	if (failed.length > 0) {
		console.log(colors.red('\n=== Failed URLs ==='));

		if (articlesFailed.length > 0) {
			console.log(colors.yellow(`\nArticles (${articlesFailed.length}):`));
			for (const item of articlesFailed) {
				const reason = item.error || `HTTP ${item.status}`;
				console.log(`  ${colors.red('✗')} /${item.slug} - ${reason}`);
			}
		}

		if (tagsFailed.length > 0) {
			console.log(colors.yellow(`\nTags (${tagsFailed.length}):`));
			for (const item of tagsFailed) {
				const reason = item.error || `HTTP ${item.status}`;
				console.log(`  ${colors.red('✗')} /${item.slug} - ${reason}`);
			}
		}

		console.log(colors.red('\nVerification failed! Some URLs are not accessible.'));
		process.exit(1);
	} else {
		console.log(colors.green('\nAll URLs are accessible!'));
		process.exit(0);
	}
}

main().catch((error) => {
	console.error(colors.red('Error:'), error);
	process.exit(1);
});

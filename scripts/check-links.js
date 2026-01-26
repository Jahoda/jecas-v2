#!/usr/bin/env node

/**
 * Script to check links in article files
 * Usage: node scripts/check-links.js [file1.md] [file2.md] ...
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const TIMEOUT = 10000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

// Domains to skip (known to block automated requests or are internal)
const SKIP_DOMAINS = [
	'localhost',
	'127.0.0.1',
	'example.com',
	'example.org',
	// Some sites block HEAD requests or have anti-bot measures
	'twitter.com',
	'x.com',
	'facebook.com',
	'linkedin.com',
	'instagram.com',
	'sitepoint.com'
];

// Cache for existing article and tag slugs
let slugsCache = null;

/**
 * Get all existing slugs from content/posts and content/tags
 * @returns {Set<string>}
 */
function getExistingSlugs() {
	if (slugsCache) {
		return slugsCache;
	}

	const postsDir = resolve(process.cwd(), 'content/posts');
	const tagsDir = resolve(process.cwd(), 'content/tags');

	const postFiles = readdirSync(postsDir);
	const tagFiles = existsSync(tagsDir) ? readdirSync(tagsDir) : [];

	const postSlugs = postFiles.filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));
	const tagSlugs = tagFiles.filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));

	slugsCache = new Set([...postSlugs, ...tagSlugs]);
	return slugsCache;
}

/**
 * Extract all URLs from HTML content
 * @param {string} content
 * @returns {{external: string[], internal: string[]}}
 */
function extractUrls(content) {
	const urlRegex = /href=["']([^"']+)["']/gi;
	const external = [];
	const internal = [];
	let match;

	while ((match = urlRegex.exec(content)) !== null) {
		const url = match[1];
		// External URLs (http/https)
		if (url.startsWith('http://') || url.startsWith('https://')) {
			external.push(url);
		}
		// Internal URLs (starting with / but not //)
		else if (url.startsWith('/') && !url.startsWith('//')) {
			internal.push(url);
		}
	}

	return {
		external: [...new Set(external)],
		internal: [...new Set(internal)]
	};
}

/**
 * Check if an internal link points to an existing article
 * @param {string} url - Internal URL like "/json" or "/bezpecnost#xss"
 * @returns {{url: string, ok: boolean, error?: string}}
 */
function checkInternalLink(url) {
	// Extract slug (remove leading / and any anchor)
	const slug = url.replace(/^\//, '').split('#')[0];

	// Skip empty slugs (root link)
	if (!slug) {
		return { url, ok: true, skipped: true };
	}

	// Skip known special paths (like /files/, /static/, etc.)
	if (slug.startsWith('files/') || slug.startsWith('static/') || slug.startsWith('tags/')) {
		return { url, ok: true, skipped: true };
	}

	const existingSlugs = getExistingSlugs();
	const exists = existingSlugs.has(slug);

	if (exists) {
		return { url, ok: true };
	} else {
		return { url, ok: false, error: `Page "${slug}" does not exist (not in posts or tags)` };
	}
}

/**
 * Check if a domain should be skipped
 * @param {string} url
 * @returns {boolean}
 */
function shouldSkip(url) {
	try {
		const hostname = new URL(url).hostname;
		return SKIP_DOMAINS.some((domain) => hostname.includes(domain));
	} catch {
		return true;
	}
}

/**
 * Sleep for a given number of milliseconds
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if a URL is accessible
 * @param {string} url
 * @param {number} attempt
 * @returns {Promise<{url: string, ok: boolean, status?: number, error?: string}>}
 */
async function checkUrl(url, attempt = 1) {
	if (shouldSkip(url)) {
		return { url, ok: true, status: 0, skipped: true };
	}

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

		// Try HEAD first, fall back to GET if HEAD fails
		let response = await fetch(url, {
			method: 'HEAD',
			signal: controller.signal,
			headers: {
				'User-Agent':
					'Mozilla/5.0 (compatible; LinkChecker/1.0; +https://github.com/user/jecas-v2)',
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
			},
			redirect: 'follow'
		});

		clearTimeout(timeoutId);

		// Some servers don't support HEAD, try GET
		if (response.status === 405 || response.status === 403) {
			const controller2 = new AbortController();
			const timeoutId2 = setTimeout(() => controller2.abort(), TIMEOUT);

			response = await fetch(url, {
				method: 'GET',
				signal: controller2.signal,
				headers: {
					'User-Agent':
						'Mozilla/5.0 (compatible; LinkChecker/1.0; +https://github.com/user/jecas-v2)',
					Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
				},
				redirect: 'follow'
			});

			clearTimeout(timeoutId2);
		}

		const ok = response.status >= 200 && response.status < 400;
		return { url, ok, status: response.status };
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
 * Process a single file
 * @param {string} filePath
 * @returns {Promise<{file: string, externalResults: Array, internalResults: Array}>}
 */
async function processFile(filePath) {
	const absolutePath = resolve(process.cwd(), filePath);
	const content = readFileSync(absolutePath, 'utf-8');
	const { external, internal } = extractUrls(content);

	console.log(
		`\nChecking ${external.length} external + ${internal.length} internal links in ${filePath}...`
	);

	// Check external URLs asynchronously
	const externalResults = await Promise.all(external.map((url) => checkUrl(url)));

	// Check internal URLs synchronously (file system check)
	const internalResults = internal.map((url) => checkInternalLink(url));

	return { file: filePath, externalResults, internalResults };
}

async function main() {
	const files = process.argv.slice(2).filter((f) => f.endsWith('.md'));

	if (files.length === 0) {
		console.log('No article files to check.');
		process.exit(0);
	}

	console.log(`Checking links in ${files.length} file(s)...`);

	const allResults = await Promise.all(files.map(processFile));

	let hasErrors = false;
	const summary = {
		external: { total: 0, ok: 0, failed: 0, skipped: 0 },
		internal: { total: 0, ok: 0, failed: 0, skipped: 0 }
	};

	for (const { file, externalResults, internalResults } of allResults) {
		// Process external results
		const externalFailed = externalResults.filter((r) => !r.ok && !r.skipped);
		const externalSkipped = externalResults.filter((r) => r.skipped);

		summary.external.total += externalResults.length;
		summary.external.ok += externalResults.length - externalFailed.length - externalSkipped.length;
		summary.external.failed += externalFailed.length;
		summary.external.skipped += externalSkipped.length;

		// Process internal results
		const internalFailed = internalResults.filter((r) => !r.ok && !r.skipped);
		const internalSkipped = internalResults.filter((r) => r.skipped);

		summary.internal.total += internalResults.length;
		summary.internal.ok += internalResults.length - internalFailed.length - internalSkipped.length;
		summary.internal.failed += internalFailed.length;
		summary.internal.skipped += internalSkipped.length;

		// Report broken links
		const allFailed = [...externalFailed, ...internalFailed];
		if (allFailed.length > 0) {
			hasErrors = true;
			console.log(`\n--- ${file} ---`);
			for (const result of allFailed) {
				const reason = result.error || `HTTP ${result.status}`;
				console.log(`  BROKEN: ${result.url}`);
				console.log(`          Reason: ${reason}`);
			}
		}
	}

	const totalLinks = summary.external.total + summary.internal.total;
	const totalOk = summary.external.ok + summary.internal.ok;
	const totalSkipped = summary.external.skipped + summary.internal.skipped;
	const totalFailed = summary.external.failed + summary.internal.failed;

	console.log('\n=== Summary ===');
	console.log(`Total links: ${totalLinks}`);
	console.log(
		`  External: ${summary.external.total} (OK: ${summary.external.ok}, Skipped: ${summary.external.skipped}, Failed: ${summary.external.failed})`
	);
	console.log(
		`  Internal: ${summary.internal.total} (OK: ${summary.internal.ok}, Skipped: ${summary.internal.skipped}, Failed: ${summary.internal.failed})`
	);
	console.log(`OK: ${totalOk}`);
	console.log(`Skipped: ${totalSkipped}`);
	console.log(`Failed: ${totalFailed}`);

	if (hasErrors) {
		console.log('\nSome links are broken. Please fix them before merging.');
		process.exit(1);
	} else {
		console.log('\nAll links are OK!');
		process.exit(0);
	}
}

main().catch((error) => {
	console.error('Error:', error);
	process.exit(1);
});

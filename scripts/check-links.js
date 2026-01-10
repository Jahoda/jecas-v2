#!/usr/bin/env node

/**
 * Script to check links in article files
 * Usage: node scripts/check-links.js [file1.md] [file2.md] ...
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

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
	'instagram.com'
];

/**
 * Extract all URLs from HTML content
 * @param {string} content
 * @returns {string[]}
 */
function extractUrls(content) {
	const urlRegex = /href=["']([^"']+)["']/gi;
	const urls = [];
	let match;

	while ((match = urlRegex.exec(content)) !== null) {
		const url = match[1];
		// Only check http/https URLs
		if (url.startsWith('http://') || url.startsWith('https://')) {
			urls.push(url);
		}
	}

	return [...new Set(urls)]; // Remove duplicates
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
 * @returns {Promise<{file: string, results: Array}>}
 */
async function processFile(filePath) {
	const absolutePath = resolve(process.cwd(), filePath);
	const content = readFileSync(absolutePath, 'utf-8');
	const urls = extractUrls(content);

	console.log(`\nChecking ${urls.length} links in ${filePath}...`);

	const results = await Promise.all(urls.map((url) => checkUrl(url)));

	return { file: filePath, results };
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
	const summary = { total: 0, ok: 0, failed: 0, skipped: 0 };

	for (const { file, results } of allResults) {
		const failed = results.filter((r) => !r.ok && !r.skipped);
		const skipped = results.filter((r) => r.skipped);

		summary.total += results.length;
		summary.ok += results.length - failed.length - skipped.length;
		summary.failed += failed.length;
		summary.skipped += skipped.length;

		if (failed.length > 0) {
			hasErrors = true;
			console.log(`\n--- ${file} ---`);
			for (const result of failed) {
				const reason = result.error || `HTTP ${result.status}`;
				console.log(`  BROKEN: ${result.url}`);
				console.log(`          Reason: ${reason}`);
			}
		}
	}

	console.log('\n=== Summary ===');
	console.log(`Total links: ${summary.total}`);
	console.log(`OK: ${summary.ok}`);
	console.log(`Skipped: ${summary.skipped}`);
	console.log(`Failed: ${summary.failed}`);

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

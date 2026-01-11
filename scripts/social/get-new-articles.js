#!/usr/bin/env node

/**
 * Script to detect newly published articles
 * Usage: node scripts/get-new-articles.js [--since=<commit>] [--json]
 *
 * Returns articles that were added (not modified) in the specified commit range.
 * If no --since is provided, it compares with the previous commit.
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://jecas.cz';

/**
 * Parse command line arguments
 * @returns {{ since: string | null, json: boolean }}
 */
function parseArgs() {
	const args = process.argv.slice(2);
	let since = null;
	let json = false;

	for (const arg of args) {
		if (arg.startsWith('--since=')) {
			since = arg.replace('--since=', '');
		} else if (arg === '--json') {
			json = true;
		}
	}

	return { since, json };
}

/**
 * Get newly added article files from git
 * @param {string | null} since - Commit to compare from
 * @returns {string[]}
 */
function getNewArticleFiles(since) {
	try {
		// If no since commit, compare with HEAD~1
		const compareFrom = since || 'HEAD~1';

		// Get only Added files (A) in the content/posts directory
		const result = execSync(
			`git diff --name-only --diff-filter=A ${compareFrom}..HEAD -- 'content/posts/*.md'`,
			{ encoding: 'utf-8' }
		);

		return result
			.split('\n')
			.filter((f) => f.trim() !== '' && f.endsWith('.md'));
	} catch (error) {
		// If git diff fails (e.g., first commit), return empty array
		console.error('Warning: Could not get git diff:', error.message);
		return [];
	}
}

/**
 * Get slug from filename
 * @param {string} filePath
 * @returns {string}
 */
function getSlug(filePath) {
	return basename(filePath, '.md');
}

/**
 * Strip HTML tags from string
 * @param {string} html
 * @returns {string}
 */
function stripHtml(html) {
	return html.replace(/<[^>]*>/g, '');
}

/**
 * Parse article file and extract metadata
 * @param {string} filePath
 * @returns {object | null}
 */
function parseArticle(filePath) {
	const absolutePath = resolve(process.cwd(), filePath);

	if (!existsSync(absolutePath)) {
		console.error(`File not found: ${absolutePath}`);
		return null;
	}

	try {
		const content = readFileSync(absolutePath, 'utf-8');
		const { data } = matter(content);

		// Check if article is published (status: 1)
		if (data.status !== 1) {
			return null;
		}

		// Check if article date is not in the future
		const articleDate = new Date(data.date);
		const now = new Date();
		if (articleDate > now) {
			return null;
		}

		const slug = getSlug(filePath);

		return {
			slug,
			title: stripHtml(data.headline || data.title),
			description: stripHtml(data.description || ''),
			url: `${SITE_URL}/${slug}`,
			ogImageUrl: `${SITE_URL}/api/og?slug=${slug}`,
			date: data.date,
			tags: data.tags || [],
			socialText: data.social_text || null
		};
	} catch (error) {
		console.error(`Error parsing ${filePath}:`, error.message);
		return null;
	}
}

async function main() {
	const { since, json } = parseArgs();

	const newFiles = getNewArticleFiles(since);

	if (newFiles.length === 0) {
		if (json) {
			console.log(JSON.stringify({ articles: [] }));
		} else {
			console.log('No new articles found.');
		}
		process.exit(0);
	}

	const articles = newFiles.map(parseArticle).filter((a) => a !== null);

	if (json) {
		console.log(JSON.stringify({ articles }, null, 2));
	} else {
		console.log(`Found ${articles.length} new article(s):\n`);
		for (const article of articles) {
			console.log(`Title: ${article.title}`);
			console.log(`URL: ${article.url}`);
			console.log(`Tags: ${article.tags.join(', ')}`);
			console.log('---');
		}
	}

	// Set GitHub Actions output if running in CI
	if (process.env.GITHUB_OUTPUT) {
		const outputFile = process.env.GITHUB_OUTPUT;
		const fs = await import('fs');
		fs.appendFileSync(outputFile, `articles=${JSON.stringify(articles)}\n`);
		fs.appendFileSync(outputFile, `has_articles=${articles.length > 0}\n`);
	}
}

main().catch((error) => {
	console.error('Error:', error);
	process.exit(1);
});

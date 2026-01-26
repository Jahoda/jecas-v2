#!/usr/bin/env node

/**
 * Script to verify all articles are valid and complete
 * Usage: node scripts/verify-articles.js [--fix] [file1.md] [file2.md] ...
 *
 * Checks:
 * - Frontmatter: required fields, valid values, date format
 * - Tags: all referenced tags exist
 * - Thumbnails: image exists and is 200x200 PNG
 * - Content: valid HTML structure, h2 ids
 * - Internal links: all referenced articles exist
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, join, basename } from 'path';
import matter from 'gray-matter';

// Configuration
const POSTS_DIR = 'content/posts';
const TAGS_DIR = 'content/tags';
const THUMBNAILS_DIR = 'static/files/article';

// Required frontmatter fields
const REQUIRED_FIELDS = ['title', 'date', 'status', 'tags', 'format'];

// Valid format values
const VALID_FORMATS = ['html'];

// Date regex (YYYY-MM-DD)
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Colors for console output
const colors = {
	red: (text) => `\x1b[31m${text}\x1b[0m`,
	green: (text) => `\x1b[32m${text}\x1b[0m`,
	yellow: (text) => `\x1b[33m${text}\x1b[0m`,
	cyan: (text) => `\x1b[36m${text}\x1b[0m`,
	dim: (text) => `\x1b[2m${text}\x1b[0m`
};

// Cache for existing slugs
let existingTags = null;
let existingPosts = null;
let existingThumbnails = null;

/**
 * Get all existing tag slugs
 */
function getExistingTags() {
	if (existingTags) return existingTags;

	const tagsDir = resolve(process.cwd(), TAGS_DIR);
	if (!existsSync(tagsDir)) {
		existingTags = new Set();
		return existingTags;
	}

	const files = readdirSync(tagsDir).filter((f) => f.endsWith('.md'));
	existingTags = new Set(files.map((f) => f.replace('.md', '')));
	return existingTags;
}

/**
 * Get all existing post slugs
 */
function getExistingPosts() {
	if (existingPosts) return existingPosts;

	const postsDir = resolve(process.cwd(), POSTS_DIR);
	const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'));
	existingPosts = new Set(files.map((f) => f.replace('.md', '')));
	return existingPosts;
}

/**
 * Get all existing thumbnail files
 */
function getExistingThumbnails() {
	if (existingThumbnails) return existingThumbnails;

	const thumbDir = resolve(process.cwd(), THUMBNAILS_DIR);
	if (!existsSync(thumbDir)) {
		existingThumbnails = new Set();
		return existingThumbnails;
	}

	const files = readdirSync(thumbDir).filter((f) => f.endsWith('.png'));
	existingThumbnails = new Set(files.map((f) => f.replace('.png', '')));
	return existingThumbnails;
}

/**
 * Read PNG dimensions from file header
 * PNG files have width at bytes 16-19 and height at bytes 20-23 (big-endian)
 */
function getPngDimensions(filePath) {
	try {
		const buffer = readFileSync(filePath);

		// Check PNG signature
		const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
		if (!buffer.subarray(0, 8).equals(pngSignature)) {
			return null;
		}

		// Read IHDR chunk (starts at byte 8)
		// Chunk length (4 bytes) + chunk type "IHDR" (4 bytes) + width (4 bytes) + height (4 bytes)
		const width = buffer.readUInt32BE(16);
		const height = buffer.readUInt32BE(20);

		return { width, height };
	} catch {
		return null;
	}
}

/**
 * Validate frontmatter
 */
function validateFrontmatter(frontmatter, slug) {
	const errors = [];
	const warnings = [];

	// Check required fields
	for (const field of REQUIRED_FIELDS) {
		if (frontmatter[field] === undefined || frontmatter[field] === null) {
			errors.push(`Missing required field: ${field}`);
		}
	}

	// Validate title
	if (frontmatter.title !== undefined) {
		if (typeof frontmatter.title !== 'string' || frontmatter.title.trim() === '') {
			errors.push('Field "title" must be a non-empty string');
		}
	}

	// Validate date format
	if (frontmatter.date !== undefined) {
		const dateStr = String(frontmatter.date);
		if (!DATE_REGEX.test(dateStr)) {
			errors.push(`Field "date" must be in YYYY-MM-DD format, got: ${dateStr}`);
		} else {
			// Validate it's a real date
			const date = new Date(dateStr);
			if (isNaN(date.getTime())) {
				errors.push(`Field "date" is not a valid date: ${dateStr}`);
			}
		}
	}

	// Validate last_modification if present
	if (frontmatter.last_modification !== undefined && frontmatter.last_modification !== null) {
		const dateStr = String(frontmatter.last_modification);
		if (!DATE_REGEX.test(dateStr)) {
			errors.push(`Field "last_modification" must be in YYYY-MM-DD format, got: ${dateStr}`);
		}
	}

	// Validate status
	if (frontmatter.status !== undefined) {
		if (typeof frontmatter.status !== 'number') {
			errors.push(`Field "status" must be a number, got: ${typeof frontmatter.status}`);
		}
	}

	// Validate format
	if (frontmatter.format !== undefined) {
		if (!VALID_FORMATS.includes(frontmatter.format)) {
			errors.push(
				`Field "format" must be one of [${VALID_FORMATS.join(', ')}], got: ${frontmatter.format}`
			);
		}
	}

	// Validate tags
	if (frontmatter.tags !== undefined) {
		if (!Array.isArray(frontmatter.tags)) {
			errors.push(`Field "tags" must be an array, got: ${typeof frontmatter.tags}`);
		} else {
			const existingTagsSet = getExistingTags();
			for (const tag of frontmatter.tags) {
				if (typeof tag !== 'string') {
					errors.push(`Tag must be a string, got: ${typeof tag}`);
				} else if (!existingTagsSet.has(tag)) {
					errors.push(`Tag "${tag}" does not exist in ${TAGS_DIR}/`);
				}
			}

			// Check for duplicate tags
			const uniqueTags = new Set(frontmatter.tags);
			if (uniqueTags.size !== frontmatter.tags.length) {
				warnings.push('Duplicate tags found');
			}

			// Check for empty tags array
			if (frontmatter.tags.length === 0) {
				warnings.push('Tags array is empty');
			}
		}
	}

	// Check for recommended fields
	if (!frontmatter.description) {
		warnings.push('Missing recommended field: description (for SEO)');
	}

	return { errors, warnings };
}

/**
 * Validate thumbnail
 */
function validateThumbnail(slug) {
	const errors = [];
	const warnings = [];

	const thumbnails = getExistingThumbnails();

	if (!thumbnails.has(slug)) {
		errors.push(`Missing thumbnail: ${THUMBNAILS_DIR}/${slug}.png`);
		return { errors, warnings };
	}

	// Check dimensions
	const thumbPath = resolve(process.cwd(), THUMBNAILS_DIR, `${slug}.png`);
	const dimensions = getPngDimensions(thumbPath);

	if (!dimensions) {
		errors.push(`Cannot read thumbnail dimensions: ${slug}.png`);
	} else if (dimensions.width !== 200 || dimensions.height !== 200) {
		errors.push(
			`Thumbnail must be 200x200 px, got: ${dimensions.width}x${dimensions.height} (${slug}.png)`
		);
	}

	return { errors, warnings };
}

/**
 * Validate content structure
 */
function validateContent(content, slug) {
	const errors = [];
	const warnings = [];

	// Check for empty content
	if (!content || content.trim() === '') {
		errors.push('Article content is empty');
		return { errors, warnings };
	}

	// Check for h2 tags without id
	const h2Regex = /<h2(?:\s+[^>]*)?>([^<]*)<\/h2>/gi;
	const h2WithIdRegex = /<h2[^>]*\sid\s*=\s*["'][^"']+["'][^>]*>/gi;
	const h2Matches = content.match(h2Regex) || [];
	const h2WithIdMatches = content.match(h2WithIdRegex) || [];

	if (h2Matches.length > 0 && h2WithIdMatches.length < h2Matches.length) {
		warnings.push(
			`Some <h2> tags are missing id attribute (${h2WithIdMatches.length}/${h2Matches.length} have id)`
		);
	}

	// Check for internal links to non-existent articles
	// First, remove code blocks to avoid false positives from examples
	const contentWithoutCode = content
		.replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, '')
		.replace(/<code[^>]*>[\s\S]*?<\/code>/gi, '');

	const internalLinkRegex = /href=["']\/([^"'#]+)(?:#[^"']*)?["']/gi;
	const existingPostsSet = getExistingPosts();
	const existingTagsSet = getExistingTags();
	let match;

	// Example slugs commonly used in documentation/tutorials
	const exampleSlugs = new Set([
		'clanek',
		'jiny-clanek',
		'produkty',
		'url-stranky',
		'like',
		'items'
	]);

	while ((match = internalLinkRegex.exec(contentWithoutCode)) !== null) {
		let linkedSlug = match[1];

		// Skip protocol-relative URLs (//example.com)
		if (linkedSlug.startsWith('/')) {
			continue;
		}

		// Skip known special paths
		if (
			linkedSlug.startsWith('files/') ||
			linkedSlug.startsWith('static/') ||
			linkedSlug.startsWith('tags/') ||
			linkedSlug === ''
		) {
			continue;
		}

		// Skip file paths (contain extension like .png, .svg, .ico)
		if (/\.[a-z]{2,4}$/i.test(linkedSlug)) {
			continue;
		}

		// Skip URLs with query parameters (examples in tutorials)
		if (linkedSlug.includes('?')) {
			continue;
		}

		// Remove trailing slash if present
		linkedSlug = linkedSlug.replace(/\/$/, '');

		// Skip known example slugs used in documentation
		if (exampleSlugs.has(linkedSlug)) {
			continue;
		}

		if (!existingPostsSet.has(linkedSlug) && !existingTagsSet.has(linkedSlug)) {
			errors.push(`Internal link to non-existent page: /${linkedSlug}`);
		}
	}

	// Check for common HTML issues
	const unclosedTags = [
		{ open: /<table(?:\s[^>]*)?>/gi, close: /<\/table>/gi, name: 'table' },
		{ open: /<ul(?:\s[^>]*)?>/gi, close: /<\/ul>/gi, name: 'ul' },
		{ open: /<ol(?:\s[^>]*)?>/gi, close: /<\/ol>/gi, name: 'ol' },
		{ open: /<pre(?:\s[^>]*)?>/gi, close: /<\/pre>/gi, name: 'pre' }
	];

	for (const { open, close, name } of unclosedTags) {
		const openCount = (content.match(open) || []).length;
		const closeCount = (content.match(close) || []).length;
		if (openCount !== closeCount) {
			warnings.push(`Potentially unclosed <${name}> tags (${openCount} open, ${closeCount} close)`);
		}
	}

	return { errors, warnings };
}

/**
 * Validate a single article file
 */
function validateArticle(filePath) {
	const absolutePath = resolve(process.cwd(), filePath);
	const slug = basename(filePath, '.md');

	const result = {
		file: filePath,
		slug,
		errors: [],
		warnings: [],
		isPublished: false
	};

	// Read and parse file
	let fileContent;
	try {
		fileContent = readFileSync(absolutePath, 'utf-8');
	} catch (err) {
		result.errors.push(`Cannot read file: ${err.message}`);
		return result;
	}

	let frontmatter, content;
	try {
		const parsed = matter(fileContent);
		frontmatter = parsed.data;
		content = parsed.content;
	} catch (err) {
		result.errors.push(`Cannot parse frontmatter: ${err.message}`);
		return result;
	}

	result.isPublished = frontmatter.status === 1;

	// Validate frontmatter
	const frontmatterResult = validateFrontmatter(frontmatter, slug);
	result.errors.push(...frontmatterResult.errors);
	result.warnings.push(...frontmatterResult.warnings);

	// Only check thumbnail and content for published articles
	if (result.isPublished) {
		// Validate thumbnail
		const thumbnailResult = validateThumbnail(slug);
		result.errors.push(...thumbnailResult.errors);
		result.warnings.push(...thumbnailResult.warnings);

		// Validate content
		const contentResult = validateContent(content, slug);
		result.errors.push(...contentResult.errors);
		result.warnings.push(...contentResult.warnings);
	}

	return result;
}

/**
 * Get all article files
 */
function getAllArticleFiles() {
	const postsDir = resolve(process.cwd(), POSTS_DIR);
	const files = readdirSync(postsDir)
		.filter((f) => f.endsWith('.md'))
		.map((f) => join(POSTS_DIR, f));
	return files;
}

/**
 * Main function
 */
function main() {
	const args = process.argv.slice(2);
	const showWarnings = !args.includes('--no-warnings');
	const onlyPublished = args.includes('--published');
	const specificFiles = args.filter((a) => a.endsWith('.md'));

	// Get files to check
	let files;
	if (specificFiles.length > 0) {
		files = specificFiles;
	} else {
		files = getAllArticleFiles();
	}

	console.log(colors.cyan(`\nVerifying ${files.length} article(s)...\n`));

	// Validate all files
	const results = files.map(validateArticle);

	// Filter results if --published flag is set
	const filteredResults = onlyPublished ? results.filter((r) => r.isPublished) : results;

	// Collect statistics
	const stats = {
		total: filteredResults.length,
		valid: 0,
		withErrors: 0,
		withWarnings: 0,
		published: results.filter((r) => r.isPublished).length,
		draft: results.filter((r) => !r.isPublished).length,
		totalErrors: 0,
		totalWarnings: 0
	};

	// Print results
	for (const result of filteredResults) {
		const hasErrors = result.errors.length > 0;
		const hasWarnings = result.warnings.length > 0;

		if (hasErrors) {
			stats.withErrors++;
			stats.totalErrors += result.errors.length;
		} else {
			stats.valid++;
		}

		if (hasWarnings) {
			stats.withWarnings++;
			stats.totalWarnings += result.warnings.length;
		}

		// Only print articles with issues
		if (hasErrors || (showWarnings && hasWarnings)) {
			const status = result.isPublished ? colors.green('[published]') : colors.dim('[draft]');

			console.log(`${colors.cyan(result.slug)} ${status}`);

			for (const error of result.errors) {
				console.log(`  ${colors.red('ERROR:')} ${error}`);
			}

			if (showWarnings) {
				for (const warning of result.warnings) {
					console.log(`  ${colors.yellow('WARN:')} ${warning}`);
				}
			}

			console.log('');
		}
	}

	// Print summary
	console.log(colors.cyan('=== Summary ==='));
	console.log(`Total articles: ${stats.total}`);
	console.log(`  Published: ${stats.published}`);
	console.log(`  Draft: ${stats.draft}`);
	console.log('');
	console.log(`${colors.green('Valid:')} ${stats.valid}`);
	console.log(
		`${colors.red('With errors:')} ${stats.withErrors} (${stats.totalErrors} total errors)`
	);

	if (showWarnings) {
		console.log(
			`${colors.yellow('With warnings:')} ${stats.withWarnings} (${stats.totalWarnings} total warnings)`
		);
	}

	// Exit with error code if there are errors
	if (stats.withErrors > 0) {
		console.log(colors.red('\nValidation failed! Please fix the errors above.'));
		process.exit(1);
	} else {
		console.log(colors.green('\nAll articles are valid!'));
		process.exit(0);
	}
}

main();

import * as pagefind from 'pagefind';
import { readdir, readFile, access } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

const POSTS_DIR = 'content/posts';
const TAGS_DIR = 'content/tags';

async function indexPosts(index) {
	// Verify posts directory exists
	try {
		await access(POSTS_DIR);
	} catch {
		console.error(`[Search Index] Directory "${POSTS_DIR}" not found`);
		process.exit(1);
	}

	// Read all markdown files
	const files = await readdir(POSTS_DIR);
	const mdFiles = files.filter((f) => f.endsWith('.md'));

	if (mdFiles.length === 0) {
		console.warn('[Search Index] No markdown files found in posts');
	}

	console.log(`[Search Index] Found ${mdFiles.length} post files`);

	let indexed = 0;

	for (const file of mdFiles) {
		const filePath = join(POSTS_DIR, file);
		const content = await readFile(filePath, 'utf-8');
		const { data: frontmatter, content: body } = matter(content);

		// Skip unpublished articles (status !== 1)
		if (frontmatter.status !== 1) {
			continue;
		}

		const slug = file.replace('.md', '');
		const title = frontmatter.title || '';
		const headline = frontmatter.headline || title;

		// Strip HTML tags from body for plain text content
		const plainContent = body
			.replace(/<[^>]*>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();

		// Combine title and content for searching
		const searchableContent = `${title} ${headline} ${plainContent}`;

		await index.addCustomRecord({
			url: `/${slug}`,
			content: searchableContent,
			language: 'cs',
			meta: {
				title: title,
				type: 'post'
			}
		});

		indexed++;
	}

	console.log(`[Search Index] Indexed ${indexed} published posts`);
	return indexed;
}

async function indexTags(index) {
	// Verify tags directory exists
	try {
		await access(TAGS_DIR);
	} catch {
		console.warn(`[Search Index] Directory "${TAGS_DIR}" not found, skipping tags`);
		return 0;
	}

	// Read all markdown files
	const files = await readdir(TAGS_DIR);
	const mdFiles = files.filter((f) => f.endsWith('.md'));

	if (mdFiles.length === 0) {
		console.warn('[Search Index] No markdown files found in tags');
		return 0;
	}

	console.log(`[Search Index] Found ${mdFiles.length} tag files`);

	let indexed = 0;

	for (const file of mdFiles) {
		const filePath = join(TAGS_DIR, file);
		const content = await readFile(filePath, 'utf-8');
		const { data: frontmatter, content: body } = matter(content);

		// Skip unpublished tags (status !== 1)
		if (frontmatter.status !== 1) {
			continue;
		}

		const slug = file.replace('.md', '');
		const title = frontmatter.title || '';

		// Strip HTML tags from body for plain text content
		const plainContent = body
			.replace(/<[^>]*>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();

		// Combine title and content for searching
		const searchableContent = `${title} ${plainContent}`;

		await index.addCustomRecord({
			url: `/${slug}`,
			content: searchableContent,
			language: 'cs',
			meta: {
				title: title,
				type: 'tag'
			}
		});

		indexed++;
	}

	console.log(`[Search Index] Indexed ${indexed} published tags`);
	return indexed;
}

async function buildSearchIndex() {
	console.log('[Search Index] Starting...');

	// Create Pagefind index
	const { index } = await pagefind.createIndex();

	if (!index) {
		console.error('[Search Index] Failed to create index');
		process.exit(1);
	}

	// Index posts and tags
	const postsCount = await indexPosts(index);
	const tagsCount = await indexTags(index);

	console.log(`[Search Index] Total indexed: ${postsCount} posts, ${tagsCount} tags`);

	// Determine output path based on environment
	// For local dev, output to static/ so Vite can serve it
	// For production build, output to Vercel's static output
	const isLocalDev = process.argv.includes('--local');
	const outputPath = isLocalDev ? 'static/pagefind' : '.vercel/output/static/pagefind';

	console.log(`[Search Index] Writing to ${outputPath}`);

	// Write the index to disk
	const { errors } = await index.writeFiles({
		outputPath
	});

	if (errors.length > 0) {
		console.error('[Search Index] Errors:', errors);
		process.exit(1);
	}

	console.log('[Search Index] Done!');
}

buildSearchIndex();

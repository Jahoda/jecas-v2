import * as pagefind from 'pagefind';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

const POSTS_DIR = 'content/posts';

async function buildSearchIndex() {
	console.log('[Search Index] Starting...');

	// Create Pagefind index
	const { index } = await pagefind.createIndex();

	if (!index) {
		console.error('[Search Index] Failed to create index');
		process.exit(1);
	}

	// Read all markdown files
	const files = await readdir(POSTS_DIR);
	const mdFiles = files.filter((f) => f.endsWith('.md'));

	console.log(`[Search Index] Found ${mdFiles.length} markdown files`);

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
		const plainContent = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

		// Combine title and content for searching
		const searchableContent = `${title} ${headline} ${plainContent}`;

		await index.addCustomRecord({
			url: `/${slug}`,
			content: searchableContent,
			language: 'cs',
			meta: {
				title: title
			}
		});

		indexed++;
	}

	console.log(`[Search Index] Indexed ${indexed} published articles`);

	// Write the index to disk
	const { errors } = await index.writeFiles({
		outputPath: '.vercel/output/static/pagefind'
	});

	if (errors.length > 0) {
		console.error('[Search Index] Errors:', errors);
		process.exit(1);
	}

	console.log('[Search Index] Done!');
}

buildSearchIndex();

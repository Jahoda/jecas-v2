#!/usr/bin/env node

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// You'll need to set your database connection details here
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/database';

const POSTS_DIRECTORY = path.join(__dirname, '..', 'content', 'posts');
const TAGS_DIRECTORY = path.join(__dirname, '..', 'content', 'tags');



async function exportTags(connection) {
	console.log('Fetching tags from database...');
	
	// Ensure tags directory exists
	if (!fs.existsSync(TAGS_DIRECTORY)) {
		fs.mkdirSync(TAGS_DIRECTORY, { recursive: true });
	}

	// Get all unique tags
	const [tags] = await connection.execute(`
		SELECT DISTINCT
			name,
			url_slug,
			headline,
			text_html,
			background,
			color,
			status
		FROM tags 
		WHERE status = 1
		ORDER BY name
	`);

	console.log(`Found ${tags.length} tags to export`);

	// Export each tag
	for (const tag of tags) {
		// Clean up line endings in HTML content
		const htmlContent = (tag.text_html || '').replace(/\r\n/g, '\n').trim();

		const frontmatter = `---
title: "${tag.name}"
headline: ${tag.headline || 'null'}
background: "${tag.background}"
color: "${tag.color}"
status: ${tag.status}
---

# ${tag.name}

${htmlContent}`;

		// Sanitize filename
		const filename = `${tag.url_slug.replace(/[^a-zA-Z0-9\-_]/g, '-')}.md`;
		const filepath = path.join(TAGS_DIRECTORY, filename);

		try {
			fs.writeFileSync(filepath, frontmatter, 'utf8');
			console.log(`✓ Exported tag: ${filename}`);
		} catch (writeError) {
			console.error(`✗ Failed to write tag ${filename}:`, writeError.message);
		}
	}

	console.log(`🏷️  Successfully exported ${tags.length} tags!`);
}

async function exportPostsAndTags() {
	console.log('Connecting to database...');
	const connection = await mysql.createConnection(DATABASE_URL);

	try {
		// Ensure posts directory exists
		if (!fs.existsSync(POSTS_DIRECTORY)) {
			fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
		}

		// Export tags first
		await exportTags(connection);

		// Get all posts
		console.log('Fetching posts from database...');
		const [posts] = await connection.execute(`
			SELECT 
				id,
				title,
				url_slug,
				headline,
				text_html,
				description,
				date,
				last_modification,
				status
			FROM pages 
			WHERE url_slug != 'home'
			ORDER BY last_modification DESC
		`);

		console.log(`Found ${posts.length} posts to export`);

		// Get tags for each post
		const [allPagesTags] = await connection.execute(`
			SELECT 
				pt.page_id,
				t.name as tag_name,
				t.url_slug as tag_slug,
				t.headline as tag_headline,
				t.text_html as tag_text_html,
				t.background as tag_background,
				t.color as tag_color,
				t.status as tag_status
			FROM pages_tags pt
			JOIN tags t ON pt.tag_id = t.id
		`);

		// Group tags by page_id
		const tagsByPageId = {};
		allPagesTags.forEach((pt) => {
			if (!tagsByPageId[pt.page_id]) {
				tagsByPageId[pt.page_id] = [];
			}
			tagsByPageId[pt.page_id].push(pt.tag_slug);
		});

		// Export each post
		for (const post of posts) {
			const tags = tagsByPageId[post.id] || [];
			
			// Clean the HTML content minimally (remove scripts, but keep HTML structure)
			const htmlContent = (post.text_html);

			// Clean up metadata fields by removing HTML tags and decoding entities
			const cleanTitle = ((post.title || ''));
			const cleanHeadline = ((post.headline || ''));
			const cleanDescription = ((post.description || ''));

			const frontmatter = `---
title: "${cleanTitle}"
headline: "${cleanHeadline}"
description: "${cleanDescription}"
date: "${post.date.toISOString().split('T')[0]}"
last_modification: "${post.last_modification.toISOString().split('T')[0]}"
status: ${post.status}
tags: [${tags.map((tag) => `"${tag.replace(/"/g, '\\"')}"`).join(', ')}]
format: "html"
---

${htmlContent}`;

			// Sanitize filename
			const filename = `${post.url_slug.replace(/[^a-zA-Z0-9\-_]/g, '-')}.md`;
			const filepath = path.join(POSTS_DIRECTORY, filename);

			try {
				fs.writeFileSync(filepath, frontmatter, 'utf8');
				console.log(`✓ Exported: ${filename}`);
			} catch (writeError) {
				console.error(`✗ Failed to write ${filename}:`, writeError.message);
			}
		}

		console.log(`\n🎉 Successfully exported ${posts.length} posts with original HTML format and tags!`);
	} catch (error) {
		console.error('Error exporting posts:', error);
	} finally {
		await connection.end();
	}
}

// Run the export
exportPostsAndTags().catch(console.error);
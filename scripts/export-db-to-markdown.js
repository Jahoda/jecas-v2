#!/usr/bin/env node

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// You'll need to set your database connection details here
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/database';

const POSTS_DIRECTORY = path.join(__dirname, '..', 'posts');

function stripHtmlTags(html) {
	return html.replace(/<[^>]*>/g, '');
}

function htmlToMarkdown(html) {
	// Basic HTML to Markdown conversion
	// This is a simple implementation - you might want to use a proper library like turndown
	let markdown = html;

	// Headers
	markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
	markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
	markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
	markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
	markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
	markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

	// Bold and italic
	markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
	markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
	markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
	markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

	// Links
	markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

	// Code blocks
	markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n');
	markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

	// Paragraphs
	markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

	// Line breaks
	markdown = markdown.replace(/<br[^>]*>/gi, '\n');

	// Lists
	markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, '$1\n');
	markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, '$1\n');
	markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');

	// Remove remaining HTML tags
	markdown = markdown.replace(/<[^>]*>/g, '');

	// Clean up extra whitespace
	markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
	markdown = markdown.trim();

	return markdown;
}

async function exportPosts() {
	console.log('Connecting to database...');
	const connection = await mysql.createConnection(DATABASE_URL);

	try {
		// Ensure posts directory exists
		if (!fs.existsSync(POSTS_DIRECTORY)) {
			fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
		}

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
				t.name as tag_name
			FROM pages_tags pt
			JOIN tags t ON pt.tag_id = t.id
		`);

		// Group tags by page_id
		const tagsByPageId = {};
		allPagesTags.forEach((pt) => {
			if (!tagsByPageId[pt.page_id]) {
				tagsByPageId[pt.page_id] = [];
			}
			tagsByPageId[pt.page_id].push(pt.tag_name);
		});

		// Export each post
		for (const post of posts) {
			const tags = tagsByPageId[post.id] || [];
			const markdown = htmlToMarkdown(post.text_html);

			const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
headline: "${post.headline.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
date: "${post.date.toISOString().split('T')[0]}"
last_modification: "${post.last_modification.toISOString().split('T')[0]}"
status: ${post.status}
tags: [${tags.map((tag) => `"${tag}"`).join(', ')}]
---

${markdown}`;

			const filename = `${post.url_slug}.md`;
			const filepath = path.join(POSTS_DIRECTORY, filename);

			fs.writeFileSync(filepath, frontmatter);
			console.log(`Exported: ${filename}`);
		}

		console.log(`Successfully exported ${posts.length} posts to markdown files!`);
	} catch (error) {
		console.error('Error exporting posts:', error);
	} finally {
		await connection.end();
	}
}

// Run the export
exportPosts().catch(console.error);

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

function decodeHtmlEntities(text) {
	const entities = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#039;': "'",
		'&#39;': "'",
		'&apos;': "'",
		'&nbsp;': ' ',
		'&mdash;': '—',
		'&ndash;': '–',
		'&hellip;': '…',
		'&laquo;': '«',
		'&raquo;': '»',
		'&copy;': '©',
		'&reg;': '®',
		'&trade;': '™'
	};
	
	return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

function removeScriptTags(html) {
	// Remove JavaScript code blocks that shouldn't be in markdown
	return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
		.replace(/document\.write\([^)]*\);?/gi, '')
		.replace(/function [^{]*\{[^}]*\}/gi, '')
		.replace(/var [^;]*;/gi, '');
}

function convertTablesToMarkdown(html) {
	// Convert HTML tables to markdown tables
	return html.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, tableContent) => {
		let markdownTable = '\n';
		let rows = [];
		let isHeader = true;
		
		// Extract table rows
		const rowMatches = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
		if (!rowMatches) return match;
		
		rowMatches.forEach(rowMatch => {
			const cellMatches = rowMatch.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi);
			if (!cellMatches) return;
			
			const cells = cellMatches.map(cell => {
				let content = cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi, '$1');
				
				// Convert inline code within cells
				content = content.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
				
				// Remove other HTML tags and clean up
				content = content.replace(/<[^>]*>/g, '')
					.replace(/\s+/g, ' ')
					.trim();
				
				// Escape pipe characters in cell content
				content = content.replace(/\|/g, '\\|');
				
				return content;
			});
			
			rows.push(cells);
			
			// Add header separator after first row (only if we have actual content)
			if (isHeader && cells.length > 0 && cells.some(cell => cell.trim())) {
				const separator = cells.map(() => '---');
				rows.push(separator);
				isHeader = false;
			}
		});
		
		// Convert rows to markdown table format, but skip empty rows
		rows.forEach(cells => {
			if (cells.some(cell => cell.trim())) {
				markdownTable += '| ' + cells.join(' | ') + ' |\n';
			}
		});
		
		return markdownTable + '\n';
	});
}

function cleanUpInteractiveElements(html) {
	// Remove or convert interactive elements that don't make sense in markdown
	return html
		// Remove style blocks
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
		// Remove specific interactive elements from the posts
		.replace(/\.tldr \.live[^}]*}/gi, '')
		.replace(/\.demo[^}]*}/gi, '')
		.replace(/textarea \{[^}]*}/gi, '')
		.replace(/function [^{]*\{[\s\S]*?\}[\s\S]*?(?=<|$)/gi, '')
		// Clean up CSS-like content that got into the HTML
		.replace(/\w+\s*{\s*[^}]*}/g, '')
		// Remove empty paragraphs with just CSS classes or styles
		.replace(/<p[^>]*style=[^>]*><\/p>/gi, '')
		.replace(/<p[^>]*class=[^>]*><\/p>/gi, '');
}

function htmlToMarkdown(html) {
	if (!html) return '';
	
	let markdown = html;
	
	// Decode HTML entities first, so they can be processed as actual HTML tags
	markdown = decodeHtmlEntities(markdown);
	
	// Remove script tags and JavaScript code
	markdown = removeScriptTags(markdown);
	
	// Clean up interactive elements
	markdown = cleanUpInteractiveElements(markdown);
	
	// Convert tables to markdown
	markdown = convertTablesToMarkdown(markdown);
	
	// Headers (with better handling of attributes)
	markdown = markdown.replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (match, level, content) => {
		const cleanContent = content.replace(/<[^>]*>/g, '').trim();
		return '#'.repeat(parseInt(level)) + ' ' + cleanContent + '\n\n';
	});
	
	// Blockquotes
	markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
		const cleanContent = content.replace(/<[^>]*>/g, '').trim();
		return '> ' + cleanContent.replace(/\n/g, '\n> ') + '\n\n';
	});
	
	// Images
	markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');
	markdown = markdown.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi, '![$1]($2)');
	markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '![]($1)');
	
	// Code blocks first (handle multi-line code before inline)
	markdown = markdown.replace(/<pre[^>]*><code[^>]*class=["']language-([^"']*)["'][^>]*>(.*?)<\/code><\/pre>/gis, '```$1\n$2\n```\n\n');
	markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n');
	markdown = markdown.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '```\n$1\n```\n\n');
	
	// Inline code (handle before other formatting to preserve code content)
	markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
	
	// Bold and italic (improved to handle nested tags)
	markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
	markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
	markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
	markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
	
	// Strike-through
	markdown = markdown.replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~');
	markdown = markdown.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
	markdown = markdown.replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~');
	
	// Links (improved to handle various link formats)
	markdown = markdown.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
	
	// Lists (improved to handle ordered and unordered lists)
	markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
		let counter = 1;
		const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gi, (liMatch, liContent) => {
			return `${counter++}. ${liContent.trim()}\n`;
		});
		return listContent + '\n';
	});
	
	markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
		const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
		return listContent + '\n';
	});
	
	// Handle remaining list items (in case they're not within ul/ol)
	markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
	
	// Horizontal rules
	markdown = markdown.replace(/<hr[^>]*>/gi, '\n---\n\n');
	
	// Paragraphs (improved to maintain content structure)
	markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
	
	// Divs (convert to paragraph-like blocks)
	markdown = markdown.replace(/<div[^>]*>(.*?)<\/div>/gi, '$1\n\n');
	
	// Line breaks
	markdown = markdown.replace(/<br[^>]*\/?>/gi, '\n');
	
	// Remove remaining HTML tags
	markdown = markdown.replace(/<[^>]*>/g, '');
	
	// Clean up whitespace and formatting
	markdown = markdown.replace(/\n\s*\n\s*\n+/g, '\n\n'); // Multiple newlines to double newlines
	markdown = markdown.replace(/^\s+/gm, ''); // Remove leading spaces from lines
	markdown = markdown.replace(/\s+$/gm, ''); // Remove trailing spaces from lines
	markdown = markdown.replace(/\t/g, '  '); // Convert tabs to spaces
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

			// Clean up metadata fields by removing HTML tags and decoding entities
			const cleanTitle = decodeHtmlEntities(stripHtmlTags(post.title || '').replace(/"/g, '\\"'));
			const cleanHeadline = decodeHtmlEntities(stripHtmlTags(post.headline || '').replace(/"/g, '\\"'));
			const cleanDescription = decodeHtmlEntities(stripHtmlTags(post.description || '').replace(/"/g, '\\"'));

			const frontmatter = `---
title: "${cleanTitle}"
headline: "${cleanHeadline}"
description: "${cleanDescription}"
date: "${post.date.toISOString().split('T')[0]}"
last_modification: "${post.last_modification.toISOString().split('T')[0]}"
status: ${post.status}
tags: [${tags.map((tag) => `"${tag.replace(/"/g, '\\"')}"`).join(', ')}]
---

${markdown}`;

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

		console.log(`\n🎉 Successfully exported ${posts.length} posts to markdown files!`);
	} catch (error) {
		console.error('Error exporting posts:', error);
	} finally {
		await connection.end();
	}
}

// Run the export
exportPosts().catch(console.error);

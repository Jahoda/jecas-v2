#!/usr/bin/env node

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL || 'mysql://zmrdicz_jecas:YZId0LDfY7Ou@db.db037.webglobe.com:3306/zmrdicz_jecas';

const TAGS_FILE = path.join(__dirname, '..', 'data', 'tags.json');
const TAGS_DIRECTORY = path.join(__dirname, '..', 'data', 'tags');

async function exportTags() {
	console.log('Connecting to database...');
	const connection = await mysql.createConnection(DATABASE_URL);
	
	try {
		// Ensure directories exist
		fs.mkdirSync(path.dirname(TAGS_FILE), { recursive: true });
		fs.mkdirSync(TAGS_DIRECTORY, { recursive: true });
		
		// Get all tags with their usage count
		console.log('Fetching tags from database...');
		const [tags] = await connection.execute(`
			SELECT 
				t.id,
				t.name,
				t.url_slug,
				t.headline,
				t.text_html,
				t.background,
				t.color,
				t.status,
				COUNT(pt.page_id) as usage_count
			FROM tags t
			LEFT JOIN pages_tags pt ON t.id = pt.tag_id
			LEFT JOIN pages p ON pt.page_id = p.id AND p.status = 1
			GROUP BY t.id
			ORDER BY usage_count DESC, t.name ASC
		`);
		
		console.log(`Found ${tags.length} tags to export`);
		
		// Get all page-tag relationships
		const [pagesTags] = await connection.execute(`
			SELECT 
				pt.page_id,
				pt.tag_id,
				p.url_slug as page_slug,
				t.url_slug as tag_slug
			FROM pages_tags pt
			JOIN pages p ON pt.page_id = p.id
			JOIN tags t ON pt.tag_id = t.id
		`);
		
		// Create tags data structure
		const tagsData = {
			tags: tags.map(tag => ({
				id: tag.id,
				name: tag.name,
				url_slug: tag.url_slug,
				headline: tag.headline || null,
				text_html: tag.text_html || null,
				background: tag.background || null,
				color: tag.color || null,
				status: tag.status || 1,
				usage_count: tag.usage_count || 0
			})),
			relationships: pagesTags.map(rel => ({
				page_slug: rel.page_slug,
				tag_id: rel.tag_id,
				tag_slug: rel.tag_slug
			}))
		};
		
		// Save master tags file
		fs.writeFileSync(TAGS_FILE, JSON.stringify(tagsData, null, 2));
		console.log(`Saved tags data to: ${TAGS_FILE}`);
		
		// Create individual tag files for easier management
		for (const tag of tagsData.tags) {
			const tagFile = path.join(TAGS_DIRECTORY, `${tag.url_slug}.json`);
			const tagContent = {
				...tag,
				posts: pagesTags
					.filter(rel => rel.tag_id === tag.id)
					.map(rel => rel.page_slug)
			};
			
			fs.writeFileSync(tagFile, JSON.stringify(tagContent, null, 2));
			console.log(`Exported tag: ${tag.name} (${tagContent.posts.length} posts)`);
		}
		
		console.log(`\n✅ Successfully exported ${tags.length} tags!`);
		console.log(`📁 Master file: ${TAGS_FILE}`);
		console.log(`📁 Individual files: ${TAGS_DIRECTORY}/`);
		
	} catch (error) {
		console.error('Error exporting tags:', error);
	} finally {
		await connection.end();
	}
}

// Run the export
exportTags().catch(console.error);
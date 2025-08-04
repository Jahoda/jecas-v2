#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIRECTORY = path.join(__dirname, '..', 'posts');
const TAGS_FILE = path.join(__dirname, '..', 'data', 'tags.json');

// Color palette for tags
const TAG_COLORS = [
	'#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
	'#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
	'#1572B6', '#F7DF1E', '#E34F26', '#663399', '#0066CC'
];

function getPostFiles() {
	if (!fs.existsSync(POSTS_DIRECTORY)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIRECTORY).filter(file => file.endsWith('.md'));
}

function parseMarkdownFile(fileName) {
	const filePath = path.join(POSTS_DIRECTORY, fileName);
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data } = matter(fileContent);
	
	const url_slug = fileName.replace(/\.md$/, '');
	let tagNames = [];
	
	if (data.tags) {
		if (Array.isArray(data.tags)) {
			tagNames = data.tags;
		} else if (typeof data.tags === 'string') {
			tagNames = data.tags.split(',').map(t => t.trim()).filter(t => t);
		}
	}
	
	return {
		url_slug,
		tags: tagNames,
		status: data.status !== undefined ? data.status : 1
	};
}

async function migrateToPowerfulTags() {
	console.log('🚀 Starting migration to powerful tags...');
	
	// Ensure data directory exists
	fs.mkdirSync(path.dirname(TAGS_FILE), { recursive: true });
	
	// Initialize tags data structure
	let tagsData = {
		tags: [],
		relationships: []
	};
	
	// Load existing tags.json if it exists
	if (fs.existsSync(TAGS_FILE)) {
		try {
			tagsData = JSON.parse(fs.readFileSync(TAGS_FILE, 'utf8'));
			console.log(`📁 Loaded existing tags data with ${tagsData.tags.length} tags`);
		} catch (error) {
			console.log('⚠️  Could not load existing tags.json, starting fresh');
		}
	}
	
	// Get all posts and collect tag usage
	const postFiles = getPostFiles();
	console.log(`📚 Found ${postFiles.length} posts to process`);
	
	const tagUsage = new Map(); // tagName -> { count, posts: [] }
	const postTagRelations = new Map(); // postSlug -> [tagNames]
	
	// First pass: collect all tag usage
	for (const fileName of postFiles) {
		const post = parseMarkdownFile(fileName);
		
		// Only process published posts for tag relationships
		if (post.status === 1) {
			postTagRelations.set(post.url_slug, post.tags);
			
			for (const tagName of post.tags) {
				if (!tagUsage.has(tagName)) {
					tagUsage.set(tagName, { count: 0, posts: [] });
				}
				const usage = tagUsage.get(tagName);
				usage.count++;
				usage.posts.push(post.url_slug);
			}
		}
	}
	
	console.log(`🏷️  Found ${tagUsage.size} unique tags`);
	
	// Create or update tags
	let nextId = Math.max(0, ...tagsData.tags.map(t => parseInt(t.id) || 0)) + 1;
	const tagNameToId = new Map();
	
	// Preserve existing tags and add their IDs to the map
	for (const tag of tagsData.tags) {
		tagNameToId.set(tag.name, tag.id);
	}
	
	// Process each tag
	Array.from(tagUsage.entries()).forEach(([tagName, usage], index) => {
		let existingTag = tagsData.tags.find(t => t.name === tagName);
		
		if (!existingTag) {
			// Create new tag
			const slug = tagName.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9-]/g, '')
				.replace(/--+/g, '-')
				.replace(/^-|-$/g, '');
			
			const newTag = {
				id: nextId.toString(),
				name: tagName,
				url_slug: slug,
				headline: `Articles tagged with ${tagName}`,
				text_html: `<p>All articles related to ${tagName}.</p>`,
				background: TAG_COLORS[index % TAG_COLORS.length],
				color: '#ffffff',
				status: 1,
				usage_count: usage.count
			};
			
			tagsData.tags.push(newTag);
			tagNameToId.set(tagName, nextId.toString());
			nextId++;
			
			console.log(`✨ Created tag: ${tagName} (${usage.count} posts)`);
		} else {
			// Update existing tag usage count
			existingTag.usage_count = usage.count;
			console.log(`📊 Updated tag: ${tagName} (${usage.count} posts)`);
		}
	});
	
	// Clear existing relationships and rebuild them
	tagsData.relationships = [];
	
	// Create tag relationships
	for (const [postSlug, tagNames] of postTagRelations.entries()) {
		for (const tagName of tagNames) {
			const tagId = tagNameToId.get(tagName);
			if (tagId) {
				const tag = tagsData.tags.find(t => t.id === tagId);
				tagsData.relationships.push({
					page_slug: postSlug,
					tag_id: tagId,
					tag_slug: tag.url_slug
				});
			}
		}
	}
	
	// Sort tags by usage count
	tagsData.tags.sort((a, b) => {
		const aCount = a.usage_count || 0;
		const bCount = b.usage_count || 0;
		if (aCount !== bCount) return bCount - aCount;
		return a.name.localeCompare(b.name);
	});
	
	// Save the updated tags data
	fs.writeFileSync(TAGS_FILE, JSON.stringify(tagsData, null, 2));
	
	console.log(`\n✅ Migration completed successfully!`);
	console.log(`📊 Statistics:`);
	console.log(`   • ${tagsData.tags.length} total tags`);
	console.log(`   • ${tagsData.relationships.length} tag-post relationships`);
	console.log(`   • ${postTagRelations.size} posts with tags`);
	console.log(`\n📁 Tags data saved to: ${TAGS_FILE}`);
	
	// Show top 10 most used tags
	console.log(`\n🔥 Top 10 most used tags:`);
	tagsData.tags.slice(0, 10).forEach((tag, index) => {
		console.log(`   ${index + 1}. ${tag.name} (${tag.usage_count} posts)`);
	});
}

// Run the migration
migrateToPowerfulTags().catch(console.error);
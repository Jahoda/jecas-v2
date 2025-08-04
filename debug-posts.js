import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

function getPostFiles() {
	if (!fs.existsSync(POSTS_DIRECTORY)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'));
}

async function parseMarkdownFile(fileName) {
	const filePath = path.join(POSTS_DIRECTORY, fileName);
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);
	
	const frontmatter = data;
	const url_slug = fileName.replace(/\.md$/, '');
	
	return {
		id: url_slug,
		title: frontmatter.title,
		url_slug,
		headline: frontmatter.headline,
		description: frontmatter.description,
		date: new Date(frontmatter.date),
		last_modification: frontmatter.last_modification
			? new Date(frontmatter.last_modification)
			: new Date(frontmatter.date),
		status: frontmatter.status || 1,
		tags: frontmatter.tags || []
	};
}

async function getAllPosts(limit = null, status = 1) {
	const postFiles = getPostFiles();
	
	const posts = await Promise.all(postFiles.map((fileName) => parseMarkdownFile(fileName)));
	
	const filteredPosts = posts
		.filter((post) => post.status === status && post.url_slug !== 'home')
		.sort((a, b) => b.last_modification.getTime() - a.last_modification.getTime());
	
	return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

// Test the filtering
console.log('Testing draft filtering...');

const allPosts = await getAllPosts(20, 1); // Published posts
const drafts = await getAllPosts(20, 0); // Draft posts

console.log(`Found ${allPosts.length} published posts`);
console.log(`Found ${drafts.length} draft posts`);

const gitPost = allPosts.find(p => p.url_slug === 'git-prakticky');
if (gitPost) {
	console.log('❌ ERROR: git-prakticky found in published posts!');
	console.log('Status:', gitPost.status);
} else {
	console.log('✅ git-prakticky correctly filtered from published posts');
}

const gitDraft = drafts.find(p => p.url_slug === 'git-prakticky');
if (gitDraft) {
	console.log('✅ git-prakticky found in draft posts');
	console.log('Status:', gitDraft.status);
} else {
	console.log('❌ git-prakticky not found in draft posts');
}

// Show first few published posts
console.log('\nFirst 5 published posts:');
allPosts.slice(0, 5).forEach(post => {
	console.log(`- ${post.url_slug} (status: ${post.status})`);
});
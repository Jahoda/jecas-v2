#!/usr/bin/env node

/**
 * Script to post article to Facebook Page using Graph API
 * Usage: node scripts/post-to-facebook.js --article='{"title":"...", "url":"...", "description":"..."}'
 *
 * Required environment variables:
 * - FACEBOOK_PAGE_ID (Your Facebook Page ID)
 * - FACEBOOK_ACCESS_TOKEN (Page Access Token with pages_manage_posts permission)
 */

const GRAPH_API_VERSION = 'v19.0';
const GRAPH_API_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * Create post message from article
 * @param {object} article
 * @returns {string}
 */
function createPostMessage(article) {
	const parts = [];

	// Add title
	parts.push(article.title);

	// Add description if available
	if (article.description) {
		parts.push('');
		// Limit description to 200 chars
		let desc = article.description;
		if (desc.length > 200) {
			desc = desc.substring(0, 197) + '...';
		}
		parts.push(desc);
	}

	// Add hashtags from tags
	if (article.tags && article.tags.length > 0) {
		const hashtags = article.tags
			.slice(0, 5)
			.map((tag) => {
				const cleaned = tag.replace(/[^a-zA-Z0-9áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g, '');
				return `#${cleaned}`;
			})
			.join(' ');
		parts.push('');
		parts.push(hashtags);
	}

	return parts.join('\n');
}

/**
 * Post to Facebook Page
 * @param {string} message
 * @param {string} link
 * @returns {Promise<object>}
 */
async function postToFacebook(message, link) {
	const pageId = process.env.FACEBOOK_PAGE_ID;
	const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

	if (!pageId || !accessToken) {
		throw new Error(
			'Missing Facebook credentials. Please set FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN environment variables.'
		);
	}

	const url = `${GRAPH_API_URL}/${pageId}/feed`;

	const params = new URLSearchParams({
		message,
		link,
		access_token: accessToken
	});

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params.toString()
	});

	const data = await response.json();

	if (!response.ok || data.error) {
		throw new Error(`Facebook API error: ${JSON.stringify(data.error || data)}`);
	}

	return data;
}

/**
 * Parse command line arguments
 * @returns {object | null}
 */
function parseArgs() {
	const args = process.argv.slice(2);

	for (const arg of args) {
		if (arg.startsWith('--article=')) {
			const jsonStr = arg.replace('--article=', '');
			try {
				return JSON.parse(jsonStr);
			} catch (error) {
				console.error('Invalid JSON in --article argument');
				return null;
			}
		}
	}

	return null;
}

async function main() {
	let article = parseArgs();

	// If no article from args, try reading from ARTICLE_JSON env var
	if (!article && process.env.ARTICLE_JSON) {
		try {
			article = JSON.parse(process.env.ARTICLE_JSON);
		} catch (error) {
			console.error('Invalid JSON in ARTICLE_JSON environment variable');
			process.exit(1);
		}
	}

	if (!article) {
		console.error(
			'Usage: node scripts/post-to-facebook.js --article=\'{"title":"...", "url":"..."}\''
		);
		console.error('Or set ARTICLE_JSON environment variable');
		process.exit(1);
	}

	if (!article.title || !article.url) {
		console.error('Article must have "title" and "url" properties');
		process.exit(1);
	}

	const message = createPostMessage(article);
	console.log('Posting to Facebook:');
	console.log('---');
	console.log(message);
	console.log(`Link: ${article.url}`);
	console.log('---');

	try {
		const result = await postToFacebook(message, article.url);
		console.log('\nSuccessfully posted to Facebook!');
		console.log(`Post ID: ${result.id}`);

		// Extract page ID and post ID from the combined ID
		const [pageId, postId] = result.id.split('_');
		console.log(`View at: https://www.facebook.com/${pageId}/posts/${postId}`);
	} catch (error) {
		console.error('\nFailed to post to Facebook:', error.message);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error('Error:', error);
	process.exit(1);
});

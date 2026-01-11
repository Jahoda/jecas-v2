#!/usr/bin/env node

/**
 * Script to post article to LinkedIn using API v2
 * Usage: node scripts/post-to-linkedin.js --article='{"title":"...", "url":"...", "description":"..."}'
 *
 * Required environment variables:
 * - LINKEDIN_ACCESS_TOKEN (OAuth 2.0 Access Token with w_member_social scope)
 * - LINKEDIN_PERSON_ID (Your LinkedIn person URN, e.g., "urn:li:person:ABC123")
 *
 * For company pages, use:
 * - LINKEDIN_ORGANIZATION_ID (Your LinkedIn organization URN, e.g., "urn:li:organization:123456")
 */

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2/ugcPosts';

/**
 * Create post text from article
 * @param {object} article
 * @returns {string}
 */
function createPostText(article) {
	const parts = [];

	// Add title
	parts.push(article.title);

	// Add description if available
	if (article.description) {
		parts.push('');
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
 * Post to LinkedIn
 * @param {string} text
 * @param {string} articleUrl
 * @param {string} title
 * @returns {Promise<object>}
 */
async function postToLinkedIn(text, articleUrl, title) {
	const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
	const personId = process.env.LINKEDIN_PERSON_ID;
	const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

	if (!accessToken) {
		throw new Error('Missing LINKEDIN_ACCESS_TOKEN environment variable.');
	}

	if (!personId && !organizationId) {
		throw new Error(
			'Missing LINKEDIN_PERSON_ID or LINKEDIN_ORGANIZATION_ID environment variable.'
		);
	}

	// Use organization if provided, otherwise use person
	const author = organizationId || personId;

	const postBody = {
		author: author,
		lifecycleState: 'PUBLISHED',
		specificContent: {
			'com.linkedin.ugc.ShareContent': {
				shareCommentary: {
					text: text
				},
				shareMediaCategory: 'ARTICLE',
				media: [
					{
						status: 'READY',
						originalUrl: articleUrl,
						title: {
							text: title
						}
					}
				]
			}
		},
		visibility: {
			'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
		}
	};

	const response = await fetch(LINKEDIN_API_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
			'X-Restli-Protocol-Version': '2.0.0'
		},
		body: JSON.stringify(postBody)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`LinkedIn API error (${response.status}): ${errorText}`);
	}

	const data = await response.json();
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
			'Usage: node scripts/post-to-linkedin.js --article=\'{"title":"...", "url":"..."}\''
		);
		console.error('Or set ARTICLE_JSON environment variable');
		process.exit(1);
	}

	if (!article.title || !article.url) {
		console.error('Article must have "title" and "url" properties');
		process.exit(1);
	}

	const postText = createPostText(article);
	console.log('Posting to LinkedIn:');
	console.log('---');
	console.log(postText);
	console.log(`Link: ${article.url}`);
	console.log('---');

	try {
		const result = await postToLinkedIn(postText, article.url, article.title);
		console.log('\nSuccessfully posted to LinkedIn!');
		console.log(`Post ID: ${result.id}`);
	} catch (error) {
		console.error('\nFailed to post to LinkedIn:', error.message);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error('Error:', error);
	process.exit(1);
});

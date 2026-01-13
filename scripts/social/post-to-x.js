#!/usr/bin/env node

/**
 * Script to post article to X (Twitter) using API v2
 * Usage: node scripts/post-to-x.js --article='{"title":"...", "url":"...", "tags":["..."]}'
 *
 * Required environment variables:
 * - X_API_KEY (API Key)
 * - X_API_SECRET (API Key Secret)
 * - X_ACCESS_TOKEN (Access Token)
 * - X_ACCESS_TOKEN_SECRET (Access Token Secret)
 */

import crypto from 'crypto';

const X_API_URL = 'https://api.twitter.com/2/tweets';

/**
 * Generate OAuth 1.0a signature
 */
function generateOAuthSignature(method, url, params, consumerSecret, tokenSecret) {
	const sortedParams = Object.keys(params)
		.sort()
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join('&');

	const signatureBaseString = [
		method.toUpperCase(),
		encodeURIComponent(url),
		encodeURIComponent(sortedParams)
	].join('&');

	const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

	return crypto.createHmac('sha1', signingKey).update(signatureBaseString).digest('base64');
}

/**
 * Generate OAuth 1.0a Authorization header
 */
function generateOAuthHeader(method, url, apiKey, apiSecret, accessToken, accessTokenSecret) {
	const timestamp = Math.floor(Date.now() / 1000).toString();
	const nonce = crypto.randomBytes(16).toString('hex');

	const oauthParams = {
		oauth_consumer_key: apiKey,
		oauth_nonce: nonce,
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: timestamp,
		oauth_token: accessToken,
		oauth_version: '1.0'
	};

	const signature = generateOAuthSignature(method, url, oauthParams, apiSecret, accessTokenSecret);

	oauthParams.oauth_signature = signature;

	const headerParts = Object.keys(oauthParams)
		.sort()
		.map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
		.join(', ');

	return `OAuth ${headerParts}`;
}

/**
 * Format hashtags from tags array
 * @param {string[]} tags
 * @returns {string}
 */
function formatHashtags(tags) {
	if (!tags || tags.length === 0) return '';

	// Take first 3 tags, convert to hashtags
	return tags
		.slice(0, 3)
		.map((tag) => {
			// Remove spaces and special characters, capitalize
			const cleaned = tag
				.replace(/[^a-zA-Z0-9áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g, '')
				.replace(/\s+/g, '');
			return `#${cleaned}`;
		})
		.join(' ');
}

/**
 * Create tweet text from article
 * @param {object} article
 * @returns {string}
 */
function createTweetText(article) {
	// Use custom social text if provided
	if (article.socialText) {
		// Append URL if not already included
		if (!article.socialText.includes(article.url)) {
			return `${article.socialText}\n\n${article.url}`;
		}
		return article.socialText;
	}

	const hashtags = formatHashtags(article.tags);

	// Twitter limit is 280 characters
	// URL takes ~23 characters after t.co shortening
	const urlLength = 23;
	const maxTitleLength = 280 - urlLength - hashtags.length - 10; // 10 for spacing and newlines

	let title = article.title;
	if (title.length > maxTitleLength) {
		title = title.substring(0, maxTitleLength - 3) + '...';
	}

	const parts = [title, '', article.url];
	if (hashtags) {
		parts.push('', hashtags);
	}

	return parts.join('\n');
}

/**
 * Post tweet to X
 * @param {string} text
 * @returns {Promise<object>}
 */
async function postTweet(text) {
	const apiKey = process.env.X_API_KEY;
	const apiSecret = process.env.X_API_SECRET;
	const accessToken = process.env.X_ACCESS_TOKEN;
	const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

	if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
		throw new Error(
			'Missing X API credentials. Please set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, and X_ACCESS_TOKEN_SECRET environment variables.'
		);
	}

	const authHeader = generateOAuthHeader(
		'POST',
		X_API_URL,
		apiKey,
		apiSecret,
		accessToken,
		accessTokenSecret
	);

	const response = await fetch(X_API_URL, {
		method: 'POST',
		headers: {
			Authorization: authHeader,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text })
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(`X API error: ${JSON.stringify(data)}`);
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

	// Try reading from stdin
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
		console.error('Usage: node scripts/post-to-x.js --article=\'{"title":"...", "url":"..."}\'');
		console.error('Or set ARTICLE_JSON environment variable');
		process.exit(1);
	}

	if (!article.title || !article.url) {
		console.error('Article must have "title" and "url" properties');
		process.exit(1);
	}

	const tweetText = createTweetText(article);
	console.log('Posting to X:');
	console.log('---');
	console.log(tweetText);
	console.log('---');

	try {
		const result = await postTweet(tweetText);
		console.log('\nSuccessfully posted to X!');
		console.log(`Tweet ID: ${result.data.id}`);
		console.log(`View at: https://x.com/i/web/status/${result.data.id}`);
	} catch (error) {
		console.error('\nFailed to post to X:', error.message);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error('Error:', error);
	process.exit(1);
});

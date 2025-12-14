import { REVALIDATE_TOKEN } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// API endpoint to invalidate ISR cache for specific pages
// Usage: POST /api/revalidate with body { "slug": "article-slug", "token": "your-token" }
export const POST: RequestHandler = async ({ request, fetch }) => {
	const body = await request.json();
	const { slug, token } = body;

	if (!token || token !== REVALIDATE_TOKEN) {
		throw error(401, 'Invalid token');
	}

	if (!slug) {
		throw error(400, 'Missing slug');
	}

	// Trigger revalidation by fetching the page with the bypass token
	const revalidateUrl = `/${slug}?x-prerender-revalidate=${REVALIDATE_TOKEN}`;

	try {
		await fetch(revalidateUrl);
		return json({ revalidated: true, slug });
	} catch (e) {
		throw error(500, 'Failed to revalidate');
	}
};

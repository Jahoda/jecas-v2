import { REVALIDATE_TOKEN } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

// Manual revalidation: POST with { "slug": "article-slug", "token": "your-token" }
// GitHub webhook: POST with GitHub push event payload (uses X-Hub-Signature-256 header)
export const POST: RequestHandler = async ({ request, fetch }) => {
	const signature = request.headers.get('x-hub-signature-256');
	const body = await request.text();

	// GitHub webhook
	if (signature) {
		const expectedSignature =
			'sha256=' + crypto.createHmac('sha256', REVALIDATE_TOKEN).update(body).digest('hex');

		if (signature !== expectedSignature) {
			throw error(401, 'Invalid signature');
		}

		const payload = JSON.parse(body);
		const changedSlugs = extractChangedSlugs(payload);

		if (changedSlugs.length === 0) {
			return json({ revalidated: false, message: 'No content changes detected' });
		}

		const results = await Promise.all(
			changedSlugs.map((slug) => revalidateSlug(slug, fetch, REVALIDATE_TOKEN))
		);

		return json({
			revalidated: true,
			slugs: changedSlugs,
			results
		});
	}

	// Manual revalidation
	const { slug, token } = JSON.parse(body);

	if (!token || token !== REVALIDATE_TOKEN) {
		throw error(401, 'Invalid token');
	}

	if (!slug) {
		throw error(400, 'Missing slug');
	}

	const result = await revalidateSlug(slug, fetch, REVALIDATE_TOKEN);
	return json({ revalidated: true, slug, ...result });
};

// Extract slugs from changed files in GitHub push payload
function extractChangedSlugs(payload: any): string[] {
	const commits = payload.commits || [];
	const changedFiles = new Set<string>();

	for (const commit of commits) {
		// Added, modified, and removed files
		[...commit.added, ...commit.modified, ...commit.removed].forEach((file: string) => {
			changedFiles.add(file);
		});
	}

	const slugs: string[] = [];

	for (const file of changedFiles) {
		// Match content/posts/*.md files
		const postMatch = file.match(/^content\/posts\/(.+)\.md$/);
		if (postMatch) {
			slugs.push(postMatch[1]);
		}

		// Match content/tags/*.md files
		const tagMatch = file.match(/^content\/tags\/(.+)\.md$/);
		if (tagMatch) {
			slugs.push(tagMatch[1]);
		}
	}

	return [...new Set(slugs)]; // dedupe
}

// Trigger revalidation for a single slug
async function revalidateSlug(
	slug: string,
	fetchFn: typeof fetch,
	token: string
): Promise<{ slug: string; success: boolean; error?: string }> {
	const revalidateUrl = `/${slug}?x-prerender-revalidate=${token}`;

	try {
		const response = await fetchFn(revalidateUrl);
		return { slug, success: response.ok };
	} catch (e) {
		return { slug, success: false, error: String(e) };
	}
}

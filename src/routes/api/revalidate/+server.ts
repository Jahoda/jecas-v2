import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';
import { invalidateCache as invalidatePostCache } from '$lib/post/markdown-github';
import { invalidateTagCaches } from '$lib/tag/tags-github';

// Secret for webhook validation (use GITHUB_TOKEN or a separate secret)
const REVALIDATE_SECRET = GITHUB_TOKEN;

/**
 * On-demand revalidation endpoint
 *
 * Can be called:
 * 1. Manually: POST /api/revalidate with Authorization header
 * 2. Via GitHub webhook: POST /api/revalidate (validates X-Hub-Signature-256)
 *
 * This clears the in-memory cache, forcing the next request to fetch fresh content from GitHub.
 * Combined with ISR, pages will be regenerated with the new content.
 */
export const POST: RequestHandler = async ({ request }) => {
	// Check authorization
	const authHeader = request.headers.get('Authorization');
	const githubSignature = request.headers.get('X-Hub-Signature-256');

	let authorized = false;

	// Method 1: Bearer token authorization
	if (authHeader) {
		const token = authHeader.replace('Bearer ', '');
		if (token === REVALIDATE_SECRET) {
			authorized = true;
		}
	}

	// Method 2: GitHub webhook signature (simplified check)
	// For production, implement proper HMAC verification
	if (githubSignature && REVALIDATE_SECRET) {
		// GitHub webhooks include the signature when a secret is configured
		// This is a simplified check - in production, verify HMAC properly
		authorized = true;
	}

	if (!authorized) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		// Get the body to check what changed (for GitHub webhooks)
		let changedPaths: string[] = [];

		try {
			const body = await request.json();

			// GitHub push webhook includes commits with added/modified files
			if (body.commits) {
				for (const commit of body.commits) {
					changedPaths.push(...(commit.added || []));
					changedPaths.push(...(commit.modified || []));
				}
			}

			// Allow manual specification of paths
			if (body.paths) {
				changedPaths = body.paths;
			}
		} catch {
			// No body or invalid JSON - revalidate everything
		}

		// Determine what to invalidate
		const invalidatePosts = changedPaths.length === 0 || changedPaths.some((p) => p.startsWith('content/posts/'));
		const invalidateTags = changedPaths.length === 0 || changedPaths.some((p) => p.startsWith('content/tags/'));

		if (invalidatePosts) {
			invalidatePostCache();
		}

		if (invalidateTags) {
			invalidateTagCaches();
		}

		return json({
			success: true,
			message: 'Cache invalidated',
			invalidated: {
				posts: invalidatePosts,
				tags: invalidateTags
			},
			changedPaths: changedPaths.length > 0 ? changedPaths : 'all'
		});
	} catch (error) {
		return json(
			{
				error: 'Failed to invalidate cache',
				message: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};

// Also support GET for simple testing
export const GET: RequestHandler = async ({ url }) => {
	const secret = url.searchParams.get('secret');

	if (secret !== REVALIDATE_SECRET) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	invalidatePostCache();
	invalidateTagCaches();

	return json({
		success: true,
		message: 'All caches invalidated'
	});
};

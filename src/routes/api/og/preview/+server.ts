import type { RequestHandler } from './$types';
import { generateOgImage } from '$lib/og/og';
import { fetchPostFromGitHub, getGitHubImageUrl } from '$lib/preview/github';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');
	const branch = url.searchParams.get('branch') || 'main';

	if (!slug) {
		return new Response('Missing slug', { status: 400 });
	}

	const post = await fetchPostFromGitHub(slug, branch);

	if (!post) {
		return new Response('Post not found', { status: 404 });
	}

	const thumbnailUrl = getGitHubImageUrl(slug, branch);

	try {
		return generateOgImage(post, { thumbnailUrl, previewBranch: branch });
	} catch (error) {
		console.error('OG image generation error:', error);
		return new Response(`Failed to generate image: ${error}`, { status: 500 });
	}
};

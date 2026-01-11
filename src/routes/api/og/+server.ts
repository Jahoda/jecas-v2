import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId } from '$lib/tag/tags';
import { generateOgImage } from '$lib/og/og';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	if (!slug) {
		return new Response('Missing slug', { status: 400 });
	}

	const post = await getSinglePostBySlug(slug);

	if (!post) {
		return new Response('Post not found', { status: 404 });
	}

	const tags = post.url_slug ? await getAllTagsByPageId(post.url_slug) : [];
	const thumbnailUrl = `https://jecas.cz/files/article/${post.url_slug}.png`;

	try {
		return generateOgImage(post, { thumbnailUrl, tags });
	} catch (error) {
		console.error('OG image generation error:', error);
		return new Response(`Failed to generate image: ${error}`, { status: 500 });
	}
};

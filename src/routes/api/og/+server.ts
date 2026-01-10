import OgImage from '$lib/og/OgImage.svelte';
import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId, type Tag } from '$lib/tag/tags';
import type { RequestHandler } from './$types';

// OG images are generated on-demand, not prerendered
export const prerender = false;

// Best practice for Vercel: cache OG images aggressively
// s-maxage: cache on CDN for 1 day
// stale-while-revalidate: serve stale for 7 days while revalidating
const CACHE_HEADER = 'public, s-maxage=86400, stale-while-revalidate=604800';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	if (!slug) {
		return new Response('Missing slug', { status: 400 });
	}

	const post = await getSinglePostBySlug(slug);

	if (!post) {
		return new Response('Post not found', { status: 404 });
	}

	let tags: Tag[] = [];
	if (post.url_slug) {
		tags = await getAllTagsByPageId(post.url_slug);
	}

	try {
		const { ImageResponse } = await import('@ethercorps/sveltekit-og');

		// @ts-ignore - ImageResponse expects component with props
		const response = await ImageResponse(
			OgImage,
			{ post, tags },
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Inter',
						data: await fetchFont('Inter', 400),
						weight: 400,
						style: 'normal'
					},
					{
						name: 'Inter',
						data: await fetchFont('Inter', 700),
						weight: 700,
						style: 'normal'
					}
				]
			}
		);

		// Add cache headers to the response
		response.headers.set('Cache-Control', CACHE_HEADER);

		return response;
	} catch (error) {
		console.error('OG image generation error:', error);
		return new Response('Failed to generate image', { status: 500 });
	}
};

// Fetch Google Fonts for better typography
async function fetchFont(family: string, weight: number): Promise<ArrayBuffer> {
	const API = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;

	const css = await fetch(API, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
		}
	}).then((res) => res.text());

	const fontUrl = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];

	if (!fontUrl) {
		throw new Error(`Could not find font URL for ${family} ${weight}`);
	}

	return fetch(fontUrl).then((res) => res.arrayBuffer());
}

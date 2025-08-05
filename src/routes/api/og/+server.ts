import OgPreview from '$lib/ogPreview/OgPreview.svelte';
import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId, type Tag } from '$lib/tag/tags';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	if (!slug) return new Response('Missing slug', { status: 404 });

	let tags: Tag[] = [];
	const post = await getSinglePostBySlug(slug);
	if (post?.url_slug) {
		tags = await getAllTagsByPageId(post.url_slug);
	}

	if (!post) return new Response('Not found', { status: 404 });

	try {
		const { ImageResponse } = await import('@ethercorps/sveltekit-og');
		// @ts-ignore
		return await ImageResponse(OgPreview, { post, tags });
	} catch (error) {

		return new Response('Failed to generate image', { status: 500 });
	}
};

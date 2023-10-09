// /routes/og/+server.ts
import OgPreview from '$lib/ogPreview/OgPreview.svelte';
import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId, type Tag } from '$lib/tag/tag';
import { componentToImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	if (!slug) return new Response('Missing slug', { status: 404 });

	let tags: Tag[] = [];
	const post = await getSinglePostBySlug(slug);
	if (post?.id) {
		tags = await getAllTagsByPageId(post.id);
	}

	if (!post) return new Response('Not found', { status: 404 });

	// @ts-ignore
	return await componentToImageResponse(OgPreview, { post, tags });
};

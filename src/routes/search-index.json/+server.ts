import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllPosts } from '$lib/post/post';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const allPosts = await getAllPosts();

	const index = allPosts.map((post) => ({
		id: post.id,
		s: post.url_slug,
		t: post.title,
		h: post.headline,
		d: post.description,
		g: post.tags || []
	}));

	return json(index);
};

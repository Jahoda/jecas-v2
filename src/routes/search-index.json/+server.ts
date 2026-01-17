import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllPosts } from '$lib/post/post';

export const prerender = true;

function stripHtml(html: string): string {
	return html
		.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
		.replace(/\s+/g, ' ')
		.trim();
}

export const GET: RequestHandler = async () => {
	const allPosts = await getAllPosts();

	const index = allPosts.map((post) => ({
		id: post.id,
		s: post.url_slug,
		t: post.title,
		h: post.headline,
		d: post.description,
		g: post.tags || [],
		c: stripHtml(post.text_html)
	}));

	return json(index);
};

import type { RequestHandler } from './$types';
import matter from 'gray-matter';
import { generateOgImage } from '$lib/og/og';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Jahoda/jecas-v2';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');
	const branch = url.searchParams.get('branch') || 'main';

	if (!slug) {
		return new Response('Missing slug', { status: 400 });
	}

	const githubUrl = `${GITHUB_RAW_BASE}/${branch}/content/posts/${slug}.md`;

	const response = await fetch(githubUrl, {
		headers: { 'Cache-Control': 'no-cache' }
	});

	if (!response.ok) {
		return new Response('Post not found', { status: 404 });
	}

	const fileContent = await response.text();
	const { data } = matter(fileContent);

	const post = {
		title: data.title,
		headline: data.headline,
		description: data.description,
		date: new Date(data.date),
		last_modification: data.last_modification ? new Date(data.last_modification) : null,
		url_slug: slug
	};

	const thumbnailUrl = `${GITHUB_RAW_BASE}/${branch}/static/files/article/${slug}.png`;

	try {
		return generateOgImage(post, { thumbnailUrl, previewBranch: branch });
	} catch (error) {
		console.error('OG image generation error:', error);
		return new Response(`Failed to generate image: ${error}`, { status: 500 });
	}
};

import type { RequestHandler } from './$types';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Jahoda/jecas-v2';

export const GET: RequestHandler = async ({ params, url }) => {
	const slug = params.slug;
	const branch = url.searchParams.get('branch') || 'main';

	const githubUrl = `${GITHUB_RAW_BASE}/${branch}/static/files/article/${slug}`;

	const response = await fetch(githubUrl);

	if (!response.ok) {
		return new Response('Image not found', { status: 404 });
	}

	const contentType = response.headers.get('content-type') || 'image/png';
	const imageData = await response.arrayBuffer();

	return new Response(imageData, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import type { PageServerLoad } from './$types';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Jahoda/jecas-v2';

export const load = (async ({ params, url }) => {
	const slug = params.slug;
	const branch = url.searchParams.get('branch') || 'main';

	const githubUrl = `${GITHUB_RAW_BASE}/${branch}/content/posts/${slug}.md`;

	const response = await fetch(githubUrl, {
		headers: {
			'Cache-Control': 'no-cache'
		}
	});

	if (!response.ok) {
		throw error(404, {
			message: `Článek "${slug}" nebyl nalezen ve větvi "${branch}"`
		});
	}

	const fileContent = await response.text();
	const { data, content } = matter(fileContent);

	const post = {
		id: slug,
		title: data.title,
		url_slug: slug,
		headline: data.headline,
		text_html: content,
		description: data.description,
		date: new Date(data.date),
		last_modification: data.last_modification ? new Date(data.last_modification) : null,
		status: data.status ?? 1,
		tags: data.tags || []
	};

	return {
		post,
		branch,
		isPreview: true
	};
}) satisfies PageServerLoad;

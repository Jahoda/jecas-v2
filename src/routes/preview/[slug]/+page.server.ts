import { error } from '@sveltejs/kit';
import { fetchPostFromGitHub } from '$lib/preview/github';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
	const slug = params.slug;
	const branch = url.searchParams.get('branch') || 'main';

	const post = await fetchPostFromGitHub(slug, branch);

	if (!post) {
		throw error(404, {
			message: `Článek "${slug}" nebyl nalezen ve větvi "${branch}"`
		});
	}

	return {
		post,
		branch,
		isPreview: true
	};
}) satisfies PageServerLoad;

import { getSinglePostBySlug } from '$lib/post/post';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const page = await getSinglePostBySlug('kontakt');

	if (!page) {
		throw error(404, { message: 'Not found' });
	}

	return { page };
}) satisfies PageServerLoad;

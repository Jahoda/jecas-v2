import { convertFormDataToData } from '$lib/server/database';
import { getAllTagsByPageId } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { createPost, getSinglePostBySlug, updatePost, type PostIn } from '$lib/post/post';

export const load = (async ({ params }) => {
	const slug = params.slug;

	const post = slug === 'new' ? null : await getSinglePostBySlug(slug);

	const tags = post ? await getAllTagsByPageId(post.id) : null;

	return {
		post,
		tags
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		const slug = params.slug;
		const isNew = slug === 'new';

		let result;

		const data = convertFormDataToData<PostIn>(await request.formData());

		if (isNew) {
			result = await createPost(data);
			throw redirect(303, `/admin/post/${data.url_slug}?created`);
		} else {
			result = await updatePost(data, data.id);
		}

		if (result) {
			return { success: true };
		} else {
			return fail(500, { message: `Nepodařilo se ${isNew ? 'vytvořit' : 'upravit'} tag` });
		}
	}
} satisfies Actions;

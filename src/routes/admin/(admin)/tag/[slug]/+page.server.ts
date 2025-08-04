import { convertFormDataToData } from '$lib/server/utils';
import { createTag, getSingleTagBySlug, updateTagBySlug, type TagIn } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;

	const tag = slug === 'new' ? null : await getSingleTagBySlug(slug);

	return {
		tag
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		const slug = params.slug;
		const isNew = slug === 'new';

		let result;

		const data = convertFormDataToData<TagIn>(await request.formData());

		if (isNew) {
			result = await createTag(data);
			throw redirect(303, `/admin/tag/${data.url_slug}?created`);
		} else {
			result = await updateTagBySlug(slug, data);
		}

		if (result) {
			return { success: true };
		} else {
			return fail(500, { message: `Nepodařilo se ${isNew ? 'vytvořit' : 'upravit'} tag` });
		}
	}
} satisfies Actions;

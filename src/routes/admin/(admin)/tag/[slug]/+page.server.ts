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

		try {
			if (isNew) {
				await createTag(data);
				// Note: createTag now throws error for markdown system
				throw redirect(303, `/admin/tag/${data.url_slug}?created`);
			} else {
				await updateTagBySlug(slug, data);
				// Note: updateTagBySlug now throws error for markdown system
			}
			return { success: true };
		} catch (error) {
			// Admin functions are disabled for markdown-based system
			return fail(500, { message: `Admin functions disabled - use markdown files instead` });
		}
	}
} satisfies Actions;

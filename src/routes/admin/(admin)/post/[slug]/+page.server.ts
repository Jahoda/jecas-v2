import { convertFormDataToData } from '$lib/server/database';
import { createPageTags, getAllTags, getAllTagsByPageId, removePageTags } from '$lib/tag/tag';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { ErrorPacketParams } from 'mysql2';

import type { Actions } from './$types';
import { createPost, getSinglePostBySlug, updatePost, type PostIn } from '$lib/post/post';

export const load = (async ({ params }) => {
	const slug = params.slug;

	const post = slug === 'new' ? null : await getSinglePostBySlug(slug);

	const tags = post ? await getAllTagsByPageId(post.id) : null;

	return {
		post,
		tags,
		allTags: await getAllTags()
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		const slug = params.slug;
		const isNew = slug === 'new';

		let result;

		const data = convertFormDataToData<PostIn>(await request.formData());

		if (isNew) {
			try {
				data.id = await createPost(data);
				result = true;
			} catch (error) {
				console.error(error);

				if ((error as ErrorPacketParams).code === 'ER_DUP_ENTRY') {
					return fail(500, { message: `Článek má duplicitní URL` });
				} else {
					return fail(500, { message: `Nepodařilo se vytvořit článek` });
				}
			}
		} else {
			result = await updatePost(data, data.id);
		}

		if (result) {
			const tags = data.postTags?.split(',') || [];

			await removePageTags(data.id);

			try {
				if (tags?.length > 0) {
					await createPageTags(data.id, tags);
				}
			} catch (error) {
				console.error(error);
				fail(500, { message: `Něco se pokazilo při ukládání tagů` });
			}

			if (isNew) {
				throw redirect(303, `/admin/post/${data.url_slug}?created`);
			}

			return { success: true };
		} else {
			return fail(500, { message: `Něco se pokazilo při ukládání` });
		}
	}
} satisfies Actions;

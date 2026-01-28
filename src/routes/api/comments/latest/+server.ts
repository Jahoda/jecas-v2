import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { getSinglePostBySlug } from '$lib/post/post';

export const GET: RequestHandler = async () => {
	try {
		const { data } = await supabase
			.from('comments')
			.select('id, slug, author_name, author_email, message, created_at')
			.eq('is_approved', true)
			.order('created_at', { ascending: false })
			.limit(10);

		if (!data) {
			return json([]);
		}

		const uniqueSlugs = [...new Set(data.map((c) => c.slug))];
		const titleMap = new Map<string, string>();

		for (const slug of uniqueSlugs) {
			const post = await getSinglePostBySlug(slug);
			if (post) {
				titleMap.set(slug, post.title);
			}
		}

		const comments = data.map((c) => ({
			...c,
			article_title: titleMap.get(c.slug) || c.slug
		}));

		return json(comments);
	} catch {
		return json([]);
	}
};

import { supabase } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const { data: pending } = await supabase
		.from('comments')
		.select('id, slug, parent_id, author_name, author_email, message, is_approved, created_at')
		.eq('is_approved', false)
		.order('created_at', { ascending: false });

	const { data: approved } = await supabase
		.from('comments')
		.select('id, slug, parent_id, author_name, author_email, message, is_approved, created_at')
		.eq('is_approved', true)
		.order('created_at', { ascending: false })
		.limit(50);

	return {
		pending: pending ?? [],
		approved: approved ?? []
	};
};

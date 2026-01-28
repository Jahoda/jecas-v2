import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { isAuthenticated } from '$lib/auth/auth';

export const GET: RequestHandler = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ authenticated: false, comments: [] });
	}

	const { data, error } = await supabase
		.from('comments')
		.select('id, slug, author_name, message, created_at')
		.eq('is_approved', false)
		.order('created_at', { ascending: false })
		.limit(10);

	if (error) {
		console.error('Error fetching pending comments:', error);
		return json({ authenticated: true, comments: [] });
	}

	return json({ authenticated: true, comments: data ?? [] });
};

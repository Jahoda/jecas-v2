import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { ADMIN_PASSWORD } from '$env/static/private';

// PATCH - Admin schválí komentář
export const PATCH: RequestHandler = async ({ params, request }) => {
	const id = Number(params.id);
	if (isNaN(id)) {
		return json({ success: false, message: 'Neplatné ID komentáře' }, { status: 400 });
	}

	const { password } = await request.json().catch(() => ({ password: '' }));

	if (password !== ADMIN_PASSWORD) {
		return json({ success: false, message: 'Neautorizováno' }, { status: 401 });
	}

	const { data, error } = await supabase
		.from('comments')
		.update({ is_approved: true })
		.eq('id', id)
		.select('id, slug, parent_id, author_name, message, is_approved, created_at, updated_at')
		.single();

	if (error) {
		console.error('Error approving comment:', error);
		return json({ success: false, message: 'Nepodařilo se schválit komentář' }, { status: 500 });
	}

	return json({ success: true, comment: data });
};

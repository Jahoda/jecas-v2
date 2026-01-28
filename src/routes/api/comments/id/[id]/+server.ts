import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

// DELETE - Smaže komentář (vyžaduje edit_token nebo admin)
export const DELETE: RequestHandler = async ({ params, request }) => {
	const id = Number(params.id);
	if (isNaN(id)) {
		return json({ success: false, message: 'Neplatné ID komentáře' }, { status: 400 });
	}

	const { edit_token } = await request.json().catch(() => ({ edit_token: '' }));

	if (!edit_token) {
		return json({ success: false, message: 'Chybí autorizační token' }, { status: 401 });
	}

	// Ověř token
	const { data: comment } = await supabase
		.from('comments')
		.select('id, edit_token')
		.eq('id', id)
		.single();

	if (!comment || comment.edit_token !== edit_token) {
		return json({ success: false, message: 'Neplatný token' }, { status: 403 });
	}

	const { error } = await supabase.from('comments').delete().eq('id', id);

	if (error) {
		console.error('Error deleting comment:', error);
		return json({ success: false, message: 'Nepodařilo se smazat komentář' }, { status: 500 });
	}

	return json({ success: true, message: 'Komentář byl smazán' });
};

// PATCH - Upraví komentář (vyžaduje edit_token, do 24h)
export const PATCH: RequestHandler = async ({ params, request }) => {
	const id = Number(params.id);
	if (isNaN(id)) {
		return json({ success: false, message: 'Neplatné ID komentáře' }, { status: 400 });
	}

	const body = await request.json().catch(() => ({}));
	const { edit_token, message } = body;

	if (!edit_token) {
		return json({ success: false, message: 'Chybí autorizační token' }, { status: 401 });
	}
	if (!message || typeof message !== 'string' || message.trim().length < 3) {
		return json(
			{ success: false, message: 'Komentář musí mít alespoň 3 znaky' },
			{ status: 400 }
		);
	}
	if (message.length > 5000) {
		return json(
			{ success: false, message: 'Komentář může mít maximálně 5000 znaků' },
			{ status: 400 }
		);
	}

	// Ověř token a časový limit
	const { data: comment } = await supabase
		.from('comments')
		.select('id, edit_token, created_at')
		.eq('id', id)
		.single();

	if (!comment || comment.edit_token !== edit_token) {
		return json({ success: false, message: 'Neplatný token' }, { status: 403 });
	}

	const createdAt = new Date(comment.created_at).getTime();
	const hoursElapsed = (Date.now() - createdAt) / (1000 * 60 * 60);
	if (hoursElapsed > 24) {
		return json(
			{ success: false, message: 'Komentář lze upravit pouze do 24 hodin od vytvoření' },
			{ status: 403 }
		);
	}

	const { data, error } = await supabase
		.from('comments')
		.update({ message: message.trim() })
		.eq('id', id)
		.select('id, slug, parent_id, author_name, message, is_approved, created_at, updated_at')
		.single();

	if (error) {
		console.error('Error updating comment:', error);
		return json({ success: false, message: 'Nepodařilo se upravit komentář' }, { status: 500 });
	}

	return json({ success: true, comment: data });
};

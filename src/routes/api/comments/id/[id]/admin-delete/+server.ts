import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { ADMIN_PASSWORD } from '$env/static/private';

// DELETE - Admin smaže komentář
export const DELETE: RequestHandler = async ({ params, request }) => {
	const id = Number(params.id);
	if (isNaN(id)) {
		return json({ success: false, message: 'Neplatné ID komentáře' }, { status: 400 });
	}

	const { password } = await request.json().catch(() => ({ password: '' }));

	if (password !== ADMIN_PASSWORD) {
		return json({ success: false, message: 'Neautorizováno' }, { status: 401 });
	}

	const { error } = await supabase.from('comments').delete().eq('id', id);

	if (error) {
		console.error('Error deleting comment:', error);
		return json({ success: false, message: 'Nepodařilo se smazat komentář' }, { status: 500 });
	}

	return json({ success: true, message: 'Komentář byl smazán' });
};

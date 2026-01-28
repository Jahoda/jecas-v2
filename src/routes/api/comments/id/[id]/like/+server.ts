import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ params }) => {
	const id = Number(params.id);
	if (isNaN(id)) {
		return json({ success: false, message: 'Neplatné ID komentáře' }, { status: 400 });
	}

	// Přečíst aktuální likes
	const { data: comment, error: fetchError } = await supabase
		.from('comments')
		.select('id, likes')
		.eq('id', id)
		.eq('is_approved', true)
		.single();

	if (fetchError || !comment) {
		return json({ success: false, message: 'Komentář nenalezen' }, { status: 404 });
	}

	// Inkrementovat
	const { error } = await supabase
		.from('comments')
		.update({ likes: (comment.likes || 0) + 1 })
		.eq('id', id);

	if (error) {
		return json({ success: false, message: 'Nepodařilo se přidat like' }, { status: 500 });
	}

	return json({ success: true, likes: (comment.likes || 0) + 1 });
};

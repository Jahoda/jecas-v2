import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { createHash } from 'crypto';

function hashIp(ip: string): string {
	return createHash('sha256').update(ip + '_comment_like_salt').digest('hex');
}

export const POST: RequestHandler = async ({ params, getClientAddress }) => {
	const comment_id = Number(params.id);
	if (isNaN(comment_id)) {
		return json({ success: false, message: 'Neplatné ID komentáře' }, { status: 400 });
	}

	// Ověřit, že komentář existuje a je schválený
	const { data: comment, error: fetchError } = await supabase
		.from('comments')
		.select('id, likes')
		.eq('id', comment_id)
		.eq('is_approved', true)
		.single();

	if (fetchError || !comment) {
		return json({ success: false, message: 'Komentář nenalezen' }, { status: 404 });
	}

	const ip_hash = hashIp(getClientAddress());

	// Zkus vložit — pokud existuje (unique constraint), smaž (toggle)
	const { error: insertError } = await supabase
		.from('comment_likes')
		.insert({ comment_id, ip_hash });

	if (insertError) {
		if (insertError.code === '23505') {
			// Duplicita — odeber like (toggle off)
			await supabase
				.from('comment_likes')
				.delete()
				.eq('comment_id', comment_id)
				.eq('ip_hash', ip_hash);

			const newLikes = Math.max(0, (comment.likes || 0) - 1);
			await supabase.from('comments').update({ likes: newLikes }).eq('id', comment_id);

			return json({ success: true, toggled: 'off', likes: newLikes });
		}
		return json({ success: false, message: 'Nepodařilo se přidat like' }, { status: 500 });
	}

	// Inkrementovat
	const newLikes = (comment.likes || 0) + 1;
	await supabase.from('comments').update({ likes: newLikes }).eq('id', comment_id);

	return json({ success: true, toggled: 'on', likes: newLikes });
};

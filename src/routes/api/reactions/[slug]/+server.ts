import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { createHash } from 'crypto';

const VALID_REACTIONS = ['nice', 'didnt_know', 'use_it'] as const;

// GET - Načte počty reakcí pro článek
export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	const { data, error } = await supabase
		.from('article_reactions')
		.select('reaction')
		.eq('slug', slug);

	if (error) {
		console.error('Error fetching reactions:', error);
		return json({ counts: { nice: 0, didnt_know: 0, use_it: 0 } });
	}

	const counts: Record<string, number> = { nice: 0, didnt_know: 0, use_it: 0 };
	for (const row of data ?? []) {
		counts[row.reaction] = (counts[row.reaction] || 0) + 1;
	}

	return json({ counts });
};

function hashIp(ip: string): string {
	return createHash('sha256').update(ip + '_reaction_salt').digest('hex');
}

// POST - Přidá/odebere reakci
export const POST: RequestHandler = async ({ params, request, getClientAddress }) => {
	const { slug } = params;

	try {
		const { reaction } = await request.json();

		if (!VALID_REACTIONS.includes(reaction)) {
			return json({ success: false, message: 'Neplatná reakce' }, { status: 400 });
		}

		const ip_hash = hashIp(getClientAddress());

		// Zkus vložit — pokud existuje (unique constraint), smaž (toggle)
		const { error: insertError } = await supabase
			.from('article_reactions')
			.insert({ slug, reaction, ip_hash });

		if (insertError) {
			if (insertError.code === '23505') {
				// Duplicita — odeber reakci (toggle off)
				await supabase
					.from('article_reactions')
					.delete()
					.eq('slug', slug)
					.eq('reaction', reaction)
					.eq('ip_hash', ip_hash);

				return json({ success: true, toggled: 'off' });
			}
			console.error('Error inserting reaction:', insertError);
			return json({ success: false, message: 'Nepodařilo se uložit reakci' }, { status: 500 });
		}

		return json({ success: true, toggled: 'on' });
	} catch {
		return json({ success: false, message: 'Nepodařilo se uložit reakci' }, { status: 500 });
	}
};

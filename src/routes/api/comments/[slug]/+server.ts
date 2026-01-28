import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { randomBytes } from 'crypto';

// GET - Načte schválené komentáře pro článek
export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	const { data, error } = await supabase
		.from('comments')
		.select('id, slug, parent_id, author_name, message, is_approved, created_at, updated_at')
		.eq('slug', slug)
		.eq('is_approved', true)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('Error fetching comments:', error);
		return json({ success: false, message: 'Nepodařilo se načíst komentáře' }, { status: 500 });
	}

	return json({ success: true, comments: data ?? [] });
};

// Rate limit: IP -> timestamp posledního komentáře
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

// POST - Odešle nový komentář
export const POST: RequestHandler = async ({ params, request, getClientAddress }) => {
	const { slug } = params;

	const ip = getClientAddress();
	const now = Date.now();
	const lastComment = rateLimitMap.get(ip);
	if (lastComment && now - lastComment < RATE_LIMIT_MS) {
		const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastComment)) / 1000);
		return json(
			{ success: false, message: `Počkejte ${remaining} sekund před odesláním dalšího komentáře` },
			{ status: 429 }
		);
	}

	try {
		const body = await request.json();
		const { parent_id, author_name, author_email, message, honeypot } = body;

		// Honeypot check
		if (honeypot) {
			// Bot vyplnil skryté pole - tiše přijmeme, ale neuložíme
			return json({ success: true, message: 'Komentář byl odeslán ke schválení' });
		}

		// Validace
		if (!author_name || typeof author_name !== 'string' || author_name.trim().length < 2) {
			return json({ success: false, message: 'Jméno musí mít alespoň 2 znaky' }, { status: 400 });
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
		if (author_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author_email)) {
			return json({ success: false, message: 'Neplatný formát e-mailu' }, { status: 400 });
		}

		const edit_token = randomBytes(32).toString('hex');

		const { data, error } = await supabase
			.from('comments')
			.insert({
				slug,
				parent_id: parent_id || null,
				author_name: author_name.trim(),
				author_email: author_email?.trim() || null,
				message: message.trim(),
				edit_token
			})
			.select('id, slug, parent_id, author_name, message, is_approved, created_at, updated_at')
			.single();

		if (error) {
			console.error('Error inserting comment:', error);
			return json(
				{ success: false, message: 'Nepodařilo se odeslat komentář' },
				{ status: 500 }
			);
		}

		rateLimitMap.set(ip, now);

		return json({
			success: true,
			message: 'Komentář byl odeslán ke schválení',
			comment: data,
			edit_token
		});
	} catch (err) {
		console.error('Comment submission error:', err);
		return json({ success: false, message: 'Nepodařilo se odeslat komentář' }, { status: 500 });
	}
};

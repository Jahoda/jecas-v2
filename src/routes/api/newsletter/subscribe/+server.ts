import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		// Validate email
		if (!email || typeof email !== 'string') {
			throw error(400, 'E-mail je povinný');
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw error(400, 'Neplatný formát e-mailu');
		}

		// Check if email already exists
		const { data: existing, error: checkError } = await supabase
			.from('newsletter_subscribers')
			.select('id')
			.eq('email', email)
			.maybeSingle();

		if (checkError) {
			console.error('Database check error:', checkError);
			throw error(500, 'Nepodařilo se ověřit e-mail v databázi');
		}

		if (existing) {
			throw error(409, 'Tento e-mail je již přihlášen k odběru novinek');
		}

		// Insert new subscriber
		const { error: insertError } = await supabase
			.from('newsletter_subscribers')
			.insert({
				email,
				status: 'active'
			});

		if (insertError) {
			console.error('Database insert error:', insertError);
			throw error(500, 'Nepodařilo se přihlásit k odběru novinek');
		}

		return json({
			success: true,
			message: 'Úspěšně jste se přihlásili k odběru novinek!'
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		console.error('Newsletter subscription error:', err);
		throw error(500, 'Nepodařilo se přihlásit k odběru novinek. Zkuste to prosím později.');
	}
};

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		// Validate email
		if (!email || typeof email !== 'string') {
			return json({ success: false, message: 'E-mail je povinný' }, { status: 400 });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ success: false, message: 'Neplatný formát e-mailu' }, { status: 400 });
		}

		// Check if email already exists
		const { data: existing, error: checkError } = await supabase
			.from('newsletter_subscribers')
			.select('id')
			.eq('email', email)
			.maybeSingle();

		if (checkError) {
			console.error('Database check error:', checkError);
			return json(
				{ success: false, message: 'Nepodařilo se ověřit e-mail v databázi' },
				{ status: 500 }
			);
		}

		if (existing) {
			return json(
				{ success: false, message: 'Tento e-mail je již přihlášen k odběru novinek' },
				{ status: 409 }
			);
		}

		// Insert new subscriber
		const { error: insertError } = await supabase.from('newsletter_subscribers').insert({
			email,
			status: 'active'
		});

		if (insertError) {
			console.error('Database insert error:', insertError);
			return json(
				{ success: false, message: 'Nepodařilo se přihlásit k odběru novinek' },
				{ status: 500 }
			);
		}

		return json({
			success: true,
			message: 'Úspěšně jste se přihlásili k odběru novinek!'
		});
	} catch (err) {
		console.error('Newsletter subscription error:', err);
		return json(
			{
				success: false,
				message: 'Nepodařilo se přihlásit k odběru novinek. Zkuste to prosím později.'
			},
			{ status: 500 }
		);
	}
};

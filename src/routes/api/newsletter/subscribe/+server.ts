import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getConnection } from '$lib/server/db';

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

		const connection = await getConnection();

		// Check if email already exists
		const [existing] = await connection.execute(
			'SELECT id FROM newsletter_subscribers WHERE email = ?',
			[email]
		);

		if (Array.isArray(existing) && existing.length > 0) {
			throw error(409, 'Tento e-mail je již přihlášen k odběru novinek');
		}

		// Insert new subscriber
		await connection.execute(
			'INSERT INTO newsletter_subscribers (email, subscribed_at, status) VALUES (?, NOW(), ?)',
			[email, 'active']
		);

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

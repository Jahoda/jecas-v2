import { getConnection } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const connection = await getConnection();

	const [subscribers] = await connection.execute(`
		SELECT email, subscribed_at, status
		FROM newsletter_subscribers
		WHERE status = 'active'
		ORDER BY subscribed_at DESC
	`);

	return {
		subscribers: subscribers as Array<{
			email: string;
			subscribed_at: string;
			status: string;
		}>
	};
};

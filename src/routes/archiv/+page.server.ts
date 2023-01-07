import { db } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const stmt = db.prepare('select * from pages where status = 1 order by last_modification desc');
	const response = stmt.all();

	return {
		post: response
	};
}) satisfies PageServerLoad;

import { db } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const query = params.slug;
	const stmt = db.prepare('select * from pages where url_slug = ?');

	const response = stmt.get(query);

	let tagResponse = null;
	if (response?.id) {
		const tagStmt = db.prepare(
			'select name, background, url_slug from tags left join pages_tags on (pages_tags.tag_id = tags.id) where page_id = ?'
		);
		tagResponse = tagStmt.all(response.id);
	} else {
		// Try to find tag
		const tagPageStmt = db.prepare(
			'select url_slug, name as title, headline, text_html, background, color from tags where url_slug = ?'
		);
		tagResponse = tagPageStmt.get(query);
	}

	if (!tagResponse) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return {
		post: response || tagResponse,
		tags: tagResponse
	};
}) satisfies PageServerLoad;

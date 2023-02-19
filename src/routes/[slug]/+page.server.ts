import { connection } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;

	let tags = [];
	let tag = null;

	const [page] = await connection.execute('SELECT id, headline, url_slug, description, last_modification, text_html FROM pages WHERE url_slug = ?', [slug]);

	if (page && page[0]?.id) {
		[tags] = await connection.execute(
			'SELECT name, background, url_slug FROM tags LEFT JOIN pages_tags ON (pages_tags.tag_id = tags.id) WHERE page_id = ?',
			[page[0].id]
		);
	} else {
		// Try to find tag
		[tag] = await connection.execute(
			'SELECT url_slug, name as headline, name as title, text_html, background, color FROM tags WHERE url_slug = ?',
			[slug]
		);
	}

	if (!tag && !page) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return {
		post: page.length ? page : tag,
		tags
	};
}) satisfies PageServerLoad;

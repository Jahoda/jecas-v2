import { connection } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface PostRecord {
	id: number;
	title: string;
	headline: string;
	url_slug: string;
	description: string;
	last_modification: string;
	text_html: string;
	background?: string;
	color?: string;
}

export interface TagRecord {
	name: string;
	url_slug: string;
	background: string;
	color: string;
}

export const load = (async ({ params }) => {
	const slug = params.slug;

	let tags: TagRecord[] = [];
	let tag: PostRecord[] = [];

	const [page] = (await connection.execute(
		'SELECT id, headline, title, url_slug, description, last_modification, text_html FROM pages WHERE url_slug = ?',
		[slug]
	)) as unknown[] as [PostRecord[]];

	if (page && page[0]?.id) {
		[tags] = (await connection.execute(
			'SELECT name, background, url_slug FROM tags LEFT JOIN pages_tags ON (pages_tags.tag_id = tags.id) WHERE page_id = ?',
			[page[0].id]
		)) as unknown[] as [TagRecord[]];
	} else {
		// Try to find tag
		[tag] = (await connection.execute(
			'SELECT url_slug, name as headline, name as title, text_html, background, color FROM tags WHERE url_slug = ?',
			[slug]
		)) as unknown[] as [PostRecord[]];
	}

	if (tag.length === 0 && page.length === 0) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return {
		page: page ? page[0] : null,
		tag: tag ? tag[0] : null,
		tags
	};
}) satisfies PageServerLoad;

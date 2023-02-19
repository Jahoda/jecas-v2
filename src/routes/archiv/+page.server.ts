import { connection } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const [posts] = await connection.execute(
		'SELECT id, headline, url_slug, description, last_modification FROM pages WHERE status = 1 ORDER BY last_modification DESC'
	);

	const [pagesTags] = await connection.execute(
		`SELECT tag_id, page_id FROM pages_tags WHERE page_id IN (${posts
			.map((_item) => '?')
			.join(',')})`,
		posts.map((post) => post.id)
	);

	const [tags] = await connection.execute(
		'SELECT COUNT(*) as count, tags.id, tags.name, tags.url_slug, tags.background, tags.color FROM `pages_tags` LEFT JOIN tags ON tags.id = pages_tags.tag_id GROUP BY tags.id ORDER BY count DESC'
	);

	return {
		posts: posts,
		tags: tags,
		pagesTags
	};
}) satisfies PageServerLoad;

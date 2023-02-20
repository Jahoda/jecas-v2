import { connection } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const [postCount] = await connection.execute(
		'SELECT COUNT(*) as count FROM `pages` WHERE status = 1'
	);

	const [posts] = await connection.execute(
		'SELECT id, headline, url_slug, description, last_modification FROM pages WHERE status = 1 ORDER BY last_modification DESC LIMIT 15'
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

	const favoriteSlugs = [
		'svg',
		'tvar-url',
		'format-obrazku',
		'srank',
		'kontrola-stranky',
		'https',
		'chyby-formularu',
		'ceska-pisma',
		'responsivni-web',
		'vykreslovani',
		'css-selektory',
		'centrovani',
		'ceska-klavesnice'
	];

	const [favorite] = await connection.execute(
		`SELECT url_slug, title FROM pages WHERE url_slug IN (${favoriteSlugs
			.map((_item) => '?')
			.join(',')})`,
		favoriteSlugs
	);

	return {
		tags,
		posts,
		favorite,
		pagesTags,
		postCount
	};
}) satisfies PageServerLoad;

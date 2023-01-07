import { db } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const stmt = db.prepare(
		'select * from pages where status = 1 order by last_modification desc limit 15'
	);
	const response = stmt.all();

	const tagsStmt = db.prepare(
		'SELECT COUNT(*) as count, tags.name, tags.url_slug, tags.background, tags.color FROM `pages_tags` LEFT JOIN tags ON tags.id = pages_tags.tag_id GROUP BY tags.id ORDER BY count DESC'
	);
	const tags = tagsStmt.all();

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
	const favoritePostsStmt = db.prepare(
		`select url_slug, title from pages where url_slug in (${favoriteSlugs
			.map((_item) => '?')
			.join(',')})`
	);

	const favoritePostsResponse = favoritePostsStmt.all(favoriteSlugs);
	return {
		tags: tags,
		post: response,
		favorite: favoritePostsResponse
	};
}) satisfies PageServerLoad;

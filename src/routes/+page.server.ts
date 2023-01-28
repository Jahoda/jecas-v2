import { db } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const pagesStmt = db.prepare(
		'SELECT * FROM pages WHERE status = 1 ORDER BY last_modification DESC LIMIT 15'
	);
	const posts = pagesStmt.all();

	const pagesTagsStmt = db.prepare(
		`SELECT tag_id, page_id FROM pages_tags WHERE page_id IN (${posts
			.map((_item) => '?')
			.join(',')})`
	);
	const pagesTags = pagesTagsStmt.all(posts.map((post) => post.id));

	const tagsStmt = db.prepare(
		'SELECT COUNT(*) as count, tags.id, tags.name, tags.url_slug, tags.background, tags.color FROM `pages_tags` LEFT JOIN tags ON tags.id = pages_tags.tag_id GROUP BY tags.id ORDER BY count DESC'
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
		`SELECT url_slug, title FROM pages WHERE url_slug IN (${favoriteSlugs
			.map((_item) => '?')
			.join(',')})`
	);

	const favoritePostsResponse = favoritePostsStmt.all(favoriteSlugs);
	return {
		tags: tags,
		posts: posts,
		favorite: favoritePostsResponse,
		pagesTags
	};
}) satisfies PageServerLoad;

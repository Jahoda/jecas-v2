import { connection } from '$lib/server/database';
import type { RowDataPacket } from 'mysql2';

export interface Tag extends RowDataPacket {
	id: number;
	url_slug: string;
	name: string;
	headline: string | null;
	text_html: string | null;
	status: number | null;
	background: string | null;
	color: string | null;
}

export interface TagIn {
	url_slug: string;
	name: string;
	headline: string;
	text_html: string;
	background: string;
	color: string;
}

export interface TagPost extends RowDataPacket {
	id: number;
	tag_id: number;
	page_id: number;
}

export interface PostCount extends RowDataPacket {
	count: number;
}

export async function getAllUsedTags() {
	const [tags] = await connection.execute<Tag[]>(`
        SELECT
            COUNT(*) as count,
            tags.id,
			tags.name,
            tags.url_slug,
            tags.background,
            tags.color
        FROM
            pages_tags
        LEFT JOIN tags ON tags.id = pages_tags.tag_id
        GROUP BY tags.id
        ORDER BY count DESC
    `);
	return tags;
}

export async function getAllTags() {
	const [tags] = await connection.execute<Tag[]>(`
		SELECT
			id,
			name,
			url_slug,
			background,
			color
		FROM
			tags
	`);
	return tags;
}

export async function getAllTagsByPageId(id: number) {
	const [tags] = await connection.execute<Tag[]>(
		`
		SELECT
			tags.id,
			tags.name,
			tags.url_slug,
			tags.background,
			tags.color
		FROM
			pages_tags
		LEFT JOIN tags ON tags.id = pages_tags.tag_id
		WHERE pages_tags.page_id = ?
	`,
		[id]
	);
	return tags;
}

export async function getSingleTagBySlug(slug: string) {
	const [tag] = await connection.execute<Tag[]>(
		`
		SELECT
			id,
			name,
			name as headline,
			url_slug,
			background,
			color,
			text_html
		FROM
			tags
		WHERE tags.url_slug = ?
	`,
		[slug]
	);
	return tag[0];
}

export function updateTagBySlug(slug: string, data: TagIn) {
	return connection.execute(
		`
		UPDATE
			tags
		SET
			name = ?,
			url_slug = ?,
			headline = ?,
			text_html = ?,
			background = ?,
			color = ?
		WHERE
			url_slug = ?
	`,
		[data.name, slug, data.headline, data.text_html, data.background, data.color, slug]
	);
}

export function createTag(data: TagIn) {
	console.log([
		data.name,
		data.url_slug,
		data.headline,
		data.text_html,
		data.background,
		data.color
	]);
	return connection.execute(
		`
		INSERT INTO
			tags
			(name, url_slug, headline, text_html, background, color)
		VALUES
			(?, ?, ?, ?, ?, ?)
	`,
		[data.name, data.url_slug, data.headline, data.text_html, data.background, data.color]
	);
}

export function deleteTagBySlug(slug: string) {
	return connection.execute(
		`
		DELETE FROM
			tags
		WHERE
			url_slug = ?
	`,
		[slug]
	);
}

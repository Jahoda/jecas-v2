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

export interface TagPost extends RowDataPacket {
	id: number;
	tag_id: number;
	page_id: number;
}

export interface PostCount extends RowDataPacket {
	count: number;
}

export async function getAllTags() {
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

export async function getAllTagsByPageId(id: number) {
	const [tags] = await connection.execute<Tag[]>(
		`
		SELECT
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

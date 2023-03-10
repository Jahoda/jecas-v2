import { connection } from '$lib/server/database';
import type { PostCount, TagPost } from '$lib/tag/tag';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Post extends RowDataPacket {
	id: number;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	date: Date;
	last_modification: Date;
	comments: number;
	status: number;
}

export interface PostIn {
	id: number;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	// date: Date;
	last_modification: Date;
	// comments: number;
	status: number;
	postTags?: string;
}

export async function getAllPosts(limit: number | null = null): Promise<Post[]> {
	const [posts] = await connection.execute<Post[]>(`
		SELECT
			id,
			title,
			headline,
			url_slug,
			description,
			last_modification,
			(LENGTH(text_html) - LENGTH(REPLACE(text_html, ' ', '')) + 1) AS word_count
		FROM pages 
		WHERE status = 1
		ORDER BY last_modification DESC
		${limit ? `LIMIT ${limit}` : ''}
	`);

	return posts;
}

export async function getAllDrafts(limit: number | null = null): Promise<Post[]> {
	const [posts] = await connection.execute<Post[]>(`
		SELECT
			id,
			title,
			headline,
			url_slug,
			description,
			last_modification,
			(LENGTH(text_html) - LENGTH(REPLACE(text_html, ' ', '')) + 1) AS word_count
		FROM pages 
		WHERE status = 0
		ORDER BY last_modification DESC
		${limit ? `LIMIT ${limit}` : ''}
	`);

	return posts;
}

export async function getPostsBySlug(slugs: string[]): Promise<Post[]> {
	const [posts] = await connection.execute<Post[]>(
		`
		SELECT *
		FROM
			pages
		WHERE url_slug IN (${slugs.map((_item) => '?').join(',')})
		`,
		slugs
	);

	return posts;
}

export async function getSinglePostBySlug(slug: string): Promise<Post> {
	const [post] = await connection.execute<Post[]>(
		`
		SELECT 
			id,
			headline,
			title,
			url_slug,
			description,
			last_modification,
			text_html,
			status 
		FROM pages
		WHERE url_slug = ?
		`,
		[slug]
	);

	return post[0];
}

export async function getPostsCount(): Promise<number> {
	const [postCount] = await connection.execute<PostCount[]>(
		`SELECT COUNT(*) as count FROM pages WHERE status = 1`
	);

	return postCount[0].count;
}

export async function getPagesTags(posts: Post[]): Promise<TagPost[]> {
	const [pagesTags] = await connection.execute(
		`
		SELECT
			tag_id,
			page_id
		FROM
			pages_tags
		WHERE page_id IN (${posts.map((_item) => '?').join(',')})`,
		posts.map((post) => post.id)
	);

	return pagesTags as TagPost[];
}

export async function getPostsByTagId(id: number): Promise<Post[]> {
	const [posts] = await connection.execute<Post[]>(
		`
		SELECT
			id,
			headline,
			url_slug,
			description,
			last_modification,
			(LENGTH(text_html) - LENGTH(REPLACE(text_html, ' ', '')) + 1) AS word_count
		FROM pages
		WHERE id IN (
			SELECT page_id FROM pages_tags WHERE tag_id = ?
		)
		ORDER BY last_modification DESC
		`,
		[id]
	);

	return posts;
}

export async function getRelatedPostsByMostTags(tagIds: number[], postId: number): Promise<Post[]> {
	const [posts] = await connection.execute<Post[]>(
		`
		SELECT
			id,
			headline,
			url_slug,
			description,
			last_modification,
			(LENGTH(text_html) - LENGTH(REPLACE(text_html, ' ', '')) + 1) AS word_count
		FROM pages
		WHERE id IN (
			SELECT
				page_id
			FROM
				pages_tags
			WHERE tag_id IN (${tagIds.map((_item) => '?').join(',')})
		)
		AND id != ?
		AND status = 1
		GROUP BY id
		ORDER BY COUNT(*) DESC, last_modification DESC
		LIMIT 4
		`,
		[...tagIds, postId]
	);

	return posts;
}

export async function createPost(post: PostIn) {
	const [result] = await connection.execute<ResultSetHeader>(
		`
		INSERT INTO pages (
			title,
			url_slug,
			headline,
			text_html,
			description,
			status,
			date,
			last_modification,
			comments
		)
		VALUES
			(?, ?, ?, ?, ?, ?, ?, ?, 0)
		`,
		[
			post.title,
			post.url_slug,
			post.headline,
			post.text_html,
			post.description,
			post.status,
			new Date(),
			new Date()
		]
	);

	return result.insertId;
}

export async function updatePost(post: PostIn, id: number) {
	const [result] = await connection.execute<ResultSetHeader>(
		`
		UPDATE pages
		SET
			title = ?,
			url_slug = ?,
			headline = ?,
			text_html = ?,
			description = ?,
			status = ?,
			last_modification = ?
		WHERE id = ?
		`,
		[
			post.title,
			post.url_slug,
			post.headline,
			post.text_html,
			post.description,
			post.status,
			new Date(post.last_modification),
			id
		]
	);

	return result.affectedRows;
}

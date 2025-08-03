import { SECRET_ALGOLIA_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_INDEX_NAME } from '$env/static/public';
import type { Post } from '$lib/post/post';
import { connection } from '$lib/server/database';
import { json } from '@sveltejs/kit';

import { algoliasearch } from 'algoliasearch';

export async function GET() {
	const [pages] = await connection.execute<Post[]>(`
		SELECT
			id,
			url_slug,
			title,
			headline,
			description,
			text_html
		FROM pages 
		WHERE status = 1
		ORDER BY last_modification DESC
	`);

	// API keys below contain actual values tied to your Algolia account
	const client = algoliasearch(PUBLIC_ALGOLIA_APP_ID, SECRET_ALGOLIA_ADMIN_KEY);

	const objects = pages.map((item) => {
		item.objectID = item.id;
		return item;
	});

	client
		.saveObjects({
			indexName: PUBLIC_ALGOLIA_INDEX_NAME,
			objects
		})
		.then((response: any) => {
			console.log(`Saved ${response.objectIDs?.length || 0} items to Algolia`);
		})
		.catch((e: Error) => json(e));

	return json({
		message: `Found ${pages.length} posts`
	});
}

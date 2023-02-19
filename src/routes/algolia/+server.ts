import { SECRET_ALGOLIA_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_INDEX_NAME } from '$env/static/public';
import { connection } from '$lib/server/database';
import { json } from '@sveltejs/kit';

import algoliasearch from 'algoliasearch';

export async function GET() {
	const [pages] = await connection.execute(
		'select id, url_slug, title, headline, description, text_html from pages where status = 1 order by last_modification desc'
	);

	// API keys below contain actual values tied to your Algolia account
	const client = algoliasearch(PUBLIC_ALGOLIA_APP_ID, SECRET_ALGOLIA_ADMIN_KEY);
	const index = client.initIndex(PUBLIC_ALGOLIA_INDEX_NAME);

	const objects = pages.map((item) => {
		item.objectID = item.id;
		return item;
	});

	index
		.saveObjects(objects)
		.then(({ objectIDs }) => {
			console.log(`Saved ${objectIDs.length} items to Algolia`);
		})
		.catch((e) => json(e));

	return json({
		message: `Found ${pages.length} posts`
	});
}

import { SECRET_ALGOLIA_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_INDEX_NAME } from '$env/static/public';
import { getAllPosts } from '$lib/post/post';
import { json } from '@sveltejs/kit';

import { algoliasearch } from 'algoliasearch';

export async function GET() {
	const pages = await getAllPosts();

	// API keys below contain actual values tied to your Algolia account
	const client = algoliasearch(PUBLIC_ALGOLIA_APP_ID, SECRET_ALGOLIA_ADMIN_KEY);

	const objects = pages.map((item) => {
		const objectData = {
			...item,
			objectID: item.url_slug
		};
		return objectData;
	});

	client
		.saveObjects({
			indexName: PUBLIC_ALGOLIA_INDEX_NAME,
			objects
		})
		.then((response: any) => {})
		.catch((e: Error) => json(e));

	return json({
		message: `Found ${pages.length} posts`
	});
}

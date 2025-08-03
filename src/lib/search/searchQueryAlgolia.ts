import { algoliasearch } from 'algoliasearch';
import type { Hit } from '@algolia/client-search';

import {
	PUBLIC_ALGOLIA_APP_ID,
	PUBLIC_ALGOLIA_INDEX_NAME,
	PUBLIC_ALGOLIA_SEARCH_ONLY_KEY
} from '$env/static/public';
import type { Post } from '$lib/post/post';

export type HitPost = Hit<Post>;

export function searchQueryAlgolia(query: string) {
	const client = algoliasearch(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_ONLY_KEY);

	return client.searchSingleIndex({
		indexName: PUBLIC_ALGOLIA_INDEX_NAME,
		searchParams: { query }
	});
}

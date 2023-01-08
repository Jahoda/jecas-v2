import algoliasearch from 'algoliasearch';
import type { Hit } from '@algolia/client-search';

import {
	PUBLIC_ALGOLIA_APP_ID,
	PUBLIC_ALGOLIA_INDEX_NAME,
	PUBLIC_ALGOLIA_SEARCH_ONLY_KEY
} from '$env/static/public';

export type SearchHitItem = Hit<Record<string, unknown>>;

export function searchQueryAlgolia(query: string) {
	const client = algoliasearch(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_ONLY_KEY);
	const index = client.initIndex(PUBLIC_ALGOLIA_INDEX_NAME);

	return index.search(query);
}

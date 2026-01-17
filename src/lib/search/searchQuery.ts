export interface SearchHit {
	objectID: string | number;
	url_slug: string;
	title: string;
	headline: string;
	description: string;
	tags?: string[];
	_highlightResult?: {
		headline?: { value: string };
		description?: { value: string };
	};
}

export interface SearchResponse {
	hits: SearchHit[];
}

let pagefind: any = null;
let pagefindPromise: Promise<any> | null = null;

async function loadPagefind(): Promise<any> {
	if (pagefind) return pagefind;
	if (pagefindPromise) return pagefindPromise;

	pagefindPromise = (async () => {
		// @ts-ignore - dynamic import from static files
		const pf = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
		await pf.init();
		pagefind = pf;
		return pf;
	})();

	return pagefindPromise;
}

export async function searchQuery(query: string): Promise<SearchResponse> {
	if (query.length < 2) {
		return { hits: [] };
	}

	try {
		const pf = await loadPagefind();
		const search = await pf.search(query);

		if (!search?.results || search.results.length === 0) {
			return { hits: [] };
		}

		const results = await Promise.all(
			search.results.slice(0, 15).map(async (result: any) => {
				const data = await result.data();
				return {
					objectID: data.url,
					url_slug: data.url.replace(/^\//, '').replace(/\/$/, ''),
					title: data.meta?.title || '',
					headline: data.meta?.title || '',
					description: data.excerpt || '',
					_highlightResult: {
						headline: { value: data.meta?.title || '' },
						description: { value: data.excerpt || '' }
					}
				};
			})
		);

		return { hits: results };
	} catch (e) {
		console.error('Pagefind error:', e);
		return { hits: [] };
	}
}

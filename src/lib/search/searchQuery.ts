import { browser } from '$app/environment';

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

let pagefindModule: any = null;

async function loadPagefind(): Promise<any> {
	if (!browser) return null;
	if (pagefindModule) return pagefindModule;

	try {
		console.log('[Pagefind] Loading...');
		// Use Function constructor to avoid Vite processing
		const importFn = new Function('url', 'return import(url)');
		pagefindModule = await importFn('/pagefind/pagefind.js');
		console.log('[Pagefind] Module loaded:', pagefindModule);
		console.log('[Pagefind] Available functions:', Object.keys(pagefindModule));
		await pagefindModule.init();
		console.log('[Pagefind] Initialized');
		return pagefindModule;
	} catch (e) {
		console.error('[Pagefind] Failed to load:', e);
		return null;
	}
}

export async function searchQuery(query: string): Promise<SearchResponse> {
	if (!browser || query.length < 2) {
		return { hits: [] };
	}

	try {
		const pf = await loadPagefind();
		if (!pf) {
			console.error('[Pagefind] No module available');
			return { hits: [] };
		}

		console.log('[Pagefind] Searching for:', query);
		const search = await pf.search(query);
		console.log('[Pagefind] Search result:', search);

		if (!search?.results || search.results.length === 0) {
			return { hits: [] };
		}

		const results = await Promise.all(
			search.results.slice(0, 15).map(async (result: any) => {
				const data = await result.data();
				// Remove leading slash, trailing slash, and .html extension
				const slug = data.url
					.replace(/^\//, '')
					.replace(/\/$/, '')
					.replace(/\.html$/, '');
				return {
					objectID: data.url,
					url_slug: slug,
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
		console.error('Pagefind search error:', e);
		return { hits: [] };
	}
}

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
		// Use Function constructor to avoid Vite processing
		const importFn = new Function('url', 'return import(url)');
		pagefindModule = await importFn('/pagefind/pagefind.js');
		await pagefindModule.init();
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
			return { hits: [] };
		}

		const search = await pf.search(query);

		if (!search?.results || search.results.length === 0) {
			return { hits: [] };
		}

		// Load data for all results first
		const allResults = await Promise.all(
			search.results.slice(0, 50).map(async (result: any) => {
				const data = await result.data();
				return data;
			})
		);

		// Filter to only include article pages (root level, no subdirectories)
		const excludedPaths = ['/files/', '/archiv', '/api/', '/nastroje/', '/kontakt', '/preview/', '/admin'];
		const articleResults = allResults.filter((data: any) => {
			const url = data.url || '';
			// Exclude paths that are not articles
			if (excludedPaths.some((path) => url.includes(path))) {
				return false;
			}
			// Only include root-level pages (single path segment)
			const cleanUrl = url.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
			return cleanUrl.length > 0 && !cleanUrl.includes('/');
		});

		const results = articleResults.slice(0, 15).map((data: any) => {
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
		});

		return { hits: results };
	} catch (e) {
		console.error('Pagefind search error:', e);
		return { hits: [] };
	}
}

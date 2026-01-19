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
		// Dynamic import via Function constructor bypasses Vite's static analysis,
		// allowing runtime loading of Pagefind which is generated during build
		const importFn = new Function('url', 'return import(url)');
		pagefindModule = await importFn('/pagefind/pagefind.js');
		// Explicitly set bundlePath to ensure Pagefind can find its metadata files
		// This is needed because dynamic imports don't preserve import.meta.url context
		await pagefindModule.options({ bundlePath: '/pagefind/' });
		return pagefindModule;
	} catch (e) {
		console.error('[Pagefind] Failed to load:', e);
		return null;
	}
}

// Preload Pagefind when search modal opens for faster first search
export function preloadPagefind(): void {
	loadPagefind();
}

// Decode HTML entities in text
function decodeHtmlEntities(text: string): string {
	const textarea = document.createElement('textarea');
	textarea.innerHTML = text;
	return textarea.value;
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

		// Load data for top results (index contains only articles from markdown)
		const resultsData = await Promise.all(
			search.results.slice(0, 15).map((result: any) => result.data())
		);

		const results = resultsData.map((data: any) => {
			const slug = data.url
				.replace(/^\//, '')
				.replace(/\/$/, '')
				.replace(/\.html$/, '');
			const title = decodeHtmlEntities(data.meta?.title || '');
			const excerpt = data.excerpt || '';
			return {
				objectID: data.url,
				url_slug: slug,
				title,
				headline: title,
				description: excerpt,
				_highlightResult: {
					headline: { value: title },
					description: { value: excerpt }
				}
			};
		});

		return { hits: results };
	} catch (e) {
		console.error('Pagefind search error:', e);
		return { hits: [] };
	}
}

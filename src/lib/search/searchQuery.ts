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

export async function searchQuery(query: string): Promise<SearchResponse> {
	if (query.length < 2) {
		return { hits: [] };
	}

	const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
	return response.json();
}

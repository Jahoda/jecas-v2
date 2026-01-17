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

interface IndexEntry {
	id: string;
	s: string; // url_slug
	t: string; // title
	h: string; // headline
	d: string; // description
	g: string[]; // tags
	c: string; // content (text without HTML)
}

let indexCache: IndexEntry[] | null = null;
let indexPromise: Promise<IndexEntry[]> | null = null;

async function loadIndex(): Promise<IndexEntry[]> {
	if (indexCache) return indexCache;
	if (indexPromise) return indexPromise;

	indexPromise = fetch('/search-index.json')
		.then((res) => res.json())
		.then((data) => {
			indexCache = data;
			return data;
		});

	return indexPromise;
}

function removeDiacritics(str: string): string {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatches(text: string, query: string): string {
	if (!query || !text) return text;

	const normalizedQuery = removeDiacritics(query.toLowerCase());
	const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 1);

	if (words.length === 0) return text;

	const pattern = new RegExp(`(${words.map((w) => escapeRegex(w)).join('|')})`, 'gi');
	const normalizedText = removeDiacritics(text);

	let result = '';
	let lastIndex = 0;

	for (const match of normalizedText.matchAll(pattern)) {
		const start = match.index!;
		const end = start + match[0].length;
		result += text.slice(lastIndex, start);
		result += `<em>${text.slice(start, end)}</em>`;
		lastIndex = end;
	}
	result += text.slice(lastIndex);

	return result;
}

function calculateScore(entry: IndexEntry, words: string[]): number {
	let score = 0;

	const title = removeDiacritics(entry.t.toLowerCase());
	const headline = removeDiacritics(entry.h.toLowerCase());
	const description = removeDiacritics(entry.d.toLowerCase());
	const tags = entry.g.map((t) => removeDiacritics(t.toLowerCase()));
	const content = removeDiacritics(entry.c.toLowerCase());

	for (const word of words) {
		if (title.includes(word)) score += 100;
		if (headline.includes(word)) score += 80;
		if (tags.some((t) => t.includes(word))) score += 60;
		if (description.includes(word)) score += 40;
		if (content.includes(word)) score += 20;
	}

	return score;
}

export async function searchQuery(query: string): Promise<SearchResponse> {
	if (query.length < 2) {
		return { hits: [] };
	}

	const index = await loadIndex();
	const normalizedQuery = removeDiacritics(query.toLowerCase());
	const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 1);

	if (words.length === 0) {
		return { hits: [] };
	}

	const scored = index
		.map((entry) => ({
			entry,
			score: calculateScore(entry, words)
		}))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 15);

	const hits: SearchHit[] = scored.map(({ entry }) => ({
		objectID: entry.id,
		url_slug: entry.s,
		title: entry.t,
		headline: entry.h,
		description: entry.d,
		tags: entry.g,
		_highlightResult: {
			headline: { value: highlightMatches(entry.h, query) },
			description: { value: highlightMatches(entry.d, query) }
		}
	}));

	return { hits };
}

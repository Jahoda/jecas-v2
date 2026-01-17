import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllPosts, type Post } from '$lib/post/post';

function removeDiacritics(str: string): string {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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

function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function calculateScore(post: Post, query: string): number {
	const normalizedQuery = removeDiacritics(query.toLowerCase());
	const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 1);

	if (words.length === 0) return 0;

	let score = 0;

	const title = removeDiacritics(post.title.toLowerCase());
	const headline = removeDiacritics(post.headline.toLowerCase());
	const description = removeDiacritics(post.description.toLowerCase());
	const tags = (post.tags || []).map((t) => removeDiacritics(t.toLowerCase()));

	for (const word of words) {
		// Exact match in title = highest score
		if (title.includes(word)) score += 100;
		// Exact match in headline
		if (headline.includes(word)) score += 80;
		// Match in tags
		if (tags.some((t) => t.includes(word))) score += 60;
		// Match in description
		if (description.includes(word)) score += 40;
	}

	// Bonus for title starting with query
	if (title.startsWith(normalizedQuery)) score += 50;

	return score;
}

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q') || '';

	if (query.length < 2) {
		return json({ hits: [] });
	}

	const allPosts = await getAllPosts();

	const scored = allPosts
		.map((post) => ({
			post,
			score: calculateScore(post, query)
		}))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 15);

	const hits = scored.map(({ post }) => ({
		objectID: post.id,
		url_slug: post.url_slug,
		title: post.title,
		headline: post.headline,
		description: post.description,
		tags: post.tags,
		_highlightResult: {
			headline: { value: highlightMatches(post.headline, query) },
			description: { value: highlightMatches(post.description, query) }
		}
	}));

	return json({ hits });
};

import type { EntryGenerator } from './$types';

// Enable static pre-rendering for all post and tag pages
export const prerender = true;

// Generate entries for all posts and tags at build time
// Note: Drafts are excluded from prerendering to stay under the 2048 route limit
// Exception: kontakt page is explicitly included
export const entries: EntryGenerator = async () => {
	const { getAllPosts } = await import('$lib/post/post');
	const { getAllUsedTags } = await import('$lib/tag/tags');

	const posts = await getAllPosts();
	const tags = await getAllUsedTags();

	// Debug: Check if js-parsovani-cisel is in posts
	const jsParsovani = posts.find((p) => p.url_slug === 'js-parsovani-cisel');
	if (!jsParsovani) {
		console.warn('WARNING: js-parsovani-cisel NOT found in getAllPosts()!');
		console.warn('Total posts:', posts.length);
	} else {
		console.log('OK: js-parsovani-cisel found, date:', jsParsovani.date);
	}

	const postEntries = posts.map((post) => ({ slug: post.url_slug }));
	const tagEntries = tags.map((tag) => ({ slug: tag.url_slug }));

	return [{ slug: 'kontakt' }, ...postEntries, ...tagEntries];
};

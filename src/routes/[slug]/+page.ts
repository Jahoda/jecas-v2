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

	// Debug: log entry counts
	console.log(`[entries] Posts: ${posts.length}, Tags: ${tags.length}`);
	console.log(`[entries] Tag 'hacky' in list: ${tags.some((t) => t.url_slug === 'hacky')}`);

	const postEntries = posts.map((post) => ({ slug: post.url_slug }));
	const tagEntries = tags.map((tag) => ({ slug: tag.url_slug }));

	return [{ slug: 'kontakt' }, ...postEntries, ...tagEntries];
};

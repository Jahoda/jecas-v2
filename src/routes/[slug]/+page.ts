import type { EntryGenerator } from './$types';

// Enable static pre-rendering for all post and tag pages
export const prerender = true;

// Generate entries for all posts and tags at build time
export const entries: EntryGenerator = async () => {
	const { getAllPosts, getAllDrafts } = await import('$lib/post/post');
	const { getAllUsedTags } = await import('$lib/tag/tags');

	const posts = await getAllPosts();
	const drafts = await getAllDrafts();
	const tags = await getAllUsedTags();

	const postEntries = posts.map((post) => ({ slug: post.url_slug }));
	const draftEntries = drafts.map((draft) => ({ slug: draft.url_slug }));
	const tagEntries = tags.map((tag) => ({ slug: tag.url_slug }));

	return [...postEntries, ...draftEntries, ...tagEntries];
};

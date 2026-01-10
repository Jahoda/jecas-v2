import type { EntryGenerator } from './$types';
import { env } from '$env/dynamic/private';

// Enable static pre-rendering for all post and tag pages
export const prerender = true;

// Limit prerendering on Vercel preview deployments for faster builds
const isPreviewBuild = env.VERCEL_ENV === 'preview';
const PREVIEW_POST_LIMIT = 5;

// Generate entries for all posts and tags at build time
// Note: Drafts are excluded from prerendering to stay under the 2048 route limit
// Exception: kontakt page is explicitly included
// On preview deployments, only prerender a few recent posts to speed up builds
export const entries: EntryGenerator = async () => {
	const { getAllPosts } = await import('$lib/post/post');
	const { getAllUsedTags } = await import('$lib/tag/tags');

	const posts = await getAllPosts();
	const tags = await getAllUsedTags();

	const limitedPosts = isPreviewBuild ? posts.slice(0, PREVIEW_POST_LIMIT) : posts;
	const limitedTags = isPreviewBuild ? tags.slice(0, PREVIEW_POST_LIMIT) : tags;

	const postEntries = limitedPosts.map((post) => ({ slug: post.url_slug }));
	const tagEntries = limitedTags.map((tag) => ({ slug: tag.url_slug }));

	return [{ slug: 'kontakt' }, ...postEntries, ...tagEntries];
};

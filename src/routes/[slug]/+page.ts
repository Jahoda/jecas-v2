import type { EntryGenerator } from './$types';
import { env } from '$env/dynamic/private';

// Skip prerendering on Vercel preview deployments for faster builds
// Pages will be rendered on-demand via SSR instead
const isPreviewBuild = env.VERCEL_ENV === 'preview';

// Enable static pre-rendering for post and tag pages (production only)
export const prerender = !isPreviewBuild;

// Generate entries for all posts and tags at build time (production only)
// Note: Drafts are excluded from prerendering to stay under the 2048 route limit
// Exception: kontakt page is explicitly included
export const entries: EntryGenerator = async () => {
	if (isPreviewBuild) {
		return [];
	}

	const { getAllPosts } = await import('$lib/post/post');
	const { getAllUsedTags } = await import('$lib/tag/tags');

	const posts = await getAllPosts();
	const tags = await getAllUsedTags();

	const postEntries = posts.map((post) => ({ slug: post.url_slug }));
	const tagEntries = tags.map((tag) => ({ slug: tag.url_slug }));

	return [{ slug: 'kontakt' }, ...postEntries, ...tagEntries];
};

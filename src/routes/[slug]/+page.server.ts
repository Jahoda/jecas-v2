import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const slugFromPath = (path: string) =>
	path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob(`/content/posts/*.{md,svx,svelte.md}`);

	let match = {};
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = { path, resolver: resolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post) {
		throw error(404); // Couldn't resolve the post
	}

	return {
		frontmatter: post.metadata
	};
};
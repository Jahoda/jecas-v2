import type { TagPost } from '$lib/tag/tags';

export function groupByPageId(pagesTags: TagPost[]) {
	const grouped = pagesTags.reduce<Record<string, string[]>>((acc, pageTag) => {
		const pageSlug = pageTag.page_slug.toString(); // This is now the post slug
		if (!acc[pageSlug]) {
			acc[pageSlug] = [];
		}
		acc[pageSlug].push(pageTag.tag_slug.toString());
		return acc;
	}, {});

	return grouped;
}

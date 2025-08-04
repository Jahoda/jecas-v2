import type { TagPost } from '$lib/tag/tag';

export function groupByPageId(pagesTags: TagPost[]) {
	const grouped = pagesTags.reduce<Record<string, string[]>>((acc, pageTag) => {
		const pageSlug = pageTag.page_id.toString(); // This is now the post slug
		if (!acc[pageSlug]) {
			acc[pageSlug] = [];
		}
		acc[pageSlug].push(pageTag.tag_id.toString());
		return acc;
	}, {});

	return grouped;
}

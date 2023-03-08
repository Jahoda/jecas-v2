import type { TagPost } from '$lib/tag/tag';

export function groupByPageId(pagesTags: TagPost[]) {
	const grouped = pagesTags.reduce<Record<string, number[]>>((acc, pageTag) => {
		const pageId = pageTag.page_id.toString();
		if (!acc[pageId]) {
			acc[pageId] = [];
		}
		acc[pageId].push(pageTag.tag_id);
		return acc;
	}, {});

	return grouped;
}

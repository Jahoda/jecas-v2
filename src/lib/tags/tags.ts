export type PageTag = {
	page_id: number;
	tag_id: number;
};

export function groupByPageId(pagesTags: PageTag[]) {
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

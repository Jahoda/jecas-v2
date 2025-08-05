import type { Tag } from '$lib/tag/tags';

export function postGradient(tags: Tag[]) {
	const tagsColors =
		tags?.map((tag) => tag.background).filter((color: string | null) => color) || [];
	return `linear-gradient(to right top, ${tagsColors.join(',')}, #5b63b9)`;
}

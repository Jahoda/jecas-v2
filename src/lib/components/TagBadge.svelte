<script lang="ts">
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		tag: Tag;
		size?: 'sm' | 'md' | 'lg';
		showCount?: boolean;
	}

	let { tag, size = 'md', showCount = false }: Props = $props();

	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1 text-sm',
		lg: 'px-4 py-2 text-base'
	};
</script>

<a
	href="/{tag.url_slug}"
	class="inline-flex items-center {sizeClasses[
		size
	]} rounded-full font-medium transition-opacity hover:opacity-80"
	style="background-color: {tag.background}; color: {tag.color}"
	title={tag.headline || `View all posts tagged with ${tag.name}`}
>
	{tag.name}
	{#if showCount && tag.usage_count}
		<span class="ml-1 opacity-75">({tag.usage_count})</span>
	{/if}
</a>

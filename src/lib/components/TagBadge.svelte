<script lang="ts">
	import type { PowerfulTag } from '$lib/tag/powerfulTags';
	
	export let tag: PowerfulTag;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let showCount = false;
	
	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1 text-sm',
		lg: 'px-4 py-2 text-base'
	};
</script>

<a
	href="/{tag.url_slug}"
	class="inline-flex items-center {sizeClasses[size]} rounded-full font-medium hover:opacity-80 transition-opacity"
	style="background-color: {tag.background}; color: {tag.color}"
	title={tag.headline || `View all posts tagged with ${tag.name}`}
>
	{tag.name}
	{#if showCount && tag.usage_count}
		<span class="ml-1 opacity-75">({tag.usage_count})</span>
	{/if}
</a>
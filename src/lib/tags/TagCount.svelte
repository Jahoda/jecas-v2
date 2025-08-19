<script lang="ts">
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		tag: Tag;
		max: number;
	}

	let { tag, max }: Props = $props();

	let percent = $derived(((tag.count || 0) / max) * 100);
</script>

<a href={tag.url_slug} class="group relative flex overflow-hidden rounded-md">
	<div class="absolute top-0 left-0 h-full w-full bg-slate-300 opacity-50 dark:bg-slate-600"></div>
	<div
		class="flex h-11 items-center justify-between gap-2 rounded-l-md border border-white/25 pr-2 pl-4 whitespace-nowrap shadow-black drop-shadow-2xl transition-all [text-shadow:0_0_1px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.2)] group-hover:!w-full {percent <
		0.3
			? 'text-xs'
			: ''}"
		style="background: {tag.background}; color: {tag.color}; width: {percent}%"
	>
		{tag.name}

		<div class="rounded-md bg-slate-800/10 px-2 py-1 text-white">
			{tag.count}
		</div>
	</div>
</a>

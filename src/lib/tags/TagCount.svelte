<script lang="ts">
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		tag: Tag;
		max: number;
	}

	let { tag, max }: Props = $props();

	let percent = $derived(((tag.count || 0) / max) * 100);
</script>

<a href={tag.url_slug} class="group relative flex overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
	<div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"></div>
	<div
		class="flex h-14 items-center justify-between gap-3 rounded-xl border-2 border-white/30 pr-3 pl-5 whitespace-nowrap shadow-lg drop-shadow-2xl transition-all duration-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] group-hover:!w-full group-hover:scale-105 {percent <
		0.3
			? 'text-sm font-medium'
			: 'text-base font-semibold'}"
		style="background: {tag.background}; color: {tag.color}; width: {percent}%"
	>
		<span class="transition-transform duration-300 group-hover:scale-110">{tag.name}</span>

		<div class="rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1.5 text-white font-bold shadow-md">
			{tag.count}
		</div>
	</div>
</a>

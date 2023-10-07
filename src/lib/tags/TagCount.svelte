<script lang="ts">
	import type { Tag } from '$lib/tag/tag';

	export let tag: Tag;
	export let max: number;

	$: percent = (tag.count / max) * 100;
</script>

<a href={tag.url_slug} class="group relative flex overflow-hidden rounded-md">
	<div class="absolute left-0 top-0 h-full w-full bg-slate-300 opacity-50 dark:bg-slate-600" />
	<div
		class="flex h-11 items-center justify-between gap-2 whitespace-nowrap border border-white/25 pl-4 pr-2 shadow-black drop-shadow-2xl transition-all [text-shadow:0_0_1px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.2)] group-hover:!w-full {percent <
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

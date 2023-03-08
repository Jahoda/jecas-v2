<script lang="ts">
	import type { Tag } from '$lib/tag/tag';

	export let tag: Tag;
	export let max: number;

	$: percent = (tag.count / max) * 100;
</script>

<a href={tag.url_slug} class="group rounded-md overflow-hidden flex relative">
	<div class="absolute top-0 left-0 w-full h-full opacity-50 bg-slate-300 dark:bg-slate-600" />
	<div
		class="transition-all [text-shadow:0_0_1px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.2)] whitespace-nowrap group-hover:!w-full drop-shadow-2xl shadow-black border flex border-white/25 h-11 pl-4 pr-2 items-center justify-between gap-2 {percent <
		0.3
			? 'text-xs'
			: ''}"
		style="background: {tag.background}; color: {tag.color}; width: {percent}%"
	>
		{tag.name}

		<div class="bg-slate-800/10 rounded-md py-1 px-2 text-white">
			{tag.count}
		</div>
	</div>
</a>

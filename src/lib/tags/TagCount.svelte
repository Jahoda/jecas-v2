<script lang="ts">
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		tag: Tag;
		max: number;
	}

	let { tag, max }: Props = $props();

	let percent = $derived(((tag.count || 0) / max) * 100);
</script>

<a
	href={tag.url_slug}
	class="group relative flex overflow-hidden border border-slate-200 bg-white transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
>
	<div class="absolute top-0 left-0 h-full bg-slate-100 dark:bg-slate-800" style="width: {percent}%"></div>
	<div
		class="relative flex h-11 w-full items-center justify-between gap-2 px-4 text-slate-900 dark:text-slate-100"
	>
		<span class="flex items-center gap-2">
			<span class="h-3 w-3 rounded-sm" style="background: {tag.background};"></span>
			{tag.name}
		</span>

		<span class="text-xs text-slate-500 dark:text-slate-400">
			{tag.count}
		</span>
	</div>
</a>

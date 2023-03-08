<script lang="ts">
	import type { Tag } from '$lib/tag/tag';

	export let title: Tag['name'];
	export let background: Tag['background'];
	export let color: Tag['color'];
	export let href: Tag['url_slug'];
	export let small = false;
</script>

<a
	{href}
	class="group border bg-slate-600 rounded-md  flex border-white/25 text-white [text-shadow:0_0_1px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.2)]"
	style="background: {background}; color: {color}"
>
	<div
		class="group-hover:bg-white/20 flex px-2  {small ? 'text-xs py-0.5' : 'py-1'} transition-colors"
	>
		{title}
	</div>
</a>

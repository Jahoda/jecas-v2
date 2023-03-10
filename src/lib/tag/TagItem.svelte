<script lang="ts">
	import type { Tag } from '$lib/tag/tag';

	export let title: Tag['name'];
	export let background: Tag['background'];
	export let color: Tag['color'];
	export let href: Tag['url_slug'] | null = null;
	export let small = false;
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class="group border bg-slate-600 rounded-md inline-flex border-white/25 text-white transition-colors"
	style="background: {background}; color: {color}"
>
	<div
		class="{href ? 'group-hover:bg-white/20' : ''} flex px-2  {small
			? 'text-xs py-0.5'
			: 'py-1'} transition-colors"
	>
		{title}
	</div>
	<slot />
</svelte:element>

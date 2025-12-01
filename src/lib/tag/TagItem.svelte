<script lang="ts">
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		title: Tag['name'];
		background: Tag['background'];
		color: Tag['color'];
		href?: Tag['url_slug'] | null;
		small?: boolean;
		children?: import('svelte').Snippet;
	}

	let { title, background, color, href = null, small = false, children }: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	href={href ? `/${href}` : null}
	class="group inline-flex rounded-xl border-2 border-white/30 bg-slate-600 text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-0.5"
	style="background: {background}; color: {color}"
>
	<div
		class="{href ? 'group-hover:bg-white/20' : ''} flex px-3 {small
			? 'py-1 text-xs font-medium'
			: 'py-1.5 text-sm font-semibold'} transition-all duration-300"
	>
		{title}
	</div>
	{@render children?.()}
</svelte:element>

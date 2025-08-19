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
	class="group inline-flex rounded-md border border-white/25 bg-slate-600 text-white transition-colors"
	style="background: {background}; color: {color}"
>
	<div
		class="{href ? 'group-hover:bg-white/20' : ''} flex px-2 {small
			? 'py-0.5 text-xs'
			: 'py-1'} transition-colors"
	>
		{title}
	</div>
	{@render children?.()}
</svelte:element>

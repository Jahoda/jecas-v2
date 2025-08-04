<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let scrollContainer: HTMLElement;
	let showTopShadow = $state(false);
	let showBottomShadow = $state(false);

	function updateShadows() {
		if (!scrollContainer) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
		showTopShadow = scrollTop > 0;
		showBottomShadow = scrollTop < scrollHeight - clientHeight;
	}

	onMount(() => {
		updateShadows();
	});
</script>

<div class="relative">
	<div
		class="pointer-events-none absolute top-0 right-0 left-0 z-10 h-4 bg-gradient-to-b from-slate-50/80 to-transparent transition-opacity duration-200 dark:from-slate-800 {showTopShadow
			? 'opacity-100'
			: 'opacity-0'}"
	></div>

	<div
		class="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-4 bg-gradient-to-t from-slate-50/80 to-transparent transition-opacity duration-200 dark:from-slate-800 {showBottomShadow
			? 'opacity-100'
			: 'opacity-0'}"
	></div>

	<div bind:this={scrollContainer} class="max-h-22 overflow-y-auto" onscroll={updateShadows}>
		{@render children()}
	</div>
</div>

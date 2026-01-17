<script lang="ts">
	import { run } from 'svelte/legacy';

	import SearchHandler from '$lib/search/SearchHandler.svelte';
	import SearchIcon from '$lib/search/SearchIcon.svelte';

	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	let isSearchOpen = $state(false);

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			isSearchOpen = false;
		} else if (event.metaKey && event.key === 'k') {
			isSearchOpen = true;
		}
	};

	function handleClose() {
		isSearchOpen = false;
	}

	let hasMounted = $state(false);

	onMount(() => {
		hasMounted = true;
	});

	run(() => {
		if (hasMounted) {
			document.body.classList.toggle('overflow-hidden', isSearchOpen);
			document.body.classList.toggle('is-modal-open', isSearchOpen);

			if ($navigating) {
				handleClose();
			}
		}
	});
</script>

{#if isSearchOpen}
	<div
		class="fixed inset-0 z-20 flex h-screen w-screen items-end justify-center text-left whitespace-normal md:items-start md:py-8"
	>
		<div
			transition:fade={{ duration: 300 }}
			aria-hidden="true"
			class="absolute inset-0 bg-black/60 backdrop-blur"
			onclick={handleClose}
		></div>

		<div
			transition:fly={{ y: 50, duration: 200 }}
			class="relative flex max-h-full w-full flex-col overflow-hidden border border-slate-200 bg-white text-slate-900 md:max-h-[95vh] md:max-w-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
		>
			<SearchHandler on:close={handleClose} />
		</div>
	</div>
{/if}

<button
	onclick={() => (isSearchOpen = true)}
	type="button"
	class="flex h-10 w-10 items-center gap-x-3 border border-slate-200 bg-white text-left text-sm text-slate-500 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-300 focus:outline-none max-sm:justify-center sm:w-72 sm:px-4 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
>
	<SearchIcon />
	<span class="flex-auto max-sm:hidden"> Rychlé hledání </span>
	<kbd class="font-sans text-xs font-medium max-sm:hidden text-slate-400 dark:text-slate-500">
		<abbr title="Command" class="no-underline">⌘</abbr> K
	</kbd>
</button>

<svelte:window onkeydown={handleKeydown} />

<style>
	:global(.is-modal-open) {
		border-right: var(--scrollbar-width) solid transparent;
	}
</style>

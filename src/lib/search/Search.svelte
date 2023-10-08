<script lang="ts">
	import SearchHandler from '$lib/search/SearchHandler.svelte';
	import SearchIcon from '$lib/search/SearchIcon.svelte';

	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	let isSearchOpen = false;

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

	let hasMounted = false;

	onMount(() => {
		hasMounted = true;
	});

	$: {
		if (hasMounted) {
			document.body.classList.toggle('overflow-hidden', isSearchOpen);
			document.body.classList.toggle('is-modal-open', isSearchOpen);

			if ($navigating) {
				handleClose();
			}
		}
	}
</script>

{#if isSearchOpen}
	<div
		class="fixed inset-0 z-20 flex h-screen w-screen items-end justify-center whitespace-normal text-left md:items-start md:py-8"
	>
		<div
			transition:fade={{ duration: 300 }}
			aria-hidden="true"
			class="absolute inset-0 bg-black/60 backdrop-blur"
			on:click={handleClose}
		/>

		<div
			transition:fly={{ y: 50, duration: 200 }}
			class="rounded-t-x relative flex max-h-full w-full flex-col overflow-hidden bg-white text-gray-800 dark:bg-slate-800 dark:text-white md:max-h-[95vh] md:max-w-lg md:rounded-xl"
		>
			<SearchHandler on:close={handleClose} />
		</div>
	</div>
{/if}

<button
	on:click={() => (isSearchOpen = true)}
	type="button"
	class="flex h-10 w-10 items-center space-x-3 rounded-lg bg-white text-left text-sm text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-blue-dark/30 dark:hover:ring-blue-700 max-sm:justify-center sm:w-72 sm:px-4"
>
	<SearchIcon />
	<span class="flex-auto max-sm:hidden"> Rychlé hledání </span>
	<kbd class="font-sans font-semibold dark:text-slate-500 max-sm:hidden">
		<abbr title="Command" class="text-slate-300 no-underline dark:text-slate-500">⌘</abbr> K
	</kbd>
</button>

<svelte:window on:keydown={handleKeydown} />

<style>
	:global(.is-modal-open) {
		border-right: var(--scrollbar-width) solid transparent;
	}
</style>

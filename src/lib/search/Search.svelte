<script lang="ts">
	import SearchHandler from '$lib/search/SearchHandler.svelte';
	import SearchIcon from '$lib/search/SearchIcon.svelte';

	import { fade } from 'svelte/transition';

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
</script>

{#if isSearchOpen}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-20 flex h-screen w-screen items-end justify-center whitespace-normal text-left md:items-center"
	>
		<div
			aria-hidden="true"
			class="absolute h-full w-full bg-black/60 backdrop-blur"
			on:click={handleClose}
		/>

		<div
			class="relative flex max-h-[95vh] w-full flex-col md:max-w-lg rounded-t-x overflow-hidden text-gray-800 dark:text-white bg-white dark:bg-slate-800 md:rounded-xl"
		>
			<SearchHandler on:close={handleClose} />
		</div>
	</div>
{/if}

<button
	on:click={() => (isSearchOpen = true)}
	type="button"
	class="max-md:hidden flex items-center w-72 text-left text-sm space-x-3 px-4 h-10 bg-white dark:bg-blue-dark/30 ring-1 ring-slate-900/10 hover:ring-slate-300 dark:hover:ring-blue-700 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400"
>
	<SearchIcon />
	<span class="flex-auto"> Rychlé hledání </span>
	<kbd class="font-sans font-semibold dark:text-slate-500">
		<abbr title="Command" class="no-underline text-slate-300 dark:text-slate-500">⌘</abbr> K
	</kbd>
</button>

<svelte:window on:keydown={handleKeydown} />

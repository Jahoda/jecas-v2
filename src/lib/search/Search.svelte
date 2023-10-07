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

			if ($navigating) {
				handleClose();
			}
		}
	}
</script>

{#if isSearchOpen}
	<div
		class="fixed left-0 top-0 z-20 flex h-screen w-screen items-end justify-center whitespace-normal text-left md:items-center"
	>
		<div
			transition:fade={{ duration: 300 }}
			aria-hidden="true"
			class="absolute h-full w-full bg-black/60 backdrop-blur"
			on:click={handleClose}
		/>

		<div
			transition:fly={{ y: 50, duration: 200 }}
			class="rounded-t-x relative flex max-h-[95vh] w-full flex-col overflow-hidden bg-white text-gray-800 dark:bg-slate-800 dark:text-white md:max-w-lg md:rounded-xl"
		>
			<SearchHandler on:close={handleClose} />
		</div>
	</div>
{/if}

<button
	on:click={() => (isSearchOpen = true)}
	type="button"
	class="flex h-10 w-72 items-center space-x-3 rounded-lg bg-white px-4 text-left text-sm text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-blue-dark/30 dark:hover:ring-blue-700 max-md:hidden"
>
	<SearchIcon />
	<span class="flex-auto"> Rychlé hledání </span>
	<kbd class="font-sans font-semibold dark:text-slate-500">
		<abbr title="Command" class="text-slate-300 no-underline dark:text-slate-500">⌘</abbr> K
	</kbd>
</button>

<svelte:window on:keydown={handleKeydown} />

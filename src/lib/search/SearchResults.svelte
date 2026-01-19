<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SearchHit } from '$lib/search/searchQuery';
	import SearchHitComponent from '$lib/search/SearchHit.svelte';
	import { flip } from 'svelte/animate';

	interface Props {
		hits?: SearchHit[];
		query: string;
		isLoading?: boolean;
	}

	let { hits = [], query, isLoading = false }: Props = $props();

	let currentIndex = $state(0);

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			goto(`/${hits[currentIndex].url_slug}`);
		} else if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
			const direction = event.key === 'ArrowDown' ? -1 : 1;
			const newIndex = (currentIndex - direction + hits.length) % hits.length;
			currentIndex = newIndex;
		}
	};

	function scrollToElement(index: number) {
		const element = document.getElementById(`searchResult-${index}`);
		if (element) {
			element.focus();
		}
	}

	$effect(() => {
		scrollToElement(currentIndex);
	});
</script>

{#if query.length < 2}
	<p class="text-gray-500 dark:text-gray-400">Začněte psát pro vyhledávání...</p>
{:else if isLoading}
	<div class="flex items-center justify-center py-8">
		<div class="loader"></div>
	</div>
{:else if hits.length === 0}
	<p>
		O „{query}" tu nic není,
		<a href="/kontakt" class="text-blue-500 underline hover:no-underline">napište mi</a>, jestli vás
		toto téma zajímá
	</p>
{:else}
	{#each hits as hit, index (hit.objectID)}
		<a
			href="/{hit.url_slug}"
			class="block pt-4 outline-none first:pt-0"
			id="searchResult-{index}"
			tabindex="-1"
			animate:flip={{ duration: 200 }}
		>
			<SearchHitComponent
				{hit}
				selected={index === currentIndex}
				onhover={() => (currentIndex = index)}
			/>
		</a>
	{/each}
{/if}

<svelte:window onkeydown={handleKeydown} />

<style>
	.loader {
		width: 32px;
		height: 32px;
		border: 3px solid #e5e7eb;
		border-top-color: #3b82f6;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	:global(mark) {
		background-color: #fef08a;
		color: #1f2937;
		padding: 0.1em 0.2em;
		border-radius: 0.2em;
	}

	:global(.dark mark) {
		background-color: #fef08a;
		color: #1f2937;
	}
</style>

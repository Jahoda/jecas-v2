<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SearchHitItem } from '$lib/search/searchQueryAlgolia';
	import SearchHit from '$lib/search/SearchHit.svelte';
	import { flip } from 'svelte/animate';

	export let hits: SearchHitItem[] = [];
	export let query: string;

	let currentIndex = 0;

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

	$: scrollToElement(currentIndex);
</script>

{#each hits as hit, index (hit.url_slug)}
	<div class="pt-4 first:pt-0" animate:flip={{ duration: 200 }}>
		<div id="searchResult-{index}" tabindex="-1" class="outline-none">
			<SearchHit {hit} selected={index === currentIndex} />
		</div>
	</div>
{:else}
	<p>
		O „{query}“ tu nic není,
		<a href="/kontakt" class="underline hover:no-underline text-blue-500">napište mi</a>, jestli vás
		toto téma zajímá
	</p>
{/each}

<svelte:window on:keydown={handleKeydown} />

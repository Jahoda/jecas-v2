<script lang="ts">
	import Kbd from '$lib/kbd/Kbd.svelte';
	import { createEventDispatcher } from 'svelte';
	import SearchIcon from './SearchIcon.svelte';

	export let query: string;

	const searchExamples = [
		'svg',
		'json',
		'windows',
		'viewport',
		'media',
		'audio',
		'float',
		'random',
		'css selektory'
	];

	function getRandomItem(items: string[]): string {
		const index = Math.floor(Math.random() * items.length);
		return items[index];
	}

	const dispatch = createEventDispatcher();
	function handleEscClick() {
		dispatch('close');
	}
</script>

<div class="flex items-center gap-2">
	<label for="search">
		<SearchIcon />
	</label>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		enterkeyhint="go"
		spellcheck="false"
		bind:value={query}
		autofocus
		type="search"
		id="search"
		name="search"
		class="flex h-12 flex-1 border-none outline-none focus:ring-0 dark:bg-slate-800"
		placeholder={`např. ${getRandomItem(searchExamples)}`}
		on:input
	/>

	<button class="flex" on:click={handleEscClick}>
		<Kbd>ESC</Kbd>
	</button>
</div>

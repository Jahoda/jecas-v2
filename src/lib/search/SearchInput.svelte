<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import Kbd from '$lib/kbd/Kbd.svelte';
	import { createEventDispatcher } from 'svelte';
	import SearchIcon from './SearchIcon.svelte';

	interface Props {
		query: string;
	}

	let { query = $bindable() }: Props = $props();

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
	<!-- svelte-ignore a11y_autofocus -->
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
		oninput={bubble('input')}
	/>

	<button class="flex" onclick={handleEscClick}>
		<Kbd>ESC</Kbd>
	</button>
</div>

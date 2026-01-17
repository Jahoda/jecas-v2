<script lang="ts">
	import { run } from 'svelte/legacy';

	import SearchInput from '$lib/search/SearchInput.svelte';

	import { searchQuery, type SearchHit } from '$lib/search/searchQuery';
	import SearchResults from '$lib/search/SearchResults.svelte';

	let query = $state('');
	let result: SearchHit[] = $state([]);

	run(() => {
		searchQuery(query).then((response) => {
			result = response.hits || [];
		});
	});
</script>

<div class="px-3">
	<SearchInput bind:query on:close />
</div>

<div class="border-t dark:border-t-slate-700"></div>

<div class="overflow-y-auto">
	<div class="p-3">
		<SearchResults {query} hits={result} />
	</div>
</div>

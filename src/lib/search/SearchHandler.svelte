<script lang="ts">
	import SearchInput from '$lib/search/SearchInput.svelte';

	import { searchQuery, type SearchHit } from '$lib/search/searchQuery';
	import SearchResults from '$lib/search/SearchResults.svelte';

	let query = $state('');
	let debouncedQuery = $state('');
	let result: SearchHit[] = $state([]);
	let debounceTimer: ReturnType<typeof setTimeout>;

	$effect(() => {
		const q = query; // track dependency
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			debouncedQuery = q;
		}, 200);
	});

	$effect(() => {
		const q = debouncedQuery; // track dependency
		if (q) {
			searchQuery(q).then((response) => {
				result = response.hits || [];
			});
		} else {
			result = [];
		}
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

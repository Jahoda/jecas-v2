<script lang="ts">
	import SearchInput from '$lib/search/SearchInput.svelte';

	import { searchQuery, type SearchHit } from '$lib/search/searchQuery';
	import SearchResults from '$lib/search/SearchResults.svelte';

	let query = $state('');
	let result: SearchHit[] = $state([]);
	let isLoading = $state(false);

	$effect(() => {
		const q = query;
		if (q.length >= 2) {
			isLoading = true;
			searchQuery(q).then((response) => {
				result = response.hits || [];
				isLoading = false;
			});
		} else {
			result = [];
			isLoading = false;
		}
	});
</script>

<div class="px-3">
	<SearchInput bind:query on:close />
</div>

<div class="border-t dark:border-t-slate-700"></div>

<div class="overflow-y-auto">
	<div class="p-3">
		<SearchResults {query} hits={result} {isLoading} />
	</div>
</div>

<script lang="ts">
	import SearchInput from '$lib/search/SearchInput.svelte';

	import { searchQueryAlgolia, type HitPost } from '$lib/search/searchQueryAlgolia';
	import SearchResults from '$lib/search/SearchResults.svelte';

	let query = '';
	let result: HitPost[] = [];

	$: {
		searchQueryAlgolia(query).then((response: any) => {
			result = response.results?.[0]?.hits || response.hits || [];
		});
	}
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

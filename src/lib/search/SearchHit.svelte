<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { HitPost } from '$lib/search/searchQueryAlgolia';

	export let hit: HitPost;
	export let selected = false;

	$: title = hit._snippetResult?.headline?.value || hit.headline;
	$: description = hit._snippetResult?.description?.value || hit.description;
</script>

<MainPost {title} {description} href={hit.url_slug} neutral={!selected} small />

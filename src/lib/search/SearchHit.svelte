<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { HitPost } from '$lib/search/searchQueryAlgolia';

	export let hit: HitPost;
	export let selected = false;

	$: title = (hit._highlightResult?.headline as any)?.value || hit.headline;
	$: description = (hit._highlightResult?.description as any)?.value || hit.description;
</script>

<MainPost neutral {title} {description} href={hit.url_slug} {selected} small />

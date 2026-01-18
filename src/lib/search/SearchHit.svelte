<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { SearchHit } from '$lib/search/searchQuery';

	interface Props {
		hit: SearchHit;
		selected?: boolean;
	}

	let { hit, selected = false }: Props = $props();

	let title = $derived(hit._highlightResult?.headline?.value || hit.headline);
	let description = $derived(hit._highlightResult?.description?.value || hit.description);
</script>

<MainPost neutral {title} {description} href={hit.url_slug} {selected} small />

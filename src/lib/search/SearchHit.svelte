<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { HitPost } from '$lib/search/searchQueryAlgolia';

	interface Props {
		hit: HitPost;
		selected?: boolean;
	}

	let { hit, selected = false }: Props = $props();

	let title = $derived((hit._highlightResult?.headline as any)?.value || hit.headline);
	let description = $derived((hit._highlightResult?.description as any)?.value || hit.description);
</script>

<MainPost neutral {title} {description} href={hit.url_slug} {selected} small />

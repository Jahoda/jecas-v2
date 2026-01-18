<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { SearchHit } from '$lib/search/searchQuery';

	interface Props {
		hit: SearchHit;
		selected?: boolean;
	}

	let { hit, selected = false }: Props = $props();

	function stripHtml(html: string): string {
		return html.replace(/<[^>]*>/g, '');
	}

	let title = $derived(stripHtml(hit.title || hit.headline));
	let description = $derived(stripHtml(hit.description));
</script>

<MainPost neutral {title} {description} href={hit.url_slug} {selected} small />

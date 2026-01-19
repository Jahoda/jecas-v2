<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { SearchHit } from '$lib/search/searchQuery';

	interface Props {
		hit: SearchHit;
		selected?: boolean;
		onhover?: () => void;
	}

	let { hit, selected = false, onhover }: Props = $props();

	function stripHtml(html: string): string {
		return html.replace(/<[^>]*>/g, '');
	}

	// Keep only <mark> tags for highlighting, strip everything else
	function sanitizeExcerpt(html: string): string {
		// First escape any existing HTML entities that might be dangerous
		// Then only allow <mark> tags
		return html
			.replace(/<(?!\/?mark\b)[^>]*>/gi, '')
			.replace(/</g, '&lt;')
			.replace(/&lt;(\/?)mark>/gi, '<$1mark>');
	}

	let title = $derived(stripHtml(hit.title || hit.headline));
	let description = $derived(sanitizeExcerpt(hit.description));
</script>

<div onmouseenter={onhover}>
	<MainPost neutral {title} {description} {selected} small slug={hit.url_slug} />
</div>

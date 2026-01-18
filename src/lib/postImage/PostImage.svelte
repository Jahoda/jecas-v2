<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		slug: string;
		lazy?: boolean;
		customImageUrl?: string | null;
	}

	let { slug, lazy = true, customImageUrl = null }: Props = $props();

	let postImageUrl: string | null = $state(null);

	run(() => {
		postImageUrl = customImageUrl || `/files/article/${slug}.svg`;
	});

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		// Fallback to PNG if SVG doesn't exist
		if (img.src.endsWith('.svg')) {
			img.src = img.src.replace(/\.svg$/, '.png');
		}
	}
</script>

<img
	src={postImageUrl}
	fetchpriority={!lazy ? 'high' : null}
	loading={lazy ? 'lazy' : null}
	alt=""
	width="200"
	height="200"
	onerror={handleImageError}
/>

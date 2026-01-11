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
		postImageUrl = customImageUrl || `/files/article/${slug}.png`;
	});
</script>

<img
	src={postImageUrl}
	fetchpriority={!lazy ? 'high' : null}
	loading={lazy ? 'lazy' : null}
	alt=""
	width="200"
	height="200"
/>

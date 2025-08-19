<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		slug: string;
		lazy?: boolean;
	}

	let { slug, lazy = true }: Props = $props();

	let postImageUrl: string | null = $state(null);

	//$: postImageUrl = `https://upipiocepvscgharpdkz.supabase.co/storage/v1/object/public/post-thumbnails/${slug}.png`;
	run(() => {
		postImageUrl = `/files/article/${slug}.png`;
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

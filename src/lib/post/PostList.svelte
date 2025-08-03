<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { Post } from '$lib/post/post';

	export let posts: Post[];
</script>

<div class="grid-cols-repeat-48 grid gap-8">
	{#each posts as post (post.url_slug)}
		<div class="grid grid-cols-1">
			<MainPost
				title={post.headline}
				description={post.description}
				date={post.last_modification}
				href={post.url_slug}
				neutral
				small
				wordCount={post.word_count}
			/>
		</div>
	{/each}
</div>

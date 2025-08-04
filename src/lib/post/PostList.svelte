<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tag';

	export let posts: Post[];
	export let tags: Tag[] = [];
	export let pagesTags: Record<string, string[]> = {};
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
				tags={tags.filter((tag) => pagesTags[post.url_slug]?.includes(tag.id.toString()))}
			/>
		</div>
	{/each}
</div>

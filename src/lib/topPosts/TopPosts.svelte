<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tag';

	export let posts: Post[];
	export let tags: Tag[];
	export let pagesTags: Record<string, number[]>;
</script>

<div class="grid gap-4">
	{#each posts as post}
		<MainPost
			small
			title={post.title}
			description={post.description}
			href={post.url_slug}
			tags={tags.filter((tag) => pagesTags[post.id]?.includes(tag.id))}
		/>
	{/each}
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tags';
	import { getVisitedPosts } from '$lib/visited/visitedPosts';

	interface Props {
		posts: Post[];
		tags?: Tag[];
		pagesTags?: Record<string, string[]>;
	}

	let { posts, tags = [], pagesTags = {} }: Props = $props();

	let visitedSlugs: string[] = $state([]);

	onMount(() => {
		visitedSlugs = getVisitedPosts();
	});
</script>

<div class="grid-cols-repeat-48 grid gap-4 md:gap-8">
	{#each posts as post (post.url_slug)}
		<div class="grid grid-cols-1">
			<MainPost
				title={post.headline}
				description={post.description}
				date={post.last_modification ?? post.date}
				href={post.url_slug}
				neutral
				small
				wordCount={post.word_count}
				tags={tags.filter((tag) => pagesTags[post.url_slug]?.includes(tag.url_slug))}
				visited={visitedSlugs.includes(post.url_slug)}
			/>
		</div>
	{/each}
</div>

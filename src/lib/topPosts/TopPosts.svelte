<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';
	import type { Post } from '$lib/post/post';
	import type { Tag } from '$lib/tag/tags';

	interface Props {
		posts: Post[];
		tags: Tag[];
		pagesTags: Record<string, string[]>;
	}

	let { posts, tags, pagesTags }: Props = $props();
</script>

<div class="grid">
	{#each posts as post, index}
		<div class={index > 0 ? '-mt-px' : ''}>
			<MainPost
				small
				title={post.title}
				description={post.description}
				href={post.url_slug}
				tags={tags.filter((tag) => pagesTags[post.url_slug]?.includes(tag.url_slug))}
			/>
		</div>
	{/each}
</div>

<script lang="ts">
	import MainPost from '$lib/mainPost/MainPost.svelte';

	export let posts: object[];
	export let tags: object[];
	export let pagesTags: object[];
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

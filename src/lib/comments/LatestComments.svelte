<script lang="ts">
	import type { CommentContent } from '$lib/comments/comment';
	import Comment from '$lib/comments/Comment.svelte';
	import { onMount } from 'svelte';

	let comments: CommentContent[] = [];

	async function fetchLatestComments() {
		const response = await fetch(
			'https:////disqus.com/api/3.0/forums/listPosts.json?forum=jecas&limit=10&related=thread&api_key=BwcwyR03Y19LVAHRVIq0Uly6e0L0QOjaIlrpEaUSoAu8hnUZ8iKJoNllOXT2bSue'
		);
		const data = await response.json();

		if (data.code === 0) {
			comments = data.response;
		}
	}
	onMount(fetchLatestComments);
</script>

{#if comments?.length > 0}
	<div class="grid gap-4">
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</div>
{/if}

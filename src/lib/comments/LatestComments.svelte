<script lang="ts">
	import { onMount } from 'svelte';
	import type { CommentContent } from '$lib/comments/comment';
	import Comment from '$lib/comments/Comment.svelte';

	let comments: CommentContent[] = $state([]);
	let loading = $state(true);

	async function fetchLatestComments(): Promise<CommentContent[]> {
		try {
			const response = await fetch(
				'https://disqus.com/api/3.0/forums/listPosts.json?forum=jecas&limit=10&related=thread&api_key=BwcwyR03Y19LVAHRVIq0Uly6e0L0QOjaIlrpEaUSoAu8hnUZ8iKJoNllOXT2bSue'
			);
			const data = await response.json();

			if (data.code === 0) {
				return data.response;
			}
			return [];
		} catch (_e) {
			return [];
		}
	}

	onMount(async () => {
		comments = await fetchLatestComments();
		loading = false;
	});
</script>

{#if loading}
	<div class="grid gap-4">
		<div class="h-20 animate-pulse rounded bg-gray-100"></div>
		<div class="h-20 animate-pulse rounded bg-gray-100"></div>
		<div class="h-20 animate-pulse rounded bg-gray-100"></div>
	</div>
{:else if comments?.length > 0}
	<div class="grid gap-4">
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</div>
{/if}

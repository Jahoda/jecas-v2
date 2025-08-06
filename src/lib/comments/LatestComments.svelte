<script lang="ts">
	import type { CommentContent } from '$lib/comments/comment';
	import Comment from '$lib/comments/Comment.svelte';

	export let comments: CommentContent[] = [];
</script>

{#if comments?.length > 0}
	<div class="grid gap-4">
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</div>
{/if}

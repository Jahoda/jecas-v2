<script lang="ts">
	import Comment from '$lib/comments/Comment.svelte';
	import { onMount } from 'svelte';

	let comments: object[];

	async function fetchLatestComments() {
		const response = await fetch(
			'https:////disqus.com/api/3.0/forums/listPosts.json?forum=jecas&limit=10&related=thread&api_key=BwcwyR03Y19LVAHRVIq0Uly6e0L0QOjaIlrpEaUSoAu8hnUZ8iKJoNllOXT2bSue'
		);
		const data = await response.json();
		comments = data.response;

		console.log(data);
	}
	onMount(fetchLatestComments);
</script>

{#if comments}
	<div class="grid gap-4">
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</div>
{/if}

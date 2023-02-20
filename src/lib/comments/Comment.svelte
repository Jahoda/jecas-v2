<script lang="ts">
	import AvatarByName from '$lib/AvatarByName.svelte';
	import CommentLinkToPost from '$lib/comments/CommentLinkToPost.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import Like from '$lib/like/Like.svelte';
	import type { CommentContent } from './comment';

	export let comment: CommentContent;
</script>

<div class="flex gap-4 text-sm">
	<div class="flex gap-2 flex-col items-center">
		<div
			class="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-50 border"
		>
			{#if comment.author.avatar.isCustom}
				<img src={comment.author.avatar?.large?.cache} alt="" />
			{:else}
				<AvatarByName name={comment.author.name} />
			{/if}
		</div>

		{#if comment.likes > 0}
			<Like count={comment.likes} />
		{/if}
	</div>
	<div class="flex gap-2 flex-col">
		<div class="rounded-md shadow bg-slate-50/80 p-3 gap-2 grid grid-cols-1">
			<p class="break-words">
				{@html comment.raw_message}

				— <b>{comment.author.name}</b>
			</p>

			<div class="flex flex-wrap justify-between gap-4 overflow-x-hidden">
				<CommentLinkToPost title={comment.thread?.clean_title} href={comment.url} />

				<CreatedAt date={comment.createdAt} small />
			</div>
		</div>
	</div>
</div>

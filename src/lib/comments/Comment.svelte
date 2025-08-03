<script lang="ts">
	import AvatarByName from '$lib/avatar/AvatarByName.svelte';
	import CommentLinkToPost from '$lib/comments/CommentLinkToPost.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import Like from '$lib/like/Like.svelte';
	import ShowAll from '$lib/showAll/ShowAll.svelte';
	import type { CommentContent } from './comment';

	export let comment: CommentContent;
</script>

<div class="flex gap-4 text-sm">
	<div class="flex flex-col items-center gap-2">
		<div
			class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border bg-slate-50 dark:border-slate-600 dark:bg-slate-900"
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
	<div class="flex flex-col gap-2">
		<div
			class="grid grid-cols-1 gap-2 rounded-md bg-slate-50/80 p-3 shadow dark:bg-slate-800 dark:text-white"
		>
			<div class="break-words">
				<ShowAll>
					{@html comment.raw_message}
				</ShowAll>

				— <b>{comment.author.name}</b>
			</div>

			<div class="flex flex-wrap justify-between gap-4 overflow-x-hidden">
				<CommentLinkToPost title={comment.thread?.clean_title} href={comment.url} />

				<CreatedAt date={comment.createdAt} small />
			</div>
		</div>
	</div>
</div>

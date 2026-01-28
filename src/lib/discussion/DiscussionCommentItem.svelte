<script lang="ts">
	import AvatarByName from '$lib/avatar/AvatarByName.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import type { DiscussionComment } from './types';
	import { isOwnComment, getToken, removeToken } from './commentTokens';

	interface Props {
		comment: DiscussionComment;
		onReply: (parentId: number) => void;
		onDeleted: (id: number) => void;
		onUpdated: (comment: DiscussionComment) => void;
	}

	let { comment, onReply, onDeleted, onUpdated }: Props = $props();

	let isOwn = $state(false);
	let editing = $state(false);
	let editMessage = $state('');
	let saving = $state(false);
	let error = $state('');

	$effect(() => {
		isOwn = isOwnComment(comment.id);
	});

	function startEdit() {
		editMessage = comment.message;
		editing = true;
		error = '';
	}

	function cancelEdit() {
		editing = false;
		error = '';
	}

	async function saveEdit() {
		if (editMessage.trim().length < 3) return;
		saving = true;
		error = '';

		try {
			const res = await fetch(`/api/comments/id/${comment.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ edit_token: getToken(comment.id), message: editMessage })
			});
			const data = await res.json();
			if (data.success) {
				onUpdated(data.comment);
				editing = false;
			} else {
				error = data.message;
			}
		} catch {
			error = 'Nepodařilo se upravit komentář';
		} finally {
			saving = false;
		}
	}

	async function handleDelete() {
		if (!confirm('Opravdu chcete smazat tento komentář?')) return;
		saving = true;

		try {
			const res = await fetch(`/api/comments/id/${comment.id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ edit_token: getToken(comment.id) })
			});
			const data = await res.json();
			if (data.success) {
				removeToken(comment.id);
				onDeleted(comment.id);
			} else {
				error = data.message;
			}
		} catch {
			error = 'Nepodařilo se smazat komentář';
		} finally {
			saving = false;
		}
	}
</script>

<div class="flex gap-3 text-sm" id="comment-{comment.id}">
	<div class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border bg-slate-50 dark:border-slate-600 dark:bg-slate-900">
		<AvatarByName name={comment.author_name} />
	</div>

	<div class="flex min-w-0 flex-1 flex-col gap-1">
		<div class="rounded-md bg-slate-50/80 p-3 shadow dark:bg-slate-800 dark:text-white {isOwn ? 'ring-1 ring-blue-300 dark:ring-blue-700' : ''}">
			{#if editing}
				<textarea
					bind:value={editMessage}
					class="w-full rounded border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
					rows="3"
				></textarea>
				{#if error}
					<p class="mt-1 text-xs text-red-500">{error}</p>
				{/if}
				<div class="mt-2 flex gap-2">
					<button
						onclick={saveEdit}
						disabled={saving}
						class="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700 disabled:opacity-50"
					>
						{saving ? 'Ukládám...' : 'Uložit'}
					</button>
					<button
						onclick={cancelEdit}
						class="rounded px-3 py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400"
					>
						Zrušit
					</button>
				</div>
			{:else}
				<p class="break-words whitespace-pre-wrap">{comment.message}</p>
			{/if}
		</div>

		<div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
			<span class="font-medium text-slate-700 dark:text-slate-300">{comment.author_name}</span>
			<CreatedAt date={new Date(comment.created_at)} small />

			<button
				onclick={() => onReply(comment.id)}
				class="hover:text-blue-600 dark:hover:text-blue-400"
			>
				Odpovědět
			</button>

			{#if isOwn && !editing}
				<button
					onclick={startEdit}
					class="hover:text-blue-600 dark:hover:text-blue-400"
				>
					Upravit
				</button>
				<button
					onclick={handleDelete}
					disabled={saving}
					class="hover:text-red-600 dark:hover:text-red-400"
				>
					Smazat
				</button>
			{/if}

			{#if error && !editing}
				<span class="text-red-500">{error}</span>
			{/if}
		</div>

		{#if comment.replies && comment.replies.length > 0}
			<div class="mt-3 flex flex-col gap-3 border-l-2 border-slate-200 pl-4 dark:border-slate-700">
				{#each comment.replies as reply (reply.id)}
					<svelte:self comment={reply} {onReply} {onDeleted} {onUpdated} />
				{/each}
			</div>
		{/if}
	</div>
</div>

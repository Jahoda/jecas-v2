<script lang="ts">
	import AvatarByName from '$lib/avatar/AvatarByName.svelte';
	import CreatedAt from '$lib/date/CreatedAt.svelte';
	import type { DiscussionComment } from './types';
	import { isOwnComment, getToken, removeToken } from './commentTokens';
	import DiscussionForm from './DiscussionForm.svelte';

	interface Props {
		comment: DiscussionComment;
		slug: string;
		replyToId: number | null;
		onReply: (parentId: number) => void;
		onDeleted: (id: number) => void;
		onUpdated: (comment: DiscussionComment) => void;
		onSubmitted: (comment: DiscussionComment, editToken: string) => void;
		onCancelReply: () => void;
	}

	let {
		comment,
		slug,
		replyToId,
		onReply,
		onDeleted,
		onUpdated,
		onSubmitted,
		onCancelReply
	}: Props = $props();

	let isOwn = $state(false);
	let editing = $state(false);
	let editMessage = $state('');
	let saving = $state(false);
	let error = $state('');
	let liked = $state(false);
	let likesCount = $state(0);
	let liking = $state(false);

	$effect(() => {
		isOwn = isOwnComment(comment.id);
		likesCount = comment.likes;
		try {
			const stored = localStorage.getItem('comment_likes');
			const ids: number[] = stored ? JSON.parse(stored) : [];
			liked = ids.includes(comment.id);
		} catch {
			liked = false;
		}
	});

	async function handleLike() {
		if (liking) return;
		liking = true;
		try {
			const res = await fetch(`/api/comments/id/${comment.id}/like`, { method: 'POST' });
			const data = await res.json();
			if (data.success) {
				likesCount = data.likes;
				liked = data.toggled === 'on';
				try {
					const stored = localStorage.getItem('comment_likes');
					const ids: number[] = stored ? JSON.parse(stored) : [];
					if (data.toggled === 'on') {
						if (!ids.includes(comment.id)) ids.push(comment.id);
					} else {
						const idx = ids.indexOf(comment.id);
						if (idx !== -1) ids.splice(idx, 1);
					}
					localStorage.setItem('comment_likes', JSON.stringify(ids));
				} catch {
					// ignore
				}
			}
		} catch {
			// ignore
		} finally {
			liking = false;
		}
	}

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

	let showReplyForm = $derived(replyToId === comment.id);
</script>

<article class="group" id="comment-{comment.id}">
	<div class="flex gap-3">
		<div class="flex-shrink-0">
			<AvatarByName name={comment.author_name} email={comment.author_email} />
		</div>

		<div class="flex min-w-0 flex-1 flex-col gap-2">
			<div class="flex items-center gap-2 text-sm">
				<span class="font-semibold text-slate-900 dark:text-white">{comment.author_name}</span>
				<span class="text-slate-400">·</span>
				<CreatedAt date={new Date(comment.created_at)} small />
				{#if isOwn}
					<span
						class="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
						>Váš komentář</span
					>
				{/if}
			</div>

			<div
				class="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
			>
				{#if editing}
					<textarea
						bind:value={editMessage}
						class="w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
						rows="3"
					></textarea>
					{#if error}
						<p class="mt-2 text-xs text-red-500">{error}</p>
					{/if}
					<div class="mt-3 flex gap-2">
						<button
							onclick={saveEdit}
							disabled={saving}
							class="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
						>
							{saving ? 'Ukládám...' : 'Uložit změny'}
						</button>
						<button
							onclick={cancelEdit}
							class="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
						>
							Zrušit
						</button>
					</div>
				{:else}
					<p class="whitespace-pre-wrap break-words leading-relaxed">{comment.message}</p>
				{/if}
			</div>

			<div
				class="flex items-center gap-1 text-xs text-slate-500 transition-opacity dark:text-slate-400"
			>
				<button
					onclick={handleLike}
					disabled={liking}
					class="flex items-center gap-1 rounded-md px-2 py-1 transition-colors {liked ? 'text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400'} disabled:opacity-50"
				>
					<svg class="h-3.5 w-3.5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" stroke-width={liked ? '0' : '2'}>
						<path
							d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
						/>
					</svg>
					{#if likesCount > 0}
						{likesCount}
					{/if}
				</button>

				<button
					onclick={() => onReply(comment.id)}
					class="rounded-md px-2 py-1 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
				>
					<span class="flex items-center gap-1">
						<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
							/>
						</svg>
						Odpovědět
					</span>
				</button>

				{#if isOwn && !editing}
					<button
						onclick={startEdit}
						class="rounded-md px-2 py-1 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
					>
						Upravit
					</button>
					<button
						onclick={handleDelete}
						disabled={saving}
						class="rounded-md px-2 py-1 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
					>
						Smazat
					</button>
				{/if}

				{#if error && !editing}
					<span class="ml-2 text-red-500">{error}</span>
				{/if}
			</div>

			{#if showReplyForm}
				<div class="mt-2 rounded-lg border-l-2 border-blue-400 bg-blue-50/50 p-3 dark:bg-blue-900/10">
					<DiscussionForm
						{slug}
						parentId={comment.id}
						{onSubmitted}
						onCancel={onCancelReply}
						compact
					/>
				</div>
			{/if}

			{#if comment.replies && comment.replies.length > 0}
				<div class="mt-3 flex flex-col gap-4 border-l-2 border-slate-200 pl-4 dark:border-slate-700">
					{#each comment.replies as reply (reply.id)}
						<svelte:self
							comment={reply}
							{slug}
							{replyToId}
							{onReply}
							{onDeleted}
							{onUpdated}
							{onSubmitted}
							{onCancelReply}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</article>

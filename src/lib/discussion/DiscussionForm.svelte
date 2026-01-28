<script lang="ts">
	import { onMount } from 'svelte';
	import type { DiscussionComment } from './types';

	interface Props {
		slug: string;
		parentId?: number | null;
		onSubmitted: (comment: DiscussionComment, editToken: string) => void;
		onCancel?: () => void;
	}

	let { slug, parentId = null, onSubmitted, onCancel }: Props = $props();

	let authorName = $state('');
	let message = $state('');
	let honeypot = $state('');
	let submitting = $state(false);
	let error = $state('');
	let success = $state('');

	onMount(() => {
		const saved = localStorage.getItem('comment_author');
		if (saved) authorName = saved;
	});

	function saveAuthor() {
		if (authorName.trim()) {
			localStorage.setItem('comment_author', authorName.trim());
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitting = true;
		error = '';
		success = '';

		try {
			const res = await fetch(`/api/comments/${slug}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					parent_id: parentId,
					author_name: authorName,
					message,
					honeypot
				})
			});
			const data = await res.json();

			if (data.success) {
				saveAuthor();
				success = data.auto_approved
					? 'Komentář byl přidán.'
					: 'Komentář byl odeslán ke schválení.';
				if (data.comment && data.edit_token) {
					onSubmitted(data.comment, data.edit_token);
				}
				message = '';
			} else {
				error = data.message;
			}
		} catch {
			error = 'Nepodařilo se odeslat komentář. Zkuste to později.';
		} finally {
			submitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-3">
	<div class="flex gap-3">
		<input
			type="text"
			bind:value={authorName}
			required
			minlength="2"
			maxlength="100"
			placeholder="Jméno"
			class="w-32 flex-shrink-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
		/>
		<input
			type="text"
			bind:value={message}
			required
			minlength="3"
			maxlength="5000"
			placeholder="Napište komentář..."
			class="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
		/>
		<button
			type="submit"
			disabled={submitting}
			class="flex-shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
		>
			{submitting ? '...' : parentId ? 'Odpovědět' : 'Odeslat'}
		</button>
		{#if onCancel}
			<button
				type="button"
				onclick={onCancel}
				class="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400"
			>
				×
			</button>
		{/if}
	</div>

	<!-- Honeypot -->
	<div class="absolute -left-[9999px]" aria-hidden="true">
		<input type="text" bind:value={honeypot} tabindex="-1" autocomplete="off" />
	</div>

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
	{#if success}
		<p class="text-sm text-green-600 dark:text-green-400">{success}</p>
	{/if}
</form>

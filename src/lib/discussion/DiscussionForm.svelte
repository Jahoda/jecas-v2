<script lang="ts">
	import type { DiscussionComment } from './types';

	interface Props {
		slug: string;
		parentId?: number | null;
		onSubmitted: (comment: DiscussionComment, editToken: string) => void;
		onCancel?: () => void;
	}

	let { slug, parentId = null, onSubmitted, onCancel }: Props = $props();

	let authorName = $state('');
	let authorEmail = $state('');
	let message = $state('');
	let honeypot = $state('');
	let submitting = $state(false);
	let error = $state('');
	let success = $state('');

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
					author_email: authorEmail || undefined,
					message,
					honeypot
				})
			});
			const data = await res.json();

			if (data.success) {
				success = data.message;
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
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
		<div>
			<label for="comment-name" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
				Jméno <span class="text-red-500">*</span>
			</label>
			<input
				id="comment-name"
				type="text"
				bind:value={authorName}
				required
				minlength="2"
				maxlength="100"
				placeholder="Vaše jméno"
				class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
			/>
		</div>
		<div>
			<label for="comment-email" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
				E-mail <span class="text-xs text-slate-400">(volitelný)</span>
			</label>
			<input
				id="comment-email"
				type="email"
				bind:value={authorEmail}
				placeholder="Pro avatar"
				class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
			/>
		</div>
	</div>

	<!-- Honeypot - skryté pole proti botům -->
	<div class="absolute -left-[9999px]" aria-hidden="true">
		<input type="text" bind:value={honeypot} tabindex="-1" autocomplete="off" />
	</div>

	<div>
		<label for="comment-message" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
			Komentář <span class="text-red-500">*</span>
		</label>
		<textarea
			id="comment-message"
			bind:value={message}
			required
			minlength="3"
			maxlength="5000"
			rows="4"
			placeholder="Napište komentář..."
			class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
		></textarea>
	</div>

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
	{#if success}
		<p class="text-sm text-green-600 dark:text-green-400">{success}</p>
	{/if}

	<div class="flex items-center gap-3">
		<button
			type="submit"
			disabled={submitting}
			class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
		>
			{submitting ? 'Odesílám...' : parentId ? 'Odpovědět' : 'Odeslat komentář'}
		</button>
		{#if onCancel}
			<button
				type="button"
				onclick={onCancel}
				class="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400"
			>
				Zrušit
			</button>
		{/if}
	</div>
</form>

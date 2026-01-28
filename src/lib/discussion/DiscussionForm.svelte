<script lang="ts">
	import { onMount } from 'svelte';
	import type { DiscussionComment } from './types';
	import AvatarByName from '$lib/avatar/AvatarByName.svelte';

	interface Props {
		slug: string;
		parentId?: number | null;
		onSubmitted: (comment: DiscussionComment, editToken: string) => void;
		onCancel?: () => void;
		compact?: boolean;
	}

	let { slug, parentId = null, onSubmitted, onCancel, compact = false }: Props = $props();

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

<form onsubmit={handleSubmit} class="relative">
	{#if compact}
		<div class="flex gap-2">
			<div class="flex min-w-0 flex-1 gap-2">
				<input
					type="text"
					bind:value={authorName}
					required
					minlength="2"
					maxlength="100"
					placeholder="Jméno"
					class="w-24 flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
				/>
				<input
					type="text"
					bind:value={message}
					required
					minlength="3"
					maxlength="5000"
					placeholder="Napište odpověď..."
					class="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
				/>
			</div>
			<button
				type="submit"
				disabled={submitting}
				class="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
			>
				{#if submitting}
					<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				{:else}
					Odeslat
				{/if}
			</button>
			{#if onCancel}
				<button
					type="button"
					onclick={onCancel}
					class="rounded-lg px-2 py-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			{/if}
		</div>
	{:else}
		<div class="flex gap-3">
			<div class="flex-shrink-0">
				{#if authorName}
					<AvatarByName name={authorName} />
				{:else}
					<div
						class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700"
					>
						<svg
							class="h-5 w-5 text-slate-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
				{/if}
			</div>

			<div class="min-w-0 flex-1">
				<div class="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
					<input
						type="text"
						bind:value={authorName}
						required
						minlength="2"
						maxlength="100"
						placeholder="Vaše jméno"
						class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
					/>
					<textarea
						bind:value={message}
						required
						minlength="3"
						maxlength="5000"
						placeholder="Napište komentář..."
						rows="3"
						class="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
					></textarea>
					<div class="flex items-center justify-between">
						<p class="text-xs text-slate-500 dark:text-slate-400">
							Podporuje markdown • Buďte milí
						</p>
						<button
							type="submit"
							disabled={submitting}
							class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
						>
							{#if submitting}
								<span class="flex items-center gap-2">
									<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Odesílám...
								</span>
							{:else}
								Přidat komentář
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Honeypot -->
	<div class="absolute -left-[9999px]" aria-hidden="true">
		<input type="text" bind:value={honeypot} tabindex="-1" autocomplete="off" />
	</div>

	{#if error}
		<p class="mt-2 text-sm text-red-500">{error}</p>
	{/if}
	{#if success}
		<p class="mt-2 text-sm text-green-600 dark:text-green-400">{success}</p>
	{/if}
</form>

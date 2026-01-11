<script lang="ts">
	import { annotationState } from './annotationStore.svelte';
	import type { Annotation } from './annotation';

	interface Props {
		onScrollTo?: (annotationId: string) => void;
	}

	let { onScrollTo }: Props = $props();

	let editingId = $state<string | null>(null);
	let editComment = $state('');

	function handleEdit(annotation: Annotation) {
		editingId = annotation.id;
		editComment = annotation.comment;
	}

	function handleSaveEdit(id: string) {
		if (editComment.trim()) {
			annotationState.updateAnnotation(id, editComment.trim());
		}
		editingId = null;
		editComment = '';
	}

	function handleCancelEdit() {
		editingId = null;
		editComment = '';
	}

	function handleDelete(id: string) {
		annotationState.removeAnnotation(id);
	}

	function handleScrollTo(annotation: Annotation) {
		annotationState.setActiveAnnotation(annotation.id);
		onScrollTo?.(annotation.id);
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('cs-CZ', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function truncateText(text: string, maxLength: number = 60): string {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	}
</script>

<div class="space-y-3">
	{#if annotationState.annotations.length === 0}
		<div class="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
			Zatím žádné anotace. Označte text v článku a přidejte komentář.
		</div>
	{:else}
		{#each annotationState.annotations as annotation (annotation.id)}
			<div
				class="rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 {annotationState.activeAnnotationId ===
				annotation.id
					? 'ring-2 ring-blue-500'
					: ''}"
			>
				<!-- Selected text -->
				<button
					type="button"
					onclick={() => handleScrollTo(annotation)}
					class="mb-2 w-full cursor-pointer rounded bg-yellow-50 p-2 text-left text-sm text-gray-700 transition-colors hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-gray-300 dark:hover:bg-yellow-900/30"
					title="Klikněte pro zobrazení v článku"
				>
					"{truncateText(annotation.selectedText)}"
				</button>

				<!-- Comment -->
				{#if editingId === annotation.id}
					<div class="space-y-2">
						<textarea
							bind:value={editComment}
							rows="2"
							class="w-full resize-none rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						></textarea>
						<div class="flex justify-end gap-2">
							<button
								type="button"
								onclick={handleCancelEdit}
								class="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
							>
								Zrušit
							</button>
							<button
								type="button"
								onclick={() => handleSaveEdit(annotation.id)}
								class="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
							>
								Uložit
							</button>
						</div>
					</div>
				{:else}
					<p class="text-sm text-gray-600 dark:text-gray-300">
						{annotation.comment}
					</p>
				{/if}

				<!-- Footer -->
				<div class="mt-2 flex items-center justify-between">
					<span class="text-xs text-gray-400">
						{formatDate(annotation.createdAt)}
					</span>
					<div class="flex gap-1">
						<button
							type="button"
							onclick={() => handleEdit(annotation)}
							class="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
							title="Upravit"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-4 w-4"
							>
								<path
									d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
								/>
							</svg>
						</button>
						<button
							type="button"
							onclick={() => handleDelete(annotation.id)}
							class="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
							title="Smazat"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-4 w-4"
							>
								<path
									fill-rule="evenodd"
									d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<script lang="ts">
	import { annotationState } from './annotationStore.svelte';

	let comment = $state('');
	let textareaRef: HTMLTextAreaElement | undefined = $state();

	let isEditing = $derived(annotationState.editingAnnotationId !== null);

	let position = $derived.by(() => {
		if (!annotationState.currentSelection) return { top: 0, left: 0 };

		const rect = annotationState.currentSelection.rect;
		// For fixed positioning, use viewport coordinates directly (no scrollY needed)
		return {
			top: rect.bottom + 10,
			left: Math.max(200, Math.min(rect.left + rect.width / 2, window.innerWidth - 200))
		};
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!comment.trim()) return;

		if (isEditing && annotationState.editingAnnotationId) {
			annotationState.updateAnnotation(annotationState.editingAnnotationId, comment.trim());
			annotationState.closePopover();
		} else {
			annotationState.addAnnotation(comment.trim());
		}
		comment = '';
	}

	function handleDelete() {
		if (isEditing && annotationState.editingAnnotationId) {
			annotationState.removeAnnotation(annotationState.editingAnnotationId);
			annotationState.closePopover();
			comment = '';
		}
	}

	function handleCancel() {
		comment = '';
		annotationState.closePopover();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleCancel();
		} else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
			handleSubmit(e);
		}
	}

	// Load existing comment when editing
	$effect(() => {
		if (annotationState.showPopover && annotationState.editingAnnotationId) {
			const annotation = annotationState.annotations.find(
				(a) => a.id === annotationState.editingAnnotationId
			);
			if (annotation) {
				comment = annotation.comment;
			}
		}
	});

	$effect(() => {
		if (annotationState.showPopover && textareaRef) {
			textareaRef.focus();
		}
	});
</script>

{#if annotationState.showPopover && annotationState.currentSelection}
	<!-- Backdrop -->
	<button type="button" class="fixed inset-0 z-40" onclick={handleCancel} aria-label="Zavřít"
	></button>

	<!-- Popover -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed z-50 w-96 -translate-x-1/2 transform"
		style="top: {position.top}px; left: {position.left}px;"
		role="dialog"
		aria-modal="true"
		onclick={(e) => e.stopPropagation()}
		onmouseup={(e) => e.stopPropagation()}
	>
		<div
			class="rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
		>
			<!-- Selected text preview -->
			<div class="border-b border-gray-200 p-3 dark:border-gray-700">
				<div class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
					{isEditing ? 'Upravit anotaci:' : 'Označený text:'}
				</div>
				<div
					class="max-h-20 overflow-y-auto rounded bg-yellow-50 p-2 text-sm text-gray-700 dark:bg-yellow-900/20 dark:text-gray-300"
				>
					{annotationState.currentSelection.text}
				</div>
			</div>

			<!-- Comment form -->
			<form onsubmit={handleSubmit} class="p-3">
				<label
					for="annotation-comment"
					class="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400"
				>
					Požadavek na úpravu:
				</label>
				<textarea
					bind:this={textareaRef}
					bind:value={comment}
					id="annotation-comment"
					rows="3"
					placeholder="Napište, co by se mělo změnit..."
					class="w-full resize-none rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
					onkeydown={handleKeydown}
				></textarea>

				<div class="mt-3 flex justify-between">
					{#if isEditing}
						<button
							type="button"
							onclick={handleDelete}
							class="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
						>
							Smazat
						</button>
					{:else}
						<div></div>
					{/if}
					<div class="flex gap-2">
						<button
							type="button"
							onclick={handleCancel}
							class="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
						>
							Zrušit
						</button>
						<button
							type="submit"
							disabled={!comment.trim()}
							class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isEditing ? 'Uložit' : 'Přidat'}
						</button>
					</div>
				</div>

				<div class="mt-2 text-xs text-gray-400 dark:text-gray-500">
					<kbd class="rounded bg-gray-100 px-1 dark:bg-gray-700">Ctrl</kbd>+<kbd
						class="rounded bg-gray-100 px-1 dark:bg-gray-700">Enter</kbd
					> pro uložení
				</div>
			</form>
		</div>
	</div>
{/if}

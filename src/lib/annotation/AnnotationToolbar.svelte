<script lang="ts">
	import { annotationState } from './annotationStore.svelte';

	let toolbarRef: HTMLDivElement | undefined = $state();
	let inputRef: HTMLInputElement | undefined = $state();
	let comment = $state('');

	let position = $derived.by(() => {
		if (!annotationState.currentSelection) return { top: 0, left: 0, visible: false };

		const rect = annotationState.currentSelection.rect;
		return {
			top: rect.bottom + 10,
			left: Math.max(200, Math.min(rect.left + rect.width / 2, window.innerWidth - 200)),
			visible: true
		};
	});

	function handleSubmit() {
		if (!comment.trim()) return;
		annotationState.addAnnotation(comment.trim());
		comment = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			comment = '';
			annotationState.setSelection(null);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleCancel() {
		comment = '';
		annotationState.setSelection(null);
	}

	$effect(() => {
		if (annotationState.currentSelection && !annotationState.showPopover && inputRef) {
			inputRef.focus();
		}
	});
</script>

{#if annotationState.currentSelection && !annotationState.showPopover}
	<div
		bind:this={toolbarRef}
		class="fixed z-50 w-80 -translate-x-1/2 transform"
		style="top: {position.top}px; left: {position.left}px;"
	>
		<div
			class="rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800"
		>
			<div
				class="mb-1.5 max-h-16 overflow-y-auto rounded bg-yellow-50 p-1.5 text-xs text-gray-600 dark:bg-yellow-900/20 dark:text-gray-400"
			>
				{annotationState.currentSelection.text.length > 100
					? annotationState.currentSelection.text.substring(0, 100) + '...'
					: annotationState.currentSelection.text}
			</div>
			<div class="flex gap-1.5">
				<input
					bind:this={inputRef}
					bind:value={comment}
					type="text"
					placeholder="Napište komentář..."
					class="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
					onkeydown={handleKeydown}
				/>
				<button
					type="button"
					onclick={handleSubmit}
					disabled={!comment.trim()}
					class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					↵
				</button>
				<button
					type="button"
					onclick={handleCancel}
					class="rounded-md px-2 py-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
					title="Zrušit"
				>
					✕
				</button>
			</div>
		</div>
	</div>
{/if}

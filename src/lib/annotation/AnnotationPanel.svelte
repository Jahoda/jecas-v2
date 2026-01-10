<script lang="ts">
	import { onMount } from 'svelte';
	import { annotationState } from './annotationStore.svelte';
	import AnnotationToolbar from './AnnotationToolbar.svelte';
	import AnnotationPopover from './AnnotationPopover.svelte';
	import AnnotationList from './AnnotationList.svelte';
	import AnnotationExport from './AnnotationExport.svelte';
	import { highlightAnnotationsInContent, scrollToAnnotation } from './highlightUtils';

	interface Props {
		slug: string;
		articleTitle: string;
		contentContainer?: HTMLElement;
	}

	let { slug, articleTitle, contentContainer }: Props = $props();

	let panelOpen = $state(false);

	// Show panel when there are annotations
	let hasAnnotations = $derived(annotationState.annotations.length > 0);

	function handleSelection() {
		// Don't interfere when popover is open
		if (annotationState.showPopover) return;

		const selection = window.getSelection();
		if (!selection || selection.isCollapsed || !selection.toString().trim()) {
			annotationState.setSelection(null);
			return;
		}

		const range = selection.getRangeAt(0);
		const rect = range.getBoundingClientRect();

		// Get context around selection
		const container = range.commonAncestorContainer;
		const fullText = container.textContent || '';
		const selectedText = selection.toString();
		const selectionStart = fullText.indexOf(selectedText);

		annotationState.setSelection({
			text: selectedText,
			startOffset: selectionStart,
			endOffset: selectionStart + selectedText.length,
			contextBefore: fullText.substring(Math.max(0, selectionStart - 50), selectionStart),
			contextAfter: fullText.substring(
				selectionStart + selectedText.length,
				selectionStart + selectedText.length + 50
			),
			rect
		});
	}

	function handleScrollToAnnotation(annotationId: string) {
		if (contentContainer) {
			scrollToAnnotation(contentContainer, annotationId);
		}
	}

	// Apply highlights when annotations change
	$effect(() => {
		if (contentContainer) {
			highlightAnnotationsInContent(
				contentContainer,
				annotationState.annotations,
				annotationState.activeAnnotationId
			);
		}
	});

	onMount(() => {
		annotationState.init(slug);
		annotationState.enable();

		// Add selection listener (mouseup only - keyup can interfere with inputs)
		document.addEventListener('mouseup', handleSelection);

		return () => {
			document.removeEventListener('mouseup', handleSelection);
			annotationState.disable();
		};
	});
</script>

<!-- Selection toolbar - appears when text is selected -->
<AnnotationToolbar />

<!-- Comment popover -->
<AnnotationPopover />

<!-- Annotation panel button - only show when there are annotations -->
{#if hasAnnotations}
	<button
		type="button"
		onclick={() => (panelOpen = !panelOpen)}
		class="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700"
		title="Zobrazit anotace ({annotationState.annotations.length})"
	>
		<span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
			{annotationState.annotations.length}
		</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="h-6 w-6"
		>
			<path
				fill-rule="evenodd"
				d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
				clip-rule="evenodd"
			/>
			<path
				d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z"
			/>
		</svg>
	</button>
{/if}

<!-- Annotation panel sidebar -->
{#if panelOpen && hasAnnotations}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/20"
		onclick={() => (panelOpen = false)}
		aria-label="Zavřít panel"
	></button>

	<div
		class="fixed right-0 top-0 z-50 h-full w-96 border-l border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
	>
		<!-- Panel header -->
		<div
			class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700"
		>
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
				Anotace ({annotationState.annotations.length})
			</h2>
			<button
				type="button"
				onclick={() => (panelOpen = false)}
				class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
				title="Zavřít panel"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
					/>
				</svg>
			</button>
		</div>

		<!-- Panel content -->
		<div class="flex h-[calc(100%-4rem)] flex-col">
			<!-- Annotations list -->
			<div class="flex-1 overflow-y-auto p-4">
				<AnnotationList onScrollTo={handleScrollToAnnotation} />
			</div>

			<!-- Export section -->
			<div class="border-t border-gray-200 p-4 dark:border-gray-700">
				<AnnotationExport {articleTitle} />
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.annotation-highlight) {
		background-color: rgb(254 249 195);
		border-bottom: 2px solid rgb(234 179 8);
		cursor: pointer;
		transition: background-color 0.2s;
	}

	:global(.annotation-highlight:hover) {
		background-color: rgb(254 240 138);
	}

	:global(.annotation-highlight-active) {
		background-color: rgb(254 240 138);
		box-shadow: 0 0 0 2px rgb(234 179 8);
	}

	:global(.dark .annotation-highlight) {
		background-color: rgba(234, 179, 8, 0.3);
		border-bottom-color: rgb(234 179 8);
	}

	:global(.dark .annotation-highlight:hover) {
		background-color: rgba(234, 179, 8, 0.4);
	}

	:global(.dark .annotation-highlight-active) {
		background-color: rgba(234, 179, 8, 0.4);
	}
</style>

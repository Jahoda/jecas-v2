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

	let panelOpen = $state(true);

	function handleSelection() {
		if (!annotationState.isEnabled) return;

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
		if (contentContainer && annotationState.isEnabled) {
			highlightAnnotationsInContent(
				contentContainer,
				annotationState.annotations,
				annotationState.activeAnnotationId
			);
		}
	});

	onMount(() => {
		annotationState.init(slug);

		// Add selection listener
		document.addEventListener('mouseup', handleSelection);
		document.addEventListener('keyup', handleSelection);

		return () => {
			document.removeEventListener('mouseup', handleSelection);
			document.removeEventListener('keyup', handleSelection);
			annotationState.disable();
		};
	});
</script>

<!-- Floating toggle button -->
<div class="fixed bottom-4 right-4 z-40">
	<button
		type="button"
		onclick={() => annotationState.toggle()}
		class="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all {annotationState.isEnabled
			? 'bg-blue-600 text-white hover:bg-blue-700'
			: 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
		title={annotationState.isEnabled ? 'Vypnout anotace' : 'Zapnout anotace'}
	>
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
</div>

<!-- Annotation panel sidebar -->
{#if annotationState.isEnabled}
	<div
		class="fixed right-0 top-0 z-30 h-full w-80 transform border-l border-gray-200 bg-white shadow-xl transition-transform dark:border-gray-700 dark:bg-gray-800 {panelOpen
			? 'translate-x-0'
			: 'translate-x-full'}"
	>
		<!-- Panel header -->
		<div
			class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700"
		>
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Anotace</h2>
			<div class="flex items-center gap-2">
				<span
					class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				>
					{annotationState.annotations.length}
				</span>
				<button
					type="button"
					onclick={() => (panelOpen = !panelOpen)}
					class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
					title={panelOpen ? 'Skrýt panel' : 'Zobrazit panel'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5 transition-transform {panelOpen ? '' : 'rotate-180'}"
					>
						<path
							fill-rule="evenodd"
							d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Panel content -->
		<div class="flex h-[calc(100%-4rem)] flex-col">
			<!-- Instructions -->
			<div class="border-b border-gray-200 bg-blue-50 p-3 dark:border-gray-700 dark:bg-blue-900/20">
				<p class="text-xs text-blue-700 dark:text-blue-300">
					Označte text v článku a přidejte komentář s požadavkem na úpravu.
				</p>
			</div>

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

	<!-- Collapse button when panel is closed -->
	{#if !panelOpen}
		<button
			type="button"
			onclick={() => (panelOpen = true)}
			class="fixed right-0 top-1/2 z-30 -translate-y-1/2 rounded-l-lg bg-white p-2 shadow-lg dark:bg-gray-800"
			title="Zobrazit panel anotací"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-5 w-5 text-gray-600 dark:text-gray-300"
			>
				<path
					fill-rule="evenodd"
					d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	{/if}
{/if}

<!-- Selection toolbar -->
<AnnotationToolbar />

<!-- Comment popover -->
<AnnotationPopover />

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

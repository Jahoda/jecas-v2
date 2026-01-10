<script lang="ts">
	import { annotationState } from './annotationStore.svelte';

	let toolbarRef: HTMLDivElement | undefined = $state();

	let position = $derived.by(() => {
		if (!annotationState.currentSelection) return { top: 0, left: 0, visible: false };

		const rect = annotationState.currentSelection.rect;
		return {
			top: rect.top + window.scrollY - 45,
			left: rect.left + rect.width / 2,
			visible: true
		};
	});

	function handleAddAnnotation() {
		annotationState.openPopover();
	}
</script>

{#if annotationState.currentSelection && !annotationState.showPopover}
	<div
		bind:this={toolbarRef}
		class="fixed z-50 -translate-x-1/2 transform"
		style="top: {position.top}px; left: {position.left}px;"
	>
		<div
			class="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
		>
			<button
				type="button"
				onclick={handleAddAnnotation}
				class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-4 w-4"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
						clip-rule="evenodd"
					/>
				</svg>
				Přidat komentář
			</button>
		</div>
		<!-- Arrow pointing down -->
		<div
			class="absolute left-1/2 -translate-x-1/2 transform border-8 border-transparent border-t-white dark:border-t-gray-800"
		></div>
	</div>
{/if}

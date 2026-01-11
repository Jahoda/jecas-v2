import type { Annotation } from './annotation';
import { annotationState } from './annotationStore.svelte';

const HIGHLIGHT_CLASS = 'annotation-highlight';
const ACTIVE_HIGHLIGHT_CLASS = 'annotation-highlight-active';

export function highlightAnnotationsInContent(
	container: HTMLElement,
	annotations: Annotation[],
	activeId: string | null
): void {
	// First, remove all existing highlights
	removeAllHighlights(container);

	if (annotations.length === 0) return;

	// Sort annotations by text length (longest first) to avoid nested highlights issues
	const sortedAnnotations = [...annotations].sort(
		(a, b) => b.selectedText.length - a.selectedText.length
	);

	for (const annotation of sortedAnnotations) {
		highlightText(container, annotation, annotation.id === activeId);
	}
}

export function removeAllHighlights(container: HTMLElement): void {
	const highlights = container.querySelectorAll(`.${HIGHLIGHT_CLASS}`);
	highlights.forEach((el) => {
		const parent = el.parentNode;
		if (parent) {
			// Replace mark with its text content
			const text = document.createTextNode(el.textContent || '');
			parent.replaceChild(text, el);
			// Normalize to merge adjacent text nodes
			parent.normalize();
		}
	});
}

function highlightText(container: HTMLElement, annotation: Annotation, isActive: boolean): void {
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);

	const searchText = annotation.selectedText;
	let node: Node | null;

	while ((node = walker.nextNode())) {
		const textNode = node as Text;
		const nodeText = textNode.textContent || '';
		const index = nodeText.indexOf(searchText);

		if (index !== -1) {
			// Found the text - split and wrap
			const range = document.createRange();
			range.setStart(textNode, index);
			range.setEnd(textNode, index + searchText.length);

			const mark = document.createElement('mark');
			mark.className = `${HIGHLIGHT_CLASS} ${isActive ? ACTIVE_HIGHLIGHT_CLASS : ''}`;
			mark.dataset.annotationId = annotation.id;

			// Add click handler for editing
			mark.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				const rect = mark.getBoundingClientRect();
				annotationState.editAnnotation(annotation.id, rect);
			});

			try {
				range.surroundContents(mark);
				// Only highlight first occurrence
				return;
			} catch {
				// Range may cross element boundaries, skip
				continue;
			}
		}
	}
}

export function scrollToAnnotation(container: HTMLElement, annotationId: string): void {
	const highlight = container.querySelector(
		`.${HIGHLIGHT_CLASS}[data-annotation-id="${annotationId}"]`
	);
	if (highlight) {
		highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
}

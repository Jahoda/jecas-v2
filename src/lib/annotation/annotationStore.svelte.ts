import {
	type Annotation,
	createAnnotationId,
	saveAnnotations,
	loadAnnotations,
	clearAnnotations
} from './annotation';

interface SelectionInfo {
	text: string;
	startOffset: number;
	endOffset: number;
	contextBefore: string;
	contextAfter: string;
	rect: DOMRect;
}

class AnnotationState {
	annotations = $state<Annotation[]>([]);
	currentSlug = $state<string>('');
	isEnabled = $state<boolean>(false);
	currentSelection = $state<SelectionInfo | null>(null);
	showPopover = $state<boolean>(false);
	activeAnnotationId = $state<string | null>(null);

	init(slug: string) {
		this.currentSlug = slug;
		this.annotations = loadAnnotations(slug);
	}

	enable() {
		this.isEnabled = true;
	}

	disable() {
		this.isEnabled = false;
		this.currentSelection = null;
		this.showPopover = false;
	}

	toggle() {
		if (this.isEnabled) {
			this.disable();
		} else {
			this.enable();
		}
	}

	setSelection(selection: SelectionInfo | null) {
		this.currentSelection = selection;
	}

	openPopover() {
		this.showPopover = true;
	}

	closePopover() {
		this.showPopover = false;
		this.currentSelection = null;
	}

	addAnnotation(comment: string) {
		if (!this.currentSelection) return;

		const annotation: Annotation = {
			id: createAnnotationId(),
			selectedText: this.currentSelection.text,
			comment,
			createdAt: new Date(),
			startOffset: this.currentSelection.startOffset,
			endOffset: this.currentSelection.endOffset,
			contextBefore: this.currentSelection.contextBefore,
			contextAfter: this.currentSelection.contextAfter
		};

		this.annotations = [...this.annotations, annotation];
		this.save();
		this.closePopover();
	}

	removeAnnotation(id: string) {
		this.annotations = this.annotations.filter((a) => a.id !== id);
		this.save();
	}

	updateAnnotation(id: string, comment: string) {
		this.annotations = this.annotations.map((a) =>
			a.id === id ? { ...a, comment } : a
		);
		this.save();
	}

	setActiveAnnotation(id: string | null) {
		this.activeAnnotationId = id;
	}

	clear() {
		this.annotations = [];
		clearAnnotations(this.currentSlug);
	}

	private save() {
		saveAnnotations(this.currentSlug, this.annotations);
	}
}

export const annotationState = new AnnotationState();

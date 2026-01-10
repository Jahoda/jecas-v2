export interface Annotation {
	id: string;
	selectedText: string;
	comment: string;
	createdAt: Date;
	// Position info for highlighting
	startOffset: number;
	endOffset: number;
	// Context around selection for better identification
	contextBefore: string;
	contextAfter: string;
}

export interface AnnotationStore {
	annotations: Annotation[];
	articleSlug: string;
}

export function createAnnotationId(): string {
	return `ann_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function generateChatbotInstructions(annotations: Annotation[], articleTitle: string): string {
	if (annotations.length === 0) {
		return 'Žádné anotace k exportu.';
	}

	const lines: string[] = [
		`# Požadavky na úpravy článku: ${articleTitle}`,
		'',
		'Prosím proveď následující změny v článku:',
		''
	];

	annotations.forEach((annotation, index) => {
		lines.push(`## ${index + 1}. Úprava`);
		lines.push('');
		lines.push('**Původní text:**');
		lines.push(`> ${annotation.selectedText}`);
		lines.push('');
		lines.push('**Požadavek:**');
		lines.push(annotation.comment);
		lines.push('');
	});

	return lines.join('\n');
}

// Storage helpers
const STORAGE_KEY_PREFIX = 'article_annotations_';

export function saveAnnotations(slug: string, annotations: Annotation[]): void {
	if (typeof localStorage === 'undefined') return;

	const data: AnnotationStore = {
		articleSlug: slug,
		annotations: annotations
	};

	localStorage.setItem(STORAGE_KEY_PREFIX + slug, JSON.stringify(data));
}

export function loadAnnotations(slug: string): Annotation[] {
	if (typeof localStorage === 'undefined') return [];

	const stored = localStorage.getItem(STORAGE_KEY_PREFIX + slug);
	if (!stored) return [];

	try {
		const data: AnnotationStore = JSON.parse(stored);
		// Convert date strings back to Date objects
		return data.annotations.map(ann => ({
			...ann,
			createdAt: new Date(ann.createdAt)
		}));
	} catch {
		return [];
	}
}

export function clearAnnotations(slug: string): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.removeItem(STORAGE_KEY_PREFIX + slug);
}

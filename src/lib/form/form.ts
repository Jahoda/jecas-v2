interface FormUpdate {
	update(options?: { reset: boolean }): Promise<void>;
}

export function preserveForm() {
	return async ({ update }: FormUpdate) => {
		update({ reset: false });
	};
}

export function slugify(str: string) {
	return str
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/&/g, '-and-')
		.replace(/[\s\W-]+/g, '-');
}

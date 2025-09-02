function stripTags(str: string) {
	return str.replace(/(<([^>]+)>)/gi, '');
}

function htmlSpecialChars(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

export function sanizite(str: string) {
	if (str) {
		return htmlSpecialChars(stripTags(str));
	} else {
		return '';
	}
}

export function htmlToPlainText(html: string): string {
	if (!html) return '';

	return stripTags(html)
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");
}

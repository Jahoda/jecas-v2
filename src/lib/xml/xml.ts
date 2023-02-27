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

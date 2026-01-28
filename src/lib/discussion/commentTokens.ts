const STORAGE_KEY = 'comment_tokens';

function getTokens(): Record<string, string> {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
	} catch {
		return {};
	}
}

export function saveToken(commentId: number, token: string): void {
	const tokens = getTokens();
	tokens[String(commentId)] = token;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function getToken(commentId: number): string | null {
	return getTokens()[String(commentId)] ?? null;
}

export function removeToken(commentId: number): void {
	const tokens = getTokens();
	delete tokens[String(commentId)];
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function isOwnComment(commentId: number): boolean {
	return getToken(commentId) !== null;
}

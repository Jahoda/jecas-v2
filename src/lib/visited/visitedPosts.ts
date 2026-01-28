const STORAGE_KEY = 'visited_posts';

export function getVisitedPosts(): string[] {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
	} catch {
		return [];
	}
}

export function markAsVisited(slug: string): void {
	const visited = getVisitedPosts();
	if (!visited.includes(slug)) {
		visited.push(slug);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
	}
}

export function isVisited(slug: string): boolean {
	return getVisitedPosts().includes(slug);
}

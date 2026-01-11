import matter from 'gray-matter';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Jahoda/jecas-v2';

export interface GitHubPost {
	id: string;
	title: string;
	url_slug: string;
	headline: string;
	text_html: string;
	description: string;
	date: Date;
	last_modification: Date | null;
	status: number;
	tags: string[];
}

export async function fetchPostFromGitHub(
	slug: string,
	branch: string = 'main'
): Promise<GitHubPost | null> {
	const githubUrl = `${GITHUB_RAW_BASE}/${branch}/content/posts/${slug}.md`;

	const response = await fetch(githubUrl, {
		headers: { 'Cache-Control': 'no-cache' }
	});

	if (!response.ok) {
		return null;
	}

	const fileContent = await response.text();
	const { data, content } = matter(fileContent);

	return {
		id: slug,
		title: data.title,
		url_slug: slug,
		headline: data.headline,
		text_html: content,
		description: data.description,
		date: new Date(data.date),
		last_modification: data.last_modification ? new Date(data.last_modification) : null,
		status: data.status ?? 1,
		tags: data.tags || []
	};
}

export function getGitHubImageUrl(slug: string, branch: string = 'main'): string {
	return `${GITHUB_RAW_BASE}/${branch}/static/files/article/${slug}.png`;
}

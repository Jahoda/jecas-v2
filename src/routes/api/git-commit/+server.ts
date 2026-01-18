import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const GITHUB_API_URL = 'https://api.github.com';

interface GitHubFileResponse {
	sha?: string;
	content?: string;
}

interface GitHubCommitResponse {
	content: {
		sha: string;
		html_url: string;
	};
	commit: {
		sha: string;
		html_url: string;
	};
}

async function getFileSha(
	owner: string,
	repo: string,
	path: string,
	branch: string,
	token: string
): Promise<string | null> {
	try {
		const response = await fetch(
			`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github.v3+json',
					'User-Agent': 'jecas-svg-editor'
				}
			}
		);

		if (response.status === 404) {
			return null;
		}

		if (!response.ok) {
			console.error('GitHub API error:', await response.text());
			return null;
		}

		const data: GitHubFileResponse = await response.json();
		return data.sha || null;
	} catch (err) {
		console.error('Error getting file SHA:', err);
		return null;
	}
}

async function createOrUpdateFile(
	owner: string,
	repo: string,
	path: string,
	content: string,
	message: string,
	branch: string,
	token: string,
	sha: string | null
): Promise<GitHubCommitResponse> {
	const body: Record<string, string> = {
		message,
		content,
		branch
	};

	if (sha) {
		body.sha = sha;
	}

	const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github.v3+json',
			'Content-Type': 'application/json',
			'User-Agent': 'jecas-svg-editor'
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error('GitHub API error:', errorText);
		throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
	}

	return response.json();
}

export const POST: RequestHandler = async ({ request }) => {
	const githubToken = env.GITHUB_TOKEN;
	const githubRepo = env.GITHUB_REPO || 'Jahoda/jecas-v2';
	const githubBranch = env.GITHUB_BRANCH || 'main';

	if (!githubToken) {
		throw error(500, 'GitHub token not configured. Set GITHUB_TOKEN environment variable.');
	}

	try {
		const { filename, content, message } = await request.json();

		if (!filename || !content) {
			throw error(400, 'Missing required fields: filename and content');
		}

		// Validate filename to prevent path traversal
		if (filename.includes('..') || !filename.startsWith('static/files/')) {
			throw error(400, 'Invalid filename path');
		}

		const [owner, repo] = githubRepo.split('/');

		if (!owner || !repo) {
			throw error(500, 'Invalid GITHUB_REPO format. Expected "owner/repo".');
		}

		// Get existing file SHA if it exists (required for updates)
		const existingSha = await getFileSha(owner, repo, filename, githubBranch, githubToken);

		// Create or update the file
		const commitMessage = message || `Add/update ${filename.split('/').pop()}`;
		const result = await createOrUpdateFile(
			owner,
			repo,
			filename,
			content,
			commitMessage,
			githubBranch,
			githubToken,
			existingSha
		);

		return json({
			success: true,
			message: existingSha ? 'File updated' : 'File created',
			commitSha: result.commit.sha,
			commitUrl: result.commit.html_url,
			fileSha: result.content.sha
		});
	} catch (err) {
		console.error('Git commit error:', err);

		if (err instanceof Error && 'status' in err) {
			throw err;
		}

		throw error(500, err instanceof Error ? err.message : 'Failed to commit to GitHub');
	}
};

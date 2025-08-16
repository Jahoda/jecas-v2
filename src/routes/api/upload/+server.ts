import { dev } from '$app/environment';
import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) {
		throw error(403, 'Upload is only available in development mode');
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const type = formData.get('type') as string;
		const slug = formData.get('slug') as string;
		const filename = formData.get('filename') as string;

		if (!file || !type || !slug || !filename) {
			throw error(400, 'Missing required fields');
		}

		if (!file.type.startsWith('image/')) {
			throw error(400, 'Only image files are allowed');
		}

		const buffer = Buffer.from(await file.arrayBuffer());

		let uploadPath: string;

		if (type === 'preview') {
			uploadPath = join(process.cwd(), 'static', 'files', 'article', filename);
		} else {
			const articleDir = join(process.cwd(), 'static', 'files', slug);
			await mkdir(articleDir, { recursive: true });
			uploadPath = join(articleDir, filename);
		}

		await writeFile(uploadPath, buffer);

		return json({
			success: true,
			message: 'File uploaded successfully',
			path: uploadPath,
			filename
		});
	} catch (err) {
		console.error('Upload error:', err);
		throw error(500, 'Failed to upload file');
	}
};

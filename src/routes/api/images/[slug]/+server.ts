import { dev } from '$app/environment';
import { error, json } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { join } from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	if (!dev) {
		throw error(403, 'This endpoint is only available in development mode');
	}

	const { slug } = params;

	if (!slug) {
		throw error(400, 'Slug is required');
	}

	try {
		const articleDir = join(process.cwd(), 'static', 'files', slug);

		try {
			const files = await readdir(articleDir);
			const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

			const images = imageFiles.map((file) => `/files/${slug}/${file}`);

			return json({
				success: true,
				images
			});
		} catch (err) {
			return json({
				success: true,
				images: []
			});
		}
	} catch (err) {
		console.error('Error loading images:', err);
		throw error(500, 'Failed to load images');
	}
};

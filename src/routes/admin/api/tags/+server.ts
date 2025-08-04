import { json } from '@sveltejs/kit';
import { getAllPowerfulTags } from '$lib/tag/powerfulTags';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const tags = getAllPowerfulTags();
		return json(tags);
	} catch (error) {
		console.error('Error fetching tags:', error);
		return json({ error: 'Failed to fetch tags' }, { status: 500 });
	}
};
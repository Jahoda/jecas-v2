import { isAuthenticated } from '$lib/auth/auth';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	return json({ isAdmin: isAuthenticated(cookies) });
};

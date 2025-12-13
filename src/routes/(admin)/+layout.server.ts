import { requireAuth } from '$lib/auth/auth';
import type { LayoutServerLoad } from './$types';

// Admin routes must remain server-rendered for authentication
export const prerender = false;

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (!url.pathname.startsWith('/admin/login')) {
		requireAuth(cookies, url);
	}
	return {};
};

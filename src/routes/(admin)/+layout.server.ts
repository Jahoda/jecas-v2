import { requireAuth } from '$lib/auth/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (!url.pathname.startsWith('/admin/login')) {
		requireAuth(cookies, url);
	}
	return {};
};

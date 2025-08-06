import { redirect } from '@sveltejs/kit';
import { clearAuthCookie } from '$lib/auth/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		clearAuthCookie(cookies);
		throw redirect(302, '/admin/login');
	}
};

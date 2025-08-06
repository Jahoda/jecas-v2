import { redirect, fail } from '@sveltejs/kit';
import { setAuthCookie, isAuthenticated, validatePassword } from '$lib/auth/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
	if (isAuthenticated(cookies)) {
		const redirectTo = url.searchParams.get('redirect') || '/admin';
		throw redirect(302, redirectTo);
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password') as string;
		const redirectTo = (data.get('redirect') as string) || '/admin';

		if (!password) {
			return fail(400, { error: 'Password is required' });
		}

		if (!validatePassword(password)) {
			return fail(400, { error: 'Invalid password' });
		}

		setAuthCookie(cookies);
		throw redirect(302, redirectTo);
	}
};

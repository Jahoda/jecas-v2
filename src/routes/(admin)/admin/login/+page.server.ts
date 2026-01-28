import { redirect, fail } from '@sveltejs/kit';
import { setAuthCookie, isAuthenticated, validateCredentials } from '$lib/auth/auth';
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
		const name = data.get('name') as string;
		const password = data.get('password') as string;
		const redirectTo = (data.get('redirect') as string) || '/admin';

		if (!name || !password) {
			return fail(400, { error: 'Jméno a heslo jsou povinné' });
		}

		if (!validateCredentials(name, password)) {
			return fail(400, { error: 'Neplatné přihlašovací údaje' });
		}

		setAuthCookie(cookies);
		throw redirect(302, redirectTo);
	}
};

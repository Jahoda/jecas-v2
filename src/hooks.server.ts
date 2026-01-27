import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// Redirect trailing slash to non-trailing (except root)
	if (pathname !== '/' && pathname.endsWith('/')) {
		const cleaned = pathname.replace(/\/+$/, '');
		throw redirect(301, cleaned + event.url.search);
	}

	return resolve(event);
};

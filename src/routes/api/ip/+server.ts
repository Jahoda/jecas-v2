import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, getClientAddress }) => {
	const ip = getClientAddress();
	const userAgent = request.headers.get('user-agent') || '';
	const acceptLanguage = request.headers.get('accept-language') || '';

	return json({
		ip,
		userAgent,
		acceptLanguage
	});
};

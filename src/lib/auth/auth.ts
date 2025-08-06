import { redirect } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

const AUTH_COOKIE_NAME = 'admin_auth';

export function setAuthCookie(cookies: RequestEvent['cookies']): void {
	cookies.set(AUTH_COOKIE_NAME, 'authenticated', {
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict'
	});
}

export function clearAuthCookie(cookies: RequestEvent['cookies']): void {
	cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
}

export function isAuthenticated(cookies: RequestEvent['cookies']): boolean {
	const authCookie = cookies.get(AUTH_COOKIE_NAME);
	return authCookie === 'authenticated';
}

export function requireAuth(cookies: RequestEvent['cookies'], url: URL): void {
	if (!isAuthenticated(cookies)) {
		throw redirect(302, `/admin/login?redirect=${encodeURIComponent(url.pathname)}`);
	}
}

export function validatePassword(password: string): boolean {
	return password === (ADMIN_PASSWORD || 'admin123');
}

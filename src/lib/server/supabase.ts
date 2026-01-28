import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
	throw new Error(
		'PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment variables'
	);
}

// Server-side Supabase client s plnými oprávněními (service role)
export const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});

// Typy pro newsletter
export interface NewsletterSubscriber {
	id: number;
	email: string;
	subscribed_at: string;
	status: 'active' | 'unsubscribed';
	unsubscribed_at: string | null;
	created_at: string;
	updated_at: string;
}

import { supabase } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data: subscribers, error } = await supabase
		.from('newsletter_subscribers')
		.select('email, subscribed_at, status')
		.eq('status', 'active')
		.order('subscribed_at', { ascending: false });

	if (error) {
		console.error('Failed to load newsletter subscribers:', error);
		return {
			subscribers: [],
			error: error.message
		};
	}

	return {
		subscribers: subscribers || [],
		error: null
	};
};

import { supabase } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log('Loading newsletter subscribers...');

	const { data: subscribers, error } = await supabase
		.from('newsletter_subscribers')
		.select('email, subscribed_at, status')
		.eq('status', 'active')
		.order('subscribed_at', { ascending: false });

	if (error) {
		console.error('Failed to load subscribers:', error);
		console.error('Error details:', JSON.stringify(error, null, 2));
		return {
			subscribers: [],
			error: error.message
		};
	}

	console.log(`Loaded ${subscribers?.length || 0} subscribers`);

	return {
		subscribers: subscribers || [],
		error: null
	};
};

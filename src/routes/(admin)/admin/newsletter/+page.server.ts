import { supabase } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log('Loading newsletter subscribers...');

	// Nejdřív zkusíme načíst VŠECHNY záznamy (bez filtru)
	const { data: allData, error: allError } = await supabase
		.from('newsletter_subscribers')
		.select('*');

	console.log('All subscribers (no filter):', allData?.length || 0);
	if (allData && allData.length > 0) {
		console.log('Sample record:', JSON.stringify(allData[0], null, 2));
	}

	// Teď načteme jen aktivní
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

	console.log(`Loaded ${subscribers?.length || 0} active subscribers`);

	return {
		subscribers: subscribers || [],
		error: null
	};
};

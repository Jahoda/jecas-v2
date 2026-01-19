// Disable prerender - use ISR for dynamic content updates
export const prerender = false;

// ISR configuration - revalidate every 60 seconds
export const config = {
	isr: {
		expiration: 60
	}
};

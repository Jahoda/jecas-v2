// Disable static prerendering - use ISR instead
export const prerender = false;

// ISR configuration for Vercel
// Pages are cached and revalidated every 60 seconds
// This allows content changes without redeployment
export const config = {
	isr: {
		expiration: 60 // Revalidate every 60 seconds
	}
};

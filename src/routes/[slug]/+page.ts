// Use ISR (Incremental Static Regeneration) instead of full prerendering
// This way, articles are generated on-demand and cached at the edge
// A single article change doesn't require rebuilding all 1000+ pages
export const prerender = false;

export const config = {
	isr: {
		// Cache survives deployments - pages are only regenerated when explicitly invalidated
		// To invalidate a page, visit: /slug?x-prerender-revalidate=<REVALIDATE_TOKEN>
		expiration: false,
		bypassToken: process.env.REVALIDATE_TOKEN
	}
};

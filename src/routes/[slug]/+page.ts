// Use ISR (Incremental Static Regeneration) instead of full prerendering
// This way, articles are generated on-demand and cached at the edge
// A single article change doesn't require rebuilding all 1000+ pages
export const prerender = false;

export const config = {
	isr: {
		// Pages are cached indefinitely until a new deployment
		// This gives us the best of both worlds:
		// - Fast builds (no prerendering of all articles)
		// - Fast page loads (cached at edge after first request)
		expiration: false
	}
};

import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Use Node.js runtime for ISR support
			runtime: 'nodejs22.x'
		}),
		prerender: {
			concurrency: 50,
			handleHttpError: ({ path, referrer, message }) => {
				// Warn about 404s for missing pages/images during prerender
				// These should be fixed in content but shouldn't block the build
				if (message.includes('404')) {
					console.warn(`Warning: ${message} (from ${referrer})`);
					return;
				}
				throw new Error(message);
			},
			handleMissingId: ({ path, id, referrers }) => {
				// Warn about missing anchor IDs but don't fail the build
				console.warn(
					`Warning: Missing id="${id}" on ${path} (referenced from ${referrers.join(', ')})`
				);
			}
		}
	},
	preprocess: vitePreprocess(),
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	}
};

export default config;

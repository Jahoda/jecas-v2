import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			concurrency: 50,
			handleHttpError: ({ path, referrer, message }) => {
				if (message.includes('404')) {
					console.warn(`[prerender 404] ${path} (from ${referrer})`);
					return;
				}
				throw new Error(message);
			},
			handleMissingId: ({ path, id, referrers }) => {
				// Warn about missing anchor IDs but don't fail the build
				console.warn(
					`Warning: Missing id="${id}" on ${path} (referenced from ${referrers.join(', ')})`
				);
			},
			handleUnseenRoutes: 'warn'
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

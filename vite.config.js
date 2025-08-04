import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { kitRoutes } from 'vite-plugin-kit-routes';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), kitRoutes(), tailwindcss(), devtoolsJson()],
	ssr: {
		noExternal: ['@ethercorps/sveltekit-og']
	},
	optimizeDeps: {
		exclude: ['@resvg/resvg-js']
	}
};

export default config;

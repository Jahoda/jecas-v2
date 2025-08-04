import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { kitRoutes } from 'vite-plugin-kit-routes';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), kitRoutes(), tailwindcss(), devtoolsJson()],
	ssr: {
		noExternal: ['@ethercorps/sveltekit-og'],
		external: [
			'@resvg/resvg-js',
			'@resvg/resvg-js-linux-x64-gnu',
			'@resvg/resvg-js-linux-x64-musl',
			'@resvg/resvg-js-linux-arm64-gnu',
			'@resvg/resvg-js-linux-arm64-musl',
			'@resvg/resvg-js-darwin-x64',
			'@resvg/resvg-js-darwin-arm64',
			'@resvg/resvg-js-darwin-universal',
			'@resvg/resvg-js-win32-x64-msvc'
		]
	},
	optimizeDeps: {
		exclude: [
			'@resvg/resvg-js',
			'@ethercorps/sveltekit-og'
		]
	},
	build: {
		rollupOptions: {
			external: (id) => {
				return id.includes('.node') || 
					   id.includes('@resvg/resvg-js') ||
					   id.includes('resvgjs.');
			}
		}
	}
};

export default config;

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'blue-dark': '#0D6AB7',
				'blue-light': '#1081DD'
			},
			gridTemplateColumns: {
				'homepage-3': '6fr minmax(280px, 2fr) minmax(340px, 3fr)',
				'homepage-2': '1fr 300px',
				'repeat-48': `repeat(auto-fill, minmax(300px, 2fr))`,
				post: '1fr 42rem 1fr'
			},
			gridTemplateAreas: {
				posts: ['main main ', 'rest rest']
			},
			typography: {
				DEFAULT: {
					css: {
						a: {
							color: '#0D6AB7',
							'&:hover': {
								color: '#1081DD'
							}
						}
					}
				},
				invert: {
					css: {
						a: {
							color: '#0D6AB7',
							'&:hover': {
								color: '#1081DD'
							}
						}
					}
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@savvywombat/tailwindcss-grid-areas'),
		require('@tailwindcss/container-queries')
	]
};

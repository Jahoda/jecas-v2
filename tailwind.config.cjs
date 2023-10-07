const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// generate colors via https://uicolors.app/create
				lochmara: {
					50: '#f0f7ff',
					100: '#e0eefe',
					200: '#bbddfc',
					300: '#7fc1fa',
					400: '#3aa2f6',
					500: '#1081dd',
					600: '#0468c5',
					700: '#05539f',
					800: '#094883',
					900: '#0d3d6d',
					950: '#092648'
				},
				cerise: {
					50: '#fdf2f9',
					100: '#fbe8f5',
					200: '#fad0ec',
					300: '#f7aadc',
					400: '#f175c3',
					500: '#e84ca9',
					600: '#da3f94',
					700: '#ba1c6e',
					800: '#991b5b',
					900: '#801b4e',
					950: '#4e092b'
				},
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
						},
						'code::before': false,
						'code::after': false,
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false
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
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/forms')
	]
};

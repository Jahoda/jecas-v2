/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'blue-dark': '#0D6AB7',
				'blue-light': '#1081DD'
			}
		}
	},
	plugins: []
};

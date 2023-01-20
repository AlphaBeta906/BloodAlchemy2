/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui")
	],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		themes: [
			"light",
			"dark"
		]
	}
}

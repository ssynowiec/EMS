import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				pink: '#E004FC',
				purple: '#8804FC',
				darkPurple: '#2B023C',
				lightBlue: '#DCE4FC',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};

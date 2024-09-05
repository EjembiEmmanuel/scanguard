import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
        'hero': "url('/hero-bg.png')",
        'producer': "url('/producer-bg.png')",
        'hero-2': "url('/hero-bg-mobile.png')",
        'footer': "url('/footer.png')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#17212D",
				secondary: "#FAFAF3",
				textPrimary: "#010101",
				textSecondary: "#F1F1F1",
			},

			fontFamily: {
				lato: ["Lato", "sans-serif"],
			},
		},
	},
	plugins: [],
};
export default config;

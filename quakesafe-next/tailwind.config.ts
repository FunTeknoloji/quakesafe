import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: { 900: '#050505', 800: '#0f0f12' },
                violet: { 500: '#7c3aed' }
            },
        },
    },
    plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                pretendard: ["var(--font-pretendard)"],
            },
            boxShadow: {
                selectbox: "0px 4px 8px 0px rgba(16, 24, 64, 0.16)",
            },
        },
    },
    plugins: [],
} satisfies Config;

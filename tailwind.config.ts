import type { Config } from "tailwindcss";

export default {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontSize: {
                h1: [
                    "32px",
                    {
                        lineHeight: "42px",
                        fontWeight: "600",
                    },
                ],
                h2: [
                    "24px",
                    {
                        lineHeight: "34px",
                        fontWeight: "600",
                    },
                ],
                h3: [
                    "20px",
                    {
                        lineHeight: "28px",
                        fontWeight: "600",
                    },
                ],
                base: [
                    "16px",
                    {
                        lineHeight: "24px",
                        fontWeight: "400",
                    },
                ],
                baseEmphasize: [
                    "16px",
                    {
                        lineHeight: "24px",
                        fontWeight: "500",
                    },
                ],
                sm: [
                    "14px",
                    {
                        lineHeight: "20px",
                        fontWeight: "400",
                    },
                ],
                smEmphasize: [
                    "14px",
                    {
                        lineHeight: "20px",
                        fontWeight: "500",
                    },
                ],
                xs: [
                    "12px",
                    {
                        lineHeight: "18px",
                        fontWeight: "400",
                    },
                ],
                xsEmphasize: [
                    "12px",
                    {
                        lineHeight: "18px",
                        fontWeight: "500",
                    },
                ],
            },
            colors: {
                taskmateRed: "#FF6363",
                green: "#52bd94",
                yellow: "#ffb020",
                red: "#D14343",
                blue: "#3366FF",

                n900: "#101840", // 헤드라인
                n800: "#474D66", // 텍스트 기본
                n700: "#696F8C", // 텍스트 비활성화
                n600: "#8F95B2", // 아이콘 비활성화
                n500: "#C1C4D6", // 라인 호버,포커스
                n400: "#D8DAE5", // 라인 기본
                n300: "#E6E8F0", // 라인 비활성화/디바이더
                n200: "#EDEFF5", // Background darker
                n100: "#F4F6FA", // Background normal
                n75: "#F9FAFC", // Background light
                n50: "#FAFBFF", // Background lighter
                n0: "#FFFFFF", // Background white

                // Chart colors
                chartTeal: "#74DDE5",
                chartYellow: "#FAC86B",
                chartBlue: "#678AF7",
                chartGreen: "#6BDAAE",
                chartViolet: "#8F59EF",
                chartPink: "#FD8ADC",
                chartAqua: "#70B0FF",
                chartOrange: "#FF9D66",

                // Additional colors
                violet: "#897AE3",
                teal: "#25CBD6",
                orange: "#DE7548",
                pink: "#ED55C2",

                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                pretendard: ["var(--font-pretendard)"],
            },
            boxShadow: {
                elevation1: "0px 4px 8px 0px rgba(16, 24, 64, 0.08)",
                elevation2: "0px 4px 8px 0px rgba(16, 24, 64, 0.16)",
            },
            backgroundImage: {
                "nav-icon":
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 22h20L12 2Z" stroke="#101840" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
        },
    },
    plugins: [],
} satisfies Config;

import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
    src: "../assets/fonts/Pretendard-Medium.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${pretendard.variable} font-pretendard`}>{children}</body>
        </html>
    );
}

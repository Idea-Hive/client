import Nav from "@/components/gnb/Nav";
import { SpinnerProvider } from "@/components/Spinner";
import QueryProviderWrapper from "@/components/wrappers/QueryProviderWrapper";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
    src: [
        {
            path: "../assets/fonts/Pretendard-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../assets/fonts/Pretendard-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/Pretendard-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/Pretendard-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/Pretendard-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../assets/fonts/Pretendard-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/Pretendard-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-pretendard",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${pretendard.variable} font-pretendard`}>
                <QueryProviderWrapper>
                    <SpinnerProvider>
                        <Nav />
                        {children}
                    </SpinnerProvider>
                </QueryProviderWrapper>
            </body>
        </html>
    );
}

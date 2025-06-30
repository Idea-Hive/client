import { montserrat, pretendard } from "@/assets/fonts/fonts";
import { SpinnerProvider } from "@/components/Spinner";
import QueryProviderWrapper from "@/components/wrappers/QueryProviderWrapper";
import dynamic from "next/dynamic";
import "./globals.css";

const Nav = dynamic(() => import("@/components/gnb/Nav"), { ssr: false });

export const metadata = {
    title: "Taskmate",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${pretendard.variable} ${montserrat.variable} font-pretendard`}>
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

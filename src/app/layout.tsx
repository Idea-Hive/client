import { montserrat, pretendard } from "@/assets/fonts/fonts";
import Nav from "@/components/gnb/Nav";
import { SpinnerProvider } from "@/components/Spinner";
import QueryProviderWrapper from "@/components/wrappers/QueryProviderWrapper";
import "./globals.css";

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

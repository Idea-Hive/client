import Header from "@/components/Header";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default async function AfterLoginLayout({ children }: Props) {
    return (
        <div className="max-w-full">
            <Header />
            <div className="mx-auto max-w-[1328px] min-w-[1000px] px-6 mt-4">{children}</div>
        </div>
    );
}

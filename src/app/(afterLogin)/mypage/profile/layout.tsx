import LNB from "./_component/LNB";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="w-full h-[131px] bg-n200"></div>

            <LNB />

            <div className="w-[1200px] flex gap-10 mx-auto relative -top-[50px]">
                <div className="w-[300px]"></div>
                <div className="flex-1 flex flex-col gap-4">{children}</div>
            </div>
        </div>
    );
}

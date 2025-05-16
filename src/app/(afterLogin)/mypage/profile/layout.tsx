import LNB from "./_component/LNB";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[1200px] mx-auto flex">
            <LNB />
            <div className="flex-1">{children}</div>
        </div>
    );
}

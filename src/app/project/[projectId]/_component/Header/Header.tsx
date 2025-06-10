import LeftSection from "./LeftSection";
import RightSection from "./RightSection/RightSection";

export default function Header() {
    return (
        <div className="w-full bg-n75">
            <div className="w-full max-w-[1232px] px-4 mx-auto flex justify-between items-stretch py-10">
                <LeftSection />
                <RightSection />
            </div>
        </div>
    );
}

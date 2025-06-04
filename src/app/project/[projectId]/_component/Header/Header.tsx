import LeftSection from "./LeftSection";
import RightSection from "./RightSection/RightSection";

export default function Header() {
    return (
        <div className="w-full bg-n75">
            <div className="w-[1200px] mx-auto flex justify-between items-stretch py-10">
                <LeftSection />
                <RightSection />
            </div>
        </div>
    );
}

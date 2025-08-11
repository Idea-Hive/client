import { HamburgerIcon } from "@/components/icons/icons";
import { useClickOutside } from "@/hooks/hooks";
import { useRef, useState } from "react";
import ProjectOwnerApplicantCardDropdown from "../ProjectOwnerApplicantCardDropdown";

// 프로젝트 생성자 카드 컨트롤 (For 확정 지원자)
export default function ProjectOwnerCardControlConfirmed({ applicantMemberId, applyId }: { applicantMemberId: number; applyId: number }) {
    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);
    useClickOutside(dotsThreeVerticalRef, () => {
        if (isDotsThreeVerticalOpen) setIsDotsThreeVerticalOpen(false);
    });

    return (
        <div className="relative" ref={dotsThreeVerticalRef}>
            <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                <HamburgerIcon />
            </div>

            {isDotsThreeVerticalOpen && <ProjectOwnerApplicantCardDropdown setIsDotsThreeVerticalOpen={setIsDotsThreeVerticalOpen} applyId={applyId} applicantMemberId={applicantMemberId} />}
        </div>
    );
}

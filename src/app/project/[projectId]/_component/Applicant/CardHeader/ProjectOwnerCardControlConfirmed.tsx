import { HamburgerIcon } from "@/components/icons/icons";
import { useEffect, useRef, useState } from "react";
import ProjectOwnerApplicantCardDropdown from "../ProjectOwnerApplicantCardDropdown";

// 프로젝트 생성자 카드 컨트롤 (For 확정 지원자)
export default function ProjectOwnerCardControlConfirmed({ applicantMemberId, applyId }: { applicantMemberId: number; applyId: number }) {
    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);

    // DotsThreeVertical Dropdown 오픈 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dotsThreeVerticalRef.current && !dotsThreeVerticalRef.current.contains(event.target as Node)) {
                setIsDotsThreeVerticalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dotsThreeVerticalRef}>
            <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                <HamburgerIcon />
            </div>

            {isDotsThreeVerticalOpen && <ProjectOwnerApplicantCardDropdown setIsDotsThreeVerticalOpen={setIsDotsThreeVerticalOpen} applyId={applyId} applicantMemberId={applicantMemberId} />}
        </div>
    );
}

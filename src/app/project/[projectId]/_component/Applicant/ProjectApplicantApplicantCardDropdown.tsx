import { Dispatch, SetStateAction } from "react";

export default function ProjectApplicantApplicantCardDropdown({
    setIsDotsThreeVerticalOpen,
    setIsCancelModalOpen,
    setIsEdit,
}: {
    setIsDotsThreeVerticalOpen: Dispatch<SetStateAction<boolean>>;
    setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="absolute w-[120px] top-10 right-0 border border-n400 rounded-[4px] shadow-elevation2 bg-white">
            <button
                className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-t-[4px]"
                onClick={() => {
                    setIsDotsThreeVerticalOpen(false);
                    setIsCancelModalOpen(true);
                }}
            >
                지원취소
            </button>
            <button
                className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-b-[4px]"
                onClick={() => {
                    setIsDotsThreeVerticalOpen(false);
                    setIsEdit(true);
                }}
            >
                수정
            </button>
        </div>
    );
}

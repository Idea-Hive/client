import { Applicant, onCancelApplicantApi } from "@/apis/project/projectApis";
import { HamburgerIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast/ToastProvider";
import { useClickOutside } from "@/hooks/hooks";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useIdsForApplicant } from "../../../store/store";
import ProjectApplicantApplicantCardDropdown from "../ProjectApplicantApplicantCardDropdown";

// 지원자 3DotsVertical
export default function ApplicantCardControl({ setIsEdit, applicant }: { setIsEdit: Dispatch<SetStateAction<boolean>>; applicant: Applicant }) {
    const { showToast } = useToast();
    const { projectId, loginUserId } = useIdsForApplicant();

    const queryClient = useQueryClient();

    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);
    useClickOutside(dotsThreeVerticalRef, () => {
        if (isDotsThreeVerticalOpen) setIsDotsThreeVerticalOpen(false);
    });

    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false); // 지원 취소 모달 오픈
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false); // 성공 모달 오픈

    const onCancelApplicantMutation = useCreateMutation(onCancelApplicantApi, "cancelApplicant", {
        onSuccess: () => {
            setIsCancelModalOpen(false);
            setIsSuccessModalOpen(true);
        },
        onError: () => {
            showToast("error", "지원 취소 중 오류가 발생했습니다.");
        },
    });

    const onCancelApplicant = () => {
        onCancelApplicantMutation.mutate({
            applyId: applicant.applyId,
        });
    };

    return (
        <>
            <div className="relative" ref={dotsThreeVerticalRef}>
                <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                    <HamburgerIcon />
                </div>

                {isDotsThreeVerticalOpen && (
                    <ProjectApplicantApplicantCardDropdown
                        setIsDotsThreeVerticalOpen={setIsDotsThreeVerticalOpen}
                        setIsCancelModalOpen={setIsCancelModalOpen}
                        setIsEdit={setIsEdit}
                        state={applicant.isAccepted}
                    />
                )}
            </div>

            <Modal title="지원 취소" children="지원을 취소하시겠습니까?" isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} onConfirm={onCancelApplicant} />
            <Modal
                title="지원 취소"
                children="지원이 취소되었습니다."
                isOpen={isSuccessModalOpen}
                onConfirm={() => {
                    queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId, userId: loginUserId }] });
                    queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
                    setIsSuccessModalOpen(false);
                }}
            />
        </>
    );
}

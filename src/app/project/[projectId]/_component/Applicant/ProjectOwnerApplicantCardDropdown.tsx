import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useIdsForApplicant } from "../../store/store";
import { handleApplicantDecisionApi } from "./_api/apis";

export default function ProjectOwnerApplicantCardDropdown({
    setIsDotsThreeVerticalOpen,
    applicantMemberId,
    applyId,
}: {
    setIsDotsThreeVerticalOpen: Dispatch<SetStateAction<boolean>>;
    applicantMemberId: number;
    applyId: number;
}) {
    const { projectId } = useIdsForApplicant();

    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const [isErrorToastOpen, setIsErrorToastOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleApplicantDecisionMutation = useCreateMutation(handleApplicantDecisionApi, "handleApplicantDecision", {
        onSuccess: (response) => {
            console.log("handleApplicantDecisionMutation Success:::", response);
            setIsSuccessModalOpen(true);
        },
        onError: (error) => {
            console.error("handleApplicantDecisionMutation Error:::", error);
            setErrorMessage("확정 취소 중 오류가 발생했습니다.");
            setIsErrorToastOpen(true);
        },
    });

    const onUndecideApplicant = () => {
        handleApplicantDecisionMutation.mutate({
            projectId,
            userId: applicantMemberId,
            applyId,
            decision: "UNDECIDED",
            rejectionMessage: "확정취소 메시지",
        });
    };

    return (
        <div className="absolute w-[120px] top-10 right-0 border border-n400 rounded-[4px] shadow-elevation2 bg-white">
            <button className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-t-[4px]" onClick={() => setIsModalOpen(true)}>
                확정취소
            </button>

            <Modal title="확정 취소" children="확정을 취소하시겠습니까?" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={onUndecideApplicant} />
            <Modal
                title="확정 취소"
                children="확정이 취소되었습니다."
                isOpen={isSuccessModalOpen}
                onConfirm={() => {
                    setIsSuccessModalOpen(false);
                    queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
                    setIsDotsThreeVerticalOpen(false);
                }}
            />
            {isErrorToastOpen && (
                <Toast
                    message={errorMessage}
                    onClose={() => {
                        setIsErrorToastOpen(false);
                        setIsDotsThreeVerticalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

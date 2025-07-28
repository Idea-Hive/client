import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useIdsForApplicant } from "../../../store/store";
import { handleApplicantDecisionApi } from "../_api/apis";

// 프로젝트 생성자 카드 컨트롤 (For 미정 지원자)
export default function ProjectOwnerCardControlUnconfirmed({
    applicantMemberId,
    setIsReject,
    isReject,
    applicantId,
}: {
    applicantMemberId: number;
    setIsReject: Dispatch<SetStateAction<boolean>>;
    isReject: boolean;
    applicantId: number;
}) {
    const { projectId, loginUserId } = useIdsForApplicant();

    const spinner = useSpinner();
    const queryClient = useQueryClient();

    const [isErrorToastOpen, setIsErrorToastOpen] = useState<boolean>(false); // 에러메세지 토스트 오픈

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false); // 지원 승낙 모달 오픈
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false); // 성공 모달 오픈

    const handleApplicantDecisionMutation = useCreateMutation(handleApplicantDecisionApi, "handleApplicantDecision", {
        onSuccess: (response) => {
            console.log("handleApplicantDecisionMutation Success:::", response);
            setIsConfirmModalOpen(false);
            setIsSuccessModalOpen(true);
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId, userId: loginUserId }] });
            queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
        },
        onError: (error) => {
            console.error("handleApplicantDecisionMutation Error:::", error);
            setIsErrorToastOpen(true);
        },
    });

    const onConfirmApplicant = () => {
        handleApplicantDecisionMutation.mutate({
            projectId,
            userId: applicantMemberId,
            applyId: applicantId,
            decision: "CONFIRMED",
            rejectionMessage: "",
        });
    };

    if (isReject) return null;
    return (
        <>
            <div className="flex gap-2">
                <Button label="거절" btnType="line" size="small" className="w-[74px]" onClick={() => setIsReject(true)} />
                <Button label="승낙" btnType="primary" size="small" className="w-[74px]" onClick={() => setIsConfirmModalOpen(true)} />
            </div>

            <Modal title="지원 승낙" children="지원을 승낙하시겠습니까?" isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={onConfirmApplicant} />
            <Modal
                title="지원 승낙"
                children="지원이 승낙되었습니다."
                isOpen={isSuccessModalOpen}
                onConfirm={() => {
                    setIsSuccessModalOpen(false);
                }}
            />

            {isErrorToastOpen && <Toast message="지원 승낙 중 오류가 발생했습니다." onClose={() => setIsErrorToastOpen(false)} />}
        </>
    );
}

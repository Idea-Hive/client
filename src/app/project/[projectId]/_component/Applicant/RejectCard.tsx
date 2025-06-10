import { handleApplicantDecisionApi } from "@/apis/applicant/applicantApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useIdsForApplicant } from "../../store/store";

export default function RejectCard({ applicantMemberId, applicantId, setIsReject }: { applicantMemberId: number; applicantId: number; setIsReject: Dispatch<SetStateAction<boolean>> }) {
    const spinner = useSpinner();
    const queryClient = useQueryClient();
    const { projectId } = useIdsForApplicant();

    const [rejectionMessage, setRejectionMessage] = useState<string>("");
    const onChangeRejectionMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRejectionMessage(e.target.value);
    };

    const [isError, setIsError] = useState<boolean>(false); // 에러메세지 토스트 오픈
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false); // 성공 모달 오픈

    const handleApplicantDecisionMutation = useMutation({
        mutationFn: handleApplicantDecisionApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("handleApplicantDecisionMutation Success:::", response);
            setIsSuccessModalOpen(true);
            queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
            setIsReject(false);
        },
        onError: (error) => {
            console.error("handleApplicantDecisionMutation Error:::", error);
            setIsError(true);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const onRejectApplicant = () => {
        handleApplicantDecisionMutation.mutate({
            projectId,
            userId: applicantMemberId,
            applyId: applicantId,
            decision: "REJECTED",
            rejectionMessage,
        });
    };

    return (
        <>
            <textarea
                className="w-full h-fit min-h-12 resize-none border border-n300 bg-n75 text-base text-n800 p-4 focus:outline-none"
                placeholder="거절 사유를 작성해주세요"
                value={rejectionMessage}
                onChange={onChangeRejectionMessage}
            ></textarea>
            <div className="w-full flex justify-end gap-2">
                <Button btnType="line" label="취소" size="small" className="w-[74px] !rounded-[4px]" onClick={() => setIsReject(false)} />
                <Button btnType="primary" label="확인" size="small" className="w-[74px] !rounded-[4px]" onClick={onRejectApplicant} />
            </div>

            <Modal
                title="거절 완료"
                children="거절 사유가 전달되었습니다"
                isOpen={isSuccessModalOpen}
                onConfirm={() => {
                    setIsSuccessModalOpen(false);
                }}
            />
            {isError && <Toast message="지원 거절에 실패했습니다." onClose={() => setIsError(false)} />}
        </>
    );
}

"use client";

import { onApplyProjectApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ApplicantButton = ({ projectId, memberId }: { projectId: number; memberId: number }) => {
    const { showToast } = useToast();

    const [isOpenApplicantModal, setIsOpenApplicantModal] = useState<boolean>(false);
    const [isOpenApplicantSuccessModal, setIsOpenApplicantSuccessModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const queryClient = useQueryClient();

    const onApplicantMutation = useCreateMutation(onApplyProjectApi, "onApplyProject", {
        onSuccess: () => {
            setIsOpenApplicantModal(false);
            setIsOpenApplicantSuccessModal(true);
        },
        onError: () => {
            showToast("error", "지원에 실패했습니다");
        },
    });

    const onSubmit = () => {
        onApplicantMutation.mutate({
            projectId: projectId,
            memberId: memberId,
            message,
        });
    };

    return (
        <>
            <Button label="지원하기" className="w-fit px-6" onClick={() => setIsOpenApplicantModal(true)} />

            {/* 지원하기 모달 */}
            {isOpenApplicantModal && (
                <Modal
                    isOpen={isOpenApplicantModal}
                    title="지원하기"
                    children="지원사유를 작성해주세요. 작성자에게 전달됩니다"
                    content={<ApplicationReasonTextarea message={message} setMessage={setMessage} />}
                    confirmText="지원하기"
                    onClose={() => setIsOpenApplicantModal(false)}
                    onConfirm={onSubmit}
                />
            )}

            {/* 지원 완료 모달 */}
            <Modal
                isOpen={isOpenApplicantSuccessModal}
                title="지원 완료"
                children="지원이 완료되었습니다"
                onConfirm={() => {
                    queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId, userId: memberId }] });
                    queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId, page: 1, size: 4 }] });
                    setIsOpenApplicantSuccessModal(false);
                    setIsOpenApplicantModal(false);
                }}
            />
        </>
    );
};

const ApplicationReasonTextarea = ({ message, setMessage }: { message: string; setMessage: (message: string) => void }) => {
    return (
        <div className="w-full h-fit mt-4 p-4 bg-n75 border border-n300 rounded-[4px] flex gap-2">
            <textarea
                className="w-full h-fit min-h-20 resize-none bg-n75 border-none text-sm text-n800 focus:outline-none"
                placeholder="지원사유를 작성해주세요. 작성자에게 전달됩니다"
                value={message}
                maxLength={100}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex flex-col justify-end text-xs text-n800">{message.length}/100</div>
        </div>
    );
};

export default ApplicantButton;

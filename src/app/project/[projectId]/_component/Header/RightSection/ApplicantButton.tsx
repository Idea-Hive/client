"use client";

import { onApplyProjectApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const ApplicantButton = ({ projectId, memberId }: { projectId: number; memberId: number }) => {
    const spinner = useSpinner();

    const [isOpenApplicantModal, setIsOpenApplicantModal] = useState<boolean>(false);
    const [isOpenApplicantSuccessModal, setIsOpenApplicantSuccessModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toastType, setToastType] = useState<"success" | "warning" | "error" | "info">("success");

    const onApplicantMutation = useMutation({
        mutationFn: onApplyProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("onApplicantMutation onSuccess:::", response);
            setIsOpenApplicantModal(false);
            setIsOpenApplicantSuccessModal(true);
            setToastMessage("지원이 완료되었습니다");
            setToastType("success");
            setIsToastOpen(true);
        },
        onError: (error) => {
            console.log("onApplicantMutation onError:::", error);
            setToastMessage("지원에 실패했습니다");
            setToastType("error");
            setIsToastOpen(true);
        },
        onSettled: () => {
            spinner.close();
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
            {isOpenApplicantSuccessModal && (
                <Modal
                    isOpen={isOpenApplicantSuccessModal}
                    title="지원 완료"
                    children="지원이 완료되었습니다"
                    onConfirm={() => {
                        setIsOpenApplicantSuccessModal(false);
                        setIsOpenApplicantModal(false);
                    }}
                />
            )}

            {isToastOpen && <Toast message={toastMessage} type={toastType} onClose={() => setIsToastOpen(false)} />}
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
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex flex-col justify-end text-xs text-n800">0/20</div>
        </div>
    );
};

export default ApplicantButton;

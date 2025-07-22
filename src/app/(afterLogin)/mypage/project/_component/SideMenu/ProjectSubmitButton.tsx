import { onSubmitProjectApi } from "@/apis/project/manageApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

export default function ProjectSubmitButton({ projectId }: { projectId: string }) {
    const spinner = useSpinner();
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const { mutate } = useMutation({
        mutationFn: onSubmitProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: () => {
            setIsModalOpen(true);
            setModalMessage("프로젝트가 성공적으로 제출되었습니다!");
        },
        onError: (err: AxiosError) => {
            setIsToastOpen(true);
            setToastMessage(err.response?.data as string);
            console.error("제출 오류:", err);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleSubmit = () => {
        if (!projectId) {
            setIsToastOpen(true);
            setToastMessage("프로젝트를 선택해주세요.");
            return;
        }
        mutate({ projectId: Number(projectId) });
    };

    return (
        <>
            <Button label="프로젝트 제출" onClick={handleSubmit} size="large" btnType="primary" />

            {isToastOpen && <Toast type="error" message={toastMessage} onClose={() => setIsToastOpen(false)} />}
            <Modal isOpen={isModalOpen} title="프로젝트 제출" onClose={() => setIsModalOpen(false)}>
                {modalMessage}
            </Modal>
        </>
    );
}

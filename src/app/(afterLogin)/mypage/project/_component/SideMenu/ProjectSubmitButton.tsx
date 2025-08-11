import { onSubmitProjectApi } from "@/apis/project/manageApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { AxiosError } from "axios";
import { useState } from "react";
import { useUnSubmittedTaskStore } from "./store/store";

export default function ProjectSubmitButton({ projectId }: { projectId: string }) {
    const { showToast } = useToast();
    const { setUnSubmittedTask } = useUnSubmittedTaskStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const { mutate } = useCreateMutation(onSubmitProjectApi, "onSubmitProject", {
        onSuccess: (data) => {
            if (data.isAllSubmitted) {
                setIsModalOpen(true);
                setModalMessage("프로젝트가 성공적으로 제출되었습니다.");
            } else {
                showToast("error", "필수 과제를 모두 제출해주세요.");
                setUnSubmittedTask(data.unsubmittedTaskIds);
            }
        },
        onError: (err: AxiosError) => {
            showToast("error", (err.response?.data as string) || "프로젝트 제출에 실패했습니다.");
            console.error("제출 오류:", err);
        },
    });

    const handleSubmit = () => {
        if (!projectId) {
            showToast("error", "프로젝트를 선택해주세요.");
            return;
        }
        mutate({ projectId: Number(projectId) });
    };

    return (
        <>
            <Button label="프로젝트 제출" onClick={handleSubmit} size="large" btnType="primary" />
            <Modal isOpen={isModalOpen} title="프로젝트 제출" onClose={() => setIsModalOpen(false)}>
                {modalMessage}
            </Modal>
        </>
    );
}

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useUserInfo } from "@/hooks/queries";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { onSaveProjectApi } from "../_api/api";
import useCreateProjectStore from "../store/createProjectStore";

export default function RegisterButton() {
    const { showToast } = useToast();
    const { user } = useUserInfo();
    const { getRequestBody, validate, projectId, setProjectId } = useCreateProjectStore();

    const router = useRouter();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

    // 프로젝트 등록 mutation
    const onSaveMutation = useCreateMutation(onSaveProjectApi, "saveProject", {
        onSuccess: (response) => {
            setProjectId(response);
            setIsSuccessModalOpen(true);
        },
        onError: (error: AxiosError) => {
            showToast("error", (error.response?.data as string) || "프로젝트 등록에 실패했습니다.");
        },
    });

    // 프로젝트 등록
    const onSave = () => {
        if (!user) return;
        if (!validate()) return;

        const requestBody = getRequestBody(user.id, projectId);
        onSaveMutation.mutate(requestBody);
    };

    return (
        <>
            <Button label="등록" type="button" btnType="primary" className="w-[191px]" onClick={onSave}></Button>
            <Modal
                isOpen={isSuccessModalOpen}
                title="등록 완료"
                children="프로젝트 등록이 완료되었습니다"
                onConfirm={() => {
                    router.push(`/project/${projectId}`);
                }}
            />
        </>
    );
}

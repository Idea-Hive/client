import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useUserInfo } from "@/hooks/queries";
import { AxiosError } from "axios";
import { useState } from "react";
import { onTemporarySaveProjectApi } from "../_api/api";
import useCreateProjectStore from "../store/createProjectStore";

export default function TemporarySaveButton() {
    const { user } = useUserInfo();

    const { setMultipleErrors, getRequestBody, projectId, setProjectId } = useCreateProjectStore();

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastType, setToastType] = useState<"info" | "error">("info");
    const [toastMessage, setToastMessage] = useState<string>("임시저장 되었습니다.");

    // 프로젝트 임시저장 mutation
    const onTemporarySaveMutation = useCreateMutation(onTemporarySaveProjectApi, "temporarySaveProject", {
        onSuccess: (response) => {
            setProjectId(response);
            setToastType("info");
            setToastMessage("임시저장 되었습니다.");
            setIsToastOpen(true);
            setMultipleErrors({
                name: "",
                title: "",
                description: "",
                maxMembers: "",
                dueDateFrom: "",
                dueDateTo: "",
                contact: "",
            });
        },
        onError: (error: AxiosError) => {
            setIsToastOpen(true);
            setToastType("error");
            setToastMessage(error.response?.data as string);
        },
    });

    // 프로젝트 임시저장
    const onTemporarySave = () => {
        if (!user) return;

        const requestBody = getRequestBody(user.id, projectId);
        if (requestBody.name === "") {
            // 임시저장 시, name 제외하고는 validation 처리하지 않음
            setMultipleErrors({
                name: "프로젝트명을 입력해주세요.",
                title: "",
                description: "",
                maxMembers: "",
                dueDateFrom: "",
                dueDateTo: "",
                contact: "",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setIsToastOpen(true);
            setToastType("error");
            setToastMessage("프로젝트명을 입력해주세요.");
            return;
        }

        onTemporarySaveMutation.mutate({ ...requestBody, isSave: false });
    };

    return (
        <>
            <Button label="임시저장" type="button" btnType="line" className="w-[191px]" onClick={onTemporarySave}></Button>
            {isToastOpen && <Toast type={toastType} message={toastMessage} onClose={() => setIsToastOpen(false)} />}
        </>
    );
}

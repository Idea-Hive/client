import Button from "@/components/Button";
import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useUserInfo } from "@/hooks/queries";
import { AxiosError } from "axios";
import { onTemporarySaveProjectApi } from "../_api/api";
import useCreateProjectStore from "../store/createProjectStore";

export default function TemporarySaveButton() {
    const { showToast } = useToast();
    const { user } = useUserInfo();

    const { setMultipleErrors, getRequestBody, projectId, setProjectId } = useCreateProjectStore();

    // 프로젝트 임시저장 mutation
    const onTemporarySaveMutation = useCreateMutation(onTemporarySaveProjectApi, "temporarySaveProject", {
        onSuccess: (response) => {
            setProjectId(response);
            showToast("info", "임시저장 되었습니다.");
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
            showToast("error", (error.response?.data as string) || "임시저장에 실패했습니다.");
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

            showToast("error", "프로젝트명을 입력해주세요.");
            return;
        }

        onTemporarySaveMutation.mutate({ ...requestBody, isSave: false });
    };

    return <Button label="임시저장" type="button" btnType="line" className="w-[191px]" onClick={onTemporarySave}></Button>;
}

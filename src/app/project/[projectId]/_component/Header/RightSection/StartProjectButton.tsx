import { onStartProjectApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUserInfo } from "../../../hooks/Hooks";

const StartProjectButton = ({ projectId, isNew }: { projectId: number; isNew: boolean }) => {
    const spinner = useSpinner();
    const queryClient = useQueryClient();

    const { user } = useUserInfo();
    const [isOpenStartProjectModal, setIsOpenStartProjectModal] = useState(false);

    const onStartProjectMutation = useMutation({
        mutationFn: onStartProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (data) => {
            console.log("Start Project Success:::", data);
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId, userId: user?.id }] });
        },
        onError: (error) => {
            console.log("Start Project Error:::", error);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleStartProject = () => {
        setIsOpenStartProjectModal(false);
        onStartProjectMutation.mutate({ projectId });
    };

    return (
        <>
            <Button label={isNew ? "프로젝트 시작" : "추가모집 마감하기"} className="w-fit px-6" onClick={() => setIsOpenStartProjectModal(true)} />

            <Modal
                isOpen={isOpenStartProjectModal}
                title={isNew ? "프로젝트를 시작하시겠습니까?" : "추가모집을 마감하시겠습니까?"}
                children={isNew ? "프로젝트가 시작되면 더 이상 지원자를 받을 수 없습니다." : "추가모집이 마감되면 더 이상 지원자를 받을 수 없습니다."}
                confirmText={isNew ? "프로젝트 시작" : "추가모집 마감"}
                onClose={() => setIsOpenStartProjectModal(false)}
                onConfirm={handleStartProject}
            />
        </>
    );
};

export default StartProjectButton;

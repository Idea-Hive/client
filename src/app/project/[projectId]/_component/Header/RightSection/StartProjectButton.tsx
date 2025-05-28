import { onStartProjectApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const StartProjectButton = ({ projectId }: { projectId: number }) => {
    const spinner = useSpinner();

    const [isOpenStartProjectModal, setIsOpenStartProjectModal] = useState(false);

    const onStartProjectMutation = useMutation({
        mutationFn: onStartProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (data) => {
            console.log("Start Project Success:::", data);
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
            <Button label="프로젝트 시작" className="w-fit px-6" onClick={() => setIsOpenStartProjectModal(true)} />

            <Modal
                isOpen={isOpenStartProjectModal}
                title="프로젝트를 시작하시겠습니까?"
                children="프로젝트가 시작되면 더 이상 지원자를 받을 수 없습니다."
                confirmText="프로젝트 시작"
                onClose={() => setIsOpenStartProjectModal(false)}
                onConfirm={handleStartProject}
            />
        </>
    );
};

export default StartProjectButton;

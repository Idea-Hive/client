import { onDeleteProjectApi, onWithdrawProjectApi } from "@/apis/project/manageApis";
import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import { GearSixIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useClickOutside } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Dropbox from "../Dropbox";

export default function ProjectSettingDropDown({ projectId }: { projectId: string }) {
    const { user } = useUserInfo();
    const router = useRouter();
    const spinner = useSpinner();

    const [isToast, setIsToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const dropBoxRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropBoxRef, () => {
        if (isOpen) setIsOpen(false);
    });

    const deleteProjectMutation = useMutation({
        mutationFn: onDeleteProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: () => {
            setIsModal(true);
            setModalTitle("프로젝트 삭제");
            setModalMessage("프로젝트가 삭제되었습니다.");
        },
        onError: (err: AxiosError) => {
            setIsToast(true);
            setToastMessage(err.response?.data as string);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleDeleteProject = () => {
        deleteProjectMutation.mutate({ projectId: Number(projectId), memberId: Number(user!.id) });
    };

    const withdrawProjectMutation = useMutation({
        mutationFn: onWithdrawProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: () => {
            setIsModal(true);
            setModalTitle("프로젝트 탈퇴");
            setModalMessage("프로젝트 탈퇴가 완료되었습니다.");
        },
        onError: (err: AxiosError) => {
            setIsToast(true);
            setToastMessage(err.response?.data as string);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleWithdrawProject = () => {
        withdrawProjectMutation.mutate({ projectId: Number(projectId), memberId: Number(user!.id) });
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-end text-sm mb-3">
                <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <GearSixIcon />
                </button>
                <span className="ml-1 text-n800 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    설정
                </span>
            </div>
            {isOpen && (
                <Dropbox
                    items={[
                        {
                            label: "프로젝트 탈퇴",
                            onClick: handleWithdrawProject,
                        },
                        {
                            label: "프로젝트 삭제",
                            onClick: handleDeleteProject,
                        },
                    ]}
                    dropBoxRef={dropBoxRef}
                />
            )}
            {isToast && (
                <Toast
                    message={toastMessage}
                    type="error"
                    onClose={() => {
                        setIsToast(false);
                    }}
                />
            )}
            <Modal
                isOpen={isModal}
                title={modalTitle}
                children={modalMessage}
                onConfirm={() => {
                    setIsModal(false);
                    router.push("/mypage/profile");
                }}
            ></Modal>
        </div>
    );
}

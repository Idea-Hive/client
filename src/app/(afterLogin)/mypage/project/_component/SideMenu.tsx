"use client";

import Button from "@/components/Button";
import { FolderIcon, GearSixIcon, SquaresFourIcon } from "@/components/icons/icons";
import Selectbox from "@/components/Selectbox";
import { useClickOutside } from "@/hooks/hooks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Menu from "./Menu";

import { onSubmitProjectApi, onWithdrawProjectApi } from "@/apis/project/manageApis";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

interface SideMenuProps {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { AxiosError } from "axios";
import { useProjectWithTeam } from "../_hook/hook";
import Dropbox from "./Dropbox";

const SideMenu: React.FC<SideMenuProps> = ({ selectedMenu, setSelectedMenu }) => {
    const router = useRouter();
    const projectId = (useParams()?.projectId as string) || ""; //path 용
    const { myProjects, loading, error } = useProjectWithTeam(projectId);
    const [selectedProjectId, setSelectedProjectId] = useState(""); //새로고침 용

    const projectOptions = useMemo(() => {
        return (
            myProjects?.projects?.map((item) => ({
                label: item.title,
                value: String(item.id),
            })) || []
        );
    }, [myProjects]);

    useEffect(() => {
        //새로 고침 시,  projectOptions가 빌 경우 initialValue가 반영이 안 됨.
        if (projectOptions.length > 0 && projectId) {
            setSelectedProjectId(projectId);
        }
    }, [projectId, projectOptions]);

    const handleProjectChange = (value: string) => {
        if (value) {
            router.push(`/mypage/project/${value}/manage`);
        }
    };

    return (
        <div className="flex flex-col px-6 pt-10 md-25">
            <div>
                <div className="flex flex-col gap-4">
                    <Selectbox placeholder="프로젝트 선택" options={projectOptions} initialValue={selectedProjectId} onChange={handleProjectChange} />
                    <div className="relative">
                        <Menu
                            label="프로젝트"
                            subItems={[{ label: "기획" }, { label: "디자인" }, { label: "개발" }, { label: "배포" }, { label: "완료" }]}
                            icon={<FolderIcon width={20} height={20} />}
                            selectedItem={selectedMenu}
                            onSelect={setSelectedMenu}
                        />
                        <Menu
                            label="관리"
                            subItems={[{ label: "캘린더" }, { label: "팀" }]}
                            icon={
                                <div className="w-[20px] h-[20px] p-[3px]">
                                    <SquaresFourIcon />
                                </div>
                            }
                            selectedItem={selectedMenu}
                            onSelect={setSelectedMenu}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-[200px]">
                <ProjectSettingDropDown projectId={projectId} />
                <ProjectSubmitButton projectId={selectedProjectId} />
            </div>
        </div>
    );
};

const ProjectSettingDropDown = ({ projectId }: { projectId: string }) => {
    const { user } = useUserInfo();
    const router = useRouter();
    const spinner = useSpinner();

    const [isToast, setIsToast] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const dropBoxRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropBoxRef, () => {
        if (isOpen) setIsOpen(false);
    });

    const handleDeleteProject = () => {
        console.log("삭제");
    };

    const withdrawProjectMutation = useMutation({
        mutationFn: onWithdrawProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: () => {
            setIsModal(true);
        },
        onError: (err: AxiosError) => {
            setIsToast(true);
            console.error("탈퇴 오류:", err);
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
                    message={"알 수 없는 이유로 탈퇴에 실패했습니다."}
                    type={"error"}
                    onClose={() => {
                        setIsToast(false);
                    }}
                />
            )}
            <Modal
                isOpen={isModal}
                title={"탈퇴 완료"}
                children="탈퇴가 완료되었습니다."
                onConfirm={() => {
                    setIsModal(false);
                    router.push("/mypage/profile");
                }}
            ></Modal>
        </div>
    );
};

const ProjectSubmitButton = ({ projectId }: { projectId: string }) => {
    const { mutate } = useMutation({
        mutationFn: onSubmitProjectApi,
        onSuccess: () => {
            alert("프로젝트가 성공적으로 제출되었습니다!");
        },
        onError: (err) => {
            alert("제출에 실패했습니다.");
            console.error("제출 오류:", err);
        },
    });

    const handleSubmit = () => {
        if (!projectId) {
            alert("프로젝트를 선택해주세요.");
            return;
        }
        mutate({ projectId: Number(projectId) });
    };

    return <Button label="프로젝트 제출" onClick={handleSubmit} size="large" btnType="primary" />;
};

export default SideMenu;

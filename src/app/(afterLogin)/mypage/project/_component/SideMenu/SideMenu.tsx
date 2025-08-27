"use client";

import { FolderIcon, SquaresFourIcon } from "@/components/icons/icons";
import Selectbox from "@/components/Selectbox";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useProjectWithTeam } from "../../_hook/hook";
import Menu from "../Menu";
import ProjectSettingDropDown from "./ProjectSettingDropDown";
import ProjectSubmitButton from "./ProjectSubmitButton";
import { useUnSubmittedTaskStore } from "./store/store";

interface SideMenuProps {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ selectedMenu, setSelectedMenu }) => {
    const { unSubmittedTask } = useUnSubmittedTaskStore();

    const router = useRouter();
    const projectId = (useParams()?.projectId as string) || ""; //path 용
    const { myProjects, loading, error } = useProjectWithTeam(projectId);
    const [selectedProjectId, setSelectedProjectId] = useState(""); //새로고침 용

    const projectOptions = useMemo(() => {
        return (
            myProjects?.projects?.map((item) => ({
                label: item.name,
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
                            subItems={[
                                { label: "기획", isSubmitted: !unSubmittedTask.some((task) => [1, 2, 3, 4, 5, 6, 7].includes(task)) },
                                { label: "디자인", isSubmitted: !unSubmittedTask.some((task) => [13, 14].includes(task)) },
                                { label: "개발", isSubmitted: !unSubmittedTask.some((task) => [17, 18, 19, 20].includes(task)) },
                                { label: "배포", isSubmitted: !unSubmittedTask.some((task) => [22].includes(task)) },
                                { label: "완료", isSubmitted: !unSubmittedTask.some((task) => [23].includes(task)) },
                            ]}
                            icon={<FolderIcon width={20} height={20} />}
                            selectedItem={selectedMenu}
                            onSelect={setSelectedMenu}
                        />
                        <Menu
                            label="관리"
                            subItems={[
                                { label: "캘린더", isSubmitted: true },
                                { label: "팀", isSubmitted: true },
                            ]}
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

export default SideMenu;

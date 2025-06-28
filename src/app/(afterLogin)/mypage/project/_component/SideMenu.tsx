"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Selectbox from "@/components/Selectbox";
import Menu from "./Menu";
import { FolderIcon, SquaresFourIcon, GearSixIcon } from "@/components/icons/icons";
import Button from "@/components/Button";
import { useClickOutside } from "@/hooks/hooks";

import { useParams, useRouter } from "next/navigation";
import { getMyProjectInfo, onSubmitProjectApi } from "@/apis/project/manageApis";
import { useQuery, useMutation } from "@tanstack/react-query";

interface SideMenuProps {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ selectedMenu, setSelectedMenu }) => {
    const router = useRouter();
    const projectId = (useParams()?.projectId as string) || "";

    // 내 프로젝트 조회
    const { data, isPending, isError } = useQuery({
        queryKey: [
            "getMyProjects",
            {
                status: "IN_PROGRESS",
                page: 0,
            },
        ],
        queryFn: getMyProjectInfo,
    });

    const projectOptions = useMemo(() => {
        return (
            data?.projects?.map((item) => ({
                label: item.title,
                value: String(item.id),
            })) || []
        );
    }, [data]);

    const [selectedProjectId, setSelectedProjectId] = useState("");
    useEffect(() => {
        //새로 고침 시,  projectOptions가 빌 경우 initialValue가 반영이 안 됨.
        if (projectOptions.length > 0 && projectId) {
            setSelectedProjectId(String(projectId));
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

            <div className="flex flex-col">
                <ProjectSettingDropDown />
                <ProjectSubmitButton projectId={selectedProjectId} />
            </div>
        </div>
    );
};

const ProjectSettingDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => {
        if (isOpen) setIsOpen(false);
    });
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
                <div ref={dropBoxRef} className="absolute right-0 bottom-full mb-[9px]">
                    <ul className="w-[120px] bg-white border rounded shadow z-10 text-sm text-n800">
                        <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200 cursor-pointer">프로젝트 탈퇴</li>
                        <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200 cursor-pointer">프로젝트 삭제</li>
                    </ul>
                </div>
            )}
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
        if(!projectId) {
            alert("프로젝트를 선택해주세요.");
            return;
        }
        mutate({projectId: Number(projectId)});
    }

    return (
        <Button label="프로젝트 제출" 
            onClick={handleSubmit} 
            size="large" 
            btnType="primary" 
        />
    );
};

export default SideMenu;
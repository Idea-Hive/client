"use client";

import { getMyProjectApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tabs } from "../datas/tabs";

interface Project {
    projectId: number;
    name: string | null;
    title: string;
    description: string;
    hashtagNames: string[];
    creator: string;
    viewCnt: number;
    likedCnt: number;
    expirationDate: string;
    status: string;
}

interface ProjectData {
    projects: {
        RECRUITING?: Project[];
        IN_PROGRESS?: Project[];
        COMPLETED?: Project[];
        LIKED?: Project[];
    };
    totalCnt: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export default function MyProjects() {
    const [selectedTab, setSelectedTab] = useState<keyof ProjectData["projects"]>("RECRUITING");
    const router = useRouter();

    const { data: projectData, isPending } = useQuery({
        queryKey: ["myProjects", 1],
        queryFn: getMyProjectApi,
        refetchInterval: 5 * 60 * 1000, // 5분마다 리페치
    });

    // 탭별 프로젝트 개수 계산
    const updatedTabs = tabs.map((tab) => ({
        ...tab,
        count: (projectData?.projects as any)?.[tab.id]?.length || 0,
    }));

    // 선택된 탭의 프로젝트들
    const selectedProjects = (projectData?.projects as any)?.[selectedTab] || [];

    if (isPending) return <Spinner />;

    return (
        <div className="border border-n500 rounded-xl px-6 py-10 bg-white">
            <div className="text-h3 text-n900 mb-8">내 프로젝트</div>
            <div className="grid grid-cols-4 gap-6 mb-[60px]">
                {updatedTabs.map((tab) => {
                    return (
                        <div
                            key={tab.id}
                            className={`rounded border h-[100px] flex flex-col justify-between cursor-pointer p-[14px] ${
                                selectedTab === tab.id ? "border-taskmateRed bg-taskmateRed/10" : "border-n400 bg-n0"
                            }`}
                            onClick={() => setSelectedTab(tab.id)}
                        >
                            <div className={`flex items-center gap-2 text-base leading-7 ${selectedTab === tab.id ? "text-taskmateRed" : "text-n700"}`}>
                                {tab.icon(selectedTab === tab.id)}
                                {tab.title}
                            </div>
                            <div className={`text-lg text-end ${selectedTab === tab.id ? "text-taskmateRed" : "text-n700"}`}>{tab.count}개</div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full border-t border-n500">
                {selectedProjects.length > 0 ? (
                    selectedProjects.map((project: Project) => (
                        <div key={project.projectId} className="w-full flex items-center justify-between border-b border-n500 py-4 pl-6">
                            <div
                                className="text-baseEmphasize text-n900 cursor-pointer"
                                onClick={() => {
                                    router.push(`/project/${project.projectId}`);
                                }}
                            >
                                {project.name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    label="프로젝트 바로가기"
                                    size="medium"
                                    btnType="line_red"
                                    onClick={() => {
                                        router.push(`/mypage/project/${project.projectId}/manage`);
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center py-8 text-n600">
                        {selectedTab === "RECRUITING" && "모집중인 프로젝트가 없습니다."}
                        {selectedTab === "IN_PROGRESS" && "진행중인 프로젝트가 없습니다."}
                        {selectedTab === "COMPLETED" && "완료된 프로젝트가 없습니다."}
                        {selectedTab === "LIKED" && "찜한 프로젝트가 없습니다."}
                    </div>
                )}
            </div>
        </div>
    );
}

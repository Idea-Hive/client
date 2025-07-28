"use client";

import { onSearchProjectsApi } from "@/apis/project/projectApis";
import Pagination from "@/components/Pagination";
import Tab from "@/components/Tab";
import { useUserInfo } from "@/hooks/queries";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FloatBtn from "./_component/FloatBtn";
import ProjectGrid from "./_component/ProjectGrid";
import SearchAndSort from "./_component/SearchAndSort";

const ProjectListComponent = () => {
    const params = useSearchParams();
    const tab = params.get("tab") || "ALL";

    const [selectedTab, setSelectedTab] = useState<string>(tab);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState<"RECENT" | "DEADLINE">("RECENT");

    const { user } = useUserInfo();

    const { data, isPending, isError } = useQuery({
        queryKey: [
            "getProjects",
            {
                keyword: searchTerm,
                recruitType: selectedTab as "ALL" | "NEW" | "ADDITIONAL",
                sortType,
                page,
                size: 12,
            },
        ],
        queryFn: onSearchProjectsApi,
    });

    console.log("data:::", data);

    // 검색어, 탭, 정렬 변경 시 페이지 초기화
    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedTab, sortType]);

    if (isError) return <div>Error</div>;

    return (
        <div className="w-full pb-[60px]">
            <div className="bg-n200 h-[90px] flex items-center">
                <div className="w-full max-w-[1232px] px-4 mx-auto text-h3 text-n900">나에게 딱 맞는 프로젝트를 탐색해보세요</div>
            </div>

            <div className="w-full max-w-[1232px] px-4 mx-auto relative">
                <h2 className="text-h2 text-n900 mt-6 mb-[34px]">프로젝트 탐색</h2>

                {/* 탭 */}
                <Tab
                    items={[
                        {
                            label: "전체",
                            value: "ALL",
                        },
                        {
                            label: "모집중",
                            value: "NEW",
                        },
                        {
                            label: "추가모집중",
                            value: "ADDITIONAL",
                        },
                    ]}
                    defaultTab={selectedTab}
                    onChange={(value) => {
                        setSelectedTab(value);
                    }}
                />

                {/* 검색 및 정렬 */}
                <SearchAndSort setSearchTerm={setSearchTerm} sortType={sortType} setSortType={setSortType} />

                {/* 프로젝트 리스트 */}
                <ProjectGrid projects={data?.projects} isPending={isPending} />

                {/* Pagination */}
                {data?.projects && data.projects.length > 0 && (
                    <div className="w-full flex justify-center">
                        <Pagination page={page} viewPerPage={12} total={data.totalCnt} onChange={(page) => setPage(page)} />
                    </div>
                )}
            </div>

            {user && <FloatBtn userId={user.id} />}
        </div>
    );
};

export default dynamic(() => Promise.resolve(ProjectListComponent), { ssr: false });

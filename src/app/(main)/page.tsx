"use client";

import { onSearchProjectsApi } from "@/apis/project/projectApis";
import Spinner from "@/components/Spinner";
import { useQueries } from "@tanstack/react-query";
import Banner from "./_component/Banner";
import ProjectList from "./_component/ProjectList";

export default function Home() {
    // 모집중인 프로젝트, 추가 모집중인 프로젝트 데이터 조회
    const results = useQueries({
        queries: [
            {
                queryKey: ["getProjects", { keyword: "", recruitType: "NEW", sortType: "RECENT", page: 1, size: 6 }],
                queryFn: onSearchProjectsApi,
            },
            {
                queryKey: ["getProjects", { keyword: "", recruitType: "ADDITIONAL", sortType: "RECENT", page: 1, size: 6 }],
                queryFn: onSearchProjectsApi,
            },
        ],
    });

    return (
        <div className="py-[60px]">
            {/* 배너 */}
            <Banner />

            {/* 프로젝트 목록 */}
            {(results[0].isPending || results[1].isPending) && <Spinner />}
            <div className="w-full max-w-[1232px] px-4 mx-auto flex flex-col gap-[100px]">
                <ProjectList projects={results[0].data?.projects || []} label="모집중인 프로젝트" type="NEW" />
                <ProjectList projects={results[1].data?.projects || []} label="추가 모집중인 프로젝트" type="ADDITIONAL" />
            </div>
        </div>
    );
}

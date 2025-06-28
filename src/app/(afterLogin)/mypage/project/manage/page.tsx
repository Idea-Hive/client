"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMyProjectInfo } from "@/apis/project/manageApis";
import { useQuery } from "@tanstack/react-query";

export default function ManageRedirectPage() {
    const router = useRouter();

    //내 프로젝트 조회
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

    useEffect(() => {
        const fetchAndRedirect = () => {
            if(data && data.totalCnt > 0) {
                const firstProjectId = data.projects[0].id;
                router.replace(`/mypage/project/${firstProjectId}/manage`);
            }
        };
        fetchAndRedirect();
    }, [data]);

    if (isPending) return <div></div>;
    if (isError) return <div>프로젝트를 불러오는 중 오류가 발생했습니다.</div>;
    if (data?.totalCnt === 0) {
        <div>프로젝트가 없습니다.</div>
    }

    return null;
}

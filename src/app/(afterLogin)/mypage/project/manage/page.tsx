"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInitialProjectWithTeam } from "../_hook/hook";

export default function ManageRedirectPage() {
    const router = useRouter();
    const { projectId, teamMembers, myProjects, loading, error } = useInitialProjectWithTeam();

    //teamMember까지 불러온 다음에 routing
    useEffect(() => {
        if (teamMembers) {
            router.replace(`/mypage/project/${projectId}/manage`);
        }
    }, [teamMembers]);

    if (loading) return <div></div>;
    if (error) return <div>프로젝트를 불러오는 중 오류가 발생했습니다.</div>;
    if (myProjects?.totalCnt === 0) {
        <div>프로젝트가 없습니다.</div>;
    }

    return null;
}

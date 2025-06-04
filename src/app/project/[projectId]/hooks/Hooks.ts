import { getUserInfoApi } from "@/apis/user/userApis";

import { getApplicantInfoApi, getProjectDetailApi } from "@/apis/project/projectApis";
import { User } from "@/apis/user/userApis";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
    const { data: user, isPending: userIsPending } = useQuery({
        queryKey: ["isLoggedIn"],
        queryFn: getUserInfoApi,
    });
    return { user, userIsPending };
};

export const useProjectDetail = (projectId: number, user: User | undefined) => {
    const { data: project, isPending: projectIsPending } = useQuery({
        queryKey: ["getProjectDetail", { projectId, userId: user?.id }],
        queryFn: getProjectDetailApi,
        enabled: user ? !!user?.id : true,
    });

    return { project, projectIsPending };
};

export const useApplicantInfo = (projectId: number) => {
    const { data: applicantData, isPending: applicantIsPending } = useQuery({
        queryKey: ["getApplicantInfo", { projectId, page: 1, size: 4 }],
        queryFn: getApplicantInfoApi,
    });

    return { applicantData, applicantIsPending };
};

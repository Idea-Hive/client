import { getUserInfoApi } from "@/apis/user/userApis";

import { getApplicantInfoApi, getProjectDetailApi, getProjectViewCntApi } from "@/apis/project/projectApis";
import { User } from "@/apis/user/userApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useProjectViewCnt = (projectId: number) => {
    const queryClient = useQueryClient();
    const { user } = useUserInfo();

    const { mutate: viewCntMutate, isPending: viewCntIsPending } = useMutation({
        mutationFn: () => getProjectViewCntApi(projectId),
        onSuccess: () => {
            // Update project detail data in the cache with correct query key
            queryClient.setQueryData(["getProjectDetail", { projectId, userId: user?.id }], (oldData: any) =>
                oldData
                    ? {
                          ...oldData,
                          viewCnt: oldData.viewCnt + 1,
                      }
                    : oldData
            );
        },
    });

    return { viewCntMutate, viewCntIsPending };
};

export const useApplicantInfo = (projectId: number) => {
    const { data: applicantData, isPending: applicantIsPending } = useQuery({
        queryKey: ["getApplicantInfo", { projectId, page: 1, size: 4 }],
        queryFn: getApplicantInfoApi,
    });

    return { applicantData, applicantIsPending };
};

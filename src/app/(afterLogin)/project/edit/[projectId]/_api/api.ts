import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";
import { QueryFunction } from "@tanstack/react-query";
import { SkillStack } from "../_types/type";

// 기술스택 조회
export const getSkillStackApi: QueryFunction<SkillStack[], [_1: string]> = async ({ queryKey }) => {
    try {
        const token = getToken();
        const res = await Apis.get("/skillstack", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (err) {
        console.error("getSkillStackApi error", err);
    }
};

export interface EditProjectRequest {
    projectId: number | null;
    title: string;
    description: string;
    idea: string;
    contact: string;
    maxMembers: number;
    dueDateFrom: string | null;
    dueDateTo: string | null;
    skillStackIds: number[];
    hashtags: string[];
}

export const onEditProjectApi = async (body: EditProjectRequest) => {
    try {
        const token = getToken();

        return await Apis.post("/project/update", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 수정 중 오류 발생:", error);
        throw error;
    }
};

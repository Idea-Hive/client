import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";
import { QueryFunction } from "@tanstack/react-query";

export interface SkillStack {
    id: number;
    name: string;
    category: string;
}

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

// 임시저장 프로젝트 상세 정보 조회
export interface TemporarySavedProjectInfo {
    name: string;
    title: string;
    description: string;
    idea: string;
    contact: string;
    maxMembers: number;
    dueDateFrom: string;
    dueDateTo: string;
    hashtagNames: string[];
    projectSkillStacks: string[];
}
export const getTemporarySavedProjectInfoApi = async (projectId: number): Promise<TemporarySavedProjectInfo> => {
    try {
        const token = getToken();

        return await Apis.get("/project/tempsaved/info", {
            params: { projectId },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("임시저장 프로젝트 상세 정보 조회 중 오류 발생:", error);
        throw error;
    }
};

// Project 저장
export interface SaveProjectRequest {
    projectId: number | null;
    userId: number;
    name: string;
    title: string;
    description: string;
    idea: string;
    contact: string;
    maxMembers: number;
    dueDateFrom: string | null;
    dueDateTo: string | null;
    skillStackIds: number[];
    hashtags: string[];
    isSave: boolean;
}
export const onSaveProjectApi = async (body: SaveProjectRequest): Promise<number> => {
    try {
        const token = getToken();
        return await Apis.post("/project/create", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 저장 중 오류 발생:", error);
        throw error;
    }
};

export const onTemporarySaveProjectApi = async (body: SaveProjectRequest) => {
    try {
        const token = getToken();
        return await Apis.post("/project/create", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 임시저장 중 오류 발생:", error);
        throw error;
    }
};

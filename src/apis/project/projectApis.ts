import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

// Project 저장
export interface SaveProjectRequest {
    projectId: number | null;
    userId: number;
    title: string;
    description: string;
    idea: string;
    contact: string;
    maxMembers: number;
    dueDateFrom: string;
    dueDateTo: string;
    skillStackIds: number[];
    hashtags: string[];
    isSave: boolean;
}

export const onSaveProjectApi = async (body: SaveProjectRequest) => {
    const token = localStorage.getItem("token");
    return await Apis.post("/project/create", body, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// 프로젝트 검색
export interface SearchProjectsRequest {
    keyword: string;
    recruitType: string;
    sortType: string;
}
export interface SearchProjectsResponse {
    totalCount: number;
    projects: {
        id: number;
        title: string;
        description: string;
        hashtagNames: string[];
    }[];
}

export const onSearchProjectsApi: QueryFunction<SearchProjectsResponse, [_1: string, keyword: string, recruitType: string, sortType: string, page: number, size: number]> = async ({ queryKey }) => {
    const [_, keyword, recruitType, sortType, page, size] = queryKey;
    return await Apis.get(`/project/search?keyword=${keyword}&recruitType=${recruitType}&sortType=${sortType}&page=${page}&size=${size}`);
};

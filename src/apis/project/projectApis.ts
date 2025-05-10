import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

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
    skillStackIds: string[];
    hashtags: string[];
    isSave: boolean;
}

export const onSaveProjectApi = async (body: SaveProjectRequest) => {
    return await axios.post("http://localhost:8080/api/project/create", body, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYnN3cGd1cjJAbmF2ZXIuY29tIiwiaXNzIjoiVGFza21hdGUiLCJpYXQiOjE3NDY4NjA4OTYsImV4cCI6MTc0Njg5MDg5NiwidHlwZSI6ImFjY2VzcyJ9.nyQxd9wEkOaO8Z8EfRFmVqg0BxSChl4corTwxKdHDxY`,
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
    data: {
        totalCount: number;
        projects: {
            id: number;
            title: string;
            description: string;
            hashtagNames: string[];
        }[];
    };
}

export const onSearchProjectsApi: QueryFunction<SearchProjectsResponse, [_1: string, keyword: string, recruitType: string, sortType: string]> = async ({ queryKey }) => {
    const [_, keyword, recruitType, sortType] = queryKey;
    return await axios.get(`http://localhost:8080/api/project/search?keyword=${keyword}&recruitType=${recruitType}&sortType=${sortType}`);
};

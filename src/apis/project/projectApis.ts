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
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    return await Apis.post("/project/create", body, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const onTemporarySaveProjectApi = async (body: SaveProjectRequest) => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
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
    recruitType: "NEW" | "ADDITIONAL" | "ALL"; // Available values 추가
    sortType: "RECENT" | "DEADLINE"; // Available values 추가
    page: number; // Default: 1
    size: number; // Default: 12
}
export interface Project {
    id: number;
    title: string;
    description: string;
    hashtagNames: string[];
    creator: string;
    likedCnt: number;
    viewCnt: number;
}
export interface SearchProjectsResponse {
    totalCnt: number;
    projects: Project[];
}

export const onSearchProjectsApi: QueryFunction<SearchProjectsResponse, [_1: string, SearchProjectsRequest]> = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const { keyword = "", recruitType, sortType, page = 1, size = 12 } = params;

    return await Apis.get("/project/search", {
        params: {
            keyword,
            recruitType,
            sortType,
            page,
            size,
        },
    });
};

// 프로젝트 상세 조회
export interface GetProjectDetailRequest {
    projectId: number;
}
export interface Applicant {
    memberId: number;
    name: string;
    job: string;
    career: number;
    applicationMessage: string;
    skillStacks: string[];
    isAccepted: "CONFIRMED" | "UNDECIDED" | "REJECTED";
    completedProjectCnt: number;
}

export interface ProjectDetailData {
    projectId: number;
    title: string;
    hashtagNames: string[];
    creatorId: number;
    creatorName: string;
    creatorJob: string;
    creatorCareer: number;
    projectSkillStacks: string[];
    description: string;
    idea: string;
    maxMembers: number;
    dueDateFrom: string;
    dueDateTo: string;
    contact: string;
    viewCnt: number;
    likedCnt: number;
}
export const getProjectDetailApi: QueryFunction<ProjectDetailData, [_1: string, GetProjectDetailRequest]> = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const { projectId } = params;

    return await Apis.get("/project/info", {
        params: {
            projectId,
        },
    });
};

// 지원자 정보 가져오기
export interface GetApplicantInfoRequest {
    projectId: number;
    page: number;
    size: number;
}
export interface ApplicantInfo {
    applicants: Applicant[];
    totalCnt: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
export const getApplicantInfoApi: QueryFunction<ApplicantInfo, [_1: string, GetApplicantInfoRequest]> = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const { projectId, page = 1, size = 4 } = params;

    return await Apis.get("/project/applicants", {
        params: {
            projectId,
            page,
            size,
        },
    });
};

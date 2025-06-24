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
    dueDateFrom: string | null;
    dueDateTo: string | null;
    skillStackIds: number[];
    hashtags: string[];
    isSave: boolean;
}

export const onSaveProjectApi = async (body: SaveProjectRequest) => {
    try {
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
    } catch (error) {
        console.error("프로젝트 저장 중 오류 발생:", error);
        throw error;
    }
};

export const onTemporarySaveProjectApi = async (body: SaveProjectRequest) => {
    try {
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
    } catch (error) {
        console.error("프로젝트 임시저장 중 오류 발생:", error);
        throw error;
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
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        return await Apis.post("/project/update", body, {
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
    try {
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
    } catch (error) {
        console.error("프로젝트 검색 중 오류 발생:", error);
        throw error;
    }
};

// 프로젝트 상세 조회
export interface GetProjectDetailRequest {
    projectId: number;
    userId: number | undefined;
}
export interface Applicant {
    applyId: number;
    memberId: number;
    name: string;
    job: string;
    career: number;
    applicationMessage: string;
    skillStacks: string[];
    isAccepted: "CONFIRMED" | "UNDECIDED" | "REJECTED";
    completedProjectCnt: number;
    rejectionMessage: string;
    isReApplication?: boolean;
    preRejectionMessage?: string;
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
    expirationDate: string;
    contact: string;
    viewCnt: number;
    likedCnt: number;
    projectStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED";
    creatorCompletedProjectCnt: number;
    isApply: boolean;
    isLike: boolean;
    isNew: boolean;
}
export const getProjectDetailApi: QueryFunction<ProjectDetailData, [_1: string, GetProjectDetailRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;
        const { projectId, userId } = params;

        const parameters = userId ? { projectId, userId } : { projectId };
        return await Apis.get("/project/info", {
            params: parameters,
        });
    } catch (error) {
        console.error("프로젝트 상세 정보 조회 중 오류 발생:", error);
        throw error;
    }
};

// 프로젝트 조회수 증가
export const getProjectViewCntApi = async (projectId: number) => {
    try {
        return await Apis.post("/project/viewCnt", { projectId });
    } catch (error) {
        console.error("프로젝트 조회수 증가 중 오류 발생:", error);
        throw error;
    }
};

// 지원자 정보 가져오기
export interface GetApplicantInfoRequest {
    projectId: number;
    page: number;
    size: number;
}
export interface ApplicantInfo {
    applicants?: Applicant[];
    totalCnt: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
export const getApplicantInfoApi: QueryFunction<ApplicantInfo, [_1: string, GetApplicantInfoRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;
        const { projectId, page = 1, size = 4 } = params;

        return await Apis.get("/project/applicants", {
            params: {
                projectId,
                page,
                size,
            },
        });
    } catch (error) {
        console.error("지원자 정보 조회 중 오류 발생:", error);
        throw error;
    }
};

// Project 시작
export interface StartProjectRequest {
    projectId: number;
}

export const onStartProjectApi = async (body: StartProjectRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.post("/project/start", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 시작 중 오류 발생:", error);
        throw error;
    }
};

// Project 추가모집
export interface RecruitAdditionalMemberRequest {
    projectId: number;
}

export const onRecruitAdditionalMemberApi = async (body: RecruitAdditionalMemberRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.post("/project/recruit", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("추가 멤버 모집 중 오류 발생:", error);
        throw error;
    }
};

// Project 좋아요
export interface LikeProjectRequest {
    projectId: number;
    memberId: number;
    isLike: boolean;
}

export const onLikeProjectApi = async (body: LikeProjectRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.post("/project/like", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 좋아요 처리 중 오류 발생:", error);
        throw error;
    }
};

// 임시저장 프로젝트 목록 조회
export interface TemporarySavedProject {
    projectId: number;
    title: string;
    tempSavedDate: string;
}
export const getTemporarySavedProjectApi = async (userId: number): Promise<TemporarySavedProject[]> => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.get("/project/tempsaved", {
            params: {
                userId,
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("임시저장 프로젝트 조회 중 오류 발생:", error);
        throw error;
    }
};

// 임시저장 프로젝트 상세 정보 조회
export interface TemporarySavedProjectInfo {
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
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

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

// Project 지원하기
export interface ApplyProjectRequest {
    projectId: number;
    memberId: number;
    message: string;
}

export const onApplyProjectApi = async (body: ApplyProjectRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.post("/project/apply", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 지원하기 처리 중 오류 발생:", error);
        throw error;
    }
};

// Project 지원 취소
export interface CancelApplicantRequest {
    applyId: number;
}

export const onCancelApplicantApi = async (body: CancelApplicantRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.delete("/project/apply", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 지원 취소 처리 중 오류 발생:", error);
        throw error;
    }
};

// Project 끌어올리기
export interface PullUpProjectRequest {
    projectId: number;
}

export const onPullUpProjectApi = async (body: PullUpProjectRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.post("/project/pushToTop", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 끌어올리기 처리 중 오류 발생:", error);
        throw error;
    }
};

import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

export interface Project {
    id: number;
    title: string;
    description: string;
    hashtagNames: string[];
    creator: string;
    likedCnt: number;
    viewCnt: number;
}
export interface ProjectInfoResponse {
    projects: Project[];
    totalCnt: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface ProjectInfoRequest {
    status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED";
    page: number;
}

export const getMyProjectInfo: QueryFunction<ProjectInfoResponse, [_1: string, ProjectInfoRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;
        const { status, page } = params;

        return await Apis.get("/project/info", {
            params: {
                status,
                page,
            },
        });
    } catch (error) {
        console.error("프로젝트 관리 > 프로젝트 목록 조회(본인) 중 오류 발생:", error);
        throw error;
    }
};

//프로젝트 프로세스 유형별 테스크 조회 API
export interface Task {
    id: number;
    isRequired: boolean;
    isSubmitted: boolean;
    title: string;
    taskType: "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
    filePath: string;
    pic: string;
    dueDate: string | null;
    uploadDate: string | null;
    picId: number;
}

export interface TaskResponse {
    requiredTask: Task[];
    optionalTasks: Task[];
}

export interface TaskRequest {
    projectId: number;
    taskType: "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
}

export const getTaskInfoByType: QueryFunction<TaskResponse, [_1: string, TaskRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;
        const { projectId, taskType } = params;

        return await Apis.get("/api/task", {
            params: {
                projectId,
                taskType,
            },
        });
    } catch (error) {
        console.error("프로젝트 프로세스 유형별 테스크 조회 중 오류 발생:", error);
        throw error;
    }
};

//프로젝트 제출 API
export interface SubmitProjectRequest {
    projectId: number;
}

export const onSubmitProjectApi = async (body: SubmitProjectRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.post("/api/project/submit", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 제출 중 오류 발생:", error);
        throw error;
    }
};

//마감기한 수정 API
export interface UpdateTaskDueDateRequest {
    taskId: number;
    dueDate: string;
}

export const onUpdateDueDate = async (body: UpdateTaskDueDateRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.put("/api/task/duedate", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("마감기한 수정 중 오류 발생:", error);
        throw error;
    }
};

//담당자 수정 API
export interface UpdateTaskManagerRequest {
    taskId: number;
    projectId: number;
    memberId: number;
}

export const onUpdateManager = async (body: UpdateTaskManagerRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return await Apis.put("/api/task/pic", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("담당자 수정 중 오류 발생:", error);
        throw error;
    }
};
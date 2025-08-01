import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";
import { QueryFunction } from "@tanstack/react-query";

export interface Project {
    id: number;
    name: string;
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
    page: number;
}

export const getMyProjectInfo: QueryFunction<ProjectInfoResponse, [_1: string, ProjectInfoRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;
        const token = getToken();

        return await Apis.get("/project/manage", {
            params,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
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
    attachedLink: string | null;
    fileUploadLink: string | null;
    originalFileName: string;
    pic: string;
    dueDate: string | null;
    uploadDate: string | null;
    picId: number;
}

export interface TaskResponse {
    requiredTasks: Task[];
    optionalTasks: Task[];
}

export interface TaskRequest {
    projectId: number;
    taskType: "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
}

export const getTaskInfoByType: QueryFunction<TaskResponse, [_1: string, TaskRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;

        const token = getToken();

        return await Apis.get("/task", {
            params,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
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
        const token = getToken();
        return await Apis.post("/project/submit", body, {
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
        const token = getToken();
        return await Apis.put("/task/duedate", body, {
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

//프로젝트 팀원 조회 api
export interface MemberResponse {
    id: number;
    name: string;
    job: string;
    profileUrl: string;
    isDeleted: boolean;
    isVerified: boolean;
    projectRole: "LEADER" | "TEAM_MEMBER" | "GUEST";
}
export interface MemberRequest {
    id: number;
}
export const getTeamMemberList: QueryFunction<MemberResponse[], [_1: string, MemberRequest]> = async ({ queryKey }) => {
    try {
        const [_, params] = queryKey;
        const token = getToken();

        return await Apis.get("/project/members", {
            params,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("프로젝트 팀원 조회 중 오류 발생:", error);
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
        const token = getToken();
        return await Apis.put("/task/pic", body, {
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

//과제 링크 첨부 API
export interface UpdateLinkRequest {
    taskId: number;
    attachedLink: string;
}

export const onUploadLink = async (body: UpdateLinkRequest) => {
    try {
        const token = getToken();
        return await Apis.post("/task/attach-link", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("과제 링크 첨부 중 오류 발생:", error);
        throw error;
    }
};

//첨부파일 업로드 API
export interface FileUploadRequest {
    file: File | null;
    taskId: number;
}
export const onUploadFile = async (request: FileUploadRequest) => {
    try {
        const token = getToken();
        const formData = new FormData();

        if (request.file != null) {
            formData.append("file", request.file);
        }
        formData.append("taskInfo", new Blob([JSON.stringify({ taskId: request.taskId })], { type: "application/json" }));

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const response = await Apis.post("/task/file-upload", formData, {
            withCredentials: true,
            headers: {
                "Content-Type": undefined, //파일 첨부 시, 기본 content-type 무시
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("과제 파일 업로드 중 오류 발생:", error);
        throw error;
    }
};

export interface CreateCustomTaskRequest {
    projectId: number;
    taskType: "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
}

//과제 추가 api
export const onCreateCustomTask = async (body: CreateCustomTaskRequest) => {
    try {
        const token = getToken();

        const response = await Apis.post("/task/option", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("과제 추가 API 중 오류 발생:", error);
        throw error;
    }
};

// 프로젝트 탈퇴 API
export interface WithdrawProjectRequest {
    projectId: number;
    memberId: number;
}
export const onWithdrawProjectApi = async (body: WithdrawProjectRequest) => {
    try {
        const token = getToken();

        const response = await Apis.delete(`/project/leave`, body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("프로젝트 탈퇴 중 오류 발생:", error);
        throw error;
    }
};

// 프로젝트 삭제 API
export interface DeleteProjectRequest {
    projectId: number;
    memberId: number;
}
export const onDeleteProjectApi = async (body: DeleteProjectRequest) => {
    try {
        const token = getToken();

        const response = await Apis.delete(`/project`, body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("프로젝트 삭제 중 오류 발생:", error);
        throw error;
    }
};

// 프로젝트 팀장 변경 API
export interface ChangeLeaderRequest {
    beforeLeaderId: number;
    afterLeaderId: number;
    projectId: number;
}
export const onChangeLeaderApi = async (body: ChangeLeaderRequest) => {
    try {
        const token = getToken();

        const response = await Apis.put(`/project/leader/change`, body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("프로젝트 팀장 변경 중 오류 발생:", error);
        throw error;
    }
};

import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

// 캘린더 태스크 조회
export interface GetCalendarTasksRequest {
    userId: number;
    projectId: number;
}

export type CalendarTaskType = "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
export interface CalendarTask {
    id: number;
    isRequired: boolean;
    isSubmitted: boolean;
    title: string;
    taskType: CalendarTaskType;
    attachedLink: string;
    filePath: string;
    pic: string;
    dueDate: string;
    uploadDate: string;
    picId: number;
}

export interface ProjectTasks {
    requiredTasks: CalendarTask[];
    optionalTasks: CalendarTask[];
}

export interface GetCalendarTasksResponse {
    [key: string]: ProjectTasks;
}
export const getCalendarTasksApi: QueryFunction<GetCalendarTasksResponse, [_1: string, memberId: number | undefined, projectId: number | undefined]> = async ({ queryKey }) => {
    try {
        const [_, memberId, projectId] = queryKey;

        if (!memberId || !projectId) {
            throw new Error("memberId 또는 projectId가 없습니다.");
            return null;
        }

        return await Apis.getAuth("/project/calender", {
            params: { memberId, projectId },
        });
    } catch (error) {
        console.error("캘린더 태스크 조회 중 오류 발생:", error);
        throw error;
    }
};

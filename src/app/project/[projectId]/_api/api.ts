import { Apis } from "@/utils/api";

// Project 끌어올리기
export interface PullUpProjectRequest {
    projectId: number;
}

export const onPullUpProjectApi = async (body: PullUpProjectRequest) => {
    try {
        return await Apis.postAuth("/project/pushToTop", body);
    } catch (error) {
        console.error("프로젝트 끌어올리기 처리 중 오류 발생:", error);
        throw error;
    }
};

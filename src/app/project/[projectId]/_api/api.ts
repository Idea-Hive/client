import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";

// Project 끌어올리기
export interface PullUpProjectRequest {
    projectId: number;
}

export const onPullUpProjectApi = async (body: PullUpProjectRequest) => {
    try {
        const token = getToken();
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

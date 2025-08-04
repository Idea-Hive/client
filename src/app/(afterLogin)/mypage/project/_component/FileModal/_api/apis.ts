import { Apis } from "@/utils/api";

export const downloadFileApi = async ({ taskId }: { taskId: number }) => {
    try {
        return await Apis.getAuth(`/task/download/${taskId}`);
    } catch (error) {
        console.error("파일 다운로드 중 오류 발생:", error);
        throw error;
    }
};

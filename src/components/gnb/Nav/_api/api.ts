import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

export const logoutApi = async () => {
    try {
        const response = await Apis.postAuth("/auth/logout");

        return response;
    } catch (error) {
        console.error("로그아웃 실패:", error);
    }
};

export interface NotificationRequest {
    userId: number;
    page: number;
    size: number;
}

export interface Notification {
    id: number;
    message: string;
    createdDate: string;
}

export const getNotificationsApi: QueryFunction<Notification[], [_1: string, request: NotificationRequest]> = async ({ queryKey }) => {
    const { userId, page, size } = queryKey[1];

    try {
        const response = await Apis.getAuth(`/notifications?userId=${userId}&page=${page}&size=${size}`);

        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

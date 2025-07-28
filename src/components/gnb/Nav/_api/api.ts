import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";
import { QueryFunction } from "@tanstack/react-query";

export const logoutApi = async () => {
    try {
        const token = getToken();

        if (!token) throw new Error("토큰이 없습니다.");

        const response = await Apis.post("/auth/logout", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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
    const token = getToken();

    if (!token) return null;

    try {
        const response = await Apis.get(`/notifications?userId=${userId}&page=${page}&size=${size}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

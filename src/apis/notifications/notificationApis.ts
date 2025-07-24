import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

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
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

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

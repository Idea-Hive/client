import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

// 유저 정보 가져오기
export interface Notification {
    id: number;
    receiver: {
        id: number;
        name: string;
        email: string;
        password: string;
        createdDate: string;
        isDeleted: boolean;
        job: string;
        career: number;
        memberSkillStacks: {
            id: Record<string, any>;
            member: string;
            skillstack: {
                id: number;
                category: string;
                name: string;
                memberSkillStacks: string[];
                projectSkillStacks: {
                    id: Record<string, any>;
                    project: string;
                    skillstack: string;
                }[];
            };
        }[];
        projectMembers: {
            id: Record<string, any>;
            project: {
                id: number;
                title: string;
                description: string;
                maxMembers: number;
                createdDate: string;
                modifiedDate: string;
                searchDate: string;
                status: string;
                viewCnt: number;
                isNew: boolean;
                isSave: boolean;
                dueDateFrom: string;
                dueDateTo: string;
                contact: string;
                expirationDate: string;
                projectSkillStacks: {
                    id: Record<string, any>;
                    project: string;
                    skillstack: string;
                }[];
                hashtags: {
                    id: number;
                    project: string;
                    name: string;
                }[];
                projectMembers: string[];
                likedCnt: number;
                projectApplications: {
                    id: number;
                    member: string;
                    project: string;
                    applicationMessage: string;
                    isAccepted: string;
                    applicationDate: string;
                    rejectionMessage: string;
                    isReApplication: boolean;
                    preRejectionMessage: string;
                }[];
            };
            member: string;
            role: string;
            profileSharedDate: string;
            like: boolean;
            profileShared: boolean;
        }[];
        modifiedDate: string;
        type: string;
        profileUrl: string;
        verified: boolean;
    };
    message: string;
    createdDate: string;
    read: boolean;
}

export const getNotificationsApi: QueryFunction<Notification[], [_1: string, userId: number]> = async ({ queryKey }) => {
    const userId = queryKey[1];
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    if (!token) return null;

    try {
        const response = await Apis.get(`/notifications?userId=${userId}`, {
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

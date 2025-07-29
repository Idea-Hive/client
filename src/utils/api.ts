import axios from "axios";
import { getToken } from "./utils";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        accept: "application/json",
    },
});

export const Apis = {
    get: (url: string, config?: any) => api.get(url, { ...config }).then((res: any) => res.data),
    post: (url: string, payload?: any, config?: any) => api.post(url, payload, { ...config }).then((res: any) => res.data),
    put: (url: string, payload?: any, config?: any) => api.put(url, payload, { ...config }).then((res: any) => res.data),
    delete: (url: string, payload?: any, config?: any) => api.delete(url, { data: payload, ...config }).then((res: any) => res.data),

    // 인증이 필요한 API를 위한 메서드들
    getAuth: async (url: string, config?: any) => {
        const token = getToken();

        if (!token) {
            throw new Error("토큰이 없습니다.");
            return null;
        }

        const res = await api.get(url, {
            ...config,
            withCredentials: true,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    postAuth: async (url: string, payload?: any, config?: any) => {
        const token = getToken();

        if (!token) {
            throw new Error("토큰이 없습니다.");
            return null;
        }

        const res = await api.post(url, payload, {
            ...config,
            withCredentials: true,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    putAuth: async (url: string, payload?: any, config?: any) => {
        const token = getToken();

        if (!token) {
            throw new Error("토큰이 없습니다.");
            return null;
        }

        const res = await api.put(url, payload, {
            ...config,
            withCredentials: true,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    deleteAuth: async (url: string, payload?: any, config?: any) => {
        const token = getToken();

        if (!token) {
            throw new Error("토큰이 없습니다.");
            return null;
        }

        const res = await api.delete(url, {
            data: payload,
            ...config,
            withCredentials: true,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
};

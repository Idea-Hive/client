import axios from "axios";

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
};

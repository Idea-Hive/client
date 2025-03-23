import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        accept: "application/json",
    },
});

export const Apis = {
    get: (url: string, params?: any, headers?: any) => api.get(url, { ...params, headers: { ...api.defaults.headers, ...headers } }).then((res: any) => res.data),
    post: (url: string, payload?: any, headers?: any) => api.post(url, payload, { headers: { ...api.defaults.headers, ...headers } }).then((res: any) => res.data),
    put: (url: string, payload?: any, headers?: any) => api.put(url, payload, { headers: { ...api.defaults.headers, ...headers } }).then((res: any) => res.data),
    delete: (url: string, payload?: any, headers?: any) => api.delete(url, { data: payload, headers: { ...api.defaults.headers, ...headers } }).then((res: any) => res.data),
};

import { Apis } from "@/utils/api";

// 로그인
export interface LoginRequest {
    email: string;
    rawPassword: string;
}

export const onLoginApi = async (body: LoginRequest) => {
    try {
        return await Apis.post("/auth/login", body);
    } catch (error) {
        console.error("onLoginApi Error:::", error);
        throw error;
    }
};

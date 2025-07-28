import { User } from "@/types/user";
import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

export const getUserInfoApi: QueryFunction<User, [_1: string]> = async () => {
    // 더 안전한 토큰 파싱
    const getToken = () => {
        try {
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find((row) => row.trim().startsWith("token="));

            if (!tokenCookie) return null;

            const token = tokenCookie.split("=")[1];

            const result = token && token.trim() !== "" ? token : null;
            return result;
        } catch (error) {
            console.error("토큰 파싱 에러:", error);
            return null;
        }
    };

    const token = getToken();
    // 토큰이 없으면 api 태우지 않음
    if (!token) {
        console.log("토큰이 없어서 API 호출하지 않음");
        return null;
    }

    try {
        const response = await Apis.get("/member/info", {
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

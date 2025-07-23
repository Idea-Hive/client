import { Apis } from "@/utils/api";

export const logoutApi = async () => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

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

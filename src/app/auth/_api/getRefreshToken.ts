import { Apis } from "@/utils/api";

export const getRefreshToken = async () => {
    try {
        const response = await fetch("/api/auth/refresh-token", {
            credentials: "include", // 쿠키를 포함하여 요청
        });

        if (response.ok) {
            const { refreshToken } = await response.json();

            if (refreshToken) {
                try {
                    const { data: authResponse } = await Apis.post("/auth/refresh", null, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });

                    // refreshToken 쿠키 제거
                    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                    return authResponse;
                } catch (error) {
                    console.error("Refresh API Error:", error);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching refresh token:", error);
    }
};

import axios from "axios";

export const getRefreshToken = async () => {
    try {
        const response = await fetch("/api/auth/refresh-token", {
            credentials: "include", // 쿠키를 포함하여 요청
        });

        if (response.ok) {
            const { refreshToken } = await response.json();

            if (refreshToken) {
                try {
                    const { data: authResponse } = await axios.post("http://localhost:8080/api/auth/refresh", null, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });
                    console.log("authResponse:::", authResponse);
                } catch (error) {
                    console.error("Refresh API Error:", error);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching refresh token:", error);
    }
};

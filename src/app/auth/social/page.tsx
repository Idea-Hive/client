"use client";

import { useEffect, useState } from "react";
import { getRefreshToken } from "../_api/getRefreshToken";

export default function SocialAuthPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const authResponse = await getRefreshToken();
                console.log("authResponse:::", authResponse);

                localStorage.setItem("token", authResponse.accessToken);

                window.location.href = "/";
            } catch (error) {
                setError("인증 처리 중 오류가 발생했습니다.");
                setIsLoading(false);
            }
        };

        fetchToken();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return <div>화면 이동 중입니다. 잠시만 기다려주세요~</div>;
}

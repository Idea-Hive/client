"use client";

import { useEffect, useState } from "react";
import { getRefreshToken } from "../_api/getRefreshToken";

export default function GoogleAuthPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                await getRefreshToken();
                // 성공적으로 토큰을 받아왔을 때 메인 페이지로 리다이렉트
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

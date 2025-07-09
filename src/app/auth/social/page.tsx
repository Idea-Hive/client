"use client";

import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { getRefreshToken } from "../_api/getRefreshToken";

export default function SocialAuthPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                setIsLoading(true);
                const authResponse = await getRefreshToken();

                // 배포 환경과 로컬 환경에 따른 쿠키 설정
                const isProduction = process.env.NODE_ENV === "production";
                const cookieOptions = isProduction ? `token=${authResponse.accessToken}; path=/; SameSite=Lax; Secure` : `token=${authResponse.accessToken}; path=/; SameSite=Lax`;

                document.cookie = cookieOptions;

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

    return <div>{isLoading && <Spinner />}</div>;
}

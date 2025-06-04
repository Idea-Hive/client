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

                document.cookie = `token=${authResponse.accessToken}; path=/`;

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

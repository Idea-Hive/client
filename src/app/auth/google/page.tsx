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
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-700 font-medium">{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <div className="text-gray-600 text-lg">화면 이동 중입니다. 잠시만 기다려주세요~</div>
        </div>
    );
}

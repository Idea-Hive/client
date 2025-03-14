"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function QueryProviderWrapper({ children }: Props) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // window에 focus시, 데이터가 stale 상태라면 자동으로 refetch
                retryOnMount: true, // Error가 있는 경우, 마운트 시 쿼리를 재시도하지 않는다.
                refetchOnReconnect: false, // 재연결 시, refetch를 할지 말지 (예를 들어, true라면, 데이터가 오래되었을 때 다시 연결 시 쿼리를 다시 가져온다.)
                retry: false, // 실패한 쿼리를 재시도하지 않는다.(true라면 무한히 재시도, 숫자를 넣으면 해당 숫자만큼 재시도)
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"} />
        </QueryClientProvider>
    );
}

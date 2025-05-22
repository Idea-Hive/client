"use client";

import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

// SSR 비활성화된 Viewer 컴포넌트
const ToastViewer = dynamic(() => import("@/components/editor/ToastViewerWrapper"), {
    ssr: false,
    loading: () => <Spinner />,
});

export default function BaseInfo({ description }: { description: string }) {
    return (
        <div>
            <div className="text-h3 text-n900 mb-4">프로젝트 소개</div>
            <ToastViewer content={description} />
        </div>
    );
}

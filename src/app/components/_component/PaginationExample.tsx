"use client";

import Pagination from "@/components/Pagination";
import { useState } from "react";
import Content from "./Content";

const PaginationExample = () => {
    const [page, setPage] = useState(1);

    return (
        <Content
            description="Pagination Component 입니다."
            props={[
                { name: "page", type: "number", description: "현재 페이지" },
                { name: "totalPage", type: "number", description: "총 페이지 수" },
                { name: "onChange", type: "function", description: "페이지 변경 시 실행될 함수" },
            ]}
            examples={[
                {
                    description: "기본 사용1",
                    code: <Pagination page={page} totalPage={10} onChange={setPage} />,
                },
            ]}
        />
    );
};

export default PaginationExample;

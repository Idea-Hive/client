"use client";

import { onSearchProjectsApi } from "@/apis/project/projectApis";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import Tab from "@/components/Tab";
import { useInput } from "@/hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectList() {
    const [selectedTab, setSelectedTab] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const search = useInput("");

    const {
        data: projects = {
            data: {
                projects: [],
                totalCount: 0,
            },
        },
        isPending,
        isError,
    } = useQuery({
        queryKey: ["getProjects", searchTerm, selectedTab, "RECENT"],
        queryFn: onSearchProjectsApi,
    });

    if (isError) return <div>Error</div>;

    return (
        <div className="w-full pb-[60px]">
            {isPending && <Spinner />}
            <div className="bg-n200 h-[90px] flex items-center">
                <div className="w-[1200px] mx-auto text-h3 text-n900">나에게 딱 맞는 프로젝트를 탐색해보세요</div>
            </div>

            <div className="w-[1200px] mx-auto relative">
                <h2 className="text-h2 text-n900 mt-6 mb-[34px]">프로젝트 탐색</h2>

                <Tab
                    items={[
                        {
                            label: "전체",
                            value: "ALL",
                        },
                        {
                            label: "모집중",
                            value: "recruiting",
                        },
                        {
                            label: "추가모집중",
                            value: "additional",
                        },
                    ]}
                    defaultTab={selectedTab}
                    onChange={(value) => {
                        setSelectedTab(value);
                    }}
                />

                <div className="mb-4 mt-[26px] flex justify-between items-center">
                    <div className="w-[384px]">
                        <Input
                            {...search}
                            placeholder="검색어를 입력해주세요"
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setSearchTerm(search.value);
                                }
                            }}
                            children={
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                                    <path
                                        d="M17.9421 17.0577L14.0304 13.1468C15.1642 11.7856 15.7295 10.0398 15.6089 8.27238C15.4882 6.50499 14.6908 4.85216 13.3825 3.65772C12.0743 2.46328 10.3559 1.8192 8.58486 1.85944C6.81382 1.89969 5.12647 2.62118 3.87383 3.87383C2.62118 5.12647 1.89969 6.81382 1.85944 8.58486C1.8192 10.3559 2.46328 12.0743 3.65772 13.3825C4.85216 14.6908 6.50499 15.4882 8.27238 15.6089C10.0398 15.7295 11.7856 15.1642 13.1468 14.0304L17.0577 17.9421C17.1158 18.0002 17.1848 18.0463 17.2606 18.0777C17.3365 18.1091 17.4178 18.1253 17.4999 18.1253C17.5821 18.1253 17.6634 18.1091 17.7392 18.0777C17.8151 18.0463 17.8841 18.0002 17.9421 17.9421C18.0002 17.8841 18.0463 17.8151 18.0777 17.7392C18.1091 17.6634 18.1253 17.5821 18.1253 17.4999C18.1253 17.4178 18.1091 17.3365 18.0777 17.2606C18.0463 17.1848 18.0002 17.1158 17.9421 17.0577ZM3.12493 8.74993C3.12493 7.63741 3.45483 6.54988 4.07292 5.62485C4.691 4.69982 5.5695 3.97885 6.59734 3.55311C7.62517 3.12737 8.75617 3.01597 9.84732 3.23302C10.9385 3.45006 11.9407 3.98579 12.7274 4.77246C13.5141 5.55913 14.0498 6.56141 14.2669 7.65255C14.4839 8.74369 14.3725 9.87469 13.9468 10.9025C13.521 11.9304 12.8 12.8089 11.875 13.4269C10.95 14.045 9.86245 14.3749 8.74993 14.3749C7.2586 14.3733 5.82882 13.7801 4.77428 12.7256C3.71975 11.671 3.12659 10.2413 3.12493 8.74993Z"
                                        fill="#474D66"
                                    />
                                </svg>
                            }
                        />
                    </div>
                    <div className="flex gap-4 items-center text-sm">
                        <div className="text-taskmateRed cursor-pointer">최신순</div>
                        <div className="text-n700 cursor-pointer">마감임박순</div>
                    </div>
                </div>

                {projects.data.projects.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-6 mb-8">
                        {projects.data.projects.map((project) => (
                            <Card
                                key={project.id}
                                item={{
                                    id: project.id,
                                    title: project.title,
                                    content: project.description,
                                    tags: project.hashtagNames,
                                    creator: "홍길동",
                                    likeCount: 10,
                                    viewCount: 20,
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex justify-center my-40">
                        <div className="text-n700">검색 결과가 없습니다.</div>
                    </div>
                )}

                {projects.data.projects.length > 0 && (
                    <div className="w-full flex justify-center">
                        <Pagination page={1} viewPerPage={12} total={projects.data.totalCount} onChange={() => {}} />
                    </div>
                )}
            </div>

            <FloatBtn />
        </div>
    );
}

const FloatBtn = () => {
    const router = useRouter();

    return (
        <button
            className="fixed right-[140px] bottom-[135px] w-[70px] h-[70px] bg-taskmateRed rounded-full flex items-center justify-center hover:bg-[#f54b4a]"
            onClick={() => {
                router.push("/project/create");
            }}
        >
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M27.5775 7.53112L21.469 1.42115C21.2658 1.21797 21.0247 1.0568 20.7592 0.946835C20.4938 0.836871 20.2093 0.780273 19.922 0.780273C19.6347 0.780273 19.3502 0.836871 19.0847 0.946835C18.8193 1.0568 18.5781 1.21797 18.375 1.42115L1.51622 18.2813C1.31221 18.4837 1.15046 18.7246 1.04038 18.9901C0.930307 19.2555 0.874093 19.5402 0.875011 19.8276V25.9376C0.875011 26.5177 1.10548 27.0741 1.51571 27.4844C1.92595 27.8946 2.48235 28.1251 3.06251 28.1251H9.17247C9.45984 28.126 9.74453 28.0698 10.01 27.9597C10.2754 27.8496 10.5164 27.6879 10.7188 27.4838L27.5775 10.6251C27.7807 10.4219 27.9419 10.1808 28.0519 9.91532C28.1618 9.64989 28.2184 9.3654 28.2184 9.07809C28.2184 8.79078 28.1618 8.50628 28.0519 8.24085C27.9419 7.97542 27.7807 7.73425 27.5775 7.53112ZM9.17247 25.9376H3.06251V19.8276L15.0938 7.79635L21.2037 13.9063L9.17247 25.9376ZM22.75 12.3587L16.64 6.25006L19.9213 2.96881L26.0313 9.0774L22.75 12.3587Z"
                    fill="white"
                />
            </svg>
        </button>
    );
};

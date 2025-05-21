"use client";

import { onSearchProjectsApi, Project } from "@/apis/project/projectApis";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import Tab from "@/components/Tab";
import { useInput } from "@/hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InputHookType } from "../(beforeLogin)/signup/_component/EmailSignup/utils/types";

export default function ProjectList() {
    const [selectedTab, setSelectedTab] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const search = useInput("");
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState<"RECENT" | "DEADLINE">("RECENT");

    const { data, isPending, isError } = useQuery({
        queryKey: [
            "getProjects",
            {
                keyword: searchTerm,
                recruitType: selectedTab as "ALL" | "NEW" | "ADDITIONAL",
                sortType,
                page,
                size: 12,
            },
        ],
        queryFn: onSearchProjectsApi,
    });

    // 검색어, 탭, 정렬 변경 시 페이지 초기화
    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedTab, sortType]);

    if (isError) return <div>Error</div>;

    return (
        <div className="w-full pb-[60px]">
            <div className="bg-n200 h-[90px] flex items-center">
                <div className="w-[1200px] mx-auto text-h3 text-n900">나에게 딱 맞는 프로젝트를 탐색해보세요</div>
            </div>

            <div className="w-[1200px] mx-auto relative">
                <h2 className="text-h2 text-n900 mt-6 mb-[34px]">프로젝트 탐색</h2>

                {/* 탭 */}
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

                {/* 검색 및 정렬 */}
                <SearchAndSort search={search} setSearchTerm={setSearchTerm} sortType={sortType} setSortType={setSortType} />

                {/* 프로젝트 리스트 */}
                <ProjectGrid projects={data?.projects} isPending={isPending} />

                {/* Pagination */}
                {data?.projects && data.projects.length > 0 && (
                    <div className="w-full flex justify-center">
                        <Pagination page={page} viewPerPage={12} total={data.totalCnt} onChange={(page) => setPage(page)} />
                    </div>
                )}
            </div>

            <FloatBtn />
        </div>
    );
}

const SearchAndSort = ({
    search,
    setSearchTerm,
    sortType,
    setSortType,
}: {
    search: InputHookType;
    setSearchTerm: (value: string) => void;
    sortType: "RECENT" | "DEADLINE";
    setSortType: (value: "RECENT" | "DEADLINE") => void;
}) => {
    return (
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
                <div className={`cursor-pointer ${sortType === "RECENT" ? "text-taskmateRed" : "text-n700"}`} onClick={() => setSortType("RECENT")}>
                    최신순
                </div>
                <div className={`cursor-pointer ${sortType === "DEADLINE" ? "text-taskmateRed" : "text-n700"}`} onClick={() => setSortType("DEADLINE")}>
                    마감임박순
                </div>
            </div>
        </div>
    );
};

const ProjectGrid = ({ projects, isPending }: { projects?: Project[]; isPending: boolean }) => {
    if (isPending) return <Spinner />;
    if (!projects) return null;

    return projects.length > 0 ? (
        <div className="w-full grid grid-cols-3 gap-6 mb-8">
            {projects.map((project) => {
                const { id, title, description, hashtagNames, creator, likedCnt, viewCnt } = project;
                return (
                    <Card
                        key={id}
                        item={{
                            id,
                            title,
                            content: description,
                            tags: hashtagNames,
                            creator: creator,
                            likeCount: likedCnt,
                            viewCount: viewCnt,
                        }}
                    />
                );
            })}
        </div>
    ) : (
        <div className="w-full flex justify-center mt-10">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <path
                        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM11.25 12.75V7.5C11.25 7.30109 11.329 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.671 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75ZM13.125 16.125C13.125 16.3475 13.059 16.565 12.9354 16.75C12.8118 16.935 12.6361 17.0792 12.4305 17.1644C12.225 17.2495 11.9988 17.2718 11.7805 17.2284C11.5623 17.185 11.3618 17.0778 11.2045 16.9205C11.0472 16.7632 10.94 16.5627 10.8966 16.3445C10.8532 16.1262 10.8755 15.9 10.9606 15.6945C11.0458 15.4889 11.19 15.3132 11.375 15.1896C11.56 15.066 11.7775 15 12 15C12.2984 15 12.5845 15.1185 12.7955 15.3295C13.0065 15.5405 13.125 15.8266 13.125 16.125Z"
                        fill="#8F95B2"
                    />
                </svg>

                <div className="text-n800 text-base mt-3">검색 결과가 없습니다.</div>
            </div>
        </div>
    );
};

const FloatBtn = () => {
    const router = useRouter();

    return (
        <button
            className="fixed right-[calc((100%-1200px)/2+40px)] bottom-[40px] w-[70px] h-[70px] bg-taskmateRed rounded-full flex items-center justify-center hover:bg-[#f54b4a]"
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

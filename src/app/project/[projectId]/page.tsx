"use client";

import Spinner from "@/components/Spinner";
import Tab from "@/components/Tab";
import { useUserInfo } from "@/hooks/queries";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Applicant from "./_component/Applicant/Applicant";
import BaseInfo from "./_component/BaseInfo";
import Header from "./_component/Header/Header";
import Recruitment from "./_component/Recruitment";
import { useApplicantInfo, useProjectDetail, useProjectViewCnt } from "./hooks/Hooks";
import { useIdsForApplicant } from "./store/store";

export default function ProjectDetail() {
    const { projectId } = useParams();

    const { user } = useUserInfo(); // 로그인 유저 정보
    const { viewCntMutate } = useProjectViewCnt(Number(projectId)); // 조회수 증가 Mutation
    const { project, projectIsPending } = useProjectDetail(Number(projectId), user); // 프로젝트 상세 정보
    const { applicantData, applicantIsPending } = useApplicantInfo(Number(projectId)); // 지원자 정보

    const { setProjectId, setLoginUserId, setProjectCreatorId } = useIdsForApplicant();
    const viewCountRef = useRef(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!viewCountRef.current) {
            viewCntMutate();
            viewCountRef.current = true;
        }
    }, []);

    // 프로젝트 상세 정보 설정
    useEffect(() => {
        if (project) {
            setProjectId(Number(projectId));
            setLoginUserId(user?.id);
            setProjectCreatorId(project.creatorId);
        }
    }, [project, setProjectId, setLoginUserId, setProjectCreatorId, projectId, user]);

    // Tab Items
    const tabItems = [
        { value: "baseInfo", label: "기본정보" },
        // { value: "idea", label: "아이디어" },
        { value: "recruitment", label: "모집정보" },
        {
            value: "applicant",
            label: (
                <div className="flex items-center gap-1">
                    지원자
                    <div className="h-[18px] w-fit rounded-full bg-taskmateRed text-white px-1.5 text-sm leading-[18px]">{applicantData?.totalCnt}</div>
                </div>
            ),
        },
    ];

    // Tab Click Handler
    const handleTab = (value: string) => {
        const element = document.getElementById(value);

        // 탭 클릭 시 해당 탭으로 이동
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 100; // 상단에 100px 여유 공간

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full">
            {(projectIsPending || applicantIsPending) && <Spinner />}

            {project && applicantData && (
                <>
                    {/* 헤더 */}
                    <Header />

                    <section className="w-full max-w-[1232px] px-4 mx-auto my-10">
                        <Tab items={tabItems} onChange={handleTab} defaultTab="baseInfo" />

                        <div className="flex flex-col gap-[50px] mt-[50px]">
                            {/* 기본정보 */}
                            <div id="baseInfo">
                                <BaseInfo description={project.description} />
                            </div>

                            {/* 아이디어 */}
                            {/* <div id="idea">
                                <Idea idea={project.idea} userId={user?.id} creatorId={project.creatorId} />
                            </div> */}

                            {/* 모집정보 */}
                            <div id="recruitment">
                                <Recruitment data={project} />
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-n300 my-[70px]"></div>

                        {/* 지원자 */}
                        <div id="applicant">
                            <Applicant />
                        </div>
                        <div className="mt-[70px] w-full h-[1px] bg-n300"></div>
                    </section>
                </>
            )}
        </div>
    );
}

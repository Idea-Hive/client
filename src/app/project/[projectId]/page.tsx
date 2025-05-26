"use client";

import { getApplicantInfoApi, getProjectDetailApi } from "@/apis/project/projectApis";
import { getUserInfoApi } from "@/apis/user/userApis";
import Spinner from "@/components/Spinner";
import Tab from "@/components/Tab";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Applicant from "./_component/Applicant/Applicant";
import BaseInfo from "./_component/BaseInfo";
import Header from "./_component/Header/Header";
import Idea from "./_component/Idea";
import Recruitment from "./_component/Recruitment";

export default function ProjectDetail() {
    const { projectId } = useParams();

    const { data: user } = useQuery({
        queryKey: ["isLoggedIn"],
        queryFn: getUserInfoApi,
    });

    console.log("user:::", user);

    const { data: project, isPending: projectIsPending } = useQuery({
        queryKey: ["getProjectDetail", { projectId: Number(projectId) }],
        queryFn: getProjectDetailApi,
    });

    console.log("project:::", project);

    const { data: applicantData, isPending: applicantIsPending } = useQuery({
        queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }],
        queryFn: getApplicantInfoApi,
    });

    const tabItems = [
        { value: "baseInfo", label: "기본정보" },
        { value: "idea", label: "아이디어" },
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

    const handleTab = (value: string) => {
        const element = document.getElementById(value);
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
                    <Header data={project} user={user} />

                    <section className="w-[1200px] mx-auto my-10">
                        <Tab items={tabItems} onChange={handleTab} defaultTab="baseInfo" />

                        <div className="flex flex-col gap-[50px] mt-[50px]">
                            {/* 기본정보 */}
                            <div id="baseInfo">
                                <BaseInfo description={project.description} />
                            </div>

                            {/* 아이디어 */}
                            <div id="idea">
                                <Idea idea={project.idea} />
                            </div>

                            {/* 모집정보 */}
                            <div id="recruitment">
                                <Recruitment data={project} />
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-n300 my-[70px]"></div>

                        {/* 지원자 */}
                        <div id="applicant">
                            <Applicant data={applicantData.applicants} />
                        </div>
                        <div className="mt-[70px] w-full h-[1px] bg-n300"></div>
                    </section>
                </>
            )}
        </div>
    );
}

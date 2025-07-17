"use client";

import { useGetTemporarySavedProjectInfoMutation } from "@/hooks/mutations/useCreateProjectMutation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSkillStackApi } from "./_api/api";
import OptionalInformations from "./_component/OptionalInformations";
import RegisterButton from "./_component/RegisterButton";
import RequiredInformations from "./_component/RequiredInformations";
import TemporarySaveButton from "./_component/TemporarySaveButton";
import useCreateProjectStore from "./store/createProjectStore";
import { getProjectId } from "./utils/utils";

export default function CreateProject() {
    const { setMultipleRequiredFormData, setOptionalFormData, setProjectId } = useCreateProjectStore();

    const projectId = getProjectId();

    // 임시저장 된 데이터를 불러올 때, skillStack response가 name밖에 오지 않아 로직 추가
    const { data: rawSkillStacks } = useQuery({ queryKey: ["skillStacks"], queryFn: getSkillStackApi });

    // 임시저장된 프로젝트 정보 가져오기
    const getProjectMutation = useGetTemporarySavedProjectInfoMutation({
        onSuccess: (response) => {
            const { name, title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact, hashtagNames, projectSkillStacks } = response;

            // 날짜 형식 변환(UTC -> KST)
            const formatToKoreanDate = (isoString: string) => {
                if (!isoString) return "";
                const date = new Date(isoString);
                const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
                return koreanTime.toISOString().replace("Z", "+09:00");
            };

            setMultipleRequiredFormData({
                name,
                title,
                description,
                idea,
                maxMembers,
                dueDateFrom: formatToKoreanDate(dueDateFrom),
                dueDateTo: formatToKoreanDate(dueDateTo),
                contact,
            });

            setOptionalFormData("hashTags", hashtagNames);
            if (rawSkillStacks) {
                setOptionalFormData(
                    "skills",
                    rawSkillStacks.filter((skill) => projectSkillStacks.includes(skill.name)).map((skill) => skill.id)
                );
            }
        },
    });

    // 임시저장된 프로젝트 정보 가져오기
    useEffect(() => {
        if (projectId && rawSkillStacks) {
            setProjectId(Number(projectId));
            getProjectMutation.mutate(Number(projectId));
        }
    }, [projectId, rawSkillStacks]);

    return (
        <div className="w-[780px] mx-auto mb-[60px]">
            <div className="mt-[50px] mb-8 text-h1 text-n900 w-full">프로젝트 등록</div>
            <RequiredInformations />
            <OptionalInformations />

            <div className="flex justify-center gap-3 mt-6">
                <TemporarySaveButton />
                <RegisterButton />
            </div>
        </div>
    );
}

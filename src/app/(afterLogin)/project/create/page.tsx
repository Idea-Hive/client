"use client";

import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OptionalInformations from "./_component/OptionalInformations";
import RequiredInformations from "./_component/RequiredInformations";
import { RequiredValues } from "./_types/type";
export default function CreateProject() {
    const router = useRouter();
    const [requiredValues, setRequiredValues] = useState<RequiredValues>({
        title: "",
        description: "",
        idea: "",
        maxMembers: 0,
        dueDateFrom: "2025-05-06T11:36:42.557Z",
        dueDateTo: "2025-05-06T11:36:42.557Z",
        contact: "",
    });
    const [errors, setErrors] = useState<{ title: string; description: string; idea: string; maxMembers: string; dueDateFrom: string; dueDateTo: string; contact: string }>({
        title: "",
        description: "",
        idea: "",
        maxMembers: "",
        dueDateFrom: "",
        dueDateTo: "",
        contact: "",
    });

    const [hashTags, setHashTags] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    const validate = () => {
        let isValid = true;

        if (requiredValues.title === "") {
            setErrors((prev) => ({ ...prev, title: "프로젝트명을 입력해주세요." }));
            isValid = false;
        }

        if (requiredValues.description === "") {
            setErrors((prev) => ({ ...prev, description: "프로젝트 설명을 입력해주세요." }));
            isValid = false;
        }

        if (requiredValues.idea === "") {
            setErrors((prev) => ({ ...prev, idea: "프로젝트 아이디어를 입력해주세요." }));
            isValid = false;
        }

        if (requiredValues.maxMembers === 0) {
            setErrors((prev) => ({ ...prev, maxMembers: "최대 인원을 입력해주세요." }));
            isValid = false;
        }

        if (requiredValues.dueDateFrom === "") {
            setErrors((prev) => ({ ...prev, dueDateFrom: "시작일을 입력해주세요." }));
            isValid = false;
        }

        if (requiredValues.dueDateTo === "") {
            setErrors((prev) => ({ ...prev, dueDateTo: "종료일을 입력해주세요." }));
            isValid = false;
        }

        if (requiredValues.contact === "") {
            setErrors((prev) => ({ ...prev, contact: "연락수단을 입력해주세요." }));
            isValid = false;
        }

        return isValid;
    };

    const onSaveApi = async (body: any) => {
        return await axios.post("http://localhost:8080/api/project/create", body, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYnN3cGd1cjJAbmF2ZXIuY29tIiwiaXNzIjoiVGFza21hdGUiLCJpYXQiOjE3NDY1MzIzNDUsImV4cCI6MTc0NjU2MjM0NSwidHlwZSI6ImFjY2VzcyJ9.PQ3ikZhJrIK5GPiKk0u0h43jbYItc0j5AwcjMcyNY44`,
            },
        });
    };

    const onSaveMutation = useMutation({
        mutationFn: onSaveApi,
        onSuccess: (response) => {
            console.log("성공");
            console.log(response.data);
            router.push(`/project/${response.data.projectId}`);
        },
        onError: (error) => {
            console.log("실패");
            console.log(error);
        },
    });

    const onTemporarySave = () => {
        console.log("임시저장");
        console.log(requiredValues);
        console.log(hashTags);
        console.log(skills);
    };

    const onSave = async () => {
        const { title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact } = requiredValues;

        const requestBody = {
            projectId: null,
            userId: 1,
            title,
            description,
            idea,
            contact,
            maxMembers,
            dueDateFrom,
            dueDateTo,
            skillStackIds: skills,
            hashtags: hashTags,
            isSave: true,
        };

        console.log("request:::", requestBody);

        if (!validate()) {
            console.log("유효성 검사 실패");
            return;
        }

        onSaveMutation.mutate(requestBody);
    };

    return (
        <div className="w-[780px] mx-auto mb-[60px]">
            <div className="mt-[50px] mb-8 text-h1 text-n900 w-full">프로젝트 등록</div>
            <RequiredInformations requiredValues={requiredValues} setRequiredValues={setRequiredValues} errors={errors} setErrors={setErrors} />
            <OptionalInformations setHashTags={setHashTags} setSkills={setSkills} />

            <div className="flex justify-center gap-3 mt-6">
                <Button label="임시저장" type="button" btnType="line" className="w-[191px]" onClick={onTemporarySave}></Button>
                <Button label="등록" type="button" btnType="primary" className="w-[191px]" onClick={onSave}></Button>
            </div>
        </div>
    );
}

"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTemporarySavedProjectInfoApi } from "../../create/_api/api";
import { EditProjectRequest, onEditProjectApi } from "./_api/api";
import OptionalInformations from "./_component/OptionalInformations";
import RequiredInformations from "./_component/RequiredInformations";
import { RequiredValues } from "./_types/type";

export default function EditProjectPage() {
    const params = useParams();
    const id = params.projectId as string;

    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
    const [projectId, setProjectId] = useState<number | null>(null);

    const router = useRouter();
    const { showToast } = useToast();

    const [tempSavedSkills, setTempSavedSkills] = useState<string[]>([]);
    const getProjectMutation = useCreateMutation(getTemporarySavedProjectInfoApi, "getTemporarySavedProjectInfo", {
        onSuccess: (response) => {
            const { title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact, hashtagNames, projectSkillStacks } = response;

            // Convert ISO date strings to Korean timezone ISO format (YYYY-MM-DDTHH:mm:ss.SSS+09:00)
            const formatToKoreanDate = (isoString: string) => {
                if (!isoString) return "";
                const date = new Date(isoString);
                const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // Add 9 hours for KST
                return koreanTime.toISOString().replace("Z", "+09:00");
            };

            setRequiredValues({
                title,
                description,
                idea,
                maxMembers,
                dueDateFrom: formatToKoreanDate(dueDateFrom),
                dueDateTo: formatToKoreanDate(dueDateTo),
                contact,
            });
            setHashTags(hashtagNames);
            setTempSavedSkills(projectSkillStacks);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        if (id) {
            setProjectId(Number(id));
            getProjectMutation.mutate(Number(id));
        }
    }, [id]);

    // dueDateFrom, dueDateTo format
    // const now = new Date();
    // const isoString = now.toISOString();

    const [requiredValues, setRequiredValues] = useState<RequiredValues>({
        title: "",
        description: "",
        idea: "",
        maxMembers: 0,
        dueDateFrom: "",
        dueDateTo: "",
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
    const [skills, setSkills] = useState<number[]>([]);

    const validate = () => {
        const validations = {
            title: "프로젝트명을 입력해주세요.",
            description: "프로젝트 설명을 입력해주세요.",
            // idea: "프로젝트 아이디어를 입력해주세요.",
            maxMembers: "모집 인원을 입력해주세요.",
            dueDateFrom: "예상 일정을 입력해주세요.",
            dueDateTo: "예상 일정을 입력해주세요.",
            contact: "연락수단을 입력해주세요.",
        };

        const newErrors = { ...errors };
        let isValid = true;

        Object.entries(validations).forEach(([field, message]) => {
            const value = requiredValues[field as keyof RequiredValues];
            if (field === "dueDateFrom" || field === "dueDateTo") {
                console.log(`${field}:::`, value, typeof value);
                if (value === "") {
                    newErrors[field as keyof RequiredValues] = message;
                    isValid = false;
                }
            } else if (!value || (field === "maxMembers" && value === 0)) {
                newErrors[field as keyof RequiredValues] = message;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const onEditMutation = useCreateMutation(onEditProjectApi, "onEditProject", {
        onSuccess: (response) => {
            setProjectId(response);
            setIsOpenSuccessModal(true);
        },
        onError: (error: AxiosError) => {
            showToast("error", (error.response?.data as string) || "프로젝트 수정에 실패했습니다.");
        },
    });

    const getRequestBody = (): EditProjectRequest => {
        const { title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact } = requiredValues;

        const requestBody: EditProjectRequest = {
            projectId,
            title,
            description,
            idea,
            contact,
            maxMembers,
            dueDateFrom,
            dueDateTo,
            skillStackIds: skills,
            hashtags: hashTags,
        };

        console.log("requestBody:::", requestBody);
        return requestBody;
    };

    const onSave = async () => {
        const requestBody = getRequestBody();

        if (!validate()) {
            console.log("유효성 검사 실패");
            return;
        }

        onEditMutation.mutate(requestBody);
    };

    return (
        <div className="w-[780px] mx-auto mb-[60px]">
            <div className="mt-[50px] mb-8 text-h1 text-n900 w-full">프로젝트 등록</div>
            <RequiredInformations requiredValues={requiredValues} setRequiredValues={setRequiredValues} errors={errors} setErrors={setErrors} />
            <OptionalInformations hashTags={hashTags} setHashTags={setHashTags} skills={tempSavedSkills} setSkills={setSkills} />

            <div className="flex justify-center gap-3 mt-6">
                <Button label="수정" type="button" btnType="primary" className="w-[191px]" onClick={onSave}></Button>
            </div>

            <Modal
                isOpen={isOpenSuccessModal}
                title="수정 완료"
                children="프로젝트 수정이 완료되었습니다"
                onConfirm={() => {
                    router.push(`/project/${projectId}`);
                }}
            />
        </div>
    );
}

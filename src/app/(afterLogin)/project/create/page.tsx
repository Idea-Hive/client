"use client";

import { getTemporarySavedProjectInfoApi, onSaveProjectApi, onTemporarySaveProjectApi, SaveProjectRequest } from "@/apis/project/projectApis";
import { getUserInfoApi } from "@/apis/user/userApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Spinner, { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import OptionalInformations from "./_component/OptionalInformations";
import RequiredInformations from "./_component/RequiredInformations";
import { RequiredValues } from "./_types/type";

export default function CreateProject() {
    const spinner = useSpinner();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
    const [projectId, setProjectId] = useState<number | null>(null);

    const router = useRouter();

    const [tempSavedSkills, setTempSavedSkills] = useState<string[]>([]);
    const getProjectMutation = useMutation({
        mutationFn: getTemporarySavedProjectInfoApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            const { title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact, hashtagNames, projectSkillStacks } = response;
            console.log("project info:::", response);
            setRequiredValues({
                title,
                description,
                idea,
                maxMembers,
                dueDateFrom,
                dueDateTo,
                contact,
            });
            setHashTags(hashtagNames);
            setTempSavedSkills(projectSkillStacks);
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    useEffect(() => {
        if (id) {
            setProjectId(Number(id));
            getProjectMutation.mutate(Number(id));
        }
    }, [id]);

    const { data: user } = useQuery({
        queryKey: ["isLoggedIn"],
        queryFn: getUserInfoApi,
    });

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
            dueDateFrom: "시작일을 입력해주세요.",
            dueDateTo: "종료일을 입력해주세요.",
            contact: "연락수단을 입력해주세요.",
        };

        const newErrors = { ...errors };
        let isValid = true;

        Object.entries(validations).forEach(([field, message]) => {
            const value = requiredValues[field as keyof RequiredValues];
            if (field === "dueDateFrom" || field === "dueDateTo") {
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

    const [isShowToast, setIsShowToast] = useState<boolean>(false);

    const onTemporarySaveMutation = useMutation({
        mutationFn: onTemporarySaveProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("성공");
            setProjectId(response);
            setIsShowToast(true);
        },
        onError: (error) => {
            console.log("실패");
            console.log(error.message);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const onSaveMutation = useMutation({
        mutationFn: onSaveProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("성공");
            setProjectId(response);
            setIsOpenSuccessModal(true);
        },
        onError: (error) => {
            console.log("실패");
            console.log(error.message);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const getRequestBody = (): SaveProjectRequest => {
        const { title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact } = requiredValues;

        const requestBody: SaveProjectRequest = {
            projectId,
            userId: user!.id,
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

        console.log("requestBody:::", requestBody);
        return requestBody;
    };

    const onTemporarySave = () => {
        const requestBody = getRequestBody();
        onTemporarySaveMutation.mutate({ ...requestBody, isSave: false });
    };

    const onSave = async () => {
        const requestBody = getRequestBody();

        if (!validate()) {
            console.log("유효성 검사 실패");
            return;
        }

        onSaveMutation.mutate(requestBody);
    };

    return (
        <Suspense fallback={<Spinner />}>
            <div className="w-[780px] mx-auto mb-[60px]">
                <div className="mt-[50px] mb-8 text-h1 text-n900 w-full">프로젝트 등록</div>
                <RequiredInformations requiredValues={requiredValues} setRequiredValues={setRequiredValues} errors={errors} setErrors={setErrors} />
                <OptionalInformations hashTags={hashTags} setHashTags={setHashTags} skills={tempSavedSkills} setSkills={setSkills} />

                <div className="flex justify-center gap-3 mt-6">
                    <Button label="임시저장" type="button" btnType="line" className="w-[191px]" onClick={onTemporarySave}></Button>
                    <Button label="등록" type="button" btnType="primary" className="w-[191px]" onClick={onSave}></Button>
                </div>

                <Modal
                    isOpen={isOpenSuccessModal}
                    title="등록 완료"
                    children="프로젝트 등록이 완료되었습니다"
                    onConfirm={() => {
                        router.push(`/project/${projectId}`);
                    }}
                />
                {isShowToast && <Toast type="info" message="임시저장 되었습니다." onClose={() => setIsShowToast(false)} />}
            </div>
        </Suspense>
    );
}

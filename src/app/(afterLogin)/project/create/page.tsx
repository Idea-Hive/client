"use client";

import { getTemporarySavedProjectInfoApi, onSaveProjectApi, onTemporarySaveProjectApi, SaveProjectRequest } from "@/apis/project/projectApis";
import { getUserInfoApi } from "@/apis/user/userApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

    const [isShowToast, setIsShowToast] = useState<boolean>(false);
    const [toastType, setToastType] = useState<"info" | "error">("info");
    const [toastMessage, setToastMessage] = useState<string>("임시저장 되었습니다.");

    const onTemporarySaveMutation = useMutation({
        mutationFn: onTemporarySaveProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("성공");
            setProjectId(response);
            setToastType("info");
            setToastMessage("임시저장 되었습니다.");
            setIsShowToast(true);
            setErrors({
                title: "",
                description: "",
                idea: "",
                maxMembers: "",
                dueDateFrom: "",
                dueDateTo: "",
                contact: "",
            });
        },
        onError: (error: AxiosError) => {
            console.log("실패");
            console.log(error.message);
            setIsShowToast(true);
            setToastType("error");
            setToastMessage(error.response?.data as string);
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
            setProjectId(response);
            setIsOpenSuccessModal(true);
        },
        onError: (error: AxiosError) => {
            console.log(error.response?.data);
            setIsShowToast(true);
            setToastType("error");
            setToastMessage(error.response?.data as string);
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
        if (requestBody.title === "") {
            setErrors({
                title: "프로젝트명을 입력해주세요.",
                description: "",
                idea: "",
                maxMembers: "",
                dueDateFrom: "",
                dueDateTo: "",
                contact: "",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setIsShowToast(true);
            setToastType("error");
            setToastMessage("프로젝트명을 입력해주세요.");
            return;
        }

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
            {isShowToast && <Toast type={toastType} message={toastMessage} onClose={() => setIsShowToast(false)} />}
        </div>
    );
}

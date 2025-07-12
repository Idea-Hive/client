"use client";

import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import { useGetTemporarySavedProjectInfoMutation, useSaveProjectMutation, useTemporarySaveProjectMutation } from "@/hooks/mutations/useCreateProjectMutation";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OptionalInformations from "./_component/OptionalInformations";
import RequiredInformations from "./_component/RequiredInformations";
import useCreateProjectStore from "./store/createProjectStore";

export default function CreateProject() {
    const { setMultipleRequiredFormData, validate, setMultipleErrors, getRequestBody } = useCreateProjectStore();

    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
    const [projectId, setProjectId] = useState<number | null>(null);

    const [tempSavedSkills, setTempSavedSkills] = useState<string[]>([]);
    const getProjectMutation = useGetTemporarySavedProjectInfoMutation({
        onSuccess: (response) => {
            const { title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact, hashtagNames, projectSkillStacks } = response;

            const formatToKoreanDate = (isoString: string) => {
                if (!isoString) return "";
                const date = new Date(isoString);
                const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
                return koreanTime.toISOString().replace("Z", "+09:00");
            };

            setMultipleRequiredFormData({
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
    });

    useEffect(() => {
        if (id) {
            setProjectId(Number(id));
            getProjectMutation.mutate(Number(id));
        }
    }, [id]);

    const { user } = useUserInfo();

    const [hashTags, setHashTags] = useState<string[]>([]);
    const [skills, setSkills] = useState<number[]>([]);

    const [isShowToast, setIsShowToast] = useState<boolean>(false);
    const [toastType, setToastType] = useState<"info" | "error">("info");
    const [toastMessage, setToastMessage] = useState<string>("임시저장 되었습니다.");

    const onTemporarySaveMutation = useTemporarySaveProjectMutation({
        onSuccess: (response) => {
            setProjectId(response);
            setToastType("info");
            setToastMessage("임시저장 되었습니다.");
            setIsShowToast(true);
            setMultipleErrors({
                title: "",
                description: "",
                maxMembers: "",
                dueDateFrom: "",
                dueDateTo: "",
                contact: "",
            });
        },
        onError: (error: AxiosError) => {
            setIsShowToast(true);
            setToastType("error");
            setToastMessage(error.response?.data as string);
        },
    });

    const onSaveMutation = useSaveProjectMutation({
        onSuccess: (response) => {
            setProjectId(response);
            setIsOpenSuccessModal(true);
        },
        onError: (error: AxiosError) => {
            setIsShowToast(true);
            setToastType("error");
            setToastMessage(error.response?.data as string);
        },
    });

    const onTemporarySave = () => {
        const requestBody = getRequestBody(user!.id, projectId!);
        if (requestBody.title === "") {
            setMultipleErrors({
                title: "프로젝트명을 입력해주세요.",
                description: "",
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

    const onSave = () => {
        if (!validate()) return;

        const requestBody = getRequestBody(user!.id, projectId!);
        onSaveMutation.mutate(requestBody);
    };

    return (
        <div className="w-[780px] mx-auto mb-[60px]">
            <div className="mt-[50px] mb-8 text-h1 text-n900 w-full">프로젝트 등록</div>
            <RequiredInformations />
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

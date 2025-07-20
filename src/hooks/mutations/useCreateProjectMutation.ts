"use client";

import { getTemporarySavedProjectInfoApi, onSaveProjectApi, onTemporarySaveProjectApi } from "@/apis/project/projectApis";
import { createMutation } from "./hooks";
import { UseMutationProps } from "./type";

// 임시저장 프로젝트 정보 조회 mutation
export const useGetTemporarySavedProjectInfoMutation = ({ onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return createMutation(getTemporarySavedProjectInfoApi, "getTemporarySavedProjectInfo", {
        onSuccess,
        onError,
        onSettled,
    });
};

// 프로젝트 임시저장 mutation
export const useTemporarySaveProjectMutation = ({ onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return createMutation(onTemporarySaveProjectApi, "temporarySaveProject", {
        onSuccess,
        onError,
        onSettled,
    });
};

// 프로젝트 등록 mutation
export const useSaveProjectMutation = ({ onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return createMutation(onSaveProjectApi, "saveProject", {
        onSuccess,
        onError,
        onSettled,
    });
};

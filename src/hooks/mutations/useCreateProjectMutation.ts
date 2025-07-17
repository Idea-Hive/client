"use client";

import { getTemporarySavedProjectInfoApi, onSaveProjectApi, onTemporarySaveProjectApi } from "@/apis/project/projectApis";
import { AxiosError } from "axios";
import { useMutationWithSpinner } from "./hooks";
import { UseMutationProps } from "./type";

// 임시저장 프로젝트 정보 조회 mutation
export const useGetTemporarySavedProjectInfoMutation = ({ onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return useMutationWithSpinner(getTemporarySavedProjectInfoApi, {
        onError: (error: AxiosError) => {
            console.log("getTemporarySavedProjectInfoError", error.response?.data);
            onError?.(error);
        },
        onSuccess: (data, variables, context) => {
            console.log("getTemporarySavedProjectInfoSuccess", data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onSettled: () => {
            console.log("getTemporarySavedProjectInfoEnd");
            onSettled?.();
        },
    });
};

// 프로젝트 임시저장 mutation
export const useTemporarySaveProjectMutation = ({ onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return useMutationWithSpinner(onTemporarySaveProjectApi, {
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: AxiosError) => {
            console.log("temporarySaveProjectError", error.response?.data);
            onError?.(error);
        },
        onSuccess: (data, variables, context) => {
            console.log("temporarySaveProjectSuccess", data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onSettled: () => {
            console.log("temporarySaveProjectEnd");
            onSettled?.();
        },
    });
};

// 프로젝트 등록 mutation
export const useSaveProjectMutation = ({ onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return useMutationWithSpinner(onSaveProjectApi, {
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: AxiosError) => {
            console.log("saveProjectError", error.response?.data);
            onError?.(error);
        },
        onSuccess: (data, variables, context) => {
            console.log("saveProjectSuccess", data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onSettled: () => {
            console.log("saveProjectEnd");
            onSettled?.();
        },
    });
};

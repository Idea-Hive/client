"use client";

import { onCheckEmailVerificationCodeApi, onSendEmailVerificationCodeApi, onSignupApi, SignupRequest } from "@/apis/user/userApis";
import { AxiosError } from "axios";
import { useMutationWithSpinner } from "./hooks";
import { UseMutationProps } from "./type";

interface UseSignupMutationProps extends UseMutationProps {
    onSuccess?: (data: any, variables: SignupRequest, context: any) => void;
}

// 회원가입 mutation
export const useSignupMutation = ({ onSuccess, onError, onSettled }: UseSignupMutationProps = {}) => {
    return useMutationWithSpinner(onSignupApi, {
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: AxiosError) => {
            console.log("signupError", error.response?.data);
            onError?.(error);
        },
        onSuccess: (data, variables, context) => {
            console.log("signupSuccess", data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onSettled: () => {
            console.log("signupEnd");
            onSettled?.();
        },
    });
};

// 이메일 인증 요청 mutation
export const useEmailVerificationMutation = ({ onMutate, onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return useMutationWithSpinner(onSendEmailVerificationCodeApi, {
        onMutate: () => {
            onMutate?.();
        },
        onSuccess: (data) => {
            console.log("emailVerificationSuccess", data);
            onSuccess?.(data);
        },
        onError: (error: AxiosError) => {
            console.log("emailVerificationError", error.response?.data);
            onError?.(error);
        },
        onSettled: () => {
            console.log("emailVerificationEnd");
            onSettled?.();
        },
    });
};

// 이메일 인증 코드 확인 mutation
export const useEmailVerificationCheckMutation = ({ onMutate, onSuccess, onError, onSettled }: UseMutationProps = {}) => {
    return useMutationWithSpinner(onCheckEmailVerificationCodeApi, {
        onMutate: () => {
            onMutate?.();
        },
        onSuccess: (data) => {
            console.log("emailVerificationCheckSuccess", data);
            onSuccess?.(data);
        },
        onError: (error: AxiosError) => {
            console.log("emailVerificationCheckError", error);
            onError?.(error);
        },
        onSettled: () => {
            console.log("emailVerificationCheckEnd");
            onSettled?.();
        },
    });
};

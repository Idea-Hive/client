"use client";

import { onCheckEmailVerificationCodeApi, onSendEmailVerificationCodeApi, onSignupApi, SignupRequest } from "@/apis/user/userApis";
import { useSpinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseMutationProps } from "./type";

interface UseSignupMutationProps extends UseMutationProps {
    onSuccess?: (data: any, variables: SignupRequest, context: any) => void;
}

// spinner가 포함된 mutation wrapper
const useMutationWithSpinner = <TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options: {
        onMutate?: (variables: TVariables) => void;
        onSuccess?: (data: TData, variables: TVariables, context: any) => void;
        onError?: (error: any, variables: TVariables, context: any) => void;
        onSettled?: (data: TData | undefined, error: any, variables: TVariables, context: any) => void;
    } = {}
) => {
    const { open: openSpinner, close: closeSpinner } = useSpinner();

    return useMutation({
        mutationFn,
        onMutate: (variables) => {
            openSpinner();
            options.onMutate?.(variables);
        },
        onSuccess: (data, variables, context) => {
            options.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options.onError?.(error, variables, context);
        },
        onSettled: (data, error, variables, context) => {
            closeSpinner();
            options.onSettled?.(data, error, variables, context);
        },
    });
};

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

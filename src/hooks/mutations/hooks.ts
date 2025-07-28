import { useSpinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// spinner가 포함된 mutation wrapper
export const useMutationWithSpinner = <TData, TVariables>(
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

// 공통 mutation 생성 함수
export const useCreateMutation = <TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    mutationName: string,
    options: {
        onMutate?: (variables: TVariables) => void;
        onSuccess?: (data: TData, variables: TVariables, context: any) => void;
        onError?: (error: AxiosError) => void;
        onSettled?: () => void;
    } = {}
) => {
    return useMutationWithSpinner(mutationFn, {
        onMutate: (variables) => {
            console.log(`${mutationName} onMutate`, variables);
            options.onMutate?.(variables);
        },
        onSuccess: (data, variables, context) => {
            console.log(`${mutationName}Success`, data, variables, context);
            options.onSuccess?.(data, variables, context);
        },
        onError: (error: AxiosError) => {
            console.error(`${mutationName}Error`, error);
            options.onError?.(error);
        },
        onSettled: () => {
            console.log(`${mutationName}End`);
            options.onSettled?.();
        },
    });
};
